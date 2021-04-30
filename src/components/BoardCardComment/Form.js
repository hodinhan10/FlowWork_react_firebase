import React, { useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { green } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 540,
  },
  media1: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginTop: 14,
    marginLeft: 25,
  },
  textcmt: {
    marginTop: 35,
    marginRight: 500,
  },
  buttoncmt: {
    marginRight: 1336,
  },
}));

export default function Form({ indexCard, indexList }) {
  const [title, setTitle] = useState("");
  const params = useParams();
  const user = myFirebase.auth().currentUser
  const boardID = params.id
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const createComment = () => {
    const commentRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Comment/");
    const comment = {
      //gắn vào đây, email khỏi displayName, với photoUrl
      email: user.email,
      title,
      time: new Date().toISOString(),
      userImage: user.photoURL,
      userId: user.uid

    };

    commentRef.push(comment);
  };
  const classes = useStyles();
  return (
    <div>
      <TextField
        multiline
        className={classes.textcmt}
        style={{ width: "80ch" }}
        name="comment"
        placeholder="Viết bình luận..."
        onChange={handleOnChange}
        value={title}
        variant="outlined"
        size="small"
      />
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          size="small"
          disabled={title !== "" ? false : true}
          className={classes.buttoncmt}
          onClick={createComment}
          color="primary"
        >
          <a style={{ color: "white" }}>Lưu</a>
        </Button>
      </ThemeProvider>
    </div>
  );
}
