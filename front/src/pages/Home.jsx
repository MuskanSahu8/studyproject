import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";

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
      descr: "Set alarms to stay on schedule."
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
    <>
      <main>
        <Hero />
        <section className="features">
          <p className="section-small">
            EVERYTHING YOU NEED
          </p>
          <h2>
            One place for
            <span> everything.</span>
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
      </main>
    </>
  );
};

export default Home;