import { Button, Checkbox, createStyles, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { myFirebase } from "../../firebase/firebase";
import { useForm } from "react-hook-form";


const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export default function DayDeadLine({ boardId, indexCard, indexList }) {
    const classes = useStyles();

    const [todoList, setTodoList] = useState();
    const [dayTime, setDayTime] = useState("");
    const [yearMonthDay, setYearMonthDay] = useState("");
    const [offset, setOffset] = useState();

    const { reset } = useForm({});

    useEffect(() => {
        const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard);
        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
                todoList.push({ id, ...todos[id] });
            }
            setTodoList(todoList);

            var data = [];
            for (var i = 0; i < todoList.length; i++) {
                if (todoList[i].id === "dayTime") {
                    data = todoList[i]
                }
            }
            var b = Object.entries(data).length - 1
            var a = Object.entries(data).slice(0, b).map(entry => entry[1]);
            var dayTime = a.join('')
            setDayTime(dayTime)
            reset(dayTime);

            var parts = dayTime.match(/(\d+)/g);

            var yearMonthDay = dayTime !== '' ? (parts[0] + "/" + parts[1] + "/" + parts[2] + "   " + parts[3] + "h " + parts[4] + "'") : ''
            setYearMonthDay(yearMonthDay)

            var offset = dayTime !== '' ? (new Date(parts[0], parts[1] - 1, parts[2])).getTime() - (new Date().getTime()) : ''
            setOffset(offset)


        });
    }, [reset]);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const user = myFirebase.auth().currentUser.uid;
        myFirebase.database().ref('/board/' + boardId + '/members').orderByKey().equalTo(user).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var role = childSnapshot.val().role
                if (role == 'admin') {
                    setIsAdmin(true)
                }
            })
        })
    })

    const editDayTime = () => {
        const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard);
        todoRef.update({
            dayTime,
        });
    };
    const handleOnChange = (e) => {
        setDayTime(e.target.value);
    };
    const oneDay = 24 * 60 * 60 * 1000

    return (
        <>
            <Grid item xs={12} sm={12}>
                <Grid container>
                    <Grid item md={1} >
                        <EventBusyIcon />
                    </Grid>
                    <Grid item md={6} >
                        <h3 style={{ "color": "#5e6c84", "fontSize": "12px", "fontWeight": "500", "letterSpacing": ".04em", "lineHeight": "20px", "marginTop": "16px", "textTransform": "uppercase", "display": "block", "margin": "0 8px 4px 0", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "overflow": "hidden" }}>Ngày Hết Hạn</h3>
                        <Grid container>
                            {isAdmin ? <TextField
                                defaultValue={dayTime}
                                onBlur={editDayTime}
                                onChange={handleOnChange}
                                type="datetime-local"
                                className={classes.textField}
                            /> : null}


                            <Grid item md={5}>

                                <>
                                    {

                                        offset !== '' ?
                                            (offset > oneDay ?
                                                <Button style={{ "background": "green" }}>{yearMonthDay}</Button> :
                                                (offset > 0 ?
                                                    <Button style={{ "background": "yellow" }}>{yearMonthDay}</Button> :
                                                    <Button style={{ "background": "red" }}>{yearMonthDay}</Button>
                                                )) :
                                            ''
                                    }
                                </>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
