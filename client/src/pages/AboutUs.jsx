import Navigation from '../components/Navigation';
import vasiliy from '../assets/PitStopProgrammersImages/vasiliy.jpg';
import jack from '../assets/PitStopProgrammersImages/jack.jpg';
import michael from '../assets/PitStopProgrammersImages/michael.jpg';
import jessica from '../assets/PitStopProgrammersImages/jessica.jpg';
import francesco from '../assets/PitStopProgrammersImages/francesco.jpg';
import valentina from '../assets/PitStopProgrammersImages/valentina.jpg';

const teamMembers = [
  { name: 'Vasiliy', role: 'Oil and fluid maintenance specialist.', image: vasiliy },
  { name: 'Jack', role: 'Alignment and tire specialist.', image: jack },
  { name: 'Mike', role: 'Specialist in transmission and drivetrain systems.', image: michael },
  { name: 'Jessica', role: 'Expert in electrical repairs.', image: jessica },
  { name: 'Francesco', role: 'Expert in engine diagnostics and repair.', image: francesco },
  { name: 'Valentina', role: 'Brake and suspension system expert.', image: valentina },
];

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navigation />

      <h1>About Us</h1>
      
      <p className="aboutUs">
        At Pit Stop Programmers, we believe in taking great care of your vehicle.<br />
        We treat it just like it's our own.<br />
        We are a small team of passionate mechanics.<br />
        We love fixing cars and making sure they run smoothly.<br />
        We understand that your car is important to you.<br />
        That's why we work hard to provide honest, reliable, and affordable service.<br />
        Whether it's a quick oil change or a big repair, we do it right.<br />
        Our goal is to make sure you feel safe every time you drive away.<br />
      </p>

      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={`${member.name}`} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
