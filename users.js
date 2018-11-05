// users.js
var fs = require('fs');
const express = require('express');
const router = express.Router();

//on retourne tous les utilisateurs
router.get('/', (req, res) => {
    var obj;
    fs.readFile('users.json', 'utf8',  (err, data) => {
      if (err) throw err;
      obj = JSON.parse(data);
      res.send(obj)
    });
});

//on retourne un utilisateur par id 
router.get('/:userId', (req, res) => {
     fs.readFile('users.json', 'utf8',  (err, data) => {
        if (err) throw err;
        obj = JSON.parse(data);
        user = obj[req.params.userId]
        res.send(user)
      });
});

//on delete un user par id
router.delete('/:userId', (req, res) => {
    fs.readFile('users.json', 'utf8',
     (err, data)=> {
       if (err) throw err;
       obj = JSON.parse(data);
       user = obj.splice(req.params.userId, 1)
       fs.writeFile('users.json',JSON.stringify(obj, null, 4), ()=>{
        res.send(obj)
       });
     });
});

//on crée un user par id
router.post('/', (req, res) => {
    let newUser = req.body
    fs.readFile('users.json', 'utf8', (err, data) => {
       if (err) throw err;
       let obj = JSON.parse(data);
       obj.push(newUser)
       fs.writeFile('users.json',JSON.stringify(obj, null, 4), ()=>{
        res.send(obj)
       });
    });
});

module.exports = router;