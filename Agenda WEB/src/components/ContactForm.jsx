import React, { useState } from "react";

const API_URL = "http://www.raydelto.org/agenda.php";

export function ContactForm({ onContactoAgregado }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevoContacto = { nombre, apellido, telefono };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoContacto)
    });

    alert("Contacto agregado correctamente.");
    setNombre(""); setApellido(""); setTelefono("");
    onContactoAgregado();
    };

    return (
    <form onSubmit={manejarEnvio} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
        <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido" required />
        <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" required />
        <button type="submit">Agregar</button>
    </form>
    );
}


