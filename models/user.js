const db = require('../dbConnection');

var User={
    where: async function(user){
        results = await db.query("select * from users where email=?", [user.email]);
        return results[0];
    },
    find:function(id,callback){
        return db.query("select * from users where id=? and rememberToken=?",[id],callback);
    },
    create:function(user,callback){
        return db.query("Insert into users(name, email, password) values(?,?,?)",[user.name, user.email, user.password],callback);
    },
    delete:function(id,callback){
        return db.query("delete from users where id=?",[id],callback);
    },
    updateOne: async function(user){
        results = await db.query("select * from users where email=?", [user.email]);
        return results[0];
    },
    updateOne: async function(id,user){
        return await db.query("update users set rememberToken=? where id=?",[user.rememberToken, id], (error, results, fields) => {
            console.log(1);
            if (error){
              return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
          });
    }
};

module.exports = User;