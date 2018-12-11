const router = require('express').Router();
const nodemailer = require("nodemailer");
const passport = require('passport');

router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/logout',(req,res)=>{
    res.send("logging out");
})

router.get('/register',(req,res)=>{
    res.render("register")
})

router.post('/register',function(req,res){
    let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user: 'abc@xyz.com', // enter your mail here
            pass: 'heADBFI3Lkjn' // enter your password here
        }
    })

    let mailoptions = {
        from: 'abc@xyz.com', // senders Mail here
        to: req.body.email,
        subject: 'Sample Email',
        text: 'I am fro sample mail',
        html: `<b> i am sending link click on it and verify </b>`
    }

    transporter.sendMail(mailoptions,function(err,success){
        if(err){
            console.log("Error Occured")
        }
        else{
            console.log("mail sent successfully");
            res.render("login")
        }
    })
})

router.get('/github',passport.authenticate('github',{
    scope:['profile']
}))

router.get('/github/callback',passport.authenticate('github'),(req,res)=>{
    res.send("I am from redirect URI");
})

module.exports= router;