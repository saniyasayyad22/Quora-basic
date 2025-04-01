const { randomUUID } = require("crypto");
const express=require("express");
const app=express();
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
const port=8080;
const path=require("path");
app.set("view engin","ejs");
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
const { v4: uuidv4 } = require('uuid');

let posts=[
    {   id:uuidv4(),
        username:"apnacollege",
        content:"conding matlab apna college",
    },
    {   id:uuidv4(),
        username:"shraddhakhapra",
        content:"hard work proves road of success",
    },
    {   id:uuidv4(),
        username:"rahulkumar",
        content:"got selected for my 1st internship today",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("id.ejs",{post});
})
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("listen request");
});