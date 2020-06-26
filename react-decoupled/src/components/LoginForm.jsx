import React, { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { getAuthClient } from '../utils/auth';

const auth = getAuthClient();

const LoginForm = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const [result, setResult] = useState({
    success: null,
    error: null,
    message: '',
  });

  const defaultValues = {name: '', pass: ''};
  const [values, setValues] = useState(defaultValues);

  const [isLoggedIn, setLoggedIn] = useState(false);
  // Only need to do this on first mount.
  useEffect(() => {
    auth.isLoggedIn()
      .then((res) => {
        setLoggedIn(true);
      });
  }, []);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    auth.login(values.name, values.pass)
      .then(() => {
        setSubmitting(false);
        setLoggedIn(true);
        setResult({ success: true, message: 'Login success' });
      })
      .catch((error) => {
        setSubmitting(false);
        setLoggedIn(false);
        setResult({ error: true, message: 'Login error' });
        console.error('Error: Cannot log in', error);
      });
  };

  return (
    <Paper elevation={0} variant="outlined">
      <Box p={4}>
        {(result.success || result.error) &&
          <Typography variant="h6">
            {result.message}
          </Typography>
        }

        {isSubmitting && (
          <Typography variant="h6">
            Logging in ...
          </Typography>
        )}

        {isLoggedIn && (
          <>
            <Typography variant="body1" style={{ marginBottom: 16 }}>
              Logged in.
            </Typography>

            <Button
              variant="contained"
              onClick={() => auth.logout().then(setLoggedIn(false))}
            >
              Logout
            </Button>
          </>
        )}

        {!isSubmitting && !isLoggedIn && (
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Username"
              onChange={handleInputChange}
              required
            />

            <TextField
              name="pass"
              label="Password"
              type="password"
              onChange={handleInputChange}
              required
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
        )}
      </Box>
    </Paper>
  );
};

export default LoginForm;
