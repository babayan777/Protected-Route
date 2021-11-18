import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import { Link, useHistory } from 'react-router-dom';
import { HomeContext } from '../App';


function Login() {
    const history = useHistory();
    const {handleSetToken} = useContext(HomeContext);


    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const [userError,setUserError] = useState(false);
    const [passError,setPassError] = useState(false);

    const loginValidate = (e) => {
        e.preventDefault();
        if(username.length < 3){
            setUserError(true);
            setUsername("")
        }
        else{
            setUserError(false);
        }

        let passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/);
        if(!passwordRegex.test(password)){
            setPassError(true);
            setPassword("");
        }
        else{
            setPassError(false);
        }
             fetch('/token')
                .then(resp => resp.json())
                .then((data) => {
                    handleSetToken(data.token)
                    history.push('/')
                })
                .catch((err) => {
                    console.log(err);
                })
    }

    return (
        <div style={{width:"100%",height:'100vh'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', width:'400px', height:'100vh',margin:'0 auto'}}>
                    <TextField  label="Username" variant="standard" error={userError} value={username} onChange={e => setUsername(e.target.value)}/>
                    <Box component="span" sx={{ color: 'red', marginTop:'10px'}}>{userError  ? 'Username must be more than 3' : ''}</Box>
                    <TextField  label="Password" type="password" variant="standard" error={passError} style={{marginTop:'30px'}} value={password} onChange={e => setPassword(e.target.value)} />
                    <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{passError  ? 'Password is invalid' : ''}</Box>
                    <Button color="primary" variant="contained" style={{marginTop:'30px'}} onClick={loginValidate}>Login</Button>
                    <Link to='/register' style={{textDecoration:'none'}}><Button variant="outlined" style={{marginTop:'30px',width:'100%'}}>Register</Button></Link>
                </Box>
        </div>
    )
}

export default Login
