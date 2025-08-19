import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // 👈 Importar iconos
import "./styles/Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          ITLA Crush
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Inicio
        </Link>

        <Link to="/Dashboard" className="navbar-link">
          Dashboard
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-link">
              Signup
            </Link>
          </>
        ) : (
          <div className="user-menu">
            <div
              className="user-icon"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Cuenta"
            >
              <FaUserCircle size={28} />
            </div>

            {menuOpen && (
              <div className="dropdown-menu">
                <p className="user-email">{user.email}</p>
                <button className="logout-btn" onClick={handleLogout}>
                  <FaSignOutAlt style={{ marginRight: "6px" }} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
