const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
const path = require('path');
const dbURL = 'mongodb+srv://admin:admin@cluster0.lc6up.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(dbURL);
const USER = mongoose.model('Users', 
    { 
    fullName: String,
    email: String,
    password: String,
    address: String,
    created: {
        type: String,
        default: Date.now
    }
    }
);
const POST = mongoose.model('Posts', 
    { 
    email: String,
    post: String,
    created: {
        type: String,
        default: Date.now
    }
    }
);
app.use(express.json());

app.use('/',express.static(path.join(__dirname, 'web/build')));


app.post('/api/v1/signup', (req, res)=>{
    if(!req.body.email || !req.body.fullName || !req.body.address){
        console.log("Field is missing");
        res.status(403).send("field is missing");
    }
    else{
        USER.findOne({email: req.body.email}, (err, email)=>{
            if(err){
                res.status(500).send("error in getting database");
            }
            else if(email){
                res.status(403).send('email already exist');
            }
            else{
                let newUser = new USER(
                    {
                        fullName: req.body.fullName,
                        email: req.body.email,
                        password: req.body.password,
                        address: req.body.address
                    }
                );
                newUser.save(()=>{
                    console.log('data saved, profile has been created')
                    res.send('profile has been created');   
                })
            }
        })
       
    }
    
    
});

app.post('/api/v1/profile', (req, res)=>{
    const email = req.body.email;
    USER.find({email: email},(err, data)=>{
        if(err){
            res.send('status 500, error in getting data base')
        }
        else{
            res.send(data)
        }
    })
});

app.post('/api/v1/login', (req, res)=>{
    if(!req.body.email || !req.body.password) {
        console.log('email and password is required');
        res.status(403).send("required field is missing");
    }
    else{
        USER.findOne({email: req.body.email}, (err, user)=>{
            if(err){
                res.status(500).send("error in getting database");
            }
            else{
                if(user){
                    if(user.password === req.body.password){
                        res.send(user);
                    }
                    else {
                        res.status(401).send("Authentication Failed");
                    }
                }
                else{
                    res.send("user not found")
                }
            }
        })
    }
});

app.post('/api/v1/post',(req,res)=>{
    let Post = req.body.post;
    let Email = req.body.email;
    let newPost = new POST(
        {
            email: Email,
            post: Post
        }
    )
    newPost.save(()=>{
        console.log('data saved, profile has been created')
        res.send('Post has been created');   
    })
})

app.get('/api/v1/getpost',(req,res)=>{
    POST.find({},(err,posts)=>{
        if(err){
            res.status(500).send('error occured in getting data')
        }
        else{
            if(posts){
                res.send(posts)
            }
        }
    })
})
app.get("/**", (req, res, next) => {
    // res.sendFile(path.join(__dirname, "./web/build/index.html"))
    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`);
}); 