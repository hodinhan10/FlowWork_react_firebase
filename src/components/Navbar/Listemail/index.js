import React, { Component } from 'react';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import { myFirebase } from '../../../firebase/firebase';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: { "position": "absolute", "top": "45px", right: 45, "borderRadius": ".3rem", "width": "300px", "height": "250px", "padding": "0 12px 12px 12px", "color": "#6b808c", "zIndex": "5", "border": "1px solid rgba(0,0,0,0.2)", "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", "padding": "10px 20px", overflow: 'auto' },
    thongbao: {
        "&:hover": { "backgroundColor": "#ebeef0" },
        "borderRadius": "10px", "padding": "10px 10px",
    }
}))
const listtb = [{ name: ' Thông báo tài khoảng hodinhan đăng vào dự án woderlane', time: '20 minutes ago', id: 1 }, { name: ' Thông báo tài khoảng duongmai đăng vào dự án woderlane', time: '30 minutes ago', id: 2 }, { name: ' Thông báo tài khoảng hoangnguen đăng vào dự án woderlane', time: '40 minutes ago', id: 3 }, { name: ' Thông báo tài khoảng manhchuchoe đăng vào dự án woderlane', time: '50 minutes ago', id: 4 }, { name: ' Thông báo tài khoảng tuanhung đăng vào dự án woderlane', time: '60 minutes ago', id: 5 }, { name: ' Thông báo tài khoảng tuanhung đăng vào dự án woderlane', time: '60 minutes ago', id: 6 }, { name: ' Thông báo tài khoảng tuanhung đăng vào dự án woderlane', time: '60 minutes ago', id: 7 }]

export default function Listemail() {
    const classes = useStyles();
    const [changecolor, setChangecolor] = React.useState(false);
    const [notiList, setNotiList] = useState()
    const onchangeColor = () => {
        setChangecolor(!changecolor)
    }
    useEffect(() => {
        const user = myFirebase.auth().currentUser.uid
        const notiRef = myFirebase.database().ref('notifications/inviteNoti').orderByChild('userId').equalTo(user)
        notiRef.on('value', snapshot => {
            const notis = snapshot.val();
            const notiList = []
            for (let id in notis) {
                notiList.push(notis[id])
            }
            setNotiList(notiList);

        })
    }, [])
    // console.log(notiList)
    if (notiList) {
        var elm = notiList.map((list, index) => {
            return <Grid item md={12} className={classes.thongbao} key={index}>
                <a href={list.boardlink} style={{ textDecoration: 'none', color: 'rgb(85 128 170)' }}>
                    <Grid>
                        <Typography>
                            {list.content}
                        </Typography>
                    </Grid>
                    <Grid>
                        {list.time}
                    </Grid>
                </a>
            </Grid>
        })
    }
    else {
        return null
    }
    return (
        <div className={classes.root} style={{ backgroundColor: changecolor ? '#242526' : 'white' }}>
            <Grid container>
                <Grid item md={12} style={{ "marginBottom": "15px" }}>
                    <Grid container>
                        <Grid item md={9} style={{ "fontSize": "20px", "marginTop": "8px", "fontWeight": "600", color: changecolor ? 'white' : '#242526' }}>
                            Notifications
                        </Grid>
                        <Grid item md={3}>
                            <Button onClick={onchangeColor} style={{ color: changecolor ? 'white' : 'black' }}>
                                <InvertColorsIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12} style={{ color: changecolor ? 'white' : '#242526', fontSize: 16 }}>
                    New
            </Grid>
                {elm}
            </Grid>
        </div>
    )
}