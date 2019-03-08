const express=require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
app.use('/', express.static('./public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*app.get('/',function(req,res){
	db.insertMany(function(data){
		res.send(data);
});*/
app.get('/todo',function(req,res){
	db.insertOne(req.query.task,function(){
		res.sendStatus(200);
	});
})
app.get('/todoList',function(req,res){
	db.returnData(function(data){
		console.log(data);
		let val=[];
		for(let i=0;i<data.length;i++)
			val[i]=data[i].value;
		res.send(val);
	})
})
app.post('/del',function(req,res){
	db.DelData(req.body.name,function(){
		res.sendStatus(200);
	})
})
app.post('/update',function(req,res){
	db.UpdateOne(req.body.name,req.body.value,function(){
		res.sendStatus(200);
	})
})
app.listen(5000,function(){
	db.connect();
	console.log('Running On 5000');
})