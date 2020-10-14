"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  await db.runSql(`CREATE TABLE flash_cards (
    id SERIAL PRIMARY KEY,
    question_html TEXT NOT NULL,
    answer_html TEXT NOT NULL,
    tags TEXT[]
  );`);
};

exports.down = async function (db) {
  await db.runSql(`DROP TABLE flash_cards`);
};

exports._meta = {
  version: 1,
};
