const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # union Value = SingleData | DynamicData
  scalar ValueType
  scalar Date

  union MutationResult = Fields | Data | DataAlbum

  type Fields {
    field_id: ID!
    field_type: String!
    main_subject: String!
    sub_definition: String!
    is_dynamic: Boolean!
    master_subject: String
    show: Boolean!
    calculation: String
    considerations: String
    album_definition: String!
  }

  type Data {
    data_id: ID!
    data_album_id: ID!
    field_subject: String!
    value: String!
  }

  type ValueStructure {
    value: ValueType
    delta_data: ValueType
  }

  type DataAlbum {
    data_album_id: ID!
    data_album_type: String!
    data_master_subject: String!
    data_album_date_created: String
    album_data_collection: [Data]
  }

  type Query {
    getFields: [Fields]
    getAlbums(data_album_type: String): GeneralResponse
    getReferenceDataOfAlbum(albumId: ID): GeneralResponse
    getReferencedFieldsOfAlbumType(
      data_album_type: String!
      master: String
      showChild: Boolean
    ): GeneralResponse
    getFieldOfName(fieldName: String): GeneralResponse
  }

  type Mutation {
    createNewField(
      data_album_type: String!
      input: FieldInput!
    ): GeneralResponse
    createDataAlbum(input: AlbumDefinition): GeneralResponse
    consolidateNewData(input: DataFields!): GeneralResponse
    consolidateBatchData(
      data_album_type: String!
      input: [BatchData]
    ): GeneralResponse
    validateDataCorelation(
      input: [BatchData]
      verify_as: String!
    ): GeneralResponse
    updateField(fieldId: String!, input: FieldInput!): GeneralResponse
    updateFieldByName(
      fieldSubject: String!
      input: FieldInput!
    ): GeneralResponse
  }

  input FieldInput {
    field_type: String #!
    # field_description: String
    main_subject: String #!
    sub_definition: String #!
    is_dynamic: Boolean #!
    master_subject: String #!
    show: Boolean #!
    calculation: String
    considerations: String
  }

  input AlbumDefinition {
    data_album_type: String
    create_new: Boolean
  }

  input BatchData {
    field_subject: String!
    value: ValueType
  }

  input DataFields {
    data_album_id: ID # if present then perform update
    field_subject: String!
    value: String!
  }

  type GeneralResponse implements Response {
    code: Int!
    success: Boolean!
    message: String!
    result: [MutationResult]
  }

  interface Response {
    code: Int!
    success: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;
