
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
            //revisar sql en la nube
            //password : password,
            password : req.body.password,
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
            db.query('DESCRIBE `ranking_2016`',function(err,rows2,fields){
                if(err) throw err;
            db.end();

            console.log("----------------------------------------------");
            console.log(" rows2 --> encabezado");
            console.log(JSON.stringify(rows2));
            console.log("************************************************");
            console.log("----------------------------------------------");
            console.log(" rows --> valores");
            console.log(JSON.stringify(rows));
            res.render('users/showTable', {
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                items: rows,
                items2: rows2
            });
           }) 
           
       })
    },
    getGrafic: function(req, res, next){
        
        //pasamos la configuracion de la base de datos
       var config = require('.././database/config');
       //creamos la coneccion a la base de datos 
       var db = mysql.createConnection(config);
       console.log(`> BD: ${db}`);
       
       db.connect();
       db.query('select * from ranking_2016 where Empresa="OXXO" OR Empresa="Alfa"',function(err,rows,fields){
            if(err) throw err;
            db.query('DESCRIBE `ranking_2016`',function(err,rows2,fields){
                if(err) throw err;
            db.end();
            console.log("************************************************");
            console.log("----------------------------------------------");
            console.log(" rows --> valores");
            console.log(JSON.stringify(rows));
            res.render('users/showGrafic', {
                
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                items: rows,
                items2:rows2
            });
        })
           
       })
        
    },
    getGrafic1: function(req, res, next){
        
        //pasamos la configuracion de la base de datos
       var config = require('.././database/config');
       //creamos la coneccion a la base de datos 
       var db = mysql.createConnection(config);
       console.log(`> BD: ${db}`);
       
       db.connect();
       db.query('select * from ranking_2016 where Sector="Comercio"',function(err,rows,fields){
            if(err) throw err;
            db.query('DESCRIBE `ranking_2016`',function(err,rows2,fields){
                if(err) throw err;
            db.end();
            console.log("************************************************");
            console.log("----------------------------------------------");
            console.log(" rows --> valores");
            console.log(JSON.stringify(rows));
            res.render('users/showGrafic1', {
                
                isAuthenticated: req.isAuthenticated(),
                user: req.user,
                items: rows,
                items2:rows2
            });
        })
           
       })
        
    },
    getUser: function(req, res, next){
       
        res.render('users/user', {
                   
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    } 


};