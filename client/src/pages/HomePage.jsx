import Navigation from '../components/Navigation';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navigation />

      <h1>Pit Stop Programmers</h1>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>Email: pitstopprogrammers@gmail.com</p>
        <p>Phone: (916) 234-5678</p>
        <p>Address: 409 Mechanic Ln, Rocklin CA, 95736</p>
      </section>
    </div>
  );
};

export default HomePage;
