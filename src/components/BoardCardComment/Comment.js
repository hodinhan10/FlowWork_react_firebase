import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 540,
  },
  media: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 10,
  },
  media1: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginTop: 15,
    marginLeft: 10,
  },
  name: {
    marginTop: -41,
  },
  name1: {
    marginTop: 0,
  },
  datetime: {
    marginTop: -28,
    marginRight: 565,
  },
  edit: {
    marginTop: 10,
    marginRight: 695,
  },

  textcmt: {
    marginRight: 0,
  },
  textcmt1: {
    marginBottom: 5,
  },
  buttoncmt: {
    marginTop: 10,
    marginRight: 0,
  },
  buttoncmt2: {
    marginTop: 10,
    marginLeft: 5,
  },
}));
export default function Comment({ comment, indexCard, boardId, indexList }) {
  const [titleEit, setTitleEit] = useState(comment.title);
  const [checkclick, setCheckclick] = useState(false);
  const params = useParams();
  const boardID = params.id;
  const user = myFirebase.auth().currentUser;
  const deleteComment = () => {
    const commentRef = myFirebase
      .database()
      .ref(
        "/board/" +
          boardID +
          "/lists/" +
          indexList +
          "/cards/" +
          indexCard +
          "/Comment/"
      )
      .child(comment.id);
    commentRef.remove();
  };

  const editComment = () => {
    const commentRef = myFirebase
      .database()
      .ref(
        "/board/" +
          boardID +
          "/lists/" +
          indexList +
          "/cards/" +
          indexCard +
          "/Comment/"
      )
      .child(comment.id);
    commentRef.update({
      title: titleEit,
      time: new Date().toISOString(),
    });
  };
  const userID= myFirebase.auth().currentUser.uid

  const handleOnChange = (e) => {
    setTitleEit(e.target.value);
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {checkclick === false ? (
          <>
            <Grid container spacing={3} style={{ width: 400 }}>
              <Grid item md={2}>
                <CardMedia
                  variant="contained"
                  className={classes.media1}
                  image={comment.userImage}
                />
              </Grid>
              <Grid item md={10} style={{ width: "40%" }}>
                <Grid item md={12}>
                  <b>{comment.email}</b>
                  {` - `}
                  <Moment toNow>{comment.time}</Moment>
                </Grid>
                <Grid item md={12}>
                  <TextField
                    multiline
                    className={classes.textcmt1}
                    style={{ width: "173%" }}
                    variant="outlined"
                    size="small"
                    placeholder="Viết bình luận..."
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={handleOnChange}
                    name="comment"
                    onFocus={(ee) => setCheckclick(true)}
                    defaultValue={comment.title}
                  />
                  <Grid container style={{ width: 500 }}>
                    <Grid item md={12}>
                      
                     {userID == comment.userId ? <span tyle={{ fontSize: 13 }} onMouseDown={deleteComment}>
                        <a style={{ cursor: "pointer" }}>Xóa</a>
                      </span> : isAdmin === <span tyle={{ fontSize: 13 }} onMouseDown={deleteComment}>
                        <a style={{ cursor: "pointer" }}>Xóa</a></span> }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container>
              <Grid item md={2}>
                <CardMedia
                  variant="contained"
                  className={classes.media}
                  image={comment.userImage}
                />
              </Grid>
              <Grid item md={10}>
                <Typography
                  variant="subtitle1"
                  className={classes.name1}
                  gutterBottom
                  style={{ fontSize: 16, width: "100%" }}
                >
                  <b>{comment.email}</b>
                  {` - `}
                  <Moment toNow>{comment.time}</Moment>
                </Typography>
             
              {userID == comment.userId ?
              <TextField
              multiline
              className={classes.textcmt}
              style={{ width: "180%" }}
              name="comment"
              placeholder="Sửa bình luận..."
              variant="outlined"
              size="small"
              defaultValue={comment.title}
              onChange={handleOnChange}
              value={titleEit}
            /> :
            <TextField
            multiline
            className={classes.textcmt}
            style={{ width: "180%" }}
            name="comment"
            disabled
            InputProps={{
              readOnly: true,
            }}
            placeholder="Sửa bình luận..."
            variant="outlined"
            size="small"
            defaultValue={comment.title}
            onChange={handleOnChange}
            value={titleEit}
          />
            
            }
                <Grid container>
                  <Grid item md={4}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      className={classes.buttoncmt}
                      style={{ backgroundColor: "cyan" }}
                      onMouseDown={editComment}
                      onFocus={() => setCheckclick(false)}
                     
                    >
                      Lưu
                    </Button>
                  </Grid>
                  <Grid item md={4}>
                    <Button
                      size="small"
                      color="primary"
                      onFocus={() => setCheckclick(false)}
                      className={classes.buttoncmt2}
                      style={{ backgroundColor: "cyan", color: "black" }}
                    >
                      Đóng
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <div></div>
      </div>
    </>
  );
}
