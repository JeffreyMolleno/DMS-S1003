/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("fields", {
    field_id: {
      type: "text",
      serial: true,
    },
    field_type: {
      type: "text",
      notNull: true,
      reference: "types",
    },
    main_subject: {
      type: "text",
      notNull: true,
    },
    sub_definition: {
      type: "text",
      notNull: true,
    },
    is_dynamic: {
      type: "boolean",
    },
    calculations: {
      type: "text",
    },
    considerations: {
      type: "text",
    },
    show: {
      type: "boolean",
      notNull: true,
    },
    master_subject: {
      type: "text",
      notNull: true,
    },
    album_id: {
      type: "text",
      notNull: true,
      reference: "album",
    },
  });
};

exports.down = (pgm) => {};
