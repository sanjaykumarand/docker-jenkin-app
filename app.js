const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello Hi, I am Sanjay Kumaran <br> I am doing Cloud Computing Intern Project <br> Connection of Jenkins + Docker + Github<br>Sample Website<br>Successfully Connected</h1>');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
