const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CONTACT_FILE = 'contacts.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// read contacts
function readContacts() {
    try {
        const data = fs.readFileSync(CONTACT_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// save contacs
function saveContacts(contacts) {
    fs.writeFileSync(CONTACT_FILE, JSON.stringify(contacts, null, 2));
}

// List contacts
app.get('/contacts', (req, res) => {
    const contacts = readContacts();
    res.json(contacts);
});

// add contacts
app.post('/contacts', (req, res) => {
    const newContact = req.body;

    if (!newContact.name || !newContact.phone) {
        return res.status(400).json({ message: 'Data missing: name and phone are required.' });
    }

    const contacts = readContacts();
    contacts.push(newContact);
    saveContacts(contacts);

    res.status(201).json({ message: 'New contact added', contact: newContact });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
