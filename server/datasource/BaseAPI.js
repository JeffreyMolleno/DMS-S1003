const { DataSource } = require("apollo-datasource");
const { genKey } = require("./keygen");

class BaseAPI {
  constructor({ store }) {
    this.store = store;
    this.tree = [];
  }

  initialize(config) {
    this.context = config.context;
  }

  async consolidateNewFields(data) {
    const {
      field_type,
      field_description,
      main_subject,
      sub_definition,
      is_dynamic,
      master_subject,
      show,
      calculations,
      considerations,
    } = data.input;

    const album_definition = await this.createDataAlbum({
      data_album_type: data.data_album_type,
    });

    const field_definition = await this.CreateOrRetrieveTypeSubject({
      subject: field_type,
      definition: field_description,
    });

    const existing = await this.getField({ subject: main_subject });

    if (existing.length) {
      return {
        code: 500,
        message: `Field of subject '${main_subject}' already existing`,
        result: null,
      };
    }

    return {
      code: 200,
      message: `Field of subject '${main_subject}' succesfully created`,
      result: [
        await this.context.db.fields.insert({
          field_id: genKey("fields"),
          field_type: field_definition.type_id,
          main_subject,
          sub_definition,
          is_dynamic,
          master_subject,
          show,
          calculations,
          considerations,
          album_id: album_definition.result[0].data_album_id,
        }),
      ],
    };
  }

  async getField({ subject, field_id }) {
    if (subject) {
      return await this.context.db.fields.where(`main_subject='${subject}'`);
    }

    if (field_id) {
      return await this.context.db.fields.where(`field_id='${field_id}'`);
    }
  }

  async getAllFields() {
    // const result = await this.context.db.query(
    //   "SELECT field_id,types.type_subject as field_type, main_subject, sub_definition, is_dynamic, master_subject, show, calculations, considerations, album_id FROM fields INNER JOIN album ON fields.album_id = album.data_album_id INNER JOIN types ON fields.field_type = types.type_id;"
    // );

    const result = await this.context.db.query(`SELECT * FROM fields`);

    return result;
  }

  async CreateOrRetrieveTypeSubject({ subject, definition }) {
    const result = await this.getTypeSubject({ subject });

    if (result.length) {
      return result[0];
    }

    return await this.createTypeSubject({ subject, definition });
  }

  async createTypeSubject({ subject, definition }) {
    return await this.context.db.types.insert({
      type_id: genKey("type"),
      type_subject: subject,
      type_description: definition,
    });
  }

  async getTypeSubject({ subject, type_id }) {
    if (subject) {
      return await this.context.db.types.where(`type_subject = '${subject}'`);
    }

    if (type_id) {
      return await this.context.db.types.where(`type_id = '${type_id}'`);
    }
  }

  async createDataAlbum({ data_album_type, create_new = false }) {
    // check if data_album_type is existing
    const result = await this.getAlbumType({ data_album_type });

    if (result.result.length && !create_new) {
      return result;
    }

    return {
      code: 202,
      message: "Created new data album definition",
      result: [
        await this.context.db.album.insert({
          data_album_id: genKey("album"),
          data_album_type,
          data_master_subject: genKey(data_album_type),
          date_created: new Date().toString(),
        }),
      ],
    };
  }

  async getAlbumType({ data_album_type, data_album_id }) {
    if (data_album_type) {
      const result = await this.context.db.album.where(
        `data_album_type = '${data_album_type}'`
      );
      return {
        code: 202,
        message: `Retrieving data album definition of subject' ${data_album_type}'`,
        result: result,
      };
    }

    if (data_album_id) {
      const result = await this.context.db.album.where(
        `data_album_id = '${data_album_id}'`
      );
      return {
        code: 202,
        message: `Retrieving data album definition of subject' ${data_album_id}'`,
        result: result,
      };
    }
  }

  async getAlbums({ data_album_type }) {
    const result = await this.context.db.query(
      data_album_type
        ? `SELECT * FROM album WHERE data_album_type = '${data_album_type}'`
        : `SELECT * FROM album`
    );
    return {
      code: 202,
      message: data_album_type
        ? `Retrieving all registered data of album ${data_album_type} `
        : `Retrieving all registered data albums definitions and correlated data`,
      result: result,
    };
  }

  async getReferencedDataOfAlbum({ data_album_id }) {
    const result = await this.context.db.album.where(
      `data_album_id='${data_album_id}'`
    );

    return {
      code: 202,
      message: `Retrieving all registered data on album with id ${data_album_id}`,
      result: result,
    };
  }

  async updateField(data) {
    const result = await this.context.db.fields.update(
      { field_id: data.fieldId },
      { ...data.input }
    );

    return {
      code: 202,
      message: `Updated field of Id ${data.fieldId}`,
      result: result,
    };
  }

