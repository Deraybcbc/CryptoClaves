const { error } = require('console');
const express = require('express');
const port = 3777;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");

const app = express();
app.use(express.json());

const ArchivoLeer = "msg_Alice_Desincriptado_por_Bob";
const ArchivoGuardar = "firma_Bob.txt";
const ClavePrivada = "ClavePrivada_Bob.pem";

app.listen(port, () => {
    console.log("Servidor http://localhost:" + port);
});

const data = fs.readFileSync(ArchivoLeer, 'utf-8');
console.log(data);

const privateKey = fs.readFileSync(ClavePrivada, 'utf-8');
console.log(privateKey);

const firma = crypto.sign(null, Buffer.from(data, 'utf-8'), privateKey).toString('base64');
console.log(firma);

fs.writeFileSync(ArchivoGuardar, firma, 'utf-8');

console.log("Firma del mensaje guardada en", ArchivoGuardar);

process.exit();