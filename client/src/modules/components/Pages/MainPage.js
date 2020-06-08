import React from "react";
import Sidebar from "../Periperhals/Sidebar";
// import TabPage from "../../";
import TabPage from "./TabPage";
import { makeStyles } from "@material-ui/core/styles";

export default function MainPage() {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <Sidebar />
      <TabPage />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
  },
}));
