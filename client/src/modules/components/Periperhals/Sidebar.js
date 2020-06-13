import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getReferencedFieldsOfAlbumType } from "../../Server/FieldsQueries";
import { makeStyles } from "@material-ui/core/styles";
import BarTab2 from "./BarTab2";
import ArrayArrange from "../Cores/ArrayArrange";

export default function Sidebar() {
  const { loading, error, data = [] } = useQuery(
    getReferencedFieldsOfAlbumType,
    {
      variables: { type_subject: "SIDEBAR_LINKS" },
    }
  );

  const classes = useStyles();

  let sidebar_positional = new ArrayArrange();

  const reorderLinks = () => {
    data.getReferencedFieldsOfAlbumType &&
      data.getReferencedFieldsOfAlbumType.result.map((sdata) => {
        let styling_considerations =
          sdata.considerations && JSON.parse(sdata.considerations);

        if (
          styling_considerations.Styling &&
          styling_considerations.Styling.grid.order_of_appearance
        ) {
          sidebar_positional.addArrayPair({
            child: sdata.main_subject,
            parent:
              styling_considerations.Styling.grid.order_of_appearance.after,
          });
        } else {
          sidebar_positional.addArrayPair({
            child: sdata.main_subject,
            parent: null,
          });
        }
      });

    return sidebar_positional.getArrayPairs().length
      ? sidebar_positional.arrangePairs({
          pairs: sidebar_positional.getArrayPairs(),
        })
      : null;
  };

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
          reorderLinks().map((data) => (
            <div>
              <BarTab2 barTitle={data} />
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
