import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

export default function MainTable() {
  const [state, setstate] = useState({ columns: [], data: [] });

  return (
    <div>
        <DataTable
            // columns={[]}
        />
    </div>
  );
}

const customStyles = {
  rows: {
    style: {
      // minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      height: "0px",
      color: "red",
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
};
