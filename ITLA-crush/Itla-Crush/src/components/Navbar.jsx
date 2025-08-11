import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#f06292",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <div>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          ❤️ ITLA Crush
        </Link>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>
        <Link to="/login" style={{ color: "white" }}>
          Login
        </Link>
        <Link to="/signup" style={{ color: "white" }}>
          Signup
        </Link>
      </div>
    </nav>
  );
}
