const express=require("express");
const app =express();
const port=8000;
const path=require("path");
const {v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
     username:"mycollege",
    content:"abcd",
    },
    {
        id:uuidv4(),
    username:"yourcollege",
    content:"xyz",
    },
    {
        id:uuidv4(),
        username:"mycollege",
       content:"abcd",
    },
    {
        id:uuidv4(),
       username:"yourcollege",
       content:"xyz",
    },
];
app.get("/",(req,res)=>{
    res.send("welcome to quora page click on posts for the posts");
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts:posts});
});
app.get("/posts/new",(req,res)=>{
   res.render("new.ejs");
  
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if (!post) {
        // Handle the case where the post is not found
        return res.status(404).send("Post not found");
    }
    
    res.render("show.ejs",{post});
});
app.post("/posts",(req,res)=>{
   let {username,content}=req.body;

   let id=uuidv4();
   posts.push({id,username,content});
   
    res.redirect("/posts");
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id)
    post.content=newcontent;
    console.log(newcontent);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
   let post=posts.find((p)=>id===p.id)
   res.render("edit.ejs",{post});

});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
   posts=posts.filter((p)=>id !==p.id)
   res.redirect("/posts");

});

app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);
})