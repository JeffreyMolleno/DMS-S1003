import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  setFieldAlbumProperty,
  setFieldValue,
  deleteFieldValue,
  setDynamicFieldValue,
} from "../../Redux/Reducers/Slice/FieldsSlice";
import {
  getReferencedDataOfAlbumType,
  addBatchData,
  validateData,
} from "../../Server/FieldsQueries";
import { ConvertToDataFields } from "../../Normalizer/ObjectNormalizer";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export function InputFields({
  field_id,
  field_subject,
  value,
  input_type,
  considerations = null,
  label_subject,
  FieldsState,
  check_if_dynamic,
  parent,
}) {
  const [consolidateBatchData] = useMutation(addBatchData);
  const [validateDataCorelation] = useMutation(validateData);
  const [selectedDate, setSelectedDate] = React
    .useState
    // new Date("2020-06-18T21:11:54")
    ();

  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();

  const considerations_Process = async ({ process }) => {
    const { on_submit } = process;

    if (on_submit.data_album_type) {
      dispatch(setFieldAlbumProperty(on_submit.data_album_type));
    }

    if (on_submit.function) {
      const result_code = submit_process({
        process_type: on_submit,
        data_album_type: on_submit.data_album_type,
      });
    }
  };

  const submit_process = async ({ process_type, data_album_type }) => {
    switch (process_type.function) {
      case "register":
        const register_result = await consolidateBatchData({
          variables: {
            data_album_type: data_album_type,
            input: ConvertToDataFields(FieldsState.input),
          },
        });

        return null;

      case "register":
        const consolidate_result = await consolidateBatchData({
          variables: {
            data_album_type: data_album_type,
            input: ConvertToDataFields(FieldsState.input),
          },
        });

        return null;

      case "verify":
        const verify_result = await validateDataCorelation({
          variables: {
            verify_as: data_album_type,
            input: ConvertToDataFields(FieldsState.input),
          },
        });

        postProcess({
          result_code: verify_result.data.validateDataCorelation.code,
          post: {
            success: process_type.success,
            fail: process_type.fail,
          },
        });

        return null;
      default:
        break;
    }
  };

  const postProcess = async ({ post, result_code }) => {
    switch (result_code) {
      case 202: // validated
        if (post.success.redirect_to) {
          history.push(post.success.redirect_to);
        }
        return null;
      case 304: // data mismatch
        alert(post.fail.prompt);
        return null;
      case 404: // data not registered
        alert(post.fail.prompt);
        return null;
      default:
        break;
    }
  };

  const preFormDataGet = ({ field_subject }) => {
    if (!check_if_dynamic({ parent })) {
      return (
        FieldsState.input[field_subject] && FieldsState.input[field_subject]
      );
    } else {
      let parent_collection = FieldsState.new_dynamic_data.filter(
        (data) => data.parent === parent
      );

      return parent_collection.length > 0
        ? parent_collection[0].field_values[field_subject] ?? ""
        : "";
    }
  };

  const processInput = ({ value, attribute }) => {
    if (check_if_dynamic({ parent })) {
      return dispatch(
        setDynamicFieldValue({ parent, field_values: { [attribute]: value } })
      );
    }
    return dispatch(setFieldValue({ [attribute]: value }));
  };

  const handleDateChange = (date, attribute) => {
    processInput({ value: date.toString(), attribute });
    setSelectedDate(date);
  };

  return (
    <React.Fragment>
      {input_type === "button" && (
        <Button
          style={{ width: "230px", marginTop: "20px", borderRadius: "0%" }}
          color="primary"
          variant={value === "Login" ? "contained" : "outlined"}
          onClick={(e) => {
            e.preventDefault();
            if (considerations && considerations.Process !== null) {
              considerations_Process({ process: considerations.Process });
            }
          }}
        >
          {value}
        </Button>
      )}

      {(input_type === "text" || input_type === "number") && (
        <TextField
          style={{
            width: "100%",
          }}
          id="outlined-basic"
          label={label_subject.replace(/\%([^)]+)\%/g, "")}
          type={input_type}
          value={
            FieldsState.reset
              ? ""
              : preFormDataGet({ field_subject: label_subject })
          }
          onChange={(e) => {
            processInput({ value: e.target.value, attribute: field_subject });
          }}
          variant="outlined"
        />
      )}

      {input_type === "password" && (
        <TextField
          style={{
            width: "100%",
          }}
          id="outlined-basic"
          label={label_subject.replace(/\%([^)]+)\%/g, "")}
          type={input_type}
          autoComplete="current-password"
          value={value}
          onChange={(e) => {
            processInput({ value: e.target.value, attribute: field_subject });
          }}
          variant="outlined"
        />
      )}

      {input_type === "date_picker" && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{
              width: "100%",
            }}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label={label_subject.replace(/\%([^)]+)\%/g, "")}
            value={selectedDate}
            onChange={(value) => handleDateChange(value, field_subject)}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      )}

      <br />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const mapStateToProps = (state) => {
  return {
    ...state,
    FieldsState: state.Fields,
  };
};

const mapDispatch = {
  setFieldAlbumProperty,
  setFieldValue,
  deleteFieldValue,
  setDynamicFieldValue,
};

export default connect(mapStateToProps, mapDispatch)(InputFields);
