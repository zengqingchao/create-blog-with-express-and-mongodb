/**
 * Created by dongsj on 16/6/13.
 */
var mongodb = require('./db');

module.exports = User;

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}
//存储用户信息
User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
//打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取user
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //插入数据到user
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                } else {
                    //回调
                    callback(null, user[0]);
                }
            })
        })
    })
};
//读取用户信息
User.get=function(name,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name:name},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }else{
                    callback(null,user);
                }
            })
        })
    })
};