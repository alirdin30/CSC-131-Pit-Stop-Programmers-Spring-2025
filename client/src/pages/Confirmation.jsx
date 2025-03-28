import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';

export default function ConfirmationPage() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/services/last")
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error("Error fetching services:", error));
    }, []);

    return (
        <div className="confirmation-page">
            <Navigation />
            <h1>Service Confirmation</h1>
            {services.length > 0 ? (
                <p>You have selected the following services:</p>
            ) : (
                <p>No services selected.</p>
            )}
            <ul>
                {services.map((service, index) => (
                    <li key={index}>{service}</li>
                ))}
            </ul>
        </div>
    );
}