import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import "./styles/ConfessionList.css";

const ConfessionList = () => {
  const [confessions, setConfessions] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "confessions"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConfessions(data);
    });

    // Escuchar usuario logueado
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "confessions", id));
  };

  return (
    <div className="confession-container">
      <h2 className="confession-title">📢 Últimas Confesiones</h2>

      {confessions.length === 0 ? (
        <p className="confession-empty">No hay confesiones todavía.</p>
      ) : (
        <div className="confession-grid">
          {confessions.map((confession) => (
            <div key={confession.id} className="confession-card">
              <p className="confession-message">{confession.message}</p>

              <div className="confession-info">
                <span>
                  <strong>Para: {confession.recipient}</strong>
                </span>
              </div>

              <div className="confession-footer">
                <span className="confession-author">
                  {confession.isPublic
                    ? confession.authorUsername || "Usuario desconocido"
                    : "Confesión anónima"}
                </span>
                <span className="confession-date">
                  {confession.createdAt?.toDate
                    ? confession.createdAt.toDate().toLocaleString()
                    : "Fecha desconocida"}
                </span>
                {currentUser && confession.authorId === currentUser.uid && (
                  <button
                    className="delete-confession-btn"
                    onClick={() => handleDelete(confession.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfessionList;
