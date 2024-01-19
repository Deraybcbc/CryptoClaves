const { error } = require('console');
const express = require('express');
const port = 3777;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");

const app = express();
app.use(express.json());

const ArchivoLeer = "msg_encriptado_JSON.json";
const ArchivoGuardar = "msg_desencriptado_Bob";
const ClavePublica = "ClavePublica_Alice.pem";
const ClavePrivada = "ClavePrivada_Bob.pem";

app.listen(port, () => {
    console.log("Servidor http://localhost:" + port);
});

const data = JSON.parse(fs.readFileSync(ArchivoLeer, 'utf-8'));
console.log(data);

const publicKey = fs.readFileSync(ClavePublica, 'utf-8');
console.log(publicKey);

const privateKey = fs.readFileSync(ClavePrivada, 'utf-8');
console.log(privateKey);

const verifacion = crypto.verify(null, Buffer.from(data.MensajeEncriptado), publicKey, Buffer.from(data.Firma, 'base64'));
console.log(verifacion);

if (verifacion) {
    const mensajeDesencriptado = crypto.privateDecrypt(privateKey, Buffer.from(data.MensajeEncriptado, 'base64')).toString('utf-8');
    console.log(mensajeDesencriptado);

    fs.writeFileSync(ArchivoGuardar, mensajeDesencriptado, 'utf-8');

    console.log("Mensaje Guardao y desencriptado en ", ArchivoGuardar);

} else {
    console.log("La firma no es valida, no se puede desencriptar");
}

process.exit();