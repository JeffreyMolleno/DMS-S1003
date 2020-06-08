import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getReferencedFieldsOfAlbumType,
  addBatchData,
} from "../../Server/FieldsQueries";
import { useDispatch, connect } from "react-redux";
import {
  setFieldAlbumProperty,
  setFieldValue,
} from "../../Redux/Reducers/Slice/FieldsSlice";
import InputFields from "./InputFields";
import FormDialog from "../Periperhals/FormDialog";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

export function FormFields({ fields_of_type, FieldsState, master }) {
  const dispatch = useDispatch();

  const { loading, error, data = [] } = useQuery(
    getReferencedFieldsOfAlbumType,
    {
      variables: { type_subject: fields_of_type, master },
    }
  );

  return (
    !loading &&
    // <React.Fragment>
    // <br />
    // <form>
    // {loading && "Loading"}
    data.getReferencedFieldsOfAlbumType &&
    data.getReferencedFieldsOfAlbumType.result.map((recieved_data) =>
      FormReducers(recieved_data)
    )
    // <br />
    // </form>
    // </React.Fragment>
  );
}

export function FormReducers(data) {
  const considerations = data.considerations
    ? JSON.parse(data.considerations)
    : null;

  switch (data.field_type) {
    case "INPUT_FIELD_STRING":
      return (
        <div key={data.field_id}>
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
        <div key={data.field_id}>
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
        <div key={data.field_id}>
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
        <div key={data.field_id}>
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
    // return data.main_subject;
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
