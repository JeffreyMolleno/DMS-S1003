import React from "react";

export default function DynamicFields({ parent_field, fields_of_type }) {
  const dynamicDataStore = ({ parent_field, fields_of_type }) => {
    alert(parent_field + fields_of_type);
  };

  return (
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
  );
}
