import {
  GET_FIELDS_OF_TYPE,
  SET_FIELD_ALBUM_PROPERTY,
} from "../Constants/FieldsConstants";
import { useQuery } from "@apollo/react-hooks";
import { getReferencedDataOfAlbumType } from "../../Server/FieldsQueries";

export function getFieldsOfType({ data }) {
  console.log("getting field type", data);

  // return (dispatch) => {
  //   const { loading, error, data } = useQuery(getReferencedDataOfAlbumType, {
  //     variables: { type_subject: "LOGIN_FIELDS" },
  //   });

  //   return { type: GET_FIELDS_OF_TYPE, payload: data };
  // };
}

export function setFieldAlbumProperty({ data }) {
  console.log("redux", data);

  return { type: SET_FIELD_ALBUM_PROPERTY, payload: data };
}
