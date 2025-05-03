import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { UserContext } from '../context/UserContext';
import BlueButton from '../components/BlueButton';
import InputBox from '../components/InputBox';

const Employees = () => {
  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [editingPay, setEditingPay] = useState({}); // { [employeeId]: value }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/');
    } else {
      fetchEmployees();
    }
    console.log('Current user role:', userRole);
  }, [userRole, navigate]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user', { withCredentials: true });
      // Filter to only show employees
      const employeesList = response.data.filter(user => user.role === 'employee');
      setEmployees(employeesList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setMessage({ 
        text: 'Failed to load employees. Please try again.', 
        type: 'error' 
      });
      setLoading(false);
    }
  };



  // Handle employee deletion confirmation
  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowConfirmation(true);
  };

  // Handle employee deletion cancellation
  const cancelDelete = () => {
    setEmployeeToDelete(null);
    setShowConfirmation(false);
  };

  // Handle employee deletion
  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;
    
    try {
      setLoading(true);
      await axios.delete(`/api/user/${employeeToDelete._id}`, { withCredentials: true });
      
      setMessage(`Employee ${employeeToDelete.name} has been removed successfully`);
      setMessageType('success');
      setShowConfirmation(false);
      setEmployeeToDelete(null);
      
      // Refresh employee list
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        setMessage('You do not have permission to remove employee accounts.');
      } else {
        setMessage('Failed to remove employee account. Please try again later.');
      }
      
      setMessageType('error');
      setLoading(false);
      setShowConfirmation(false);
      setEmployeeToDelete(null);
    }
  };

  const handleCreateEmployee = async () => {
    // Basic client-side validation
    if (!name.trim()) {
      setMessage('Name is required');
      setMessageType('error');
      return;
    }
    
    if (!email.trim()) {
      setMessage('Email is required');
      setMessageType('error');
      return;
    }
    
    if (!password) {
      setMessage('Password is required');
      setMessageType('error');
      return;
    }
    
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setMessageType('error');
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post('/api/user', {
        name,
        email,
        password,
        role: 'employee'
      }, { withCredentials: true });
      
      setMessage('Employee account created successfully!');
      setMessageType('success');
      
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      
      // Refresh employee list
      fetchEmployees();
    } catch (error) {
      console.error('Error creating employee:', error.response?.data || error.message);
      
      // Handle specific validation errors from the server
      if (error.response?.data?.errors && error.response.data.errors.length > 0) {
        // Display the first validation error message
        setMessage(error.response.data.errors[0].msg);
      } else if (error.response?.data?.error) {
        // Display custom error message from the server
        setMessage(error.response.data.error);
      } else if (error.response?.status === 400) {
        setMessage('Invalid input. Please check all fields and try again.');
      } else if (error.response?.status === 403) {
        setMessage('You do not have permission to create employee accounts.');
      } else {
        setMessage('Failed to create employee account. Please try again later.');
      }
      
      setMessageType('error');
      setLoading(false);
    }
  };

  return (
    <div className="employees-page">  {/* Using existing page layout style */}
      <Navigation />
      
      <div className="manage-employee">  {/* Using existing account section style */}
        <h1>Manage Employees</h1>
        
        {message && (
          <div className={messageType === 'success' ? 'successMessage' : 'errorMessage'}>
            {message}
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <section className="employee-section">
            <h2 className="section-title">Create New Employee Account</h2>
            <div>
              <InputBox
                label="Full Name"
                placeholder="Enter employee's full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              
              <InputBox
                label="Email"
                placeholder="Enter employee's email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <InputBox
                label="Password"
                placeholder="Enter employee's password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <BlueButton 
                text={loading ? 'Creating...' : 'Create Employee Account'} 
                onClick={handleCreateEmployee} 
                disabled={loading}
              />
            </div>
          </section>
          
          <section className="employee-section">
            <h2 className="section-title">Current Employees</h2>
            {loading ? (
              <p>Loading employees...</p>
            ) : employees.length > 0 ? (
              <div className="employee-table-container">
                <table className="employee-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Hourly Pay ($)</th>
                      <th className="actions-column">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editingPay[employee._id] !== undefined ? editingPay[employee._id] : (employee.hourlyPay ?? '')}
                            onChange={e => {
                              const value = e.target.value;
                              setEditingPay(prev => ({ ...prev, [employee._id]: value }));
                            }}
                            onBlur={async (e) => {
                              const value = parseFloat(editingPay[employee._id]);
                              if (!isNaN(value) && value !== employee.hourlyPay) {
                                try {
                                  setLoading(true);
                                  await axios.put(`/api/user/${employee.email}`,
                                    { hourlyPay: value },
                                    { withCredentials: true }
                                  );
                                  setEmployees(prev => prev.map(emp => emp._id === employee._id ? { ...emp, hourlyPay: value } : emp));
                                  setMessage(`Hourly pay updated for ${employee.name}`);
                                  setMessageType('success');
                                } catch (err) {
                                  setMessage('Failed to update hourly pay.');
                                  setMessageType('error');
                                } finally {
                                  setLoading(false);
                                }
                              }
                            }}
                            style={{ width: '90px' }}
                          />
                        </td>
                        <td className="actions-cell">
                          <button 
                            onClick={() => confirmDelete(employee)}
                            className="remove-button"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No employees found.</p>
            )}
          </section>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Confirm Employee Removal</h3>
            <p className="modal-message">
              Are you sure you want to remove <strong>{employeeToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="modal-buttons">
              <button 
                onClick={cancelDelete}
                className="cancel-button"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteEmployee}
                className="confirm-button"
              >
                Remove Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
