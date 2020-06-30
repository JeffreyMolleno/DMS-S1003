import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { dispatch, connect } from "react-redux";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getReferencedFieldsOfAlbumType,
  addBatchData,
} from "../../Server/FieldsQueries";
import TableDataNormalizer from "../Cores/TableDataNormalizer";
import Button from "@material-ui/core/Button";

export function Table({ FieldState, Parent }) {
  const [state, setstate] = useState({ columns: [], data: [] });

  const { loading, error, data } = useQuery(getReferencedFieldsOfAlbumType, {
    variables: { type_subject: "", master: "References", showChild: true },
  });

  const tabledata = new TableDataNormalizer();

  useEffect(() => {
    if (FieldState.hold_dynamic_data !== []) {
      let data_to_proc =
        FieldState.hold_dynamic_data.length > 0 &&
        FieldState.hold_dynamic_data.filter(
          (data) => data.parent != undefined && data.parent === Parent
        );
      tabledata.setTableData({ data: data_to_proc });
      tabledata.structureColumns({
        datafields: !loading && data.getReferencedFieldsOfAlbumType.result,
      });
      setstate((prevState) => {
        return {
          ...prevState,
          columns: tabledata.getColumns(),
          data: tabledata.getTableData(),
        };
      });
    }
  }, [FieldState.hold_dynamic_data]);

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const data_test = [
    {
      // id: 1,
      "Name %References%": "Conan the Barbarian",
      "Contact Number": "1982",
    },
  ];

  const columns = [
    {
      name: "Contact Number",
      selector: "Contact Number",
      sortable: true,
    },
    {
      name: "Name",
      selector: "Name %References%",
      sortable: true,
      // right: true,
    },
  ];

  const handleClick = (data) => {
    console.log(data);
  };

  return (
    <DataTable
      title={Parent}
      columns={[
        ...state.columns,
        {
          cell: (row) => (
            <Button raised primary onClick={() => handleClick(row)}>
              Action
            </Button>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
      ]}
      data={state.data}
      customStyles={customStyles}
    />
  );
}

const mapStateToProps = (state) => {
  return { FieldState: state.Fields };
};

const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(Table);
