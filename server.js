// Load environment variables from .env file
require('dotenv').config();

// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the Express app
const app = express();

// Define the port number
const PORT = 5000;

// Enable Cross-Origin Resource Sharing (CORS)
var cors = require('cors');
app.use(cors());

// Connect to MongoDB database using environment variable for URI
mongoose.connect('mongodb+srv://KSP1:Testing1@itachi.c1uzmiy.mongodb.net/db', { useNewUrlParser: true, useUnifiedTopology: true , serverSelectionTimeoutMS: 10000 });
const db = mongoose.connection;

// Log MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Log successful MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Parse request bodies as JSON
app.use(bodyParser.json());

// Define schema and model for panels
const panelSchema = new mongoose.Schema({
  id: String,
  data: String,
  count: Number
});
const Panel = new mongoose.model('panels', panelSchema);

// API routes

// GET endpoint to retrieve panel data by ID (Expected runtime: O(1))
app.get('/api/panels/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const panel = await Panel.findOne({ id });
    if (!panel) {
      return res.status(404).json({ error: 'Panel not found' });
    }

    res.json({ data: panel.data, count: panel.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint to add panel data (Expected runtime: O(1))
app.post('/api/panels/:id/add', async (req, res) => {
  const { id } = req.params;
  const { data, count } = req.body;

  try {
    await Panel.findOneAndUpdate({ id }, { data, count }, { upsert: true });
    res.json({ message: 'Panel data added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT endpoint to update panel data (Expected runtime: O(1))
app.put('/api/panels/:id/update', async (req, res) => {
  const { id } = req.params;
  const { data, count } = req.body;

  try {
    const panel = await Panel.findOneAndUpdate({ id }, { data, count }, { new: true });
    if (!panel) {
      return res.status(404).json({ error: 'Panel not found' });
    }

    res.json({ message: 'Panel data updated successfully', panel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE endpoint to delete panel data (Expected runtime: O(1))
app.delete('/api/panels/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    await Panel.deleteOne({ id });
    res.json({ message: 'Panel data deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;