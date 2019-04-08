//JONATHAN MELESIO CARDENAS GARCIA A00818821
//2° PARCIAL DE DESAROLLO WEB

//1.- Instalar express y requerirlo en app.js
const express = require('express');
const app = express()

//2.- (5 puntos) Agregar variable de puerto que sea dinámica...
const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('App is running')
})


//3.- (20 puntos) Crear una ruta de tipo GET que tomará como parámetro su id...
app.get('/students/:id', function(req, res) {
  id = req.params.id;

  if(id == "A00818821"){
    res.send({
      "id": "A00818821",
      "fullname": "Jonathan Melesio Cardenas Garcia",
      "nickname": "Jona",
      "age": 21
    })
  }
  else{
    res.send({
      error: "Matricula no encontrada."
    })
  }
});

//Para el caso en que no de matricula
app.get('/students/', function(req, res) {
    res.send({
      error: "Debes dar una matrícula como parametro (/A0XXXXXXX)."
    })
});

/* 4
(60 puntos) El Museo Metropolitano de Arte cuenta con datasets de información
de mas de 470,000 piezas de arte de su colección
y estos datasets estan disponibles a través de su RESTful API.
Estos datasets pueden ser utilizados sin necesidad de un permiso y sin costo.
*/
const request = require('request')
const MET = require('./met.js')

app.get('/met',function(req,res){
  if( !req.query.search ) {
    return res.send({
      error: 'Tienes que dar un objeto a buscar'
    })
  }

  MET.searchObject(req.query.search,function(error, response){
    if(error) {
      return res.send({
        error: error
      })
    }
    else {
      //Encontro algo, ahora busca los datos de ese objeto
      getObjectByID(response, function(error, response){
        if(error){
          return res.send({
            error: error
          });
        }
        //Todo bien, ahora agregar el termino de busqueda
        let data ={
          searchTerm: req.query.search,
          artist : response.artist,
          title: response.title,
          year: response.year,
          technique: response.technique,
          metUrl: response.metUrl
        };

        //Regresa el json Final
        return res.send(data);
      });
    }
  });

});


function getObjectByID(objectID,callback){
  const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objectID.objectID;

  request({ url, json: true }, function(error, response) {
    if(error){
      callback(error,undefined);
    }

    let body = response.body;

    //Formatear la salida
    const data = {
      artist : body.constituents[0].name,
      title: body.title,
      year: body.objectEndDate,
      technique: body.medium,
      metUrl: body.objectURL
    };
    callback(undefined,data)

  })
}

//PUNTOS EXTRAS (NUEVAS RUTAS)
//Voy a hacer un index.html para la ruta default (/)
const path = require('path')
const publicDir = path.join(__dirname, 'public')
app.use(express.static(publicDir))

//////FIN DE PUNTOS EXTRAS

//5.- Cachar todas las demás rutas no válidas...
app.get('*', function(req, res) {
  res.send({
    error: 'Ups, el examen no pedia hacer esto.'
  })
})
