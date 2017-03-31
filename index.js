import express from 'express';
import app from './app';


// load the single view file (angular will handle the page changes on the front-end)
app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.use('/vendor', express.static('public/vendor'));
app.use('/src', express.static('public/src'));
app.use('/partials', express.static('public/src/partials'));

app.listen('7000');
