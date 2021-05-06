var express = require('express');
var bcrypt = require('bcrypt');
var jwtUtils = require('./utils/jwt.utils');

var router = express.Router();
var mongoose = require('mongoose')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.json(await mongoose.model('User').find());
});
router.post('/', async function(req, res, next) {
  //params
  const {username, password,confirmPassword} = req.body;

  if(username === "" || password === "") {
    return res.status(400).json({'error': 'Veuillez remplir tous les champs obligatoires'});
  }
  if(confirmPassword !== password) {
    return res.status(400).json({'error': 'Les mots de passe ne correspondent pas'});
  }

  // verifications
  mongoose.model('User').find({
    username: username
  })
      .then(function(userFound) {

        if(userFound.length === 0) {
          bcrypt.hash(password, 5, function(err, bcryptedPassword){
            var newUser = mongoose.model('User').create({
              username: username,
              password: bcryptedPassword,
            })
                .then(function(newUser) {
                  return res.status(201).json({
                      "success": "L'utilisateur a bien été enregistré. Connectez vous",
                    'userId' : newUser.id
                  })
                })
                .catch(function(err) {
                  return res.status(500).json({'error' : "Nous n'avons pas réussi à vous ajouter. Veuillez réessayer ultérieurement"});
                })
          });
        }else {
          return res.status(409).json({'error' : "Ce pseudo est déjà utilisé"});
        }
      })
      .catch(function(err) {
        return res.status(500).json({'error': 'unable to verify the user'});
      });
});

router.put('/:id', async function(req, res, next) {
  res.json(await mongoose.model('User').findByIdAndUpdate(req.params.id,req.body));
});
router.delete('/:id', async function(req, res, next) {
  res.json(await  mongoose.model('User').findByIdAndDelete(req.params.id));
});
router.get('/:id', async function(req, res, next) {
  res.json(await mongoose.model('User').findById(req.params.id));
});

router.post('/login', async function(req,res,next){
  const username = req.body.username;
  const password = req.body.password;

  if(username == null || password == null) {
    return res.status(400).json({'error' : 'Veuillez remplir les champs'});
  }

  mongoose.model('User').find({
    username: username
  })
      .then(function(userFound){
        if (userFound.length > 0) {
          bcrypt.compare(password, userFound[0].password)
              .then( response => {
                if(response) {
                  return res.status(200).json({
                    'data' : userFound[0],
                    'token' : jwtUtils.generateTokenForUser(userFound[0])
                  });
                } else {
                  return res.status(403).json({'error' : 'Mot de passe incorrect'});
                }
              })
              .catch(error => {
                return res.status(400).json({'error': "Cet utilisateur n'existe pas"});
              })
      }})
      .catch(function(err) {
        return res.status(500).json({'error': 'unable to verify user'});
      });
})

router.get('/:id/channels', async function(req, res, next) {
    res.json(await mongoose.model('Channel').find({user: req.params.id}));

});

module.exports = router;
