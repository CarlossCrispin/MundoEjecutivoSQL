
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

    getUserPanel : function(req, res, next)
    {
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
       
        
        
       //pasamos la configuracion de la base de datos
       var config = require('.././database/config');
       //creamos la coneccion a la base de datos 
       var db = mysql.createConnection(config);
       console.log(`> BD: ${db}`);
       db.connect();
       db.query('select * from ranking_2016',function(err,rows,fields){
           if(err) throw err;

           db.end();
           res.render('users/showTable', {
               isAuthenticated: req.isAuthenticated(),
               user: req.user,
               items: rows
           });
       })
    },
    getGrafic1: function(req, res, next){
        
        
        res.render('users/showGrafic1', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },
    getUser: function(req, res, next){
       
        res.render('users/user', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    } 


};