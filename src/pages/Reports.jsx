import { useMemo, memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pinProject, unpinProject, setActiveFilter, updateProgress } from "../store/reportsSlice";
import { useAppContext } from "../context/AppContext";
import "./Reports.css";

/* ── Status badge ── */
const StatusBadge = memo(function StatusBadge({ status }) {
  const map = { Completed: "badge-done", "In Progress": "badge-wip", Planning: "badge-plan" };
  return <span className={`rpt-badge ${map[status] || ""}`}>{status}</span>;
});

/* ── Priority dot ── */
const PriorityDot = memo(function PriorityDot({ priority }) {
  const map = { High: "dot-high", Medium: "dot-med", Low: "dot-low" };
  return <span className={`rpt-dot ${map[priority]}`} title={`${priority} Priority`} />;
});

/* ── Project card ── */
const ProjectCard = memo(function ProjectCard({ project, isPinned, onTogglePin, onProgressChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(project.progress);

  const handleSave = () => {
    onProgressChange(project.id, Number(draft));
    setEditing(false);
  };

  const progressColor =
    project.progress === 100 ? "#34eca8" :
    project.progress >= 60 ? "#4f8eff" :
    project.progress >= 30 ? "#fbbf24" : "#f87171";

  return (
    <div className={`rpt-card ${isPinned ? "rpt-card-pinned" : ""}`}>
      {isPinned && <div className="rpt-pin-ribbon">📌 Pinned</div>}

      <div className="rpt-card-top">
        <div className="rpt-card-meta">
          <PriorityDot priority={project.priority} />
          <span className="rpt-card-cat">{project.category}</span>
          <span className="rpt-card-date">{project.date}</span>
        </div>
        <button
          className={`rpt-pin-btn ${isPinned ? "pinned" : ""}`}
          onClick={() => onTogglePin(project.id, isPinned)}
          title={isPinned ? "Unpin" : "Pin project"}
        >
          {isPinned ? "📌" : "📎"}
        </button>
      </div>

      <h3 className="rpt-card-name">{project.name}</h3>
      <StatusBadge status={project.status} />

      {/* Progress bar */}
      <div className="rpt-progress-row">
        <div className="rpt-progress-bg">
          <div
            className="rpt-progress-fill"
            style={{ width: `${project.progress}%`, background: progressColor }}
          />
        </div>
        <span className="rpt-progress-pct" style={{ color: progressColor }}>{project.progress}%</span>
      </div>

      {/* Edit progress */}
      {editing ? (
        <div className="rpt-edit-row">
          <input
            type="range" min={0} max={100} value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="rpt-range"
          />
          <span className="rpt-draft-val">{draft}%</span>
          <button className="rpt-save-btn" onClick={handleSave}>Save</button>
          <button className="rpt-cancel-btn" onClick={() => setEditing(false)}>✕</button>
        </div>
      ) : (
        <button className="rpt-edit-btn" onClick={() => setEditing(true)}>
          ✏️ Update Progress
        </button>
      )}

      {/* Tech chips */}
      <div className="rpt-tech-row">
        {project.tech.map((t) => (
          <span key={t} className="rpt-tech">{t}</span>
        ))}
      </div>
    </div>
  );
});

/* ── Main Reports Page ── */
function Reports() {
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.reports.projects);
  const pinnedIds = useSelector((s) => s.reports.pinnedIds);
  const activeFilter = useSelector((s) => s.reports.activeFilter);

  // useContext — user profile + layout density
  const { userProfile, layoutDense } = useAppContext();

  // useMemo: overall summary
  const summary = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const inProgress = projects.filter((p) => p.status === "In Progress").length;
    const planning = projects.filter((p) => p.status === "Planning").length;
    const avgProgress = Math.round(projects.reduce((a, p) => a + p.progress, 0) / total);
    const highPriority = projects.filter((p) => p.priority === "High").length;
    return { total, completed, inProgress, planning, avgProgress, highPriority };
  }, [projects]);

  // useMemo: filter tab options
  const filterOptions = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category)), "Pinned"],
    [projects]
  );

  // useMemo: sorted & filtered project list
  const visibleProjects = useMemo(() => {
    let list = [...projects];
    if (activeFilter === "Pinned") {
      list = list.filter((p) => pinnedIds.includes(p.id));
    } else if (activeFilter !== "All") {
      list = list.filter((p) => p.category === activeFilter);
    }
    list.sort((a, b) => {
      const aP = pinnedIds.includes(a.id) ? 0 : 1;
      const bP = pinnedIds.includes(b.id) ? 0 : 1;
      return aP - bP;
    });
    return list;
  }, [projects, activeFilter, pinnedIds]);

  // useMemo: per-category completion stats
  const categoryStats = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))];
    return cats.map((cat) => {
      const group = projects.filter((p) => p.category === cat);
      const done = group.filter((p) => p.status === "Completed").length;
      const avgProg = Math.round(group.reduce((a, p) => a + p.progress, 0) / group.length);
      return { cat, total: group.length, done, pct: Math.round((done / group.length) * 100), avgProg };
    });
  }, [projects]);

  const handleTogglePin = (id, isPinned) =>
    dispatch(isPinned ? unpinProject(id) : pinProject(id));

  const handleProgressChange = (id, progress) =>
    dispatch(updateProgress({ id, progress }));

  return (
    <div className="reports-page">

      {/* ── Header ── */}
      <div className="rpt-header">
        <div className="rpt-header-top">
          <div>
            <div className="page-eyebrow eyebrow-teal">✦ Experiment 5 · New Page · Reports</div>
            <h1 className="page-title">
              Project <span className="rpt-gradient">Reports</span>
            </h1>
            <p className="page-subtitle">
              Welcome back, <strong>{userProfile.firstName}</strong>. Your full project portfolio —
              track progress, pin important work, and filter by category.
              <br />
              <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="rpt-linkedin-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign:"middle",marginRight:5}}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/vaidehi-sharma-27b979288
              </a>
            </p>
          </div>

          {/* Exp5 badge panel */}
          <div className="rpt-exp5-panel">
            <div className="rpt-exp5-title">Exp 5 Features</div>
            <div className="rpt-exp5-list">
              <span>⚡ Redux Toolkit</span>
              <span>🌐 useContext</span>
              <span>🧮 useMemo ×4</span>
              <span>🆕 New Page</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="rpt-stats">
        <div className="rpt-stat blue">
          <span className="rpt-stat-icon">📁</span>
          <span className="rpt-stat-num">{summary.total}</span>
          <span className="rpt-stat-lbl">Total Projects</span>
        </div>
        <div className="rpt-stat green">
          <span className="rpt-stat-icon">✅</span>
          <span className="rpt-stat-num">{summary.completed}</span>
          <span className="rpt-stat-lbl">Completed</span>
        </div>
        <div className="rpt-stat yellow">
          <span className="rpt-stat-icon">🔄</span>
          <span className="rpt-stat-num">{summary.inProgress}</span>
          <span className="rpt-stat-lbl">In Progress</span>
        </div>
        <div className="rpt-stat purple">
          <span className="rpt-stat-icon">📝</span>
          <span className="rpt-stat-num">{summary.planning}</span>
          <span className="rpt-stat-lbl">Planning</span>
        </div>
        <div className="rpt-stat teal">
          <span className="rpt-stat-icon">📈</span>
          <span className="rpt-stat-num">{summary.avgProgress}%</span>
          <span className="rpt-stat-lbl">Avg Progress</span>
        </div>
        <div className="rpt-stat red">
          <span className="rpt-stat-icon">🔥</span>
          <span className="rpt-stat-num">{summary.highPriority}</span>
          <span className="rpt-stat-lbl">High Priority</span>
        </div>
      </div>

      {/* ── Category Breakdown (useMemo) ── */}
      <div className="rpt-breakdown">
        <h2 className="rpt-section-title">
          Category Breakdown
          <span className="memo-tag">useMemo</span>
          <span className="redux-tag">Redux</span>
        </h2>
        <div className="rpt-breakdown-grid">
          {categoryStats.map(({ cat, total, done, pct, avgProg }) => (
            <div className="rpt-bk-card" key={cat}>
              <div className="rpt-bk-top">
                <span className="rpt-bk-cat">{cat}</span>
                <span className="rpt-bk-pct">{pct}%</span>
              </div>
              <div className="rpt-progress-bg">
                <div className="rpt-bk-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="rpt-bk-footer">
                <span>{done}/{total} done</span>
                <span>Avg {avgProg}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pin notification ── */}
      {pinnedIds.length > 0 && (
        <div className="rpt-pinned-bar">
          📌 {pinnedIds.length} project{pinnedIds.length > 1 ? "s" : ""} pinned · showing first in grid
        </div>
      )}

      {/* ── Filter bar (Redux dispatch) ── */}
      <div className="rpt-filter-bar">
        <span className="rpt-filter-label">Filter by:</span>
        {filterOptions.map((f) => (
          <button
            key={f}
            className={`rpt-filter-btn ${activeFilter === f ? "active" : ""}`}
            onClick={() => dispatch(setActiveFilter(f))}
          >
            {f}
            {f === "Pinned" && pinnedIds.length > 0 && (
              <span className="rpt-pin-count">{pinnedIds.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Projects Grid ── */}
      <div className={`rpt-grid ${layoutDense ? "rpt-grid-dense" : ""}`}>
        {visibleProjects.length === 0 ? (
          <p className="rpt-empty">No projects match this filter.</p>
        ) : (
          visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isPinned={pinnedIds.includes(project.id)}
              onTogglePin={handleTogglePin}
              onProgressChange={handleProgressChange}
            />
          ))
        )}
      </div>

      {/* ── Legend ── */}
      <div className="rpt-legend">
        <div className="rpt-legend-item"><span className="dot-high rpt-dot" /> High Priority</div>
        <div className="rpt-legend-item"><span className="dot-med rpt-dot" /> Medium</div>
        <div className="rpt-legend-item"><span className="dot-low rpt-dot" /> Low</div>
        <div className="rpt-legend-item"><span className="badge-done rpt-badge" /> Completed</div>
        <div className="rpt-legend-item"><span className="badge-wip rpt-badge" /> In Progress</div>
        <div className="rpt-legend-item"><span className="badge-plan rpt-badge" /> Planning</div>
      </div>

    </div>
  );
}

export default Reports;
