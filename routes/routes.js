const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/" , (req,res)=>{
    User.find().exec((err,users) =>{
        if(err){
            // alert("Some error has occured");
            console.log("Some error has occured");
        }
        else{
            res.render("home",{
                title:"Home Page",
                users : users
            });
        }
    });
})

router.get("/add" , (req,res)=>{
    res.render("add" , {title : "Add User Page"});
});


//add user
router.post("/add" , (req , res)=>{
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,        
    });
    user.save((err)=>{
        if(err){
            //heare alert will not work system will crash
            //alert("Some error occured");
            console.log("Some error occured");
        }
        else{
            // alert("hello")
            //console.log("User added successfully");
        }
        res.redirect("/");
    })
})
router.get("/contact" , (req,res)=>{
    res.render("contact" , {title:"Contact Page"})
})


//edit useer route
router.get("/edit/:id" , (req , res )=>{
    let id = req.params.id;
    User.findById(id , (err , user)=>{
        if(err){
            res.redirect("/");
        }
        else{
            if(users = null){
                res.redirect("/");
            }
            else{
                res.render("update" , {
                    title: "Update User",
                    user : user
                })
            }
        }
    })
})


//update route
router.post("/update/:id" ,(req , res) =>{
    let id = req.params.id;

    User.findByIdAndUpdate(id,{
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
    },
    (err,updated_info)=>{
        if(err){
            console.log(err)
        }
        else{
            //console.log("updated succssfully");
            res.redirect("/");
        }
    })
})

//delete route
router.get("/delete/:id" , (req,res)=>{
    let id = req.params.id;
    User.findByIdAndRemove(id , (err , result)=>{
        res.redirect("/");
    })
})
module.exports = router;