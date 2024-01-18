const { error } = require('console');
const express = require('express');
const port = 3777;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");


const app = express();
app.use(express.json());

const ArchivoPublica = "ClavePublica_Alice.pem";
const ArchivoPrivada = "ClavePrivada_Alice.pem";

app.listen(port, () => {
    console.log("Servidor http://localhost:" + port);
});


const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
});


fs.writeFileSync(ArchivoPublica, publicKey.export({ type: 'spki', format: 'pem' }), 'utf-8');
fs.writeFileSync(ArchivoPrivada, privateKey.export({ type: 'pkcs8', format: 'pem' }), 'utf-8');

console.log("Claves Generadas");