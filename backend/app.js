const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cors());


const port = 3000;
const private = 'z9>nV?:"&)~4*d_T[6k{T3wy2;.#Vd*+';

const connection = mysql.createConnection({
	host: 'kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user: 'hoeyizbddk5yfbas',
	password: 'z11c19ibt769fu51',
	database: 'ul79atmbxbqwg0en'
});

cloudinary.config({
  cloud_name: 'dt2spmmet',
  api_key: '513593145424553',
  api_secret: 'k4oOmvSDAPWbSmZgfJxtKlDoMck'
});

app.post('/queries', function(req, res) {
  const query = req.body.query;
  const password = req.body.password;
  const funcion = req.body.funcion;
  const subModelos = req.body.subModelos;
  const modelo = req.body.modelo;
  if (password === private) {
    connection.query(query, function(err, rows, fields) {
      if (funcion === 'getMe') {
        if (subModelos) {
          var arrayAuxiliar = [];
          if (rows) {
            for (var i = 0; i < rows.length; i++) {
              const row = rows[i];
              const objetoBase = poblarObjetoBase(row, modelo, subModelos);
              var numeroObjeto;
              if ((numeroObjeto = objetoBaseYaExiste(arrayAuxiliar, objetoBase)) >= 0) {
                arrayAuxiliar = insertarThroughYCollection(objetoBase, arrayAuxiliar, numeroObjeto);
              } else {
                arrayAuxiliar.push(objetoBase);
              }
            }
            res.send({ resultado: arrayAuxiliar });
          } else {
            res.send({ resultado: arrayAuxiliar });
          }
        } else {
          res.send({ resultado: null, err: 'No se recibieron subModelos' });
        }
      } else if (funcion === 'getMeOne') {
        if (subModelos) {
          const objetoBase = poblarObjetoBase(rows[0], modelo, subModelos);
          res.send({ resultado: objetoBase });
        } else {
          res.send({ resultado: null, err: 'No se recibieron subModelos' });
        }
      } else {
        if (err) {
          res.send({ resultado: false, err: err });
        } else {
          res.send({ resultado: true });
        }
      }
    });
  } else {
    res.send({ resultado: null, err: 'Authentication failed' });
  }
});

app.post('/', function(req, res) {
  const email = req.body.email;
  const cuerpo = req.body.html;
  const subject = req.body.subject;
  const remitente = req.body.remitente;
  const password = req.body.password;
  const seguridad = req.body.seguridad;
  if (seguridad === private) {
    if (!remitente || !password) {
      res.send('No hay remitente o password');
    }
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: remitente,
        pass: password
      },
      logger: false,
      debug: false
    });
    const message = {
      to: '<'+email+'>',
      subject: subject,
      html: cuerpo
    };
    transporter.sendMail(message, function(error, info) {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
      } else {
        res.send({ resp: 'Todo bien' });
      }
    });
  } else {
    res.send({ err: 'Authentication failed' });
  }
});

app.post('/qr', function(req, res) {
  const password = req.body.password;
  const string = req.body.base;
  const operacion = req.body.operacion;
  const foto = req.body.foto;
  if (password === private) {
    if (operacion === 'crear') {
      request.get(string, function (error, response, body) {
        if (!error) {
          res.send({resp: string});
        } else {
          res.send({ err: error });
        }
      });
    } else if (operacion === 'leer') {
      cloudinary.v2.uploader.upload(foto, function(err, resp) {
        if (err) {
          console.error(err);
        } else {
          const url = resp.url;
          request.get(string + url, function(errorsote, respuesta) {
            if (err) {
              res.send({ err: errorsote });
            } else {
              res.send({ resp: respuesta });
            }
          });
        }
      });
    }
  } else {
    res.send({ err: 'Authentication failed' });
  }
});

function insertarThroughYCollection(objetoBase, arrayAuxiliar, numeroObjeto) {
  const objetoAuxiliar = arrayAuxiliar[numeroObjeto];
  const llaves = Object.keys(objetoAuxiliar);
  for (var i = 0; i < llaves.length; i++) {
    const llave = llaves[i];
    if (Array.isArray(objetoAuxiliar[llave])) {
      var aux = true;
      for (var j = 0; j < objetoAuxiliar[llave].length; j++) {
        const subObjeto = objetoAuxiliar[llave][j];
        if (objetosSonIguales(objetoBase[llave][0], subObjeto)) {
          aux = false;
          break;
        }
      }
      if (aux) {
        objetoAuxiliar[llave].push(objetoBase[llave][0]);
        arrayAuxiliar[numeroObjeto] = objetoAuxiliar;
      }
    }
  }
  return arrayAuxiliar;
}

function objetoBaseYaExiste(arrayAuxiliar, objetoBase) {
  if (arrayAuxiliar.length === 0) {
    return -1;
  } else {
    for (var i = 0; i < arrayAuxiliar.length; i++) {
      const objetoAuxiliar = arrayAuxiliar[i];
      if (objetosSonIguales(objetoBase, objetoAuxiliar)) {
        return i;
      }
    }
    return -1;
  }
}

function objetosSonIguales(objetoBase, objetoAuxiliar) {
  const llaves = Object.keys(objetoBase);
  const llavesAuxiliar = Object.keys(objetoAuxiliar);
  if (llaves.length === llavesAuxiliar.length) {
    for (var i = 0; i < llaves.length; i++) {
      const llave = llaves[i];
      if (typeof objetoBase[llave] !== 'object' && objetoBase[llave] !== objetoAuxiliar[llave]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function poblarObjetoBase(row, modelo, subModelos) {
  var objeto = {};
  const llaves = Object.keys(modelo);
  for (var i = 0;i < llaves.length; i++) {
    const llave = llaves[i];
    if (llave !== 'tabla' && llave !== 'tienePK') {
      if (typeof modelo[llave] === 'object') {
        const subModelo = encontrarSubModelo(llave, subModelos);
        var noEsModel = (modelo[llave]['tipo'] !== 'model');
        objeto[llave] = poblarSubModelos(row, subModelo, noEsModel);
      } else {
        objeto[llave] = row[llave];
      }
    }
  }
  return objeto;
}

function encontrarSubModelo(llave, subModelos) {
  if (subModelos) {
    for (var i = 0; i < subModelos.length; i++) {
      const subModelo = subModelos[i];
      const keys = Object.keys(subModelo);
      for (var j = 0; j < keys.length; j++) {
        const key = keys[j];
        if (key === llave) {
          return subModelos[i][key];
        }
      }
    }
  } else {
    return null;
  }
}

function poblarSubModelos(row, subModelo, noEsModel) {
  const llaves = Object.keys(subModelo);
  var objeto = {};
  const array = [];
  for (var i = 0; i < llaves.length; i++) {
    const llave = llaves[i];
    if (llave !== 'tabla' && llave !== 'tienePK' && typeof subModelo[llave] !== 'object') {
      objeto[llave] = row[llave];
    }
  }
  estaLlenoDeNulls(objeto) ? objeto = null : objeto;
  if (noEsModel) {
    array.push(objeto);
    return array;
  }
  return objeto;
}

function estaLlenoDeNulls(objeto) {
  const llaves = Object.keys(objeto);
  for (var i = 0; i < llaves.length; i++) {
    const llave = llaves[i];
    if (objeto[llave] !== null) {
      return false;
    }
  }
  return true;
}

app.listen(port, function() {
  console.log('Backend is listening on port '+ port);
});
