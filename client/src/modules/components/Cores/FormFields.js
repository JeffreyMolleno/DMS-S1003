import React, { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getReferencedFieldsOfAlbumType,
  addBatchData,
} from "../../Server/FieldsQueries";
import { useDispatch, connect } from "react-redux";
import { setFieldValue } from "../../Redux/Reducers/Slice/FieldsSlice";
import InputFields from "./InputFields";
import FormDialog from "../Periperhals/FormDialog";
import FormReducers from "./FormReducers";

export function FormFields({
  fields_of_type,
  FieldsState,
  master,
  showChild = false,
}) {
  const { loading, error, data = [] } = useQuery(
    getReferencedFieldsOfAlbumType,
    {
      variables: { type_subject: fields_of_type, master, showChild },
    }
  );

  const [styling, setStyling] = useState({
    main: {
      display: "grid",
      gridTemplateAreas: `'initial'`,
      justifyContent: "center",
    },
    elements: {},
    grid: {},
  });

  const setConsiderationsStyling = (style) => {
    setStyling((prevState) => {
      return {
        ...prevState,
        grid: style,
      };
    });
  };

  const formReducers = useMemo(
    () => (
      <FormReducers
        fields={
          data.getReferencedFieldsOfAlbumType &&
          data.getReferencedFieldsOfAlbumType.result
        }
        styleFunc={setConsiderationsStyling}
      />
    ),
    [
      data.getReferencedFieldsOfAlbumType &&
        data.getReferencedFieldsOfAlbumType.result,
    ]
  );

  return (
    !loading && (
      <div
        style={{
          width: "100%",
          ...styling.main,
          gridTemplateAreas: styling.grid,
        }}
      >
        {loading && "Loading"}
        {data.getReferencedFieldsOfAlbumType && formReducers}
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
    FieldsState: state.Fields,
  };
};

const mapDispatch = { setFieldValue };

export default connect(mapStateToProps, mapDispatch)(FormFields);
