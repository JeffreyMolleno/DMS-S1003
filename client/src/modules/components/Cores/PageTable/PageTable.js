import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainTable from "./MainTable";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getReferencedFieldsOfAlbumType } from "../../../Server/FieldsQueries";
import TableDataNormalizer from "../TableDataNormalizer";

export default function PageTable({ Parent = "Accounts" }) {
  const [state, setstate] = useState({ columns: [] });

  const { loading, error, data } = useQuery(getReferencedFieldsOfAlbumType, {
    variables: { type_subject: "", master: Parent, showChild: true },
  });

  const classes = useStyles();

  const tabledata = new TableDataNormalizer();

  useEffect(() => {
    tabledata.structureColumns({
      datafields: !loading && data.getReferencedFieldsOfAlbumType.result,
    });

    !loading &&
      setstate((prevState) => {
        return { ...prevState, columns: tabledata.getColumns() };
      });
  }, [data]);

  console.log({ data });

  return (
    <>
      <div className={classes.TableHeader}>
        <div className={classes.TitleContainer}>
          <div className={classes.Title}>{Parent}</div>
        </div>
        <div className={classes.OptionsContainer}>
          <div className={classes.Options}>Insigths</div>
          <div className={classes.Options}>Add Item</div>
        </div>
      </div>
      <div className={classes.TableOptionsContainer}>
        <div className={classes.TableFunctions}>
          <div className={classes.TableOptionsButtons}>
            <div id="circleIcon" className={classes.TitleInfo} />
            <div id="optionText" className={classes.TableOptionsText}>
              Filter
            </div>
          </div>
          <div className={classes.TableOptionsButtons}>
            <div id="circleIcon" className={classes.TitleInfo} />
            <div id="optionText" className={classes.TableOptionsText}>
              Sort
            </div>
          </div>
          <div className={classes.TableOptionsButtons}>
            <div id="circleIcon" className={classes.TitleInfo} />
            <div id="optionText" className={classes.TableOptionsText}>
              Columns
            </div>
          </div>
        </div>

        <div>
          {/* Search */}
          <input className={classes.searchArea} type="text" />
        </div>
      </div>

      <div>
        <MainTable Parent={Parent} Columns={state.columns} />
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  TableHeader: {
    width: "90%",
    margin: "10px auto 0px auto",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
  },
  TitleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  TitleInfo: {
    color: "grey",
    margin: "6px",
    border: "2px solid grey",
    borderRadius: "100%",
    padding: "4px",
    cursor: "pointer",
    "&:hover": {
      // borderColor: "rgb(22, 151, 238)",
      // background: "blue",
      //   color: "white",
      //   borderColor: "white",
    },
  },
  Title: {
    fontSize: "1.5em",
  },
  Options: {
    fontSize: "0.7em",
    color: "#B6B6B6",
    cursor: "pointer",
    "&:hover": {
      color: "rgb(22, 151, 238)",
    },
  },
  OptionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "150px",
  },

  TableOptionsContainer: {
    width: "90%",
    margin: "10px auto 0px auto",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
  },
  TableOptionsButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    "&:hover #circleIcon": {
      borderColor: "rgb(22, 151, 238)",
    },
    "&:hover": {
      color: "rgb(22, 151, 238)",
    },
  },
  TableOptionsText: {
    fontSize: "0.7em",
  },
  TableFunctions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "250px",
  },
  searchArea: {
    width: "200px",
    height: "20px",
    border: "1px solid grey",
    borderRadius: "20px",
    "&:focus": {
      borderRadius: "20px",
      borderColor: "20px",
    },
  },
}));
