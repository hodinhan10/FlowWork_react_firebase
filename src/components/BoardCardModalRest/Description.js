import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { myFirebase } from "../../firebase/firebase";
import DescriptionIcon from '@material-ui/icons/Description';


export default function Description({ boardId, indexCard, indexList }) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
        },
        margin: {
            margin: theme.spacing(1)
        },
    }));


    const handleOnChange = (e) => {
        setDescription(e.target.value);
    };

    const classes = useStyles();
    const [todoList, setTodoList] = useState();
    const [description, setDescription] = useState("");
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
                if (todoList[i].id === "description") {
                    data = todoList[i]
                }
            }
            var b = Object.entries(data).length - 1
            var a = Object.entries(data).slice(0, b).map(entry => entry[1]);
            var description = a.join('')
            setDescription(description)
            reset(description);

        });
    }, [reset]);

    const editDescription = () => {
        const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard);
        // console.log("edit")
        todoRef.update({
            description,
        });
    };


    return (
        <>
            <Grid item xs={12} sm={12}>
                <Grid container>
                    <Grid item md={1} >
                        <DescriptionIcon />
                    </Grid>
                    <Grid item md={11} >
                        <div style={{ fontWeight: 'bold' }}>Mô tả</div>
                        <form className={classes.root} noValidate >

                            <TextField
                                onBlur={editDescription}
                                value={description}
                                onChange={handleOnChange}
                                variant="outlined"
                                color="secondary"
                                style={{ width: 550, minHeight: '50%', height: 'auto', }}
                            />
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

