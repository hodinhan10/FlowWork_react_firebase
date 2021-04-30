import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState,useEffect } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import {myFirebase,signInWithGoogle} from '../firebase/firebase'
import { loginUser } from "../actions";

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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'red',/*theme.palette.secondary.main*/
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

export default function SignIn(props) {
    const classes = useStyles();
    const user = myFirebase.auth().currentUser;
    useEffect(() => {
      if (user) {
          setState({ toFrontpage: true });
      }
    }, [user])
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        toFrontpage: false,
    });

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    };

    async function handleSignIn(e) {
        e.preventDefault();
        dispatch(loginUser(state.email, state.password, props.history));
        setState({ toFrontpage: true });
    };

    const redirect = (
        <Redirect to="/" />
    );

    const signIn = (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   Đăng nhập
                </Typography>
                <form onSubmit={handleSignIn} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email "
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={onChange}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={true} value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Đăng kí
                    </Button>
                    <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit} onClick={signInWithGoogle} >
                                 Đăng nhập với Google
                     </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset-password" variant="body2">
                               Quên mật khẩu ?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" to="/signup" component={NavLink}>
                                {"Không có tài khoản? Bạn muốn đăng ký ?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

    if (state.toFrontpage) {
        return redirect;
    } else {
        return signIn;
    }
}