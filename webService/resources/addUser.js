var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Добавляет пользователя в указанную коллекцию
   * @param {String} url - строка подключения к БД
   * @param {String} target - целевая коллекция для БД
   * @param {Object} data - данные о пользователе
   * @param {function} callback - возвращаем результат сохранения
   */
  addUser = function (url, target, data, callback) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection(target);
      console.log('Add user');
      collection.insertOne(data, function (err, res) {
        db.close();
        test.equal(null, err);
        callback(res);
      });
    });
  };

module.exports = addUser;
