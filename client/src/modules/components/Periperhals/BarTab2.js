import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function BarTab2(props) {
  const classes = useStyles();

  return (
    <div
      className={classes.maxContainer}
      onClick={() => {
        // props.accessPage(props.jumpto);
      }}
    >
      <div className={classes.tabContainer}>
        <div id="circleIcon" className={classes.circleIcon}/>
        <div className={classes.mainTitle}>{props.barTitle}</div>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  circleIcon: {
    width: "12.5px",
    height: "12.5px",
    borderRadius: "100%",
    border: "2px white solid",
    margin: "0 20px 0 30px",
    "&:hover": {
      border: "2px #1697EE solid",
      background: "white",
    },
  },
  tabContainer: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "200px",
    height: "30px",
    borderRadius: "30px",
    color: "white",
    "&:hover": {
      background: "white",
      color: "#1697EE",
    },
  },
  mainTitle: {
    // marginLeft: "20px",
    fontSize: "0.8em",
  },
  maxContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin:"20px 0",
    "&:hover #circleIcon": {
      border: "2px #1697EE solid",
      background: "white",
    },
  },
}));
