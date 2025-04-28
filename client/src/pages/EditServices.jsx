import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";

const EditServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newService, setNewService] = useState({ name: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [editService, setEditService] = useState({ name: '', price: '', description: '' });

  // Fetch services from API
  useEffect(() => {
    fetch('/api/services')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch services');
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add new service
  const handleAddService = (e) => {
    e.preventDefault();
    fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add service');
        return res.json();
      })
      .then(added => {
        setServices([...services, added]);
        setNewService({ name: '', price: '', description: '' });
      })
      .catch(err => setError(err.message));
  };

  // Delete service
  const handleDeleteService = (id) => {
    fetch(`/api/services/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok && res.status !== 204) throw new Error('Failed to delete service');
        setServices(services.filter(s => s._id !== id));
      })
      .catch(err => setError(err.message));
  };

  // Start editing a service
  const handleEditClick = (service) => {
    setEditId(service._id);
    setEditService({ name: service.name, price: service.price, description: service.description });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditId(null);
    setEditService({ name: '', price: '', description: '' });
  };

  // Save edited service
  const handleSaveEdit = (id) => {
    fetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editService)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update service');
        return res.json();
      })
      .then(updated => {
        setServices(services.map(s => (s._id === id ? updated : s)));
        setEditId(null);
        setEditService({ name: '', price: '', description: '' });
      })
      .catch(err => setError(err.message));
  };

  return (
    <div className="edit-services-page">
      <Navigation />
      <section className="edit-services">
        <h1>Edit Services</h1>
        {loading ? <p>Loading...</p> : error ? <p className="edit-error-message">{error}</p> : (
          <>
            <ul className="edit-services-list">
              {services.map(service => (
                <li key={service._id} className="edit-service-item">
                  {editId === service._id ? (
  <>
    <input
      type="text"
      value={editService.name}
      onChange={e => setEditService({...editService, name: e.target.value})}
      className="edit-input edit-input-name"
      required
    />
    <input
      type="text"
      value={editService.price}
      onChange={e => setEditService({...editService, price: e.target.value})}
      className="edit-input edit-input-price"
      required
    />
    <input
      type="text"
      value={editService.description}
      onChange={e => setEditService({...editService, description: e.target.value})}
      className="edit-input edit-input-description"
      required
    />
    <div className="edit-service-edit-actions">
      <button onClick={() => handleSaveEdit(service._id)} className="edit-btn save-btn">Save</button>
      <button onClick={handleCancelEdit} className="edit-btn cancel-btn">Cancel</button>
    </div>
  </>
) : (
  <>
    <strong className="service-name">{service.name}</strong> - <span className="service-price-edit">{service.price}</span><br/>
    <span>{service.description}</span>
    <div className="edit-service-actions">
      <button className="edit-btn edit-btn-edit" onClick={() => handleEditClick(service)}>Edit</button>
      <button className="edit-btn delete-btn" onClick={() => handleDeleteService(service._id)}>Delete</button>
    </div>
  </>
)}
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddService} className="edit-service-form">
              <h3 className="edit-service-form-title">Add New Service</h3>
              <input type="text" placeholder="Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required className="edit-input edit-input-name" />
              <input type="text" placeholder="Price" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} required className="edit-input edit-input-price" />
              <input type="text" placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required className="edit-input edit-input-description" />
              <button type="submit" className="edit-btn add-btn">Add Service</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}


export default EditServices;