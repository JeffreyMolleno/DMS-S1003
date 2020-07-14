export default class TableDataNormalizer {
  constructor() {
    this.table_data = [];
    this.table_columns = [];
    this.normalize_table_data = [];
  }

  setTableData({ data }) {
    this.table_data = data;
  }

  isTableDataSet() {
    return this.table_data.length > 0 ? true : false;
  }

  getTableData() {
    if (this.table_data.length !== []) {
      this.table_data.length > 0 &&
        this.table_data.map((data) => {
          // console.log(data.field_values)
          this.normalize_table_data.push({ ...data.field_values, id: data.id });
        });

      return this.normalize_table_data;
    }
  }

  normalizeDataFromServer() {
    // console.log({ table_data: this.table_data });

    let data_processed = [];

    if (this.table_data !== []) {
      this.table_data.length > 0 &&
        this.table_data.map((data) => {
          let data_normalize = {};

          let data_res =
            data.album_data_collection &&
            data.album_data_collection.map((collection) => {
              return (data_normalize = {
                ...data_normalize,
                [collection.field_subject]: collection.value,
              });
              // console.log(data_normalize);
            });
          // console.log({ data_res });
          data_res &&
            data_processed.push({
              ...data_res[data_res.length - 1],
              id: data.data_album_id,
            });
        });

      // console.log({ data_processed });
    }

    return data_processed;
  }

  structureColumns({ datafields }) {
    datafields &&
      datafields.map((fdata) => {
        return this.table_columns.findIndex(
          (data) => data.name === fdata.main_subject
        ) < 0 && fdata.field_type !== "INPUT_FIELD_SELECT_MENU"
          ? this.table_columns.push({
              name: fdata.main_subject
                .replace(/[{()},%]/g, "")
                .split(" ")
                .join(" "),
              selector: fdata.main_subject,
              sortable: true,
            })
          : null;
      });
  }

  getColumns() {
    return this.table_columns;
  }
}
