const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/phosphorylation-sites', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'sample-data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    let sites = JSON.parse(data).phosphorylation_sites;
    const { protein } = req.query;
    if (protein) {
      sites = sites.filter(site => site.protein === protein);
    }
    res.status(200).json(sites);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});