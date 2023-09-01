const bodyParser = require("body-parser");
const express = require("express");
const Date = require(__dirname+"/date.js")
const mongoose = require("mongoose");
const app = express();
const items=[];
mongoose.connect("mongodb://localhost:27017/todoListDb");



app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended:true})) 

app.use(express.static("public"))
const itemSchema={
  name:String,
};
const CreateItem=mongoose.model('Item',itemSchema);
 
const item1=CreateItem({
  name:"Welcome to your todoList"
})

const item2=CreateItem({
  name:"Hit the + button to add new item"
})

const item3=CreateItem({
  name:"<--Hit this to delete an item"
})

const defaultitems=[item1,item2,item3];

app.get("/",(req,res)=>{
  let day=Date();
 

async function finditems() {
  try {
    const foundItem = await CreateItem.find();
    if(foundItem.length===0){
      CreateItem.insertMany(defaultitems);
      res.redirect("/");
    }
    else{
      res.render("hello",{listTitle:day,newItem:foundItem})
    }
        
} catch (err) {
    console.error(err);
  }
}
finditems();


})






app.post("/", async (req, res) => {
  
    const newItemName = req.body.newItem;
    const itemMake = new CreateItem({
      name: newItemName,
    })
    await itemMake.save();
    res.redirect("/");
 
});

app.post("/delete",async (req,res)=>{
    const itemDelete=(req.body.newDelete);
  await  CreateItem.findByIdAndRemove(itemDelete);
    res.redirect("/");
})


app.listen("3000",()=>{
    console.log("Hello World");
})