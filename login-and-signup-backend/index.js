import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginSignUpDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
   console.log("DB connected")
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})
const User = new mongoose.model("User", userSchema)

//routes
app.post("/login", (req, res)=>{
    const { name, email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password) {
               res.send({message: "Login Successful", user:user})
            } else {
                res.send({ message: "Invalid credentials"})
            }
        } else {
            res.send("Email Doesn't Exist")
        }
    })
})
app.post("/signup", (req, res)=>{
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "user already registered"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save( err => {
                if( err){
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Signup"})
                }
            })

        }
    })
   
})
app.listen(9002,()=> {
    console.log("BE started at port 9002")
})

