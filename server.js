 const express = require('express');
 const app = express();
 const port = 3000;

 // Rout 1: http://localhost:3000/greetings/Bel
 app.get('/greetings/:username', (req,res) => {
    const username = req.query.username;
    res.send(`<h1>Hello there, ${username}!</h1>`);
 });

 //Rout 2: http://localhost:3000/roll/20
 app.get('/roll/:number', (req,res) => {
    const number = parseInt(req.query.number);
    if(isNaN(number)){
    return res.send("You most especify a number");
    }
    const roll = Math.floor(Math.random()*number);
    res.send(`You rolled a ${roll}`);
});

 
 //Rout 3: http://localhost:3000/collectibles/1
   const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req,res) => {
    const index = parseInt(req.query.index);
    if(isNaN(index) || index < 0 || index >= collectibles.length){
      res.send("This item is not yet in stock.check back soon!");
    }
    else {
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.name},it can be yours`);
    }
});


    //Rout 4: http://localhost:3000/shoes?min-price=50&max-price=500&type=sneaker
const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  if (req.query['min-price']) {
      const minPrice = parseFloat(req.query['min-price']);   
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (req.query['max-price']) {
      const maxPrice = parseFloat(req.query['max-price']);
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (req.query.type) {
      const type = req.query.type.toLowerCase();
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type);
  }

  res.json(filteredShoes);
});



app.listen(3000, () =>{
    console.log(`Listening on port 3000`);
 });


 