  async updateFieldByName(data) {
    const result = await this.context.db.fields.update(
      { main_subject: data.fieldSubject },
      { ...data.input }
    );

    return {
      code: 202,
      message: `Updated field of subject ${data.fieldSubject}`,
      result: result,
    };
  }

  async getReferencedFieldsOfAlbumType({
    data_album_type = "",
    master,
    showChild,
  }) {
    let result = [];

    if (master && showChild) {
      result = await this.getTree({ data_album_type, master });
    } else if (master) {
      result = await this.getdbChilds({ data_album_type, master });
    } else {
      result = await this.context.db.query(
        `SELECt * FROM fields INNER JOIN album ON fields.album_id = album.data_album_id WHERE data_album_type = '${data_album_type}'`
      );
    }

    return {
      code: 202,
      message: `Retrieving all registered data on album with id ${data_album_type}`,
      result: result,
    };
  }
  async getdbChilds({ data_album_type, master }) {
    if (data_album_type) {
      return await this.context.db.query(
        `SELECt * FROM fields INNER JOIN album ON fields.album_id = album.data_album_id WHERE data_album_type = '${data_album_type}'  AND master_subject = '${master}'`
      );
    }

    return await this.context.db.query(
      `SELECt * FROM fields INNER JOIN album ON fields.album_id = album.data_album_id WHERE master_subject = '${master}'`
    );
  }

  async getTree({ data_album_type, master }) {
    let node = await this.getdbChilds({ data_album_type, master });

    await Promise.all(
      node.map(async (data) => {
        await this.getTree({ data_album_type, master: data.main_subject });
        this.tree.push(data);
      })
    );

    return this.tree.reverse();
  }

  async consolidateNewData(data) {
    const { data_album_id, field_subject, value } = data;

    // check if data_album_id is existing, continue on true return error on false
    const existing = await this.getAlbumType({ data_album_id: data_album_id });

    const field_definition = await this.getField({ subject: field_subject });

    if (existing.result.length && field_definition[0].field_id) {
      const result = await this.context.db.data.insert({
        data_id: genKey("data"),
        data_album_id: data_album_id,
        field_subject_id: field_definition[0].field_id,
        holding_value: value,
      });

      return {
        code: 202,
        message: `Considitating new data successful`,
        result: [
          {
            data_id: result.data_id,
            data_album_id: result.data_album_id,
            value: value,
            field_subject: field_definition[0].main_subject,
          },
        ],
      };
    }

    return {
      code: 401,
      message: `Non existing reference data`,
      result: null,
    };
  }

  async insertNewData({ data_album_id, field_subject, holding_value }) {
    const field_definition = await this.getField({ subject: field_subject });

    const result = await this.context.db.data.insert({
      data_id: genKey("data"),
      data_album_id: data_album_id,
      field_subject_id: field_definition[0].field_id,
      holding_value: holding_value,
    });

    return {
      data_id: result.data_id,
      data_album_id: result.data_album_id,
      field_subject: field_definition[0].main_subject,
      value: result.holding_value,
    };
  }

  async consolidateBatchData(data) {
    // create a unique album id for reference

    const data_album_definition = await this.createDataAlbum({
      data_album_type: data.data_album_type,
      create_new: true,
    });

    let result = [];

    let promRes = await Promise.all(
      data.input.map(async (data) => {
        let consolidation = await this.insertNewData({
          data_album_id: data_album_definition.result[0].data_album_id,
          field_subject: data.field_subject,
          holding_value: data.value,
        });

        result.push(consolidation);
        return result;
      })
    );

    return {
      code: 202,
      message: `Considitating Batch data successful`,
      result: promRes[0],
    };
  }

  async getDataOfAlbum({ data_album_id }) {
    const result = await this.context.db.data.where(
      `data_album_id='${data_album_id}'`
    );

    let promRes = [];
    const normalize = await Promise.all(
      result.map(async (data) => {
        const field_definition = await this.getField({
          field_id: data.field_subject_id,
        });

        promRes.push({
          data_id: data.data_id,
          data_album_id: data.data_album_id,
          field_subject: field_definition[0].main_subject,
          value: data.holding_value,
        });

        return promRes;
      })
    );
    return normalize[0];
  }

  async getAlbumId({ value, field_subject, verify_as }) {
    const result = await this.context.db.query(
      `SELECT data.data_album_id FROM data 
    INNER JOIN fields ON data.field_subject_id = fields.field_id 
    INNER JOIN album ON data.data_album_id = album.data_album_id
    WHERE holding_value='${value}'
    AND main_subject = '${field_subject}'
    AND data_album_type = '${verify_as}'`
    );

    return result;
  }

