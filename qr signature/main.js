var QRCode = require('qrcode')
require('dotenv').config()

crypto = require("crypto")

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

var jwt = require('jsonwebtoken');


function verify(){

}


function createQR(data){
    let token = jwt.sign(data, privateKey, {
        algorithm: "RS256"
    });

    QRCode.toDataURL(token, function (err, url) {
        let base64Data = url.replace(/^data:image\/png;base64,/, "");
        require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
            if (err != null){
                console.log(err);
            }
        });
    })
}

//console.log(publicKey)


content = {

}

createQR(content)
