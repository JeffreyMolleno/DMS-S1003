import { gql } from "apollo-boost";

export const getReferencedFieldsOfAlbumType = gql`
  query($type_subject: String!, $master: String, $showChild: Boolean) {
    getReferencedFieldsOfAlbumType(
      data_album_type: $type_subject
      master: $master
      showChild: $showChild
    ) {
      code
      message
      result {
        ... on Fields {
          field_id
          field_type
          main_subject
          sub_definition
          is_dynamic
          field_type
          master_subject
          show
          considerations
          album_definition
        }
      }
    }
  }
`;

export const addBatchData = gql`
  mutation($data_album_type: String!, $input: [BatchData]!) {
    consolidateBatchData(data_album_type: $data_album_type, input: $input) {
      code
      message
      result {
        ... on Data {
          data_id
          field_subject
          value
          data_album_id
        }
      }
    }
  }
`;

export const ConsolidateBatchDynamicData = gql`
  mutation($album_type: String, $album_id: String, $input: [DynamicDataInput]) {
    addBatchDynamicData(
      album_type: $album_type
      album_id: $album_id
      input: $input
    ) {
      code
      message
      result {
        ... on DynamicData {
          album_id
          masters {
            master_field
            batch_values {
              batch_id
              fields_values_set {
                dynad_id
                holding_value
                field_subject
              }
            }
          }
        }
      }
    }
  }
`;

export const validateData = gql`
  mutation($verify_as: String!, $input: [BatchData]) {
    validateDataCorelation(verify_as: $verify_as, input: $input) {
      code
      message
      result {
        ... on DataAlbum {
          data_album_id
          data_master_subject
          album_data_collection {
            data_id
            data_album_id
            field_subject
            value
          }
        }
      }
    }
  }
`;
