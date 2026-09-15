import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Nav from "../features/Nav";

const Home = () => {

  const features = [
    {
      icon: "📝",
      title: "Notes",
      desc: "Create and organize your notes easily."
    },
    {
      icon: "✅",
      title: "Todos",
      desc: "Manage your daily tasks and stay productive."
    },
    {
      icon: "🎥",
      title: "Video Learning",
      desc: "Attach YouTube videos directly to your notes."
    },
    {
      icon: "📊",
      title: "Progress",
      desc: "Track your productivity and completion progress."
    },
    {
      icon: "📅",
      title: "Calendar",
      desc: "Plan your tasks and organize your schedule."
    },
    {
      icon: "⏰",
      title: "Alarms",
      desc: "Set alarms to stay on schedule."
    },
    {
      icon: "🔔",
      title: "Reminders",
      desc: "Never forget important tasks."
    },
    {
      icon: "⏱️",
      title: "Stopwatch",
      desc: "Track your study and work sessions."
    }
  ];

  return (
    <div className="home">

      {/* Navbar */}
      <Nav />

      <main>

        {/* Hero */}
        <Hero />

        {/* Features */}
        <section className="features" id="features">

          <p className="section-small">
            EVERYTHING YOU NEED
          </p>

          <h2>
            One place for <span>everything.</span>
          </h2>

          <p className="section-desc">
            Simple tools designed to help you learn,
            organize and stay focused.
          </p>

          <div className="feature-grid">

            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
              />
            ))}

          </div>

        </section>


        {/* About */}
       <section className="about" id="about">
  <div className="about-container">

    <div className="about-content">
      <span className="about-tag">ABOUT DESKBUDDY</span>

      <h2>
        Everything you need to
        <span> stay productive.</span>
      </h2>

      <p>
        DeskBuddy is a simple productivity and study platform designed
        to help you organize your daily work in one place.
      </p>

      <p>
        Manage your notes, tasks, reminders and study videos without
        switching between different applications.
      </p>

      <div className="about-points">
        <div className="about-point">
          <span>✓</span>
          <p>Organize your study notes</p>
        </div>

        <div className="about-point">
          <span>✓</span>
          <p>Track your daily tasks</p>
        </div>

        <div className="about-point">
          <span>✓</span>
          <p>Stay focused and productive</p>
        </div>
      </div>
    </div>

    <div className="about-card">
      <div className="about-icon">🚀</div>
      <h3>Built for productivity</h3>
      <p>
        Plan your day, manage your work and keep your learning
        resources organized with DeskBuddy.
      </p>

      <div className="about-stats">
        <div>
          <strong>5+</strong>
          <span>Features</span>
        </div>

        <div>
          <strong>24/7</strong>
          <span>Accessible</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Workspace</span>
        </div>
      </div>
    </div>

  </div>
</section>

      </main>

    </div>
  );
};

export default Home;