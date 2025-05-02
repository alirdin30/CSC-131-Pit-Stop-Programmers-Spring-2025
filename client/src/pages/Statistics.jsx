import Navigation from "../components/Navigation";
import axios from "axios";
import { useState, useEffect } from "react";

const Statistics = () => {
  const [serviceRevenue, setServiceRevenue] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [loadingPayroll, setLoadingPayroll] = useState(true);

  const fetchServiceRevenue = async () => {
    try {
      const response = await axios.get("/api/appointments/service-revenue", { withCredentials: true });
      setServiceRevenue(response.data);
    } catch (error) {
      console.error("Error fetching service revenue:", error.message);
    }
  };

  const fetchPayroll = async () => {
    try {
      setLoadingPayroll(true);
      const response = await axios.get("/api/hours/payroll-summary", { withCredentials: true });
      setPayroll(response.data);
    } catch (error) {
      console.error("Error fetching payroll summary:", error.message);
    } finally {
      setLoadingPayroll(false);
    }
  };

  useEffect(() => {
    fetchServiceRevenue();
    fetchPayroll();
  }, []);

  return (
    <div className="revenue-page">
      <Navigation />
      <h1>Statistics</h1>



      <h2 style={{marginTop: 40}}>Employee Payroll</h2>
      <section className="payroll-summary">
        {loadingPayroll ? (
          <p>Loading payroll summary...</p>
        ) : payroll.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Hourly Pay ($)</th>
                <th>Total Approved Hours</th>
                <th>Total Payment ($)</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((emp, idx) => (
                <tr key={idx}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>${emp.hourlyPay.toFixed(2)}</td>
                  <td>{emp.totalApprovedHours}</td>
                  <td>${emp.totalPayment.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No payroll data available.</p>
        )}
      </section>
    </div>
  );
};

export default Statistics;