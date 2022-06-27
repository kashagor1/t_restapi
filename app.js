const express = require("express");
const bodyParser =  require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/restAPI');


const articleSchema = {
	name:String , 
	description:String 
};

const newjurnels  = mongoose.model("note",articleSchema);


app.route("/articles")
.get((req,res)=>{
	newjurnels.find({},(err,result)=>{
		res.send(result);
	})
})
.post((req,res)=>{
		const title =  req.body.name;
		const desc =  req.body.description;
		const pos =  new newjurnels({
			name:title,
			description:desc
		});
		pos.save((err)=>{
			if(err){
				res.send(err);
			}else{
				res.send("Data Inserted Successfully");
			}
		});

})
.delete((req,res)=>{
		newjurnels.deleteMany((err)=>{
		if(err){
			res.send(err);
		}else{
			res.send("Deleted Everything");
		}
	});
});





app.route("/articles/:spTitle")
.get((req,res)=>{
	const title =  req.params.spTitle;
	newjurnels.findOne({name:title},(err,foundArticle)=>{
		if(foundArticle){
			res.send(foundArticle);
		}else{
			res.send("Not Found");
		}
	})
})
.put((req,res)=>{
	newjurnels.update(
		{name:req.params.spTitle},
		{name:req.body.title,description: req.body.content},
		
		(err,result)=>{
			if(err){
				console.log(err);
			}else{
				res.send("Successfully Update Article");
			}
	})
})
.patch((req,res)=>{

})
.delete((req,res)=>{

});


/*app.route("/",)
.get((req,res)=>{
})
*/

app.listen(3000,()=>{
	console.log("Server Stated at Port 3000");
});