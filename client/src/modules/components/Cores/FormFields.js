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

export function FormFields({ fields_of_type, FieldsState }) {
  const dispatch = useDispatch();

  const { loading, error, data = [] } = useQuery(getReferencedFieldsOfAlbumType, {
    variables: { type_subject: fields_of_type },
  });
  
  return (
    <div>
      <br />
      <form>
        {loading && "Loading"}
        {data.getReferencedFieldsOfAlbumType &&
          data.getReferencedFieldsOfAlbumType.result.map((recieved_data) =>
            FormReducers(recieved_data)
          )}
        <br />
      </form>
    </div>
  );
}

export function FormReducers(data) {
  const considerations = JSON.parse(data.considerations) ?? null;

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
    default:
      break;
  }
}

// export function InputFields({
//   field_id,
//   field_subject,
//   value,
//   input_type,
//   considerations = null,
//   label_subject,
//   FieldsState,
// }) {
//   const dispatch = useDispatch();

//   const considerations_Process = ({ process }) => {
//     const { on_submit } = process;

//     if (on_submit.data_album_type) {
//       dispatch(
//         setFieldAlbumProperty({ data_album_type: on_submit.data_album_type })
//       );
//     }
//     console.log(on_submit.function);

//     if (on_submit.function) {
//       switch (on_submit.function) {
//         case "register":
//           console.log("fields", FieldsState);
//           //   // consolidateBatchData({
//           //   //   variables: {
//           //   //     input: ConvertToDataFields(state),
//           //   //     data_album_type: FieldsState.data_album_type.data_album_type,
//           //   //   },
//           //   // });
//           return null;
//         case "verify":
//           alert("verify");
//           return null;
//         default:
//           break;
//       }
//     }
//   };

//   return (
//     <React.Fragment>
//       {label_subject && <label>{label_subject}</label>}
//       <br />
//       <input
//         onClick={(e) => {
//           e.preventDefault();
//           if (considerations && considerations.Process !== null) {
//             considerations_Process({ process: considerations.Process });
//           }
//         }}
//         data-field_id={field_id}
//         data-field_subject={field_subject}
//         type={input_type}
//         value={value}
//       />
//       <br />
//     </React.Fragment>
//   );
// }

const mapStateToProps = (state) => {
  return {
    ...state,
    FieldsState: state.Fields,
  };
};

// const mapDispatchtoProps = { setFieldAlbumProperty };
const mapDispatch = { setFieldValue };

export default connect(mapStateToProps, mapDispatch)(FormFields);
