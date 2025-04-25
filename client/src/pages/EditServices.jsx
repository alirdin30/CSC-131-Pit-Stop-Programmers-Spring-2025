import Navigation from "../components/Navigation";
import BlueButton from "../components/BlueButton";
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
        {loading ? <p>Loading...</p> : error ? <p style={{color:'red'}}>{error}</p> : (
          <>
            <ul style={{listStyle:'none', padding:0, width:'100%', maxWidth:'600px', margin:'0 auto'}}>
              {services.map(service => (
                <li key={service._id} style={{marginBottom:'1em', background:'rgba(0,0,0,0.7)', borderRadius:'8px', padding:'1em', boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
                  {editId === service._id ? (
  <>
    <input
      type="text"
      value={editService.name}
      onChange={e => setEditService({...editService, name: e.target.value})}
      style={{marginRight:'0.5em', padding:'0.3em', borderRadius:'4px', border:'1px solid #ccc'}}
      required
    />
    <input
      type="text"
      value={editService.price}
      onChange={e => setEditService({...editService, price: e.target.value})}
      style={{marginRight:'0.5em', padding:'0.3em', borderRadius:'4px', border:'1px solid #ccc', width:'90px'}}
      required
    />
    <input
      type="text"
      value={editService.description}
      onChange={e => setEditService({...editService, description: e.target.value})}
      style={{marginRight:'0.5em', padding:'0.3em', borderRadius:'4px', border:'1px solid #ccc', width:'220px'}}
      required
    />
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'0.5em'}}>
      <button onClick={() => handleSaveEdit(service._id)} style={{background:'#3eb3f7', color:'white', border:'none', borderRadius:'4px', padding:'0.4em 1em', fontWeight:'bold', cursor:'pointer', marginBottom:'0.5em'}}>Save</button>
      <button onClick={handleCancelEdit} style={{background:'#aaa', color:'white', border:'none', borderRadius:'4px', padding:'0.4em 1em', fontWeight:'bold', cursor:'pointer'}}>Cancel</button>
    </div>
  </>
) : (
  <>
    <strong style={{fontSize:'1.1em'}}>{service.name}</strong> - <span style={{color:'#3eb3f7', fontWeight:'bold'}}>{service.price}</span><br/>
    <span>{service.description}</span>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:'0.5em', gap:'0.5em'}}>
      <button style={{background:'#3eb3f7', color:'white', border:'none', borderRadius:'4px', padding:'0.4em 1em', fontWeight:'bold', cursor:'pointer'}} onClick={() => handleEditClick(service)}>Edit</button>
      <button style={{background:'#e74c3c', color:'white', border:'none', borderRadius:'4px', padding:'0.4em 1em', fontWeight:'bold', cursor:'pointer'}} onClick={() => handleDeleteService(service._id)}>Delete</button>
    </div>
  </>
)}
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddService} style={{marginTop:'2em', background:'rgba(0,0,0,0.6)', borderRadius:'8px', padding:'1em', maxWidth:'600px', margin:'2em auto 0 auto', boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
              <h3 style={{marginBottom:'0.5em'}}>Add New Service</h3>
              <input type="text" placeholder="Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} required style={{marginRight:'0.5em', padding:'0.3em', borderRadius:'4px', border:'1px solid #ccc'}} />
              <input type="text" placeholder="Price" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} required style={{marginRight:'0.5em', padding:'0.3em', borderRadius:'4px', border:'1px solid #ccc', width:'90px'}} />
              <input type="text" placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required style={{marginRight:'0.5em', padding:'0.3em', borderRadius:'4px', border:'1px solid #ccc', width:'220px'}} />
              <button type="submit" style={{background:'#3eb3f7', color:'white', border:'none', borderRadius:'4px', padding:'0.4em 1em', fontWeight:'bold', cursor:'pointer'}}>Add Service</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}


export default EditServices;