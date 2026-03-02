import { useMemo, useState, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite, clearFavorites, toggleSkillStar } from "../store/skillsSlice";
import "./Analytics.css";

const SkillCard = memo(function SkillCard({ skill, isFav, onToggle }) {
  return (
    <div className={`skill-card ${isFav ? "starred" : ""}`}>
      <div className="skill-header">
        <div>
          <p className="skill-name">{skill.name}</p>
          <span className={`skill-badge badge-${skill.category.toLowerCase().replace(/[^a-z]/g,'')}`}>
            {skill.category}
          </span>
        </div>
        <button className="star-btn" onClick={() => onToggle(skill)} title={isFav ? "Remove from favorites" : "Add to favorites"}>
          {isFav ? "⭐" : "☆"}
        </button>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${skill.level}%` }} />
      </div>
      <div className="skill-footer">
        <span className="skill-level">{skill.level}% proficiency</span>
        <span className="skill-level-label">{skill.level >= 80 ? "Expert" : skill.level >= 70 ? "Advanced" : "Intermediate"}</span>
      </div>
    </div>
  );
});

function Analytics() {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.skills.skills);
  const favorites = useSelector((state) => state.skills.favorites);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(skills.map((s) => s.category))],
    [skills]
  );

  const filteredSkills = useMemo(
    () =>
      skills.filter((skill) => {
        const matchSearch = skill.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCategory === "All" || skill.category === filterCategory;
        return matchSearch && matchCat;
      }),
    [skills, search, filterCategory]
  );

  const summary = useMemo(() => {
    const total = skills.length;
    const avgLevel = Math.round(skills.reduce((a, s) => a + s.level, 0) / total);
    const topSkill = [...skills].sort((a, b) => b.level - a.level)[0];
    const starredCount = skills.filter((s) => s.starred).length;
    return { total, avgLevel, topSkill, starredCount };
  }, [skills]);

  const handleToggleFavorite = useCallback(
    (skill) => {
      const isFav = favorites.find((f) => f.id === skill.id);
      if (isFav) {
        dispatch(removeFavorite(skill.id));
      } else {
        dispatch(addFavorite(skill));
      }
      dispatch(toggleSkillStar(skill.id));
    },
    [dispatch, favorites]
  );

  const handleClearAll = useCallback(() => {
    favorites.forEach((f) => dispatch(toggleSkillStar(f.id)));
    dispatch(clearFavorites());
  }, [dispatch, favorites]);

  const favSet = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites]);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="page-eyebrow">✦ Experiment 4</div>
        <h1 className="page-title">Skills Analytics</h1>
        <p className="page-subtitle">
          Filter, search &amp; bookmark skills. Powered by <code>Redux Toolkit</code>, <code>useMemo</code> &amp; <code>React.memo</code>.
        </p>
      </div>

      {/* Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <span className="summary-icon">🧠</span>
          <div><p className="summary-label">Total Skills</p><p className="summary-value">{summary.total}</p></div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">📈</span>
          <div><p className="summary-label">Avg Proficiency</p><p className="summary-value">{summary.avgLevel}%</p></div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">🏆</span>
          <div><p className="summary-label">Top Skill</p><p className="summary-value">{summary.topSkill?.name}</p></div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">⭐</span>
          <div><p className="summary-label">Bookmarked</p><p className="summary-value">{summary.starredCount}</p></div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍  Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="cat-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${filterCategory === cat ? "active" : ""}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.length === 0 && <p className="no-results">No skills match your search.</p>}
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isFav={favSet.has(skill.id)}
            onToggle={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="favorites-section">
          <div className="fav-header">
            <h2>⭐ Bookmarked Skills ({favorites.length})</h2>
            <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
          </div>
          <div className="fav-chips">
            {favorites.map((fav) => (
              <span key={fav.id} className="fav-chip">
                {fav.name}
                <button
                  className="remove-fav"
                  onClick={() => {
                    dispatch(removeFavorite(fav.id));
                    dispatch(toggleSkillStar(fav.id));
                  }}
                >×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
