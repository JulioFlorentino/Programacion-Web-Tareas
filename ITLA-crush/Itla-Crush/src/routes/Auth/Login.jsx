import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import "./Auth.css";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Timer para mensajes de error
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 7000); // 3 segundos
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login exitoso");
    } catch (err) {
      setError("Error al ingresar correo o contraseña invalidos");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Login con Google exitoso");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label>Correo</label>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>

        <div
          className="auth-link"
          style={{ textAlign: "center", marginTop: "16px" }}
        >
          <label>
            ¿Aun tienes cuenta? <Link to="/signup">Registrate aqui</Link>
          </label>
        </div>
      </form>
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>{success}</p>
      )}

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div
        className="auth-link"
        style={{ textAlign: "center", marginTop: "16px" }}
      >
        <label>O registrate con:</label>
      </div>

      <button className="google-login-btn" onClick={handleGoogleLogin}>
        <FaGoogle size={28} />
      </button>
    </div>
  );
}
