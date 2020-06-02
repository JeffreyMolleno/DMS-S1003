const resolvers = {
  DataAlbum: {
    async album_data_collection(parent, args, context, info) {
      return context.dataSources.Base.getDataOfAlbum({
        data_album_id: parent.data_album_id,
      });
    },
  },
  Fields: {
    async album_definition(parent, args, context, info) {
      const result = await context.dataSources.Base.getAlbumType({
        data_album_id: parent.album_id,
      });
      return result.result[0].data_album_type;
    },
    async field_type(parent, args, context, info) {
      const result = await context.dataSources.Base.getTypeSubject({
        type_id: parent.field_type,
      });

      return result[0].type_subject;
    },
  },
  Query: {
    async getFields(_, __, context) {
      return await context.dataSources.Base.getAllFields();
    },
    async getAlbums(_, __, context) {
      return await context.dataSources.Base.getAlbums();
    },
    async getReferenceDataOfAlbum(parent, args, context, info) {
      return await context.dataSources.Base.getReferencedDataOfAlbum({
        data_album_id: args.albumId,
      });
    },
    async getReferencedFieldsOfAlbumType(parent, args, context, info) {
      return await context.dataSources.Base.getReferencedFieldsOfAlbumType({
        data_album_type: args.data_album_type,
      });
    },
  },
  Mutation: {
    async createNewField(parent, args, context, info) {
      return await context.dataSources.Base.consolidateNewFields(args);
    },
    async createDataAlbum(parent, args, context, info) {
      return await context.dataSources.Base.createDataAlbum(args.input);
    },
    async consolidateNewData(parent, args, context, info) {
      return await context.dataSources.Base.consolidateNewData(args.input);
    },
    async consolidateBatchData(parent, args, context, info) {
      return await context.dataSources.Base.consolidateBatchData(args);
    },
    async validateDataCorelation(parent, args, context, info) {
      // console.log('validation process')
      return await context.dataSources.Base.validateDataCorelation(args);
    },
  },
  MutationResult: {
    __resolveType(obj, context, info) {
      console.log(obj)
      if (obj.field_type) return "Fields";
      if (obj.data_id !== undefined) return "Data";
      if (obj.data_album_type) return "DataAlbum";
      if (obj[0].data_id !== undefined) return "Data";
    },
  },
  Response: {
    __resolveType(obj, context, info) {
      return null;
    },
  },
};

module.exports = resolvers;