  async validateDataCorelation(args) {
    const { input, verify_as } = args;

    let album_id_mismatch = false;

    const initial = await this.getAlbumId({
      value: input[0].value,
      field_subject: input[0].field_subject,
      verify_as,
    });

    if (!initial[0]) {
      return {
        code: 404,
        message: `Data no found`,
        result: null,
      };
    }

    await Promise.all(
      input.map(async (data) => {
        const result = await this.getAlbumId({
          value: data.value,
          field_subject: data.field_subject,
          verify_as,
        });

        if (
          !result[0] ||
          initial[0].data_album_id !== result[0].data_album_id
        ) {
          album_id_mismatch = true;
        }
      })
    );

    const albumdef = await this.getAlbumType({
      data_album_id: initial[0].data_album_id,
    });

    return !album_id_mismatch
      ? {
          code: 202,
          message: `Data is validated`,
          result: albumdef.result,
        }
      : {
          code: 304,
          message: `Data mismatch`,
          result: null,
        };
    return null;
  }

  async getFieldOfName(fieldName) {
    const data = await this.context.db.fields.where(
      `main_subject = '${fieldName}'`
    );
    return data && data[0].main_subject
      ? {
          code: 201,
          message: `Data availale`,
          result: data,
        }
      : {
          code: 304,
          message: `Data not available`,
          result: null,
        };
  }

  async addBatchDynamicData(args) {
    let album_id = null;
    if (!args.album_id) {
      let album_definition = await this.createDataAlbum({
        data_album_type: args.album_type,
        create_new: true,
      });

      album_id = album_definition.result[0].data_album_id;
    }

    if (album_id || args.album_id) {
      await Promise.all(
        args.input.map(async (data) => {
          let datares = await this.insertNewDynamicData({
            album_id: args.album_id ? args.album_id : album_id,
            master: data.master_field,
            field_value: data.field_value,
          });
        })
      );

      let masters = await this.getMasters({
        album_id: args.album_id ? args.album_id : album_id,
      });

      return {
        code: 201,
        success: true,
        message: "Data Consolidation succesful",
        result: [
          {
            album_id: args.album_id ? args.album_id : album_id,
            dynamic_data: true,
            masters,
          },
        ],
      };
    }
  }

  async insertNewDynamicData({ album_id, master, field_value }) {
    const batch_id = await this.createDataAlbum({
      data_album_type: master,
      create_new: true,
    });

    field_value.map(async (field) => {
      const field_definition = await this.getField({
        subject: field.field_subject,
      });

      const insert_result = await this.context.db.dynamic_data.insert({
        dynad_id: genKey("batch"),
        album_id: album_id,
        batch_id: batch_id.result[0].data_album_id,
        holding_value: field.value,
        delta_date: new Date().toString(),
        field_subject_id: field_definition[0].field_id,
      });
    });
  }

  async getMasters({ album_id }) {
    const referenced_data = await this.context.db.query(
      `SELECT * FROM dynamic_data INNER JOIN album ON dynamic_data.batch_id = album.data_album_id WHERE dynamic_data.album_id = '${album_id}'`
    );

    let uniques = [];
    let masters = [];
    await Promise.all(
      referenced_data.map(async (data) => {
        if (uniques.indexOf(data.data_album_type) < 0) {
          uniques.push(data.data_album_type);

          masters.push({
            master_field: data.data_album_type,
            batch_values: await this.getBatchSet({
              master: data.data_album_type,
              album_id,
            }),
          });
        }
      })
    );
    return masters;
  }

  async getBatchSet({ master, album_id }) {
    const referenced_data = await this.context.db.query(
      `SELECT * FROM dynamic_data INNER JOIN album ON dynamic_data.batch_id = album.data_album_id WHERE dynamic_data.album_id = '${album_id}' AND album.data_album_type = '${master}'`
    );

    let batch_id = [];
    let uniques = [];
    await Promise.all(
      referenced_data.map((data) => {
        if (uniques.indexOf(data.batch_id) < 0) {
          uniques.push(data.batch_id);
          batch_id.push({ batch_id: data.batch_id });
        }
      })
    );

    return batch_id;
  }

  async getBatchFieldValues({ batch_id }) {
    const referenced_data = await this.context.db.query(
      `SELECT dynamic_data.dynad_id, fields.main_subject as field_subject, dynamic_data.holding_value FROM dynamic_data INNER JOIN album ON dynamic_data.batch_id = album.data_album_id INNER JOIN fields
      ON dynamic_data.field_subject_id = fields.field_id WHERE dynamic_data.batch_id = '${batch_id}'`
    );

    return referenced_data;
  }

  async getDynamicDataByAlbum({ album_id }) {
    let masters = await this.getMasters({ album_id });

    return {
      code: 201,
      success: true,
      message: masters ? "Data available" : "Failed or null database read",
      result: [
        {
          album_id: album_id,
          dynamic_data: true,
          masters,
        },
      ],
    };
  }
}

module.exports = BaseAPI;
