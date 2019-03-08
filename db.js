const mongoClient=require('mongodb').MongoClient;
const url='mongodb://localhost:27017';
const dbname='shoppingCart';
let database='';
let count=0;
function connect(){
	mongoClient.connect(url,function(err,client){
		database=client.db(dbname);
	})
}
/*function insertMany(cb){
	let cart= database.collection('todos');
	cart.insertMany([
		{apple:4},
		{mango:9},
		{kiwi:20}
	],function(err,data){
		if(err)throw err;
		cb(data);
	})
}*/
function insertOne(val,cb){
	let cart=database.collection('todo');
	cart.insertOne(
		{value:val,id:count}
	,function(err,data){
		if(err)throw err;
		cb();
		console.log(data);
	})
	count++;
}
function returnData(cb){
	let cart=database.collection('todo');
	cart.find({}).toArray(function(err,data){
		if(err)throw err;
		cb(data);
	})
}
function DelData(name,cb){
	let cart=database.collection('todo');
	cart.deleteOne({value:name},function(err,result){
		if(err)throw err;
		cb();
		console.log(name);
		console.log(' Deleted');
	})
}
function UpdateOne(name,val,cb){
	let cart=database.collection('todo');
	cart.updateOne({value:name},{$set:{value:val}},function(err,data){
		if(err)throw err;
		cb();
	})
}
module.exports={
	connect,
	insertOne,
	returnData,
	DelData,
	UpdateOne
}