import { Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import React, { useEffect, useState } from "react";
import { myFirebase } from "../../firebase/firebase";
import Comment from "./Comment";
import { useParams } from "react-router-dom";

export default function CommentList({ indexCard, indexList }) {
  const [commentList, setCommentList] = useState();
  const params = useParams();
  const boardID = params.id
  useEffect(() => {
    const commentRef = myFirebase.database().ref("/board/" + boardID + "/lists/" + indexList + "/cards/" + indexCard + "/Comment/");
    commentRef.on("value", (snapshot) => {
      const comments = snapshot.val();
      const commentList = [];
      for (let id in comments) {
        commentList.push({ id, ...comments[id] });
      }
      setCommentList(commentList);
    });
  }, []);
  // console.log(commentList,'commentList  ')
  return (
    <Grid container spacing={3} >
      <Grid item xs={12} sm={12}>
        <CardContent >
          <Grid container>
            <Grid item md={8} style={{ width: "58%" }}>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Grid container>
                    <Grid item md={11}>
                      {commentList
                        ? commentList.map((comment, index) => (
                          <Comment comment={comment} key={index} indexCard={indexCard} boardId={boardID} indexList={indexList} />
                        ))
                        : ""}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  );
}
