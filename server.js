var express = require('express');
var app = express();

// Request to root
app.get('/', (req, res) => {
    res.send('<b>My</b> first express http server');
});

app.get('/welcome', (req, res) => {
    res.send('<b>Hello, welcome</b> to my express http server');
});

app.use((req, res, next) => {
    res.status(404).send('Sorry, the route doesn\'t exist');
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});