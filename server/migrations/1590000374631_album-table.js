/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("album", {
    data_album_id: {
      type: "text",
      serial: true,
    },
    data_master_subject: {
      type: "text",
      notNull: true,
    },
    data_album_type: {
      type: "text",
      notNull: true,
      reference: "types",
    },
    date_created: {
      type: "text",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};
