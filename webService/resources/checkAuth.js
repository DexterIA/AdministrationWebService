var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция проверки логина и пароля
   * @param {String} url - строка подключения к БД
   * @param {String} target - коллекция пользоватей
   * @param {Object} auth - проверяемый логин и пароль
   * @param {Function} callback - функция с результатом true или false
   */
  checkAuth = function (url, target, auth, callback) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection(target);
      console.log('Check authentication');
      collection.find({}).toArray(function (err, data) {
        db.close();
        test.equal(null, err);
        var check = false;
        data.forEach(function(item) {
          if (item.login === auth.login && item.pass == auth.pass) { //jshint ignore: line
            check = true;
          }
        });
        callback(check);
      });
    });
  };

module.exports = checkAuth;
