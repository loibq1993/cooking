'use strict';

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

exports.up = function (db) {
    return db.createTable('articles', {
        id: {type: 'int', primaryKey: true},
        user_id: 'smallint',
        post_date: 'datetime',
        post_content: 'TEXT',
        post_title: 'string',
        post_status: 'smallint',
        category_id: 'smallint',
        view_count: 'int',
        feature_image: 'string',
        created_at: 'timestamp',
        updated_at: 'timestamp'
    });
};

exports.down = function (db) {
  return db.dropTable('articles');
};

exports._meta = {
    "version": 1
};
