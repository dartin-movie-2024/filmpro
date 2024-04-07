import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { Avatar, Grid, FormControlLabel, Checkbox, Link, Divider, Backdrop } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

const styles = {
    textField: {
      margin: '10px 0px 10px 0px',
      width: '300px',
      textColor: 'white',
    },
    button: {
      marginTop: '20px',
      marginBottom: '20px',
    },
    card: {
        margin: '50px',
        padding: '50px',
    },
    header: {
        marginBottom: '20px',
    },
    backcolordiv:{
        background:'#bac5ba',
        backgroundImage: 'url("https://i.pinimg.com/originals/bf/66/df/bf66df68eaf4cb24005470c360fbaa2d.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
    },
    fullheight:{
        height:'100vh'
    }
  };

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
  
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClick = () =>{
       // history.push('/dashboard');
       navigate('/dashboard');
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Use a regular expression to validate the email address
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      regex.test(email) ? setEmailError('') : setEmailError('Enter a valid email.')
      
      password.trim() === '' ? setPasswordError('Password is required') : setPasswordError('')
  
    //   // Simulate a login
    //   setTimeout(() => {
    //     setIsLoggedIn(true);
    //   }, 1000);
    };
  
    return (
      <div style={{...styles.backcolordiv,...styles.fullheight}}>
        <Container component="main" maxWidth="sm">
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Card
                style={styles.card}>
                    <Typography component="div">
                        <Box fontSize={30} fontWeight={600} style={styles.header}>
                            Login
                        </Box>
                    </Typography>
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            style={styles.textField}
                            error={emailError != ''}
                            helperText={emailError}/>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            style={styles.textField}
                            error={passwordError != ''}
                            helperText={passwordError}/>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"/>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={styles.button}
                            onClick={handleClick}
                            fullWidth>
                            Login
                        </Button>
                        <Link href="#" variant="body2" color="primary" >
                            Forgot your password?
                        </Link>
                        <Box style={styles.button}>
                            <Divider/>
                        </Box>
                        <Grid 
                            container 
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Grid item xs={2}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" width={40} height={40}/>
                            </Grid>
                            <Grid item xs={2}>
                                <img src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2015/10/nexus2cee_Search-Thumb.png" width={40} height={40}/>
                            </Grid>
                            <Grid item xs={2}>
                                <img src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png" width={40} height={40}/>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Grid>
        </Container>
      </div>
    );
  };

export default Login;

