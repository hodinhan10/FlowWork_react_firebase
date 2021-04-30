import { Button, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import SubjectIcon from '@material-ui/icons/Subject';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { myFirebase } from '../../firebase/firebase';
import Todo from './Todo';



export default function TodoList({ indexCard, indexList }) {

  const [todoList, setTodoList] = useState();
  const [todoListDos, setTodoListDos] = useState();
  const [PercentDone, setPercentDone] = useState();
  const [PercentDo, setPercentDo] = useState();

  const [isActive, setActive] = useState("false");

  const params = useParams();
  const boardID = params.id
  useEffect(() => {
    const todoRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Todo/");
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);
      // console.log("todoList", todoList)

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
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1)
    },
    link: { backgroundColor: "rgba(9,30,66,.04)", backgroundPosition: "50%", backgroundSize: "contain", backgroundRepeat: "no-repeat", borderRadius: "3px", height: "80px", textAlign: "center", textDecoration: "none", zIndex: "1", width: "112px" },
    link1: { "color": "#5e6c84", "display": "block", "fontSize": "18px", "fontWeight": "700", "height": "100%", "lineHeight": "80px", "textAlign": "center", "textTransform": "uppercase", "textDecoration": "none", "width": "100%" },
    link2: { "boxSizing": "border-box", "cursor": "pointer", "padding": "8px 8px 8px 128px", "minHeight": "80px", "margin": "0", "zIndex": "0" },
    addfile: { "color": "#1f488d", "fontFamily": "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", "fontSize": "14px", "lineHeight": "20px", "fontWeight": "400", "boxSizing": "border-box", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "borderRadius": "3px", "cursor": "pointer", "padding": "6px 12px", "textDecoration": "none", "backgroundColor": "rgba(9,30,66,.04)", "boxShadow": "none", "border": "none", "transitionProperty": "background-color,border-color,box-shadow", "transitionDuration": "85ms", "transitionTimingFunction": "ease" },
    number: { "color": "#5e6c84", "fontSize": "11px", "lineHeight": "10px", "textAlign": "center", "width": "32px", },
    tiendo: { "background": "rgba(9,30,66,.08)", "borderRadius": "4px", "clear": "both", "height": "8px", "margin": "-13px 0 0 40px", "overflow": "hidden", "position": "relative" },
    colortiendo: { "background": "#5ba4cf", "bottom": "0", "left": "0", "position": "absolute", "top": "0", "transitionProperty": "width,background", "transitionDuration": ".14s", "transitionTimingFunction": "ease-in" },
    positioncv: { "color": "#172b4d", "fontFamily": "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", "fontSize": "14px", "lineHeight": "20px", "fontWeight": "400", "boxSizing": "border-box", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "borderRadius": "3px", "cursor": "pointer", "padding": "6px 12px", "textDecoration": "none", "backgroundColor": "rgba(9,30,66,.04)", "boxShadow": "none", "border": "none", "transitionProperty": "background-color,border-color,box-shadow", "transitionDuration": "85ms", "transitionTimingFunction": "ease" },
    thanhvien: { "display": "block", "float": "left", "margin": "0 8px 8px 0", "maxWidth": "100%" },
    member: { "backgroundColor": "#dfe1e6", "borderRadius": "25em", "color": "#172b4d", "cursor": "pointer", "display": "block", "float": "left", "height": "32px", "margin": "0 4px 4px 0", "overflow": "visible", "position": "relative", "width": "32px", "textDecoration": "none", "WebkitUserSelect": "none", "userSelect": "none", "zIndex": "0" },
    listmember: { "display": "block", "fontSize": "12px", "fontWeight": "700", "height": "32px", "left": "0", "lineHeight": "32px", "overflow": "hidden", "position": "absolute", "textAlign": "center", "top": "0", "width": "100%" }
  }));
  const classes = useStyles();

  const x = PercentDone / (PercentDone + PercentDo) * 100

  const a = <div>{todoList ? todoList.map((todo, index) => <Todo todo={todo} key={index} indexCard={indexCard} indexList={indexList} />) : ''}</div>
  const b = <div>{todoListDos ? todoListDos.map((todo, index) => <Todo todo={todo} key={index} indexCard={indexCard} indexList={indexList} />) : ''}</div>


  const handleToggle = () => {
    setActive(!isActive);
  };
  const zzz = () => {
  };
  return (
    <Grid item md={11} >
      {/* {Number.isNaN(x) === false ?
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
      {isActive === true ? b : a} */}
      <div>{todoList ? todoList.map((todo, index) => <Todo todo={todo} key={index} indexCard={indexCard} indexList={indexList} />) : ''}</div>
    </Grid>
  );
}
