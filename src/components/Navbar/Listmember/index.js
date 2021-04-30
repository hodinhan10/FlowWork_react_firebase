import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { myFirebase } from '../../../firebase/firebase';
import { useParams } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: { "position": "absolute", backgroundColor: '#FFFFFF', "top": "50px", left: 275, "borderRadius": ".3rem", "width": "300px", "height": "150px", "padding": "0 12px 12px 12px", "color": "#6b808c", "zIndex": "5", "border": "1px solid rgba(0,0,0,0.2)", "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", "padding": "10px 20px", overflow: 'auto' },
    "name:hover": {
        textDecoration: 'underline'
    }
}));

export default function Listmember({ email, name, uid }) {
    const params = useParams();
    const handleExitBoard = () => {
        // console.log(uid)
        // myFirebase.database().ref('/userBoards/' + uid).child(params.id).remove();
        // myFirebase.database().ref('/boards/' + params.id + '/members/' + uid).remove()
        // myFirebase.database().ref('/notifications/inviteNoti').orderByChild('boardId').equalTo(params.id).on('child_added', function(snapshot) { 
        //     if (snapshot.val().userId == uid) {
        //         snapshot.ref.remove()
        //     }
        // })
        // myFirebase.database().ref('/board/' + params.id + '/members/' + uid).remove()
        // const cardMemberRef = myFirebase.database().ref('/cardMembers/')   
        // cardMemberRef.on('value', snapshot => {
        //     snapshot.forEach(function (snap) {
        //     myFirebase.database().ref('cardMembers/' + snap.key).orderByChild('name').equalTo(email).on('child_added', function (childSnap) {
        //         childSnap.ref.remove()
        //         })})
        // })
    }


    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item md={12} style={{ marginBottom: 20 }}>
                    <Grid container>
                        <Grid item md={4}>
                            <div style={{ "fontSize": "16px", "borderRadius": "50px", "backgroundColor": "rgb(223, 225, 230)", "height": "100%", "width": "80%", "fontWeight": "500", "color": "rgb(84 87 90)", "textAlign": "center", "lineHeight": "64px" }}>
                                MD
                            </div>
                        </Grid>
                        <Grid item md={8}>
                            <Grid container>
                                <Grid item md={12} >
                                    <p className={classes.name}>
                                        {name}
                                    </p>
                                </Grid>
                                <Grid item md={12}>
                                    {email}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <Button onClick={handleExitBoard} style={{ "fontSize": "12px", "fontFamily": "'Roboto'", "textTransform": "lowercase", "fontWeight": "100", marginLeft: '10%' }}>
                        Xóa thành viên này ra khỏi nhóm <DeleteIcon />
                    </Button>
                </Grid>
                <Grid item md={12}>

                </Grid>
            </Grid>
        </div>
    )
}
