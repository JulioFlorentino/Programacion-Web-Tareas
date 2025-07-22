document.getElementById('formContacto').addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    fetch('/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, phone: phone })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        cargarContactos();
    })
    .catch(err => console.error('Error al enviar:', err));
});

function cargarContactos() {
    fetch('/contacts')
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById('listaContactos');
            lista.innerHTML = '';
            data.forEach(c => {
                lista.innerHTML += `<li>${c.name} - ${c.phone}</li>`;
            });
        })
        .catch(err => console.error('Error al cargar:', err));
}

cargarContactos();
