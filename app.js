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

/* 4
(60 puntos) El Museo Metropolitano de Arte cuenta con datasets de información
de mas de 470,000 piezas de arte de su colección
y estos datasets estan disponibles a través de su RESTful API.
Estos datasets pueden ser utilizados sin necesidad de un permiso y sin costo.
*/

app.get('/met',function(req,res){
  if( !req.query.search ) {
    return res.send({
      error: 'Tienes que dar una peli o serie a buscar'
    })
  }
});
