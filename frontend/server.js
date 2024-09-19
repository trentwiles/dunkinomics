const express = require('express')
const app = express()
const port = 8392

app.use(express.static('static'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index.ejs", {title: "Dunkinomics"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})