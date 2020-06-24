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
  // DynamicData: {
  // async masters(parent, args, context, info) {
  // console.log(parent)
  // if (parent.masters) {
  //   return parent.masters;
  // }
  //   const result = await context.dataSources.Base.getMasters({
  //     album_id: parent.album_id,
  //   });
  //   return result;
  // },
  // },
  // MastersBatchCollection: {
  //   async batch_values(parent, args, context, info) {
  //     const result = await context.dataSources.Base.getBatchSet({
  //       master: parent.master_field,
  //     });
  //     return result;
  //   },
  // },
  FieldValueBatchSet: {
    async fields_values_set(parent, args, context, info) {
      const result = await context.dataSources.Base.getBatchFieldValues({
        batch_id: parent.batch_id,
      });

      return result;
    },
  },
  Query: {
    async getFields(_, __, context) {
      return await context.dataSources.Base.getAllFields();
    },
    async getAlbums(_, args, context) {
      return await context.dataSources.Base.getAlbums({
        data_album_type: args.data_album_type,
      });
    },
    async getReferenceDataOfAlbum(parent, args, context, info) {
      return await context.dataSources.Base.getReferencedDataOfAlbum({
        data_album_id: args.albumId,
      });
    },
    async getReferencedFieldsOfAlbumType(parent, args, context, info) {
      return await context.dataSources.Base.getReferencedFieldsOfAlbumType({
        data_album_type: args.data_album_type,
        master: args.master,
        showChild: args.showChild,
      });
    },
    async getFieldOfName(parent, args, context, info) {
      return await context.dataSources.Base.getFieldOfName(args.fieldName);
    },
    async getDynamicDataByAlbum(parent, args, context, info) {
      return await context.dataSources.Base.getDynamicDataByAlbum({album_id: args.album_id});
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
      return await context.dataSources.Base.validateDataCorelation(args);
    },
    async updateField(parent, args, context, info) {
      return await context.dataSources.Base.updateField(args);
    },
    async updateFieldByName(parent, args, context, info) {
      return await context.dataSources.Base.updateFieldByName(args);
    },
    async addBatchDynamicData(parent, args, context, info) {
      const result = await context.dataSources.Base.addBatchDynamicData(args);

      return result;
    },
  },
  MutationResult: {
    __resolveType(obj, context, info) {
      // console.log(obj);
      if (obj.dynamic_data) return "DynamicData";
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
