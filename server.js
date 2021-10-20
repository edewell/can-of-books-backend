'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUrl = 'https://dev-1zgmazj3.us.auth0.com/.well-known/jwks.json'
});
app.use(cors());

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key){
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const PORT = process.env.PORT || 3000;

app.get('/test', (request, response) => {
const token = request.headers.authorization.split(' ')[1];
console.log(`JWT: ${token}`);
jwt.verify(token, getKey, {}, function(err, user){
  if(err){
    response.send(invalid);
  } else {
    response.send(user);
  }
})

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
