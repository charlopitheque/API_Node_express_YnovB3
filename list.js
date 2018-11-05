// list.js
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj;
    let user;
    fs.readFile('users.json', (err,data)=>{
        if (err) throw err;
      users = JSON.parse(data);
      fs.readFile('items.json', 'utf8',  (err, data) => {
        if (err) throw err;
        items = JSON.parse(data);
        fs.readFile('list.json', (err,data)=>{
            lists = JSON.parse(data)
            lists.forEach(list => {
                if(users[list.user] && items[list.item]){
                    list.item =  items.find(item => item.id === list.item)
                    res.send(list)
                }
            });
        });
        res.send(obj)
      });
    })
    
});

module.exports = router;