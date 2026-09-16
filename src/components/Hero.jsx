import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-text">

        <p className="hero-tag">
          YOUR PERSONAL PRODUCTIVITY SPACE
        </p>

        <h1>
          Everything you need.
          <br />
          <span>One place.</span>
        </h1>

        <p className="hero-desc">
          Organize your notes, manage your tasks,
          learn with videos, track your progress,
          and stay focused with powerful productivity tools.
        </p>

        <div className="hero-buttons">
          <Link to="/signup" className="primary-btn">
            Get Started
          </Link>

          <Link to="/dashboard" className="secondary-btn">
            Explore Dashboard →
          </Link>
        </div>

      </div>

      <div className="hero-image">
        <img
          src={hero}
          alt="Productivity workspace"
        />
      </div>

    </section>
  );
};

export default Hero;