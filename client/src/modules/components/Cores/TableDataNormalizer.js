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
          this.normalize_table_data.push({ ...data.field_values, id: data.id });
        });

      return this.normalize_table_data;
    }
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
