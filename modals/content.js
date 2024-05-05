const mongoose = require("mongoose");


const panelSchema = new mongoose.Schema({ 
    id: String,
    data: String,
    count: Number,
  }); 
  
module.exports = mongoose.model('Panel', panelSchema);