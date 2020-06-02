/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("types", {
    type_id: {
      type: "text",
      serial: true,
    },
    type_subject: {
      type: "text",
      notNull: true,
    },
    type_description: {
        type: "text"
    }
  });
};

exports.down = (pgm) => {};
