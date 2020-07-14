import { gql } from "apollo-boost";

export const getDataOfAlbumType = gql`
  query($data_album_type: String!) {
    getAlbums(data_album_type: $data_album_type) {
      code
      message
      result {
        ... on DataAlbum {
          data_album_type
          data_album_id
          data_master_subject
          data_album_date_created
          album_data_collection {
            # data_id
            data_album_id
            field_subject
            value
          }
        }
      }
    }
  }
`;
