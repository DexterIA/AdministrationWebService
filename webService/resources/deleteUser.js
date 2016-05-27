var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Удаляет пользователя из указанной коллекции
   * @param {String} url - строка подключения к БД
   * @param {String} target - целевая коллекция для БД
   * @param {Object} filter - фильтр для поиска пользователей
   * @param {function} callback - возвращаем результат сохранения
   */
  deleteUser = function (url, target, filter, callback) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection(target);
      console.log('Delete user');
      collection.deleteOne(filter, function (err, res) {
        db.close();
        test.equal(null, err);
        callback(res);
      });
    });
  };

module.exports = deleteUser;
