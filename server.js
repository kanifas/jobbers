const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));