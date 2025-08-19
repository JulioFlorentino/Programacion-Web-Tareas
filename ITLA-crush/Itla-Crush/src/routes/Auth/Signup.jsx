// src/routes/Auth/Register.jsx
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import "./Auth.css"; // <-- reutilizamos estilos del login/confession
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //timer
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError(""); // Oculta el mensaje
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Crear usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Actualizar displayName en Auth
      await updateProfile(user, { displayName: username });

      // Guardar datos en Firestore
      await setDoc(doc(collection(db, "users"), user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      });

      setSuccess("Usuario registrado con éxito");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2> Registro</h2>
      <form onSubmit={handleRegister}>
        <label>Nombre de usuario</label>
        <input
          type="user"
          placeholder="Ingresa tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Correo</label>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Crea una contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>

        <div
          className="auth-link"
          style={{ textAlign: "center", marginTop: "16px" }}
        >
          <label>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </label>
        </div>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>{success},</p>
      )}
    </div>
  );
}
