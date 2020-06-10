import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getReferencedFieldsOfAlbumType } from "../../Server/FieldsQueries";
import { makeStyles } from "@material-ui/core/styles";
import BarTab2 from "./BarTab2";

export default function Sidebar() {
  const { loading, error, data = [] } = useQuery(
    getReferencedFieldsOfAlbumType,
    {
      variables: { type_subject: "SIDEBAR_LINKS" },
    }
  );

  const classes = useStyles();


  return (
    <div
      className="sidebar-container"
      style={{
        background: "#1697EE",
        height: "100vh",
        width: "275px",
        borderRight: "1px solid #e4e4e4",
      }}
    >
      <div
        className="sidebar-title"
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
        }}
      >
        System Title Here
      </div>
      {loading && "Loading"}
      <div>
        {data.getReferencedFieldsOfAlbumType &&
          data.getReferencedFieldsOfAlbumType.result.map((recieved_data) => (
            <div>
              <BarTab2 barTitle={recieved_data.main_subject} />
            </div>
          ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  sidebarBtnContainer: {
    width: "200px",
    color: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
  sidebarBtn: {
    "&:hover": {
      color: "red",
    },
  },
}));
