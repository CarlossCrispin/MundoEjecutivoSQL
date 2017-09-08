/*var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');
var Vue = require('vue');

//const panels = document.querySelectorAll('.panel');
module.exports = {

    getSignUp : function(req,res,next){
        return res.render('users/signup');
    },
    postSignUp: function(req,res,net){
        console.log(req.body);
       
        //creando variable de encriptacion
        var salt = bcrypt.genSaltSync(10)
        var password = bcrypt.hashSync(req.body.password, salt);
        var user = {
            email : req.body.email,
            nombre : req.body.nombre,
            password : password,
            password1 : req.body.password,
            img:src=('../images/avatar.png')

        };
         //pasamos la configuracion de la base de datos
         var config = require('.././database/config');
         //creamos la coneccion a la base de datos 
         var url = config.url;
         console.log(`> BD: ${url}`);
         //insertamos los datos 
         mongo.connect(url, function (err, db) {
             if (err) throw err
             var collection = db.collection('Users')
             collection.insert(user, function (err, data) {
                 if (err) throw err
                 console.log(JSON.stringify(user))
                 db.close()
             });
         });
         //cuando se registre muestra mesj flash
        req.flash('info','Se ha registrado correctamente, ya puede iniciar sesión ');
         return res.redirect('/auth/signin');
    },
    getSignIn: function(req, res , next){
        return res.render('users/signin',{ message: req.flash('info'), authmessage : req.flash('authmessage')});
    },
    logout : function(req, res, next){
        req.logout();
        res.redirect('/auth/signin');
    },
    getUserPanel : function(req,res,next){
        res.render('users/panel',{
            isAuthenticated: req.isAuthenticated(),
            user : req.user
        });
    },
    getShowUser1 : function(req, res, next){
        res.render('users/showUser',{
            isAuthenticated: req.isAuthenticated(),
            user : req.user
        });
    },
    getShowUser: function (req, res, next) {
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
        mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find().toArray(function (err, documents, fields) {
                if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
                console.log(JSON.stringify(documents));
                //se cierra la conexion a la base de datos

                console.log('lo que envia de items');
                //) console.log (`${items}`);
                db.close();
                res.render('users/showUser', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: documents
                });
            });
        });
    }
   /* upImgUser: function(req, res, next){
        var config = require('.././database/config');
        console.log("-----------------------");
           mongo.connect(config.url, function (err, db) {
               if (err) {
                   return console.error(err)
               }
               //accedo a la coleccion con parrots 
               db.collection('Users').find({
                   email: email}).toArray(function (err, documents, fields) {
                    if (err) throw err;
                    
                   //se imprimen los documentos encontrados 
                   console.log(documents)
                   //se cierra la conexion a la base de datos
                   db.close();
                   if(documents.length > 0){
                       var user = documents[0];
                       if(bcrypt.compareSync(password, user.password)){
                           return done(null,{
                               _id : user._id,
                               nombre : user.nombre
                           });
                       }
                   }
                  
               });
           });

    }
    getTable: function(req, res, next){
        res.render('users/showTable', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },
    getGrafic1: function(req, res, next){
        
        res.render('users/showGrafic1', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    }
};
*/
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {

	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},

	postSignUp: function(req, res, next){
		
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		var user = {
			email : req.body.email,
			nombre : req.body.nombre,
			password : password,
            img:src=('../images/per.jpg')
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO users SET ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});
		req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
		return res.redirect('/');
	},

	getSignIn: function(req, res, next){
		return res.render('/', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	logout : function(req, res, next){
		req.logout();
		res.redirect('/');
	},

	getUserPanel : function(req, res, next){
		res.render('users/panel', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	},
    getShowUser: function (req, res, next) {
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var db = mysql.createConnection(config);
        console.log(`> BD: ${db}`);
        db.connect();
        db.query('select * from users',function(err,rows,fields){
            if(err) throw err;

            db.end();
            res.render('users/showUser', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                items: rows
            });
        })
    },
    getTable: function(req, res, next){
        res.render('users/showTable', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },
    getGrafic1: function(req, res, next){
        
        res.render('users/showGrafic1', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    }   


};