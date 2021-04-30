import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import CallToActionIcon from '@material-ui/icons/CallToAction';
import '@szhsin/react-menu/dist/index.css';
import Color from 'color';
import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUser } from "../../actions";
import { myFirebase } from '../../firebase/firebase';
import ActionLogout from './ActionLogout';
import Listemail from './Listemail';
import logo from '../../img/logo3.png'
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 540,
    },
    media: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginTop: 15,
        marginLeft: 10,
    },
    media1: {
        height: 35,
        width: 35,
        borderRadius: 50,

    },
    name: {
        marginTop: -41,
    },
    name1: {
        marginTop: 0,
    },
    datetime: {
        marginTop: -28,
        marginRight: 565,
    },
    edit: {
        marginTop: 10,
        marginRight: 695,
    },

    textcmt: {
        marginRight: 0,
    },
    textcmt1: {
        marginBottom: 5,
    },
    buttoncmt: {
        marginTop: 10,
        marginRight: 0,
    },
    buttoncmt2: {
        marginTop: 10,
        marginLeft: 5,
    },
}));


const MainNav = styled.div`
    /*background: ${(props) => props.color || 'rgba(2, 106, 167, 1)'};*/
    margin: auto;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: rgba(0,0,0,0.25);
`;

const Logo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    right: 50%;
`;

const Img = styled.img`
    opacity: 0.5;
    width: 6rem;
    height: 2rem;
    :hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const Buttons = styled.div`
    justify-content: flex-end;
    display: inline-flex;
    align-items: center;
`;

const SignButton = styled.div`
    border-radius: .3rem;
    background-color: rgba(0,0,0,0.16);
    color: white;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    &:hover {
        background-color: rgba(255,255,255,0.35);
        cursor: pointer;
    }
    margin: 0 4px 0 4px;
`;

const ListOptions = styled.div`
    display: inline-block;
    margin-right: 15px;
    border-radius: .3rem;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    color: #172b4d;
    opacity: 0.7;
    
    &:hover {
        background-color: #e1e2e6;
        
    }
`;

const TrelloNav = (props) => {
    const { isAuthenticated, isLoading } = props;
    const { backgroundColor } = props.theme;
    const [notiList, setNotiList] = useState()
    const [showActionList, setShowActionList] = React.useState(false);
    const [showlistemail, setShowlistemail] = React.useState(false);

    let newColor = '';
    if (backgroundColor) {
        newColor = Color(backgroundColor).darken(0.2).hsl().string();
    }
    const handleMenuClick = () => {
        const user = myFirebase.auth().currentUser.uid
        const notiRef = myFirebase.database().ref('notifications/inviteNoti').orderByChild('userId').equalTo(user)
        notiRef.on('value', snapshot => {
            const notis = snapshot.val();
            const notiList = []
            for (let id in notis) {
                notiList.push(notis[id])
            }
            setNotiList(notiList);
            // console.log(notiList)
        })
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const user = myFirebase.auth().currentUser;
    const handleSignOut = () => {
        dispatch(logoutUser());
        history.push('/signin');
    }
    const handleShowInvite = () => {
        setShowActionList(!showActionList);
    }

    const handleShowlistemail = () => {
        setShowlistemail(!showlistemail);
    }

    const isLoggedIn = (
        <>
            {/* <Menu menuButton={ <Badge onClick={ handleMenuClick } color="secondary" variant="dot" style={{marginRight : 10}}>
                <MailIcon color="primary" />
            </Badge> } >
                { notiList ? notiList.map((noti, i) =>
                    <MenuItem key={ i } href={ noti.boardlink } target="_blank" rel="noopener noreferrer">{ noti.content }</MenuItem>
                ) : <MenuItem>No notifications</MenuItem> }
            </Menu> */}
            <ListOptions onClick={handleShowlistemail}><CallToActionIcon /></ListOptions>
            { showlistemail && (
                <Listemail
                    handleShowlistemail={handleShowlistemail}
                />
            )}
            <ListOptions onClick={handleShowInvite}>
                {user ? <CardMedia
                    variant="contained"
                    className={classes.media1}
                    image={user.photoURL}
                /> : <CardMedia
                        variant="contained"
                        className={classes.media1}
                    />}

            </ListOptions>
            { showActionList && (
                <ActionLogout
                    handleShowInvite={handleShowInvite}
                />
            )}
        </>
    );
    const isLoggedOut = (
        <Buttons>
            <Link to="/signin" style={{ textDecoration: 'none' }}><SignButton>Sign in</SignButton></Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}><SignButton>Register</SignButton></Link>
        </Buttons>
    );
    return (
        <MainNav color={newColor}>
            <Link to="/">
                <SignButton>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </SignButton>
            </Link>
            <Link to="/">
                <Logo>
                    <img className="landing-header__logo" src={logo} />
                </Logo>
            </Link>
            <Buttons>
                {!isLoading ? (isAuthenticated ? isLoggedIn : isLoggedOut) : null}
            </Buttons>
        </MainNav>
    );
}

const mapStateToProps = (state) => ({
    theme: state.theme,
})

export default connect(mapStateToProps, null)(TrelloNav);
