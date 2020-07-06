import React from "react";
import { useDispatch, connect } from "react-redux";
import { setDynamicFieldValueToHold } from "../../Redux/Reducers/Slice/FieldsSlice";
import Table from "./Table";

export function DynamicFields({ parent_field, fields_of_type }) {
  const dispatch = useDispatch();

  const dynamicDataStore = ({ parent_field, fields_of_type }) => {
    console.log(parent_field);
    dispatch(setDynamicFieldValueToHold({ parent_field }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          fontSize: "0.8em",
          color: "#c4c4c4",
          border: "1px dashed #c4c4c4",
          borderRadius: "4px",
          padding: "10px 0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          dynamicDataStore({
            parent_field,
            fields_of_type,
          });
        }}
      >
        click to add another data of above fields
      </div>
      <div style={{ width: "100%" }}>
        <Table Parent={parent_field} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatch = { setDynamicFieldValueToHold };

export default connect(mapStateToProps, mapDispatch)(DynamicFields);
