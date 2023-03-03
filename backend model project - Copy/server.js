require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyparser = require('body-parser');
const {
    allowInsecurePrototypeAccess,
  } = require('@handlebars/allow-prototype-access');
  
const employeeController = require('./controllers/employeeController');
// const appointmentController=require('./controllers/appointmentController')
var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.get('/',(req,res)=>{
    res.render('index');
    });
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine(
    'hbs',
    exphbs.engine({
      extname: 'hbs',
      defaultLayout: 'mainLayout',
      layoutsDir: __dirname + '/views/layouts/',
  
      // Issue in Access has been denied to resolve the property
      //"---" because it is not an "own property" of its parent.
      handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
  );

app.set('view engine', 'hbs');


  
app.listen(5000, () => {
    console.log('Express server started at port : 5000');
});


app.use('/employee', employeeController);
