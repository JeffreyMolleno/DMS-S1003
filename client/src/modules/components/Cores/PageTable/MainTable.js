import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import {
  getReferencedFieldsOfAlbumType,
  addBatchData,
} from "../../../Server/FieldsQueries";
import { getDataOfAlbumType } from "../../../Server/DataQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import TableDataNormalizer from "../../Cores/TableDataNormalizer";

export default function MainTable({ Parent, Columns = [] }) {
  const [state, setstate] = useState({ columns: [], data: [] });

  const { loading, error, data } = useQuery(getDataOfAlbumType, {
    variables: { data_album_type: Parent },
  });

  const tabledata = new TableDataNormalizer();

  useEffect(() => {
    !loading &&
      tabledata.setTableData({
        data: data.getAlbums.result,
      });

    !loading &&
      setstate((prevState) => {
        return { ...prevState, data: tabledata.normalizeDataFromServer() };
      });
  }, [loading, data]);

  const data_test = [
    { id: 1, title: "Conan the Barbarian", year: "1982" },
    { id: 1, title: "Conan the Barbarian", year: "1982" },
    { id: 1, title: "Conan the Barbarian", year: "1982" },
  ];

  const columns_test = [
    {
      name: "First Name",
      selector: "First Name",
      sortable: true,
    },
    {
      name: "Company",
      selector: "Company",
      sortable: true,
      right: true,
    },
  ];

  return (
    <div style={{ width: "93.5%", margin: "0 auto", marginTop: "10px" }}>
      <DataTable
        // title={"test"}
        columns={Columns}
        data={state.data}
        customStyles={customStyles}
      />
    </div>
  );
}

const customStyles = {
  header: {
    style: {
      // backgroundColor: "#1697EE",
      minHeight: "0px",
    },
  },
  // head:{
  //   style:{
  //     margin:"20px"
  //   }
  // },
  headRow: {
    style: {
      backgroundColor: "#1697EE",
      color: "#1697EE",
    },
  },
  headCells: {
    style: {
      color: "white",
    },
  },
  rows: {
    headCells: {
      style: {
        height: "0px",
        color: "red",
        // backgroundColor: "#1697EE",

        // paddingLeft: "8px", // override the cell padding for head cells
        // paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  },
};
