import { memo } from "react";
import "./About.css";

const About = memo(function About() {
  const skills = {
    Languages: { pills: ["Python", "JavaScript", "SQL"], color: "blue" },
    Frontend: { pills: ["React.js", "HTML5", "CSS3"], color: "purple" },
    "Backend & DB": { pills: ["Node.js", "MySQL", "DBMS"], color: "green" },
    "AI / ML": { pills: ["Machine Learning", "Google Colab", "NumPy"], color: "orange" },
    Tools: { pills: ["Git / GitHub", "VS Code", "DSA", "OOP"], color: "blue" },
  };

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="page-eyebrow eyebrow-purple">✦ About Me</div>
        <h1 className="page-title">CS Engineer &amp;<br />AI Enthusiast</h1>
        <p className="page-subtitle">
          3rd-year B.E. student specialising in AI &amp; ML — passionate about building
          intelligent systems and solving real-world problems through code.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-left">
          <div className="about-card">
            <p className="about-card-title">🎓 Education</p>
            <p className="edu-degree">B.E. — Computer Science (AI &amp; ML)</p>
            <p className="edu-school">3rd Year · Honours Programme</p>
            <span className="edu-cgpa">📊 CGPA: 8.7</span>
          </div>

          <div className="about-card">
            <p className="about-card-title">🏆 Activities</p>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">💻</span>
                <div className="activity-text">
                  <strong>GeeksforGeeks Student Chapter</strong>
                  Volunteer — tech events &amp; workshops
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🤖</span>
                <div className="activity-text">
                  <strong>IEEE RAS Student Branch</strong>
                  Active Member — robotics &amp; AI
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🌱</span>
                <div className="activity-text">
                  <strong>NGO Volunteer</strong>
                  Social welfare &amp; community service
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-card about-skills-card">
          <p className="about-card-title">🛠️ Technical Skills</p>
          {Object.entries(skills).map(([group, { pills, color }]) => (
            <div className="skills-group" key={group}>
              <p className="skills-group-label">{group}</p>
              <div className="skill-pills">
                {pills.map((p) => (
                  <span key={p} className={`pill pill-${color}`}>{p}</span>
                ))}
              </div>
            </div>
          ))}
          <hr className="skills-divider" />
          <p className="about-card-title">🎯 Current Focus</p>
          <div className="skill-pills">
            <span className="pill pill-purple">DSA for Placements</span>
            <span className="pill pill-green">AI/ML Projects</span>
            <span className="pill pill-orange">GATE 2026</span>
            <span className="pill pill-blue">Full Stack Dev</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default About;
