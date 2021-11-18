import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import { Link,useHistory } from 'react-router-dom';

function Register() {

    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const [emailError,setEmailError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [confirmError,setConfirmError] = useState(false);
    const history = useHistory();

    const onRegister = () => {
        let emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(!emailRegex.test(email)){
            setEmailError('Email is invalid');
            setEmail('')
        }
        else{
            setEmailError(true)
        }
        // Password
        let passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/);
        if(!passwordRegex.test(password)){
            setPasswordError("Password is invalid");
            setPassword('')
        }
        else{
            setPasswordError(true)
        }
        // Confirm Password
        if(password !== confirmPassword){
            setConfirmError("Passwords don't match");
            setConfirmPassword('')
        }
        else{
            setConfirmError(true)
        }

        //register

        
        if(emailError && passwordError && confirmError){
        fetch('/registration',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email:email,
                password:password,
                username:username,
                firstName:firstName,
                lastName:lastName,
            })
        })  
            .then((resp) => console.log("OK"))
            .catch((err) => console.log(err))
     }
        history.push("/")
    }
    return (
        <div style={{width:"100%",height:'100vh'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', width:'400px', height:'100vh',margin:'0 auto'}}>
                <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={e=> setEmail(e.target.value)} />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{emailError}</Box>
                <TextField id="standard-basic" label="Username" variant="standard" style={{marginTop:'30px'}} onChange={e=> setUsername(e.target.value)} />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}></Box>
                <TextField id="standard-basic" label="First Name" variant="standard" style={{marginTop:'30px'}} onChange={e=> setFirstName(e.target.value)}/>
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}></Box>
                <TextField id="standard-basic" label="Last Name" variant="standard" style={{marginTop:'30px'}} onChange={e=> setLastName(e.target.value)}/>
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}></Box>
                <TextField id="standard-basic" label="Password" type="password" variant="standard" style={{marginTop:'30px'}} onChange={e=> setPassword(e.target.value)}  />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{passwordError}</Box>
                <TextField id="standard-basic" label="Confirm Password" type="password" variant="standard" style={{marginTop:'30px'}} onChange={e=> setConfirmPassword(e.target.value)} />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{confirmError}</Box>
                <Button onClick={onRegister} color="primary" variant="contained" style={{marginTop:'30px'}}>Register</Button>
                <Link to='/' style={{textDecoration:'none'}}><Button variant="outlined" style={{marginTop:'30px',width:'100%'}}>Back To Login</Button></Link>
            </Box>
        </div>
    )
}

export default Register
