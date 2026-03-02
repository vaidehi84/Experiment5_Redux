import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "./Dashboard.css";

const Dashboard = memo(function Dashboard() {
  const favorites = useSelector((s) => s.skills.favorites);
  const skills    = useSelector((s) => s.skills.skills);
  const projects  = useSelector((s) => s.reports.projects);
  const { userProfile } = useAppContext();

  const favCount           = useMemo(() => favorites.length, [favorites]);
  const avgLevel           = useMemo(() => Math.round(skills.reduce((a,s)=>a+s.level,0)/skills.length), [skills]);
  const completedProjects  = useMemo(() => projects.filter(p=>p.status==="Completed").length, [projects]);
  const inProgressProjects = useMemo(() => projects.filter(p=>p.status==="In Progress").length, [projects]);

  return (
    <div className="dashboard">

      {/* ── Two-column hero (fits without scroll) ── */}
      <div className="dash-hero">
        {/* Left: identity + CTA */}
        <div className="dash-hero-left">
          <div className="dash-availability">
            <span className="pulse-dot" />
            Open to Internship &amp; Full-Time Opportunities
          </div>

          <h1 className="dash-name">
            Hi, I'm <span className="accent-gradient">Vaidehi</span>
            <span className="dash-name-sub">Sharma</span>
          </h1>

          <p className="dash-tagline">AI &amp; ML Engineer · Full Stack Developer · Problem Solver</p>

          <p className="dash-bio">
            3rd-year B.E. student in Computer Science (AI &amp; ML).
            CGPA <strong style={{color:"#34eca8"}}>{userProfile.cgpa}</strong> · Available for opportunities.
          </p>

          {favCount > 0 && (
            <div className="dash-fav-badge">
              ⭐ {favCount} skill{favCount>1?"s":""} bookmarked &nbsp;·&nbsp;
              <Link to="/analytics">View →</Link>
            </div>
          )}

          <div className="dash-cta">
            <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-linkedin">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
            <Link to="/reports"><button className="btn-primary">📋 Project Reports</button></Link>
            <Link to="/analytics"><button className="btn-ghost">📊 Analytics →</button></Link>
          </div>
        </div>

        {/* Right: quick-stats panel */}
        <div className="dash-hero-right">
          <div className="dash-hero-stats">
            {[
              { icon:"🧠", label:"Skills Tracked",    val:skills.length,           cls:"hsv-blue"   },
              { icon:"🎓", label:"CGPA",              val:userProfile.cgpa,        cls:"hsv-purple" },
              { icon:"✅", label:"Completed Projects",val:completedProjects,        cls:"hsv-green"  },
              { icon:"🔄", label:"In Progress",       val:inProgressProjects,       cls:"hsv-teal"   },
              { icon:"📈", label:"Avg Skill Level",   val:`${avgLevel}%`,          cls:"hsv-yellow" },
            ].map(({ icon, label, val, cls }) => (
              <div key={label} className="hero-stat-row">
                <span className="hero-stat-icon">{icon}</span>
                <span className="hero-stat-label">{label}</span>
                <span className={`hero-stat-val ${cls}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="dash-stats">
        {[
          { color:"blue",   icon:"🧠", label:"Skills",       value:skills.length },
          { color:"purple", icon:"🎓", label:"CGPA",         value:userProfile.cgpa },
          { color:"green",  icon:"✅", label:"Completed",    value:completedProjects },
          { color:"teal",   icon:"🔄", label:"In Progress",  value:inProgressProjects },
          { color:"yellow", icon:"📈", label:"Avg Skill",    value:`${avgLevel}%` },
          { color:"red",    icon:"⭐", label:"Bookmarked",   value:favCount },
        ].map(({ color, icon, label, value }) => (
          <div key={label} className={`stat-card ${color}`}>
            <div className="stat-icon">{icon}</div>
            <div>
              <p className="stat-label">{label}</p>
              <p className="stat-value">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Info cards ── */}
      <div className="dash-grid">
        <div className="dash-card">
          <div className="dash-card-icon-header">
            <span className="dci-icon">💪</span>
            <p className="dash-card-title">Key Strengths</p>
          </div>
          <ul>
            <li>Problem Solving &amp; Critical Thinking</li>
            <li>AI &amp; Machine Learning Development</li>
            <li>Full Stack Web Development</li>
            <li>Database Design &amp; SQL Optimization</li>
            <li>Team Leadership &amp; Collaboration</li>
          </ul>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon-header">
            <span className="dci-icon">🎯</span>
            <p className="dash-card-title">Goals &amp; Aspirations</p>
          </div>
          <ul>
            <li>Build impactful AI-driven applications</li>
            <li>Contribute to open-source projects</li>
            <li>Crack placements &amp; GATE 2026</li>
            <li>Grow as Full Stack + AI Developer</li>
            <li>Explore emerging technologies</li>
          </ul>
        </div>

        <div className="dash-card">
          <div className="dash-card-icon-header">
            <span className="dci-icon">⚙️</span>
            <p className="dash-card-title">Experiment 5 Stack</p>
          </div>
          <div className="tech-pills">
            {["React 19","Redux Toolkit","React Router 7","Context API","useMemo","React.memo","Vite"].map(t=>(
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
          <div className="exp5-badge-row">
            <span className="exp5-feat">✦ Redux Toolkit</span>
            <span className="exp5-feat">✦ useContext</span>
            <span className="exp5-feat">✦ useMemo</span>
            <span className="exp5-feat">✦ Reports Page</span>
          </div>
        </div>
      </div>

      {/* ── LinkedIn banner ── */}
      <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-banner">
        <div className="linkedin-banner-left">
          <div className="linkedin-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <p className="linkedin-banner-title">Vaidehi Sharma</p>
            <p className="linkedin-banner-sub">linkedin.com/in/vaidehi-sharma-27b979288</p>
          </div>
        </div>
        <div className="linkedin-banner-right">View Profile →</div>
      </a>

    </div>
  );
});

export default Dashboard;
