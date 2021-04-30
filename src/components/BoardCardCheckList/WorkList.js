import { Button, Checkbox, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myFirebase } from '../../firebase/firebase';
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

export default function WorkList({ indexCard, indexList, work, Idtodo }) {

  const [titleEit, setTitleEit] = useState(work.title);
  const [checkclick, setCheckclick] = useState(false);
  const searchInput = useRef(null)
  const params = useParams();
  const boardID = params.id
  // "/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/" + todo.id + "/workList/"
  const deleteTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/" + Idtodo + "/workList/").child(work.id);
    todoRef.remove();
  };

  const editTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/" + Idtodo + "/workList/").child(work.id);
    todoRef.update({
      title: titleEit,
    });
  };

  const completeTodo = (e) => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/" + Idtodo + "/workList/").child(work.id);
    todoRef.update({
      complete: !work.complete,
    });
  };

  const handleOnChange = (e) => {
    setTitleEit(e.target.value);
  };


  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    },
    listcv: { "display": "flex", "justifyContent": "space-between", "alignItems": "center", "flexFlow": "row wrap", marginTop: -18, },
    listcvs: { "clear": "both", "paddingLeft": "40px", "position": "relative", "borderRadius": "3px", "transformOrigin": "left bottom", "transitionProperty": "transform,opacity,height,padding,margin", "transitionDuration": ".14s", "transitionTimingFunction": "ease-in" },
    check: { "borderRadius": "2px", "height": "16px", "width": "16px", "overflow": "hidden", "whiteSpace": "nowrap", "transition": "all .2s ease-in-out", "backgroundColor": "#fafbfc", "boxShadow": "inset 0 0 0 2px #dfe1e6", "top": "5px", "margin": "6px", "textAlign": "center", "cursor": "pointer", marginLeft: -38 },
    listitemcv: { "minHeight": "20px", "marginBottom": "0", "alignSelf": "center", "flex": "1", marginTop: -23 },
    button: { "backgroundColor": "#e4f0f6", "boxShadow": "none", "border": "none", "color": "#0079bf", "outline": "0" },
  }));


  const classes = useStyles();

  const [title, setTitle] = useState('');
  return (
    <>
      <div className={classes.listcvs}>
        <div className={classes.check}>
          <Checkbox
            style={{ "marginLeft": "-13px", "marginTop": "-13px" }}
            onClick={completeTodo}
            checked={work.complete}
          />
        </div>

        <div>
          <div className={classes.listitemcv}>
            {checkclick === false ?
              <>
                <TextField
                  multiline
                  style={{ width: "77ch" }}
                  variant="outlined"
                  size="small"
                  style={{ float: 'left', width: '80%' }}
                  className={work.complete ? 'complete' : ''}
                  // onMouseDown={handleFocus}
                  onFocus={(ee) => setCheckclick(true)} defaultValue={work.title} />
                <IconButton
                  onClick={deleteTodo}
                  className={classes.btnCloseIcon}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </> :
              <form onBlur={() => setCheckclick(false)}>

                <TextField
                  multiline
                  style={{ width: "80ch" }}
                  variant="outlined"
                  size="small"
                  type="string"
                  onChange={handleOnChange}
                  value={titleEit}

                />
                <Button
                  disabled={titleEit !== "" ? false : true}
                  variant="contained"
                  color="secondary"
                  onMouseDown={editTodo}
                  onFocus={() => setCheckclick(false)}
                  className={classes.btnThem}
                  size="small"
                >
                  Lưu
                </Button>
                <IconButton
                  onFocus={() => setCheckclick(false)}
                  className={classes.btnCloseIcon}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </form>
            }
            <div>
              {/* <button onClick={deleteTodo}>Delete</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}