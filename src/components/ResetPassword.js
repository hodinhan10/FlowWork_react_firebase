import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from '../firebase/firebase'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '2rem',
    borderRadius: '1rem',
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#026aa7'
  },
}));

const PasswordReset = () => {

  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    email: ''
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    });
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(state.email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => { setEmailHasBeenSent(false) }, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset your Password
        </Typography>

        <form className={classes.form}>
          {emailHasBeenSent && (
            <Typography component="h1" variant="h5">
              An email has been send to you
            </Typography>
          )}
          {error !== null && (
            <Typography component="h1" variant="h5">
              {error}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
          />
          <Button

            onClick={sendResetEmail}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send me a reset link
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" to="/signin">
                Back to Sign In
                            </Link>
            </Grid>
          </Grid>
        </form>
        <Link
          to="/"
          className="my-2 text-blue-700 hover:text-blue-800 text-center block"
        >
        </Link>

      </div>
    </Container>
  );
};
export default PasswordReset;