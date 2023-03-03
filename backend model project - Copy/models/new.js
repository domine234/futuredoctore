const mongoose = require('mongoose');

var appoinmentSchema = new mongoose.Schema({

    which:{
        type:String
    },
    Name:{
    type:String
    }, 
    Email:{
      type:String
    },
    Date:{
        type:String
    },
    time:{
        type:String
    },
   
});
mongoose.model('appointment', appoinmentSchema)
/*appointment form*/




