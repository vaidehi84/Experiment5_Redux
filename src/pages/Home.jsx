import { memo } from "react";
import "./Home.css";

const Home = memo(function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="page-eyebrow eyebrow-purple">✦ Portfolio</div>
        <h1 className="page-title">Work, Skills<br />&amp; Projects</h1>
        <p className="page-subtitle">
          Focused on building intelligent applications and interactive web solutions
          that solve real-world problems using AI, ML, and modern web tech.
        </p>
      </div>

      <div className="highlight-cards">
        <div className="highlight-card card-blue">
          <div className="highlight-card-icon">💼</div>
          <p className="highlight-card-title">Professional Highlights</p>
          <ul className="highlight-card-list">
            <li>AI &amp; ML mini-projects in Python &amp; Google Colab</li>
            <li>Front-end &amp; back-end development experience</li>
            <li>Database design &amp; SQL optimization</li>
            <li>DSA and OOP proficiency</li>
            <li>Version control with Git &amp; GitHub</li>
          </ul>
        </div>
        <div className="highlight-card card-purple">
          <div className="highlight-card-icon">🚀</div>
          <p className="highlight-card-title">Career Vision</p>
          <ul className="highlight-card-list">
            <li>Contribute to impactful AI projects</li>
            <li>Grow as a Full Stack &amp; AI Developer</li>
            <li>Build tools that solve real problems</li>
            <li>Continuously explore emerging tech</li>
          </ul>
        </div>
        <div className="highlight-card card-green">
          <div className="highlight-card-icon">🎯</div>
          <p className="highlight-card-title">Current Focus</p>
          <ul className="highlight-card-list">
            <li>DSA practice for placements</li>
            <li>React project development</li>
            <li>GATE 2026 preparation</li>
            <li>Open-source contributions</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Home;
