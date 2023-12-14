const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware untuk menguraikan body dari permintaan
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk menangani formulir pendaftaran
app.post('/register', (req, res) => {
    // Proses data pendaftaran
    const name = req.body.name;
    const phone = req.body.phone;

    // Kirim pesan WhatsApp menggunakan Twilio
    const accountSid = 'AC5fac69597373d4bf66b9dbc7eace5119';
    const authToken = 'aa4fd264bcfc0e2500b8004ad4a48626';
    const client = new twilio(accountSid, authToken);

    client.messages.create({
        body: `Halo ${name}! Selamat bergabung!`,
        from: 'whatsapp:' + '14155238886',
        to: 'whatsapp:' + phone
    })
    .then(message => {
        // Tangani respons sukses
        res.status(200).json({ success: true, message: 'Pesan WhatsApp terkirim.' });
    })
    .catch(error => {
        // Tangani respons kesalahan
        res.status(500).json({ success: false, message: 'Gagal mengirim pesan WhatsApp.' });
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
