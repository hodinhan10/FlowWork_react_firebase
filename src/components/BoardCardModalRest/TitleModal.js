import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { myFirebase } from '../../firebase/firebase';
import AirplayIcon from '@material-ui/icons/Airplay';

export default function TitleModal({ text, title, indexCard, boardId, indexList }) {
    const [titleModal, setTitleModal] = useState(text);
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
        setTitleModal(e.target.value);
    };

    const editTitleModal = () => {
        const todoRef = myFirebase.database().ref("/board/" + boardId + "/lists/" + indexList + "/cards/" + indexCard);
        todoRef.update({
            text: titleModal,
        });
    };

    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} sm={12}>
                <Grid container>
                    <Grid container>
                        <Grid item md={1} >
                            <AirplayIcon />
                        </Grid>
                        <Grid item md={11} style={{ marginTop: -20 }}>

                            <form className={classes.root} noValidate>
                                <TextField
                                    onBlur={editTitleModal}
                                    defaultValue={titleModal}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                    color="secondary"
                                    style={{ width: 830, minHeight: '50%', height: 'auto', }}
                                />
                            </form>

                            <div style={{ marginLeft: 23 }}>
                                <div style={{ float: 'left' }}>Trong Danh Sách :
                             </div>
                                <div style={{ textDecoration: 'underline' }}>{title}</div>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

