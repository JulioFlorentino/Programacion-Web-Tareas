import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import "./styles/ConfessionForm.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ConfessionForm() {
  const [recipient, setRecipient] = useState("");
  const [customRecipient, setCustomRecipient] = useState(""); // 👈 nuevo estado
  const [message, setMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [success, setSuccess] = useState("");

  // Escuchar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Cargar usuarios registrados (para el combo)
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((doc) => doc.data()));
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Debes iniciar sesión para enviar confesiones");
      return;
    }

    const finalRecipient = recipient === "OTRO" ? customRecipient : recipient;

    await addDoc(collection(db, "confessions"), {
      authorId: currentUser.uid,
      authorUsername: currentUser.displayName || currentUser.email,
      recipient: finalRecipient,
      message: message,
      isPublic,
      createdAt: serverTimestamp(),
    });

    setRecipient("");
    setCustomRecipient(""); // limpiar también
    setMessage("");
    setIsPublic(true);
    setSuccess("Confesion enviada a su destino 💌");
  };

  return (
    <form className="confession-form" onSubmit={handleSubmit}>
      <h2>Enviar confesión </h2>

      <label>Destinatario:</label>
      <select
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
      >
        <option value="">-- Seleccionar --</option>
        {users.map((u, i) => (
          <option key={i} value={u.username}>
            {u.username}
          </option>
        ))}
        <option value="OTRO">OTRO</option>
      </select>

      {recipient === "OTRO" && (
        <input
          type="text"
          placeholder="Nombre de tu crush"
          value={customRecipient}
          onChange={(e) => setCustomRecipient(e.target.value)}
          required
        />
      )}

      <label>Mensaje:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <label className="checkbox-label">
        Confesión pública
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
      </label>

      <button type="submit">Enviar</button>

      {success && (
        <p style={{ color: "green", textAlign: "center" }}>{success}</p>
      )}
    </form>
  );
}
