import React from "react";

export function ContactList({ contactos }) {
    return (
        <div>
            <h2>Contactos guardados:</h2>
            {contactos.map((c, i) => (
            <div key={i} style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
            {c.nombre} {c.apellido} - {c.telefono}
            </div>
        ))}
        </div>
    );
}

