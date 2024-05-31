const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const url = 'https://jsonplaceholder.typicode.com/todos';

app.get('/all', async (req, res) => {
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error obteniendo la información', error);
        res.status(500).send('Error obteniendo la información');
    }
});

app.get('/byId/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const response = await axios.get(`${url}/${id}`);
        const document = response.data;
        if (document) {
            res.json({ documentTitle: document.title });
        } else {
            res.status(404).json({ message: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error obteniendo la información', error);
        res.status(500).send('Error obteniendo la información');
    }
});

app.get('/byTitle/:title', async (req, res) => {
    const title = req.params.title.toLowerCase();
    try {
        const response = await axios.get(`${url}`);
        const document = response.data.find(item => item.title.toLowerCase() === title);
        if (document) {
            res.json(document);
        } else {
            res.status(404).json({ message: 'Documento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo la información', error: error.message });
    }
});

app.get('/limit', async (req, res) => {
    try {
        const response = await axios.get(`${url}`);
        res.json(response.data.slice(0, 5));
    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo la información', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en la url http://localhost:${port}/`);
});
