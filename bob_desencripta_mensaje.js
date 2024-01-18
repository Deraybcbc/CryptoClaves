const { error } = require('console');
const express = require('express');
const port = 3777;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");

const app = express();
app.use(express.json());

const ArchivoLeer = "msg_alice_encriptado.txt";
const ArchivoGuardar = "msg_Alice_Desincriptado_por_Bob";
const ClavePrivada = "ClavePrivada_Bob.pem";

app.listen(port, () => {
    console.log("Servidor http://localhost:" + port);
});

const data = fs.readFileSync(ArchivoLeer, 'utf-8').toString();
console.log(data);

const privateKey = fs.readFileSync(ClavePrivada, 'utf-8').toString();
console.log(privateKey);

const mensajeDesincriptado = crypto.privateDecrypt(privateKey, Buffer.from(data, 'base64')).toString('utf-8');
console.log(mensajeDesincriptado);

fs.writeFileSync(ArchivoGuardar, mensajeDesincriptado, 'utf-8');
console.log("Mensaje desencriptado y guardado en", ArchivoGuardar);

process.exit();


