import React, { Component } from "react";
import { Grid, TextField, Typography, withStyles } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import { makeStyles } from "@material-ui/core/styles";
import { myFirebase } from '../../../firebase/firebase';
const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    height: 500,
    position: "absolute",
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
  containerall: {
    padding: "10px 25px",
  },
  header: {
    fontSize: "25px",
    fontWeight: "500",
  },
  header1: {
    fontSize: "15px",
    color: "grey",
  },
  headerbot: {
    marginBottom: 40,
  },
  header2: {
    fontSize: "25px",
    fontWeight: "500",
    fontFamily: "system-ui",
  },
  input: {
    "& label.Mui-focused": {
      color: "blue",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "blue",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "blue",
      },
    },
  },
  photo: {
    width: "130px",
    height: "130px",
    backgroundColor: "green",
    borderRadius: "90px",
    textAlign: "center",
    fontWeight: "500",
    fontSize: "51px",
    lineHeight: "130px",
    margin: "auto",
    marginLeft:45
  },
}));

export default function Profile() {
  const classes = useStyles();
  const user = myFirebase.auth().currentUser;
  return (
    <div className={classes.root}>
      <Grid container className={classes.containerall}>
        <Grid item md={12}>
          <Typography className={classes.header}>
            Quản lý thông tin cá nhân của bạn
          </Typography>
        </Grid>
        <Grid item md={12} className={classes.headerbot}>
          <Typography className={classes.header1}>
            Đây là nơi bạn có thể thay đổi thông tin hồ sơ của mình và tìm hiểu
            những gì người dùng và các Power-Ups khác sẽ có thể thấy. Để tìm
            hiểu thêm, hãy xem Điều khoản dịch vụ hoặc Chính sách Riêng tư của
            chúng tôi.
          </Typography>
        </Grid>
        <Grid item md={12} style={{ width: "100%" }}>
          <Typography className={classes.header2}>Về chúng tôi</Typography>
          <hr style={{ border: "1px solid black" }} />
        </Grid>
        <Grid item md={12} style={{ width: "100%" }}>
          <Grid container>
            <Grid item md={8} style={{ width: "60%" }}>
              <div>
                <Grid container>
                  <Grid item md={8} style={{ width: "50%" }}>
                    Tên đầy đủ
                  </Grid>
                  <Grid item md={4} style={{ width: "50%" }}>
                    <Grid container>
                      <Grid item md={22}>
                        <PublicIcon />
                      </Grid>
                      <Grid item md={10} style={{ fontSize: 12, marginTop: 5 }}>
                        luôn luôn Công Khai
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12} style={{ width: "100%" }}>
                  <TextField
                    style={{ borderRadius: "10px", backgroundColor: "#e6e6e6" }}
                    value={user.displayName}
                    variant="outlined"
                    multiline
                    fullWidth
                    className={classes.input}
                  ></TextField>
                </Grid>
              </div>
              <div>
                <Grid container>
                  <Grid item md={8} style={{ width: "50%" }}>
                    Email
                  </Grid>
                  <Grid item md={4} style={{ width: "50%" }}>
                    <Grid container>
                      <Grid item md={22}>
                        <PublicIcon />
                      </Grid>
                      <Grid item md={10} style={{ fontSize: 12, marginTop: 5 }}>
                        Luôn Luôn Công Khai
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12} style={{ width: "100%" }}>
                  <TextField
                    style={{ borderRadius: "10px", backgroundColor: "#e6e6e6" }}
                    value={user.email}
                    variant="outlined"
                    multiline
                    fullWidth
                    className={classes.input}
                  ></TextField>
                </Grid>
              </div>
              
            </Grid>
            <Grid item md={4} style={{ width: "40%" }}>
              <Grid container>
                <Grid
                  item
                  md={12}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Hình đại diện
                </Grid>
                <Grid item md={12} style={{ width: "100%" }}>
                  <img className={classes.photo} src={user.photoURL}></img>
                </Grid>
                <Grid
                  item
                  md={12}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  <Grid container>
                    <Grid item md={3}>
                      <PublicIcon style={{ float: "right" }} />
                    </Grid>
                    <Grid
                      item
                      md={7}
                      style={{ fontSize: 12, marginTop: 5, width: "80%" }}
                    >
                      Luôn Luôn Công Khai
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
