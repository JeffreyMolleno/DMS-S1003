/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("dynamic_data", {
    dynad_id: {
      type: "text",
      serial: true,
    },
    album_id: {
      type: "text",
      notNull: true,
      reference: "album",
    },
    batch_id: {
      type: "test",
      notNull: true,
      reference: "album",
    },
    holding_value: {
      type: "text",
      notNull: true,
    },
    delta_date: {
      type: "text",
      notNull: true,
    },
    field_subject_id: {
      type: "text",
    },
  });
};

exports.down = (pgm) => {};
