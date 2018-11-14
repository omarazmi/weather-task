const express = require('express'),
    app = express(),
    template = require('./views/template'),
    path = require('path');


// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 2000);

let initialState = {
    
}

const getInfo = (city) => {
    const apiUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    return new Promise((resolve, reject) => {
        request(apiUrl, (err, res, body) => {
            if (err) {
                const errorMessage = 'weather request promise rejected';
                return reject(new Error(errorMessage));
            }
            return resolve(JSON.parse(body));
        });
    });
}

//SSR function import
const ssr = require('./views/server');

// server rendered home page
app.get('/', (req, res) => {
    ssr(initialState).then((resp) => {
        const response = template("Server Rendered Page", resp.preloadedState, resp.content);
        res.setHeader('Cache-Control', 'assets, max-age=604800')
        res.send(response);
    })
});

// Pure client side rendered page
app.get('/client', (req, res) => {
    let response = template('Client Side Rendered page')
    res.setHeader('Cache-Control', 'assets, max-age=604800')
    res.send(response);
});

// tiny trick to stop server during local development

app.get('/exit', (req, res) => {
    if (process.env.PORT) {
        res.send("Sorry, the server denies your request")
    } else {
        res.send("shutting down")
        process.exit(0)
    }
});