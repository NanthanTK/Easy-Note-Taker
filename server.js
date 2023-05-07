//import express module
const express = require('express');
const { v4: uuidv4 } = require('uuid');
//initiate path module
const path = require('path');

const fs = require('fs');
const { 
      readFromFile, 
      readAndAppend, 
      writeToFile} = require('./helpers/fsUtils');
//const { title } = require('process');


//const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for retrieving all the notes
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for Notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
app.get('/notes/:title', (req, res) => {
  const title = req.params.title;
  console.log(title);
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((db) => db.title === title);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that title');
    });
});

// POST Route for a new note
app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id:uuidv4(),
    };
   
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
