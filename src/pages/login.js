import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            height: "700px",
            background: 'white'

        },
        text: {
            color: 'black'
        },
        input: {
            width: '400px',
            margin: '15px'
        }
    }
});

export default function Login() {
    const classes = useStyles({});
    let navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [role, setRole] = useState('user');
    const [loginErrors, setLoginErrors] = useState();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        if (userRole) {
            navigate('/')
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const handleLoginChange = (name, value) => {
        setLoginData({ ...loginData, [name]: value })
    }

    const loginValidator = () => {
        let formErrors = {
            email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email) ? "" : 'Please enter a valid Email',//eslint-disable-line
            password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(loginData.password) ? "" : 'Invalid password, password must contain 8 characters and include one lowercase, one uppercase, one number'
        }
        setLoginErrors(formErrors)
        return Object.values(formErrors).every(x => x === '')
    }
    const roleHandler = () => {
        if (role === 'user') {
            setRole('admin')
            navigate('/admin-login')
        }
        else {
            setRole('user')
            navigate('/login')
        }
    };

    const submitdata = () => {
        if (loginValidator()) {
            if(role==='admin'){
            if (loginData.email === 'test@gmail.com') {
                if (loginData.password === 'Codeunity1') {
                    localStorage.setItem('role', 'admin');
                   window.location.reload(false)
                }
                else {
                    alert('wrong password')
                }
            }
            else {
                alert('Please enter registered email')
            }
        }
        else{
            if (loginData.email === 'test1@gmail.com') {
                if (loginData.password === 'Codeunity1') {
                    localStorage.setItem('role', 'user');
                    window.location.reload(false)

                }
                else {
                    alert('wrong password')
                }
            }
            else {
                alert('Please enter registered email')
            }
        }
            
        }
        else {
            alert('Enter valid details')
        }
    }

    return (
        <div className={classes.root}>
            {role === 'user' ?
                <h2 className={classes.text} >User Login</h2>
                :
                <h2 className={classes.text}>Admin Login</h2>
            }
            <Box component='form'>
                <div className={classes.input}>
                    <TextField label='Email' name='email' {...(loginErrors?.email && { error: true, helperText: loginErrors.email })}
                        onChange={(event)=>handleLoginChange(event.target.name,event.target.value)} required fullWidth value={loginData.email} />
                </div>
                <div className={classes.input}>
                    <TextField label='Password' name='password' {...(loginErrors?.password && { error: true, helperText: loginErrors.password })}
                        type="password" onChange={(event)=>handleLoginChange(event.target.name,event.target.value)} required fullWidth value={loginData.password} />
                </div>
            </Box>
            <div className='btnContainer'>
                <Button className='button' onClick={submitdata}>Login</Button>
            </div>

            <div className='btnContainer'>
                {role === 'user' ?
                    <Button variant="text" className='button' onClick={roleHandler}>Login as Admin</Button> :
                    <Button variant="text" className='button' onClick={roleHandler}>Login as User</Button>}
            </div>
        </div>
    );
}
