import React, { useState } from "react"
import "./signup.css";
import axios from "axios"
import { useHistory } from "react-router-dom"
    

const SignUp = () => {

    const history = useHistory()
    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
      
    })
         
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const register = () => {
        const { name, email, password } = user
        if( name && email && password){
            axios.post("http://localhost:9002/signup", user)
            .then( res => {
                alert(res.data.message)
                history.push("/login")
            })
        } else {
            alert("invalid input")
        }
        
    }

    return (
        <div className="signup">
            <h1>Name</h1>
            <input type="text" name="name"  onChange={handleChange} value={user.name} ></input>
            <h1>Email</h1>
            <input type="text" name="email" value={user.email}  onChange={handleChange}  ></input>
            <h1>Password</h1>
            <input type="password" name="password" value={user.password}  onChange={handleChange}  ></input>
            <div className="button" onClick={register}>SIGNUP</div>
            
            {/* <div className="button"  onClick={() => history.push("/login")} >LOGIN</div> */}
        </div>
    )
    
}
export default  SignUp
