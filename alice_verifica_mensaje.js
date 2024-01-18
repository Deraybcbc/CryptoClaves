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
const ArchivoFirma = "firma_Bob.txt";
const ClavePublica = "ClavePublica_Bob.pem";

app.listen(port, () => {
    console.log("Servidor http://localhost:" + port);
});

const data = fs.readFileSync(ArchivoLeer, 'utf-8');
console.log(data);

const firma_bob = fs.readFileSync(ArchivoFirma, 'utf-8');
console.log(firma_bob);

const publicKey = fs.readFileSync(ClavePublica, 'utf-8');
console.log(publicKey);


const verifacion = crypto.verify(null, data, publicKey, Buffer.from(firma_bob, 'base64'));
console.log(verifacion);

if (verifacion) {
    console.log("La firma es válida");
}else{
    console.log("La firma no es válida");
}

process.exit();