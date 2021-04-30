import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardMedia, Divider, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logoutUser } from "../../actions";
import { myFirebase } from "../../firebase/firebase";
const useStyles = makeStyles({
  a: {
    cursor: "pointer",
    display: "block",
    fontWeight: "400",
    padding: "6px 12px",
    position: "relative",
    margin: "0 -12px",
    textDecoration: "none",
  },
  dangxuat:{
    marginTop:10,
    textDecoration: 'none'
  },
  email:{
   
    marginLeft:60,
  },
  doc:{
    marginTop:7
  },
  name:{
      fontSize:20,
      color:'black',
    marginTop:-43,
    marginLeft:60,
  },
  color: {
    textDecoration: "none",
    color: "#708696",
  },
  media1: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 10,
  },
});

const ActionListMenu = styled.div`
  position: absolute;
  top: 5rem;
  background-color: #ffffff;
  border-radius: 0.3rem;
  width: 20rem;
  height: auto;
  padding: 0 12px 12px 12px;
  color: #6b808c;
  z-index: 5;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
const Header = styled.div`
  border-bottom: 1px solid #dcdfe3;
  padding: 1.2rem 0;
`;
const Title = styled.label`
  text-align: center;
  display: block;
  font-weight: 400;
  width: 100%;
  font-size: 1rem;
`;
const CloseMenuButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: none;
  color: #6b808c;
  background-color: transparent;
  font-size: 1.5rem;

  &:hover {
    color: #000000;
    cursor: pointer;
  }
`;
const Form = styled.div``;
const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 1.5rem 0.8rem;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: #17394d;
  background-color: #ebeef071;
  border: 2px solid #dfe3e6;
  border-radius: 0.3rem;
  margin: 0rem 0rem 1rem 0rem;

  &:hover {
    background-color: #ebeef0;
  }

  &:focus {
    border: 2px solid #0079bf;
    outline: none;
  }
`;
const SaveButton = styled.button`
  background-color: #5aac44;
  color: white;
  width: 5rem;
  height: 2.5rem;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 700;
  border: none;

  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  margin: 1rem 0;
  display: block;
`;

const ListOptions = styled.div`
  display: inline-block;
  margin-right: 15px;
  border-radius: 0.3rem;
  padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  color: #172b4d;
  opacity: 0.7;

  &:hover {
    background-color: #e1e2e6;
  }
`;

const ActionLogout = ({ handleShowInvite, boardId, listID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    dispatch(logoutUser());
    history.push("/signin");
  };
  const user = myFirebase.auth().currentUser;
  return (
    <ActionListMenu>
      <Header>
        <Title>Tài khoản</Title>
        <CloseMenuButton onClick={handleShowInvite}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseMenuButton>
      </Header>
      <div>
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
      
          <Grid item md={2}>
            <CardMedia
              variant="contained"
              className={classes.media1}
              image={user.photoURL}
            />
          </Grid> 
         
          <li className={classes.name} >{user.displayName}</li>
          <li className={classes.email} >{user.email}</li>
          <Divider className={classes.doc}/>
          <li>
              <a href={ `/profile` } target="_blank" className={ classes.dangxuat }>
                            Hiện thị hồ sơ của bạn
                        </a>
           
          </li>
          <li>
            <a className={classes.dangxuat} onMouseDown={handleSignOut}>
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </ActionListMenu>
  );
};

export default ActionLogout;
