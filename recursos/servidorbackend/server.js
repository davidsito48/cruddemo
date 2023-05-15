var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(cors({origin:"http://localhost:4200"}));

/*
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});
*/

app.get('/',function(req,res){
	return res.send({message:'Hola k paza'});
});

var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'48840',
	database:'escuela'
});

conn.connect();

app.get('/alumno', function(req,res){
	conn.query('select * from alumno',function(error,result,fields){
		if(error) throw error;
		return res.send({
			status:'ok',
			data:result
		});
	});
});

app.get('/alumno/:id',function(req,res){
	let id = req.params.id;
	if(!id){
		return res.status(400).send({
			status:'error',
			message:'id invalido'
		});
	}
	conn.query('select * from alumno where id = ?',id,function(error,result,fields){
		if(error) throw error;
		return res.send({
			status:'ok',
			data:result
		});
	})
});

app.post('/alumno',function(req,res){
	let alumno = mysql.escape(req.body);
	if(!alumno) return res.status(400).send({
		status:'error',
		message:'el alumno no puede estar vacio'
	})
	var query = 'insert into alumno set ' + alumno;
	conn.query(query,function(error,result,field){
		if(error) throw error;
		return res.send({
			status:'ok',
			data:result,
			message:'alumno agregado'
		});
	});
});

app.put('/alumno',function(req,res){
	let id = req.body.id;
	let alumno = req.body;
	if(!alumno && !id) return res.status(400).send({
		status:'error',
		message:'el alumno no puede estar vacio'
	})
	conn.query('update alumno set ? where id = ?',[alumno,id],function(error,result,field){
		if(error) throw error;
		return res.send({
			status:'ok',
			data:result,
			message:'alumno actualizado'
		});
	});
});

app.delete('/alumno/:id',function(req,res){
	let id = req.params.id;
	if(!id) return res.status(400).send({
		status:'error',
		message:'el alumno no puede estar vacio'
	})
	conn.query('delete from alumno where ?',{id},function(error,result,field){
		if(error) throw error;
		return res.send({
			status:'ok',
			data:result,
			message:'alumno eliminado'
		});
	});
});


app.listen(3000,function(){
	console.log('corriendo servidor');
});

module.exports=app;
