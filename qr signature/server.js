const express = require('express')
const app = express()
const port = 3000

var jwt = require('jsonwebtoken');

let publicKey = "-----BEGIN PUBLIC KEY-----\n" +
    "NIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuWTqbN3SHEqPlelocl3u\n" +
    "gcCOdlZ4a8wepdsuQEPJFPJtAWOJHp8hSUM5mNfI8jCSEDqW4nXvR4WDWAKAQoqX\n" +
    "BomGj3umqj0vJBtWTim9VL9BLgzIDx1PYYVKIM4hZEhGhBgaNGNYIpX8jXmbYHS1\n" +
    "Vy3PXbN07Sn/jFYdLWAVTYiVJOargXNUzGnOCO26j8maNkjqLPj9uG6QWJ0hUFXn\n" +
    "o6CM6wWEnS86Xou5YsUioTUvIx8+pHOH3AzScCpusiEpTaAj4BxIPDTFQRPEQNTS\n" +
    "p7JQn+xNntSJkGOZzPQjntRcUCKk1kdUlrXad9fL6hpOu+2wUTM+QTKvTX2uP4P0\n" +
    "vwIDAQAB\n" +
    "-----END PUBLIC KEY-----"

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'));

app.post('/verify', (req, res) => {
    let data = req.body["data"]

    payload = jwt.decode(data)

    console.log(payload)

    let result = jwt.verify(data, publicKey, {
        algorithm: 'RS256'
    }, function(err, decoded) {
        if (err !== undefined){
            console.log("error")
        }
    });

    if (result !== undefined) {
        console.log(result)

        res.send('Hello World!')
    }else{
        res.send('error')
    }


})

app.get("/", (req, res) => {
    res.sendFile('index.html', {root: __dirname});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})