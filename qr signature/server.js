const express = require('express')
const app = express()
const port = 3000
crypto = require("crypto")
var QRCode = require('qrcode')
require('dotenv').config()

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

let privateKey = "-----BEGIN PRIVATE KEY-----\n" +
    "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5ZOps3dIcSo+V\n" +
    "6WhyXe6BwI52VnhrzB6l2y5AQ8kU8m0BY4kenyFJQzmY18jyMJIQOpbide9HhYNY\n" +
    "AoBCipcGiYaPe6aqPS8kG1ZOKb1Uv0EuDMgPHU9hhUogziFkSEaEGBo0Y1gilfyN\n" +
    "eZtgdLVXLc9ds3TtKf+MVh0tYBVNiJUk5quBc1TMac4I7bqPyZo2SOos+P24bpBY\n" +
    "nSFQVeejoIzrBYSdLzpei7lixSKhNS8jHz6kc4fcDNJwKm6yISlNoCPgHEg8NMVB\n" +
    "E8RA1NKnslCf7E2e1ImQY5nM9COe1FxQIqTWR1SWtdp318vqGk677bBRMz5BMq9N\n" +
    "fa4/g/S/AgMBAAECggEBAJEYLOw1Esq3g/akrOzNHOwJorV06VwcbWQKzQDYzFgL\n" +
    "f0pV9yuzCN8IsNwxDYCWiMoQwKPN/w3vrSLFGlJ5mscv/NLwyDh2GB3fE0WrHxVj\n" +
    "dYSv1icWHllJcwGHsdSFSEL7hg64LXMsBXNH2FW+IWpwXNmNqJYwh2LyxnULvMBn\n" +
    "LmRV6HjD8k83f2W2pZkNfzc7GY47qqa7O8Hrp6igcVauCdaq0CsTes0oAreN3u5b\n" +
    "Woon5T8wisInf3ZBCn+Xo8G7nDF+mtenRNHEF5fbjwAJhO55zKN7JK84A/JNQGic\n" +
    "yn0CuOP8ZElqp1X8OlzSvGJHPuQY4NiCC6Y4q6O4cokCgYEA4raWnnfSQcs5HkCh\n" +
    "diAJB0lftt8pUnP6gSUMe9LacFgnF+HBLABUEOPz+gscBt6gsxeqTfQnKIWegEt3\n" +
    "Oe+uN2uj2k2yCzMPnbgKFWbUtWC3d7c+LlrYNVZydvTRedGzVnWWovNL+NGZWe8T\n" +
    "EBUHMFipOiwMrZCpJKxDqLsz6J0CgYEA0Vfn8SJDaQvAm5edPeok7Jo3YeynHJbI\n" +
    "WN1fBEpOx9TA6Z7Wf0jXmVY+SX0zb2Z46LlbBO1hfXm/NDuWOpS/4aE5SMr0nF1w\n" +
    "k/jvNApDj2lTg84g8o27Dd/jdGC2MAIoo4oYBiVB9i0ugZ5/PtgeaFijXzlhfujF\n" +
    "2oGpQSnz7gsCgYAtdJZ2Z2fMsUZefm7hFEM7Jsb+D3hlg8NyKU97dCc/5yzPaQAm\n" +
    "Jlq0mD/OnnOcHP7zaYdH4fAH++JvrrHU9+1iRz6vAmz0OeSjpsa+y8NSKnYelqrs\n" +
    "+GHpL8/7cdKeLiFa8HCnc0iENuIcWgbkbpLmaqBjfXl9Q0fmhnN6XS5nMQKBgHOz\n" +
    "Lvjho/ohybD0ya4Xg5LU5PkVL4MoftBGgSZA32uoVXqJFCnDG42e0cwSC2RtcTPG\n" +
    "hdyiSfhsWlXG/Q+heK9+SMfHjAwDxJ2zvpi3d4GCh+rX+PO1i4VukSqX7Pl5p/ZC\n" +
    "82YqH1usuwBelhsonR20p46Qiyb2Bavvb5kZU7zjAoGBAJXuEhIugdzWqWTTCKHQ\n" +
    "qP1b8vaeOzc/5HLJg8x7FIMi/SpdJ2pIEmtxZmWafNr6VcC51UqckgQxGiWcN2ic\n" +
    "0dZonitEvyIbIzOmbC0t2VNHrDYyyrZjmA9xbaqvN1mMWOgKsoLfEdxZYNd0vCoM\n" +
    "qx1bWsNFsRsjoxbXs5pehY30\n" +
    "-----END PRIVATE KEY-----"

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'));

app.post("/sign", (req, res) => {
    let data = req.body["data"]

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });

    let token = jwt.sign(data, privateKey, {
        algorithm: "RS256"
    });

    //TODO: save publicKey in DB

    QRCode.toDataURL(token, function (err, url) {
        let base64Data = url.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
            if (err != null){
                console.log(err);
            }
        });
    })
})

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