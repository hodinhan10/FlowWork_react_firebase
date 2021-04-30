import { Button, Checkbox, IconButton, InputBase, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { useParams } from "react-router-dom";
import WorkList from "./WorkList";



export default function Todo({ todo, indexCard, indexList }) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    listcv: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexFlow: "row wrap",
      marginTop: -18,
    },
    listcvs: {
      clear: "both",
      paddingLeft: "40px",
      position: "relative",
      borderRadius: "3px",
      transformOrigin: "left bottom",
      transitionProperty: "transform,opacity,height,padding,margin",
      transitionDuration: ".14s",
      transitionTimingFunction: "ease-in",
    },
    check: {
      borderRadius: "2px",
      height: "16px",
      width: "16px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      transition: "all .2s ease-in-out",
      backgroundColor: "#fafbfc",
      // boxShadow: "inset 0 0 0 2px #dfe1e6",
      top: "5px",
      margin: "6px",
      textAlign: "center",
      cursor: "pointer",
      marginLeft: -38,
    },
    listitemcv: {
      minHeight: "20px",
      // marginTop: "40px",
      marginBottom: "0",
      alignSelf: "center",
      flex: "1",
      marginTop: -23,
    },
    button: {
      backgroundColor: "#e4f0f6",
      boxShadow: "none",
      border: "none",
      color: "#0079bf",
      outline: "0",
    },
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
      marginLeft: 650,
    },
  }));
  // function handleFocus() {
  //   setTimeout(function () {
  //     searchInput.current.focus();
  //   }, 150);
  // }
  const [titleEit, setTitleEit] = useState(todo.title);
  const [checkclick, setCheckclick] = useState(false);
  const searchInput = useRef(null);
  const params = useParams();
  const boardID = params.id
  const deleteTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/").child(todo.id);
    if (window.confirm('Bạn có chắc chắn muốn xóa danh sách làm việc này không')) {
      todoRef.remove();
    }

  };

  const editTodo = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/").child(todo.id);
    todoRef.update({
      title: titleEit,
    });
  };

  const [title, setTitle] = useState('');
  const createWorkList = () => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/" + todo.id + "/workList/");
    const workList = {
      title,
      complete: false,
    };
    todoRef.push(workList);
    setTitle("");
  };

  const handleOnChange = (e) => {
    setTitleEit(e.target.value);
  };
  const handleOnChangeWork = (e) => {
    setTitle(e.target.value);
  };
  const [todoList, setTodoList] = useState();
  const [todoListDos, setTodoListDos] = useState();
  const [PercentDone, setPercentDone] = useState();
  const [PercentDo, setPercentDo] = useState();
  const [isActive, setActive] = useState("false");
  useEffect(() => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/" + todo.id + "/workList/");
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);

      var PercentDone = 0;
      var PercentDo = 0;

      for (let i = 0; i < todoList.length; i++) {
        const Percent = todoList[i].complete;
        if (Percent === true) {
          PercentDone = PercentDone + 1
        } else {
          PercentDo = PercentDo + 1
        }
      }
      let todoListDos = todoList.filter((todo) => {
        return todo.complete === false
      })
      setTodoListDos(todoListDos)
      setPercentDone(PercentDone)
      setPercentDo(PercentDo)
    });

  }, []);

  const classes = useStyles();
  const x = PercentDone / (PercentDone + PercentDo) * 100

  const a = <div>{todoList ? todoList.map((work, index) => <WorkList work={work} key={index} Idtodo={todo.id} indexCard={indexCard} indexList={indexList} />) : ''}</div>
  const b = <div>{todoListDos ? todoListDos.map((work, index) => <WorkList work={work} key={index} Idtodo={todo.id} indexCard={indexCard} indexList={indexList} />) : ''}</div>



  const handleToggle = () => {
    setActive(!isActive);
  };
  const zzz = () => {
  };
  const [checkclickWork, setCheckclickWork] = useState(false);

  return (
    <>
      <div className={classes.listcvs}>
        <div className={classes.check}>
        </div>
        <div>
          <div className={classes.listitemcv}>
            {checkclick === false ? (
              <>
                <InputBase
                  multiline
                  style={{ width: "77ch" }}
                  variant="outlined"
                  size="small"
                  className={todo.complete ? "complete" : ""}
                  // onMouseDown={handleFocus}
                  onFocus={(ee) => setCheckclick(true)}
                  defaultValue={todo.title}
                />
                <IconButton
                  onClick={deleteTodo}
                  className={classes.btnCloseIcon}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
                <form onBlur={() => setCheckclick(false)}>
                  <TextField
                    multiline
                    style={{ width: "80ch" }}
                    type="string"
                    variant="outlined"
                    size="small"
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
              )}
            {Number.isNaN(x) === false ?
              <>
                <div className={classes.listcv}>
                  <div style={{ textAlign: 'center', margin: 'auto' }} type="text">
                    <Button onClick={handleToggle} type="text">
                      {isActive === true ? `Hiện những mục đã xong (${PercentDone})` : "Ẩn các mục đã hoàn thành"}
                    </Button>

                    <input type="range" value={x} style={{ width: '650px' }} onChange={zzz}></input>

                  </div>
                </div>
                <div>
                  <span className={classes.number}>
                    {x.toFixed(0)}%
            </span>
                </div>
              </>
              : ""
            }
            {x === 100 ? <div>Mọi thứ trong danh sách công việc này đều đã hoàn tất!</div> : ""}

            {isActive === true ? b : a}


            {checkclickWork === false ? (
              <Button
                onFocus={(ee) => setCheckclickWork(true)}
                variant="contained"
                color="primary"
                className={classes.button}
                size="small"
              >
                Thêm
              </Button>
            ) : (
                <>
                  <TextField
                    multiline
                    className={classes.btnText}
                    style={{ width: "80ch" }}
                    name="comment"
                    onChange={handleOnChangeWork}
                    value={title}
                    ref={searchInput}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    disabled={title !== "" ? false : true}
                    variant="contained"
                    color="secondary"
                    onClick={createWorkList}
                    className={classes.btnThem}
                    size="small"
                  >
                    Thêm
                   </Button>
                  <IconButton
                    onClick={createWorkList}
                    onFocus={() => setCheckclickWork(false)}
                    className={classes.btnCloseIcon}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              )}

          </div>
        </div>
      </div>
    </>
  );
}
