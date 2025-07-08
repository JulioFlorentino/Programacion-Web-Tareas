import React, { useEffect, useState } from "react";
import { ContactForm } from "../ContactForm";
import { ContactList } from "../ContactList";

const API_URL = "http://www.raydelto.org/agenda.php";

function App() {
    const [contactos, setContactos] = useState([]);

    const cargarContactos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setContactos(data);
    };

    useEffect(() => {
    cargarContactos();
    }, []);

    return (
        <div style={{ maxWidth: '700px', margin: 'auto', background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h1 style={{ textAlign: 'center' }}>Agenda React</h1>
            <ContactForm onContactoAgregado={cargarContactos} />
            <ContactList contactos={contactos} />
        </div>
    );
}

export default App;
