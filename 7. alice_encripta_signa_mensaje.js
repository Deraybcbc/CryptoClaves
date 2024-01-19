const { error } = require('console');
const express = require('express');
const port = 3777;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");

const app = express();
app.use(express.json());

const ArchivoLeer = "msg_alice.txt";
const ArchivoGuardar = "msg_encriptado_JSON.json";
const ClavePublica = "ClavePublica_Bob.pem";
const ClavePrivada = "ClavePrivada_Alice.pem"; // Agregamos la clave privada de Bob


app.listen(port, () => {
    console.log("Servidor http://localhost:" + port);
});

const data = fs.readFileSync(ArchivoLeer, 'utf-8');
console.log(data);

const publicKey = fs.readFileSync(ClavePublica, 'utf-8');
console.log(publicKey);

const privateKey = fs.readFileSync(ClavePrivada, 'utf-8');
console.log(privateKey);

const mensajeEncriptado = crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64');
console.log(mensajeEncriptado);

const firma_Alice = crypto.sign(null,Buffer.from(mensajeEncriptado),privateKey).toString('base64');
console.log(firma_Alice);

const MensajeFirmado = {
    MensajeEncriptado: mensajeEncriptado,
    Firma: firma_Alice,
};

fs.writeFileSync(ArchivoGuardar, JSON.stringify(MensajeFirmado, null, 2), 'utf-8');

console.log("Mensaje encriptado y firmado guardado en", ArchivoGuardar);

process.exit();
