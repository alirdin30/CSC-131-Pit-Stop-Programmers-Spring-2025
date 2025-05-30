import Navigation from '../components/Navigation';
//array of customer reviews
const reviews = [
  {
    username: 'Anna8288',
    rating: 5,
    text: 'Amazing service! They fixed my brakes quickly and at a great price.',
  },
  {
    username: 'CarLover88',
    rating: 5,
    text: 'Best mechanic shop around! Honest and skilled professionals.',
  },
  {
    username: 'Emily2054',
    rating: 5,
    text: 'Fast and friendly service! My car runs like new again.',
  },
];
//this displays the websites main content
const HomePage = () => {
  return (
    <div className="home-page">
      <Navigation />

      <h1>Pit Stop Programmers - Auto Repair Services</h1>
      {/*customer reviews section*/}
      <section className="reviews">
        <h2>Customer Reviews</h2>
        <div className="review-container">
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <h3>{review.username}</h3>{/* username of the review */}
              <p className="stars">★★★★★</p>{/* Five stars in the review */}
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Contact information section */}
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