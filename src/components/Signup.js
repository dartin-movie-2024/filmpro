import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { Avatar, Grid, FormControlLabel, Checkbox, Link, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
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
    }
  };

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
  
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
<div>
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
                            Sign Up
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
                            id="phone number"
                            label="Phone Number"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            style={styles.textField}
                            error={passwordError != ''}
                            helperText={passwordError}/>
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
                        <TextField
                            id="confirm password"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                            style={styles.textField}
                            error={passwordError != ''}
                            helperText={passwordError}/>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={styles.button}
                            fullWidth>
                            Sign up
                        </Button>
                    </form>
                </Card>
            </Grid>
        </Container>
      </div>
  );
}

export default Signup;