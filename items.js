// items.js
var fs = require('fs');
const express = require('express');
const router = express.Router();

//on retourne tous les items
router.get('/', (req, res) => {
    var obj;
    fs.readFile('items.json', 'utf8',  (err, data) => {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(obj)
    });
});
//log req et err dans fichier séparé
//on retourne un item par id 
router.get('/:itemId', (req, res) => {
     fs.readFile('items.json', 'utf8', (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
        item = obj[req.params.itemId]
        res.send(item)
      });
});

//on delete un item par id
router.delete('/:itemId', (req, res) => {
    //on lit le fichier
    fs.readFile('items.json', 'utf8',
     (err, data)=> {
       if (err) throw err;
       //parse la data
       let obj = JSON.parse(data);
       //retirer de l'array à l'id spécifié 
       let item = obj.splice(req.params.itemId)
       //ecrire nouveau fichier
       fs.writeFile('items.json',JSON.stringify(obj, null, 4), ()=>{
        //Afficher item supr
        res.send("Vous avez supprimé : "+item)
       });
     });
});

//on crée un item par id
router.post('/', (req, res) => {
    let newItem = req.body
    fs.readFile('items.json', 'utf8', (err, data) => {
       if (err) throw err;
       let obj = JSON.parse(data);
       obj.push(newItem)
       fs.writeFile('users.json',JSON.stringify(obj, null, 4), ()=>{
        res.send(obj)
       });
    });
});

module.exports = router;