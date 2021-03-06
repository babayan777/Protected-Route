import React, { useState, useCallback } from 'react'
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
    const [confirmPassword,setConfirmPassword] = useState('');

    const [emailError,setEmailError] = useState(false);
    const [userError,setUserError] = useState(false);
    const [firstNameError,setFirstNameError] = useState(false);
    const [lastNameError,setLastNameError] = useState(false);
    const [passError,setPassError] = useState(false);
    const [confirmError,setConfirmError] = useState(false);

    const [emailHasError,setEmailHasError] = useState(true);
    const [userHasError,setUserHasError] = useState(true);
    const [firstNameHasError,setFirstNameHasError] = useState(true);
    const [lastNameHasError,setLastNameHasError] = useState(true);
    const [passHasError,setPassHasError] = useState(true);
    const [confirmHasError,setConfirmHasError] = useState(true);

    const history = useHistory();

    const emailChange = useCallback(
        (e) => {
            setEmail(e.target.value);
            let emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!emailRegex.test(e.target.value)){
                setEmailError(true);
                setEmailHasError(true);
            }
            else{
                setEmailError(false);
                setEmailHasError(false);
            }
        },
        [email]
    )

    const userChange = useCallback(
        (e) => {
            setUsername(e.target.value);
            if(e.target.value.length < 3){
                setUserError(true);
                setUserHasError(true);
            }
            else{
                setUserError(false);
                setUserHasError(false);
            }
        },
        [username]
    )

    const firstNameChange = useCallback(
        (e) => {
            setFirstName(e.target.value);
            if(e.target.value.length < 3){
                setFirstNameError(true);
                setFirstNameHasError(true);
            }
            else{
                setFirstNameError(false);
                setFirstNameHasError(false);
            }
        },
        [firstName]
    )

    const lastNameChange = useCallback(
        (e) => {
            setLastName(e.target.value);
            if(e.target.value.length < 3){
                setLastNameError(true);
                setLastNameHasError(true);
            }
            else{
                setLastNameError(false);
                setLastNameHasError(false);
            }
        },
        [lastName]
    )

    const passChange = useCallback(
        (e) => {
            setPassword(e.target.value);
            let passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/);
            if(!passwordRegex.test(e.target.value)){
                setPassError(true);
                setPassHasError(true);
            }
            else{
                setPassError(false);
                setPassHasError(false);
            }
        },
        [password]
    )

    const confirmChange = useCallback(
        (e) => {
            setConfirmPassword(e.target.value);
            if(password !== e.target.value){
                setConfirmError(true);
                setConfirmHasError(true);
            }
            else{
                setConfirmError(false);
                setConfirmHasError(false);
            }
        },
        [confirmPassword],
    )

    let isDisabled = !userHasError && !passHasError && !emailHasError && !firstNameHasError && !lastNameHasError && !confirmHasError ? false : true;

    const onRegister = () => {
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
        });
        history.push('/login');
    }

    return (
        <div style={{width:"100%",height:'100vh'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'center', width:'400px', height:'100vh',margin:'0 auto'}}>
                <TextField label="Email" variant="standard" value={email} onChange={emailChange} />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{emailError  ? 'Email is invalid' : ''}</Box>
                <TextField label="Username" variant="standard" style={{marginTop:'30px'}} value={username} onChange={userChange} />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{userError  ? 'Username must be more than 3' : ''}</Box>
                <TextField label="First Name" variant="standard" style={{marginTop:'30px'}} onChange={firstNameChange}/>
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{firstNameError  ? 'First name must be more than 3' : ''}</Box>
                <TextField label="Last Name" variant="standard" style={{marginTop:'30px'}} onChange={lastNameChange}/>
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{lastNameError  ? 'Last name must be more than 3' : ''}</Box>
                <TextField label="Password" type="password" variant="standard" style={{marginTop:'30px'}} value={password} onChange={passChange}  />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{passError  ? 'Password is invalid' : ''}</Box>
                <TextField label="Confirm Password" type="password" variant="standard" style={{marginTop:'30px'}} onChange={confirmChange} />
                <Box component="span" sx={{ color: 'red', marginTop:'10px' }}>{confirmError ? 'Passwords do not match' : ''}</Box>
                <Button color="primary" variant="contained" style={{marginTop:'30px'}} disabled={isDisabled} onClick={onRegister}>Register</Button>
                <Link to='/login' style={{textDecoration:'none'}}><Button variant="outlined" style={{marginTop:'30px',width:'100%'}}>Back To Login</Button></Link>
            </Box>
        </div>
    )
}

export default Register;
