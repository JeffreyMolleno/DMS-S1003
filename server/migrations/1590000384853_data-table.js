/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("data", {
    data_id: {
      type: "text",
      serial: true,
    },
    data_album_id: {
      type: "text",
      notNull: true,
      reference: "album",
    },
    field_subject_id: {
      type: "text",
      notNull: true,
      reference: "fields",
    },
    holding_value: {
      type: "text",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
