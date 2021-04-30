import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import WorkIcon from '@material-ui/icons/Work';

export default function CheckList({ indexCard, indexList }) {

  const useStyles = makeStyles((theme) => ({
    listcv: { "display": "flex", "justifyContent": "space-between", "alignItems": "center", "flexFlow": "row wrap", marginTop: -18, }

  }));
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Grid container>
          <Grid item md={1} >
            <WorkIcon />
          </Grid>
          <Grid item md={11} >
            {/* <div className={classes.listcv}>
              <h3 >công việc phải làm</h3>
            </div> */}
            <Form indexCard={indexCard} indexList={indexList} style={{ marginTop: '10px' }} />
            <TodoList indexCard={indexCard} indexList={indexList} />

          </Grid>
        </Grid>
      </Grid>

    </>
  );
}
