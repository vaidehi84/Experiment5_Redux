import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ fontSize: "5rem", fontWeight: 900, color: "#4f8eff" }}>404</h1>
      <p style={{ color: "#7a90b3", marginBottom: "24px" }}>Page not found.</p>
      <Link to="/" style={{ color: "#4f8eff", fontWeight: 700 }}>← Back to Dashboard</Link>
    </div>
  );
}
export default NotFound;
