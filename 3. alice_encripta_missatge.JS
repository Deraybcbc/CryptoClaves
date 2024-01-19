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
const ArchivoGuardar = "msg_alice_encriptado.txt";
const ClavePublica = "ClavePublica_Bob.pem";



const data = fs.readFileSync(ArchivoLeer, 'utf-8');
console.log(data);

const publicKey = fs.readFileSync(ClavePublica, 'utf-8').toString();;
console.log(publicKey);


const mensajeEncriptado = crypto.publicEncrypt(publicKey, Buffer.from(data, 'utf-8')).toString('base64');
console.log(mensajeEncriptado);

fs.writeFileSync(ArchivoGuardar, mensajeEncriptado, 'utf-8');


console.log("Mensaje encriptado y guardado en", ArchivoGuardar);

process.exit();