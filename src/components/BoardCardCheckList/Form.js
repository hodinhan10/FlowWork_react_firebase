import React, { useRef, useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { IconButton, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 540,
  },

  button: {
    marginTop: 0,
    marginLeft: 0,
  },
  btnText: {
    marginRight: 700,
  },
  btnThem: {
    marginTop: 8,
    marginRight: 1320,
  },
  btnCloseIcon: {
    marginTop: -55,
    marginLeft: 105,
  },
}));
export default function Form({ indexCard, indexList }) { // title
  const [title, setTitle] = useState("");
  const searchInput = useRef(null);
  const [checkclick, setCheckclick] = useState(false);
  const params = useParams();
  const boardID = params.id
  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const createTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/");
    const todo = {
      title,
    };
    todoRef.push(todo);

    setTitle("");
    searchInput.current.focus();
  };
  const classes = useStyles();
  return (
    <div>
      {checkclick === false ? (
        <Button
          onFocus={(ee) => setCheckclick(true)}
          variant="contained"
          color="primary"
          className={classes.button}
          size="small"
        >
          Thêm danh sách công việc
        </Button>
      ) : (
          <>
            <TextField
              multiline
              className={classes.btnText}
              style={{ width: "80ch" }}
              name="comment"
              placeholder="Viết việc cần làm..."
              onChange={handleOnChange}
              value={title}
              ref={searchInput}
              variant="outlined"
              size="small"
            />
            <Button
              disabled={title !== "" ? false : true}
              variant="contained"
              color="secondary"
              onClick={createTodo}
              className={classes.btnThem}
              size="small"
            >
              Thêm
          </Button>
            <IconButton
              onClick={createTodo}
              onFocus={() => setCheckclick(false)}
              className={classes.btnCloseIcon}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
    </div>
  );
}
//
