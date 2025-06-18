
//funcion para cargar los contactos (Wao que lucha papa Dio')
function cargarContactos() {
    const container = document.getElementById('contacts-container');
    if (!container) {
    console.error('No se encontró el contenedor contacts-container');
    return;
    }
    fetch('http://www.raydelto.org/agenda.php')
    .then(response => response.json())
    .then(data => {
        container.innerHTML = '';
        data.forEach(contacto => {
        const contactoDiv = document.createElement('div');

        const nombre = document.createElement('h3');
        nombre.textContent = `${contacto.nombre} ${contacto.apellido}`;

        const telefono = document.createElement('h4');
        telefono.textContent = contacto.telefono;

        contactoDiv.appendChild(nombre);
        contactoDiv.appendChild(telefono);
        container.appendChild(contactoDiv);
        });
    })
    .catch(error => {
        console.error('Error al obtener los contactos:', error);
    });
}

document.addEventListener('DOMContentLoaded', cargarContactos);


function enviarContacto() {
  // Obtener valores de los inputs
    const nombre = document.querySelector('.Name-inpt').value.trim();
    const apellido = document.querySelector('.LName-inpt').value.trim();
    const telefono = document.querySelector('.Phone-inpt').value.trim();

    if (!nombre || !apellido || !telefono) {
    alert('Por favor completa todos los campos');
    return;
    }

  // Crear objeto con los datos
    const nuevoContacto = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono
    };

  // Enviar por POST al servidor
    fetch('http://www.raydelto.org/agenda.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoContacto)
    })
    .then(response => response.json())
    .then(data => {
    alert('Contacto guardado con éxito');
    // Opcional: limpiar inputs
    document.querySelector('.Name-inpt').value = '';
    document.querySelector('.LName-inpt').value = '';
    document.querySelector('.Phone-inpt').value = '';
    // Opcional: recargar lista de contactos
    cargarContactos();
    })
    .catch(error => {
    console.error('Error al guardar contacto:', error);
    alert('Error al guardar contacto');
    });
}

// Vincular función al botón,  meno' lucha
document.getElementById('save-btn').addEventListener('click', enviarContacto);
