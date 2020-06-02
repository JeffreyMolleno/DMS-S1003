import React from "react";
import { useDispatch, connect } from "react-redux";
import { getFieldsOfType } from "../../Redux/Actions/FieldsActions";
import FormfFields from "../Cores/FormFields";
import { makeStyles } from "@material-ui/core/styles";

export function LoginPage() {
  const classes = useStyles();

  return (
    <div className={classes.base}>
      <div className={classes.fieldContainer}>
        <div className={classes.companyTitle}>Title and logo here</div>

        <FormfFields fields_of_type={"LOGIN_FIELDS"} />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  base: {
    background: "#1697EE",
    width: "100%",
    height: "100vh",
  },
  fieldContainer: {
    background: "white",
    width: "400px",
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position:"relative",
    left:"65%",
    top:"5%"
  },
  companyTitle: {
    paddingBottom: "100px",
  },
}));

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchtoProps = { getFieldsOfType };

export default connect(mapStateToProps, mapDispatchtoProps)(LoginPage);
