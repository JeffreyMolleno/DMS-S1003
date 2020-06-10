import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getReferencedFieldsOfAlbumType,
  addBatchData,
} from "../../Server/FieldsQueries";
import { useDispatch, connect } from "react-redux";
import { setFieldValue } from "../../Redux/Reducers/Slice/FieldsSlice";
import InputFields from "./InputFields";
import FormDialog from "../Periperhals/FormDialog";

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
  });

  const setConsiderationsStyling = (style) => {
    // console.log("style", style);

    // setStyling((prevState) => {
    //   return {
    //     ...prevState,
    //   };
    // });
  };

  return (
    !loading && (
      // <React.Fragment>
      // <br />
      // <form>
      // {loading && "Loading"}
      <div
        style={{
          width: "100%",
          ...styling.main,
        }}
      >
        {data.getReferencedFieldsOfAlbumType &&
          data.getReferencedFieldsOfAlbumType.result.map((recieved_data) =>
            FormReducers(recieved_data, setConsiderationsStyling)
          )}
      </div>
    )
    // <br />
    // </form>
    // </React.Fragment>
  );
}

export function FormReducers(data, callback) {
  const considerations = data.considerations
    ? JSON.parse(data.considerations)
    : null;

  if (considerations && considerations.Styling.position) {
    callback(considerations.Styling.position);
  }

  switch (data.field_type) {
    case "INPUT_FIELD_STRING":
      return (
        <div
          key={data.field_id}
          style={considerations && considerations.Styling}
        >
          <InputFields
            label_subject={data.main_subject}
            field_id={data.field_id}
            field_subject={data.main_subject}
            // value={}
            input_type={"text"}
            considerations={considerations}
          />
        </div>
      );
    case "INPUT_FIELD_PASSWORD":
      return (
        <div
          key={data.field_id}
          style={considerations && considerations.Styling}
        >
          <InputFields
            label_subject={data.main_subject}
            field_id={data.field_id}
            field_subject={data.main_subject}
            // value={}
            input_type={"password"}
            considerations={considerations}
          />
        </div>
      );
    case "BUTTON_SUBMIT_REGISTER":
      return (
        <div
          key={data.field_id}
          style={considerations && considerations.Styling}
        >
          <InputFields
            field_id={data.field_id}
            field_subject={data.main_subject}
            value={data.main_subject}
            input_type={"button"}
            considerations={considerations}
          />
        </div>
      );
    case "BUTTON_SUBMIT_LOGIN":
      return (
        <div
          key={data.field_id}
          style={considerations && considerations.Styling}
        >
          <InputFields
            field_id={data.field_id}
            field_subject={data.main_subject}
            value={data.main_subject}
            input_type={"button"}
            considerations={considerations}
          />
        </div>
      );
    case "COMPONENT_FORM_DIALOG":
      return (
        <div>
          <FormDialog title={data.main_subject} />
        </div>
      );
    case "FORM_HEADER":
      return (
        <div
          style={{
            color: "white",
            backgroundColor: "blue",
            fontSize: "0.8em",
            width: "90%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3>{data.main_subject}</h3>
        </div>
      );
    default:
      return null;
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    FieldsState: state.Fields,
  };
};

const mapDispatch = { setFieldValue };

export default connect(mapStateToProps, mapDispatch)(FormFields);
