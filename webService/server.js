var http = require('http'),
  addUser = require('./resources/addUser'),
  checkAuth = require('./resources/checkAuth'),
  deleteUser = require('./resources/deleteUser'),

  getCommonHeaders = function (req) {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] ? req.headers['access-control-request-headers'] : 'x-requested-with',
      'Access-Control-Allow-Methods': req.headers['access-control-request-method'] ? req.headers['access-control-request-method'] : 'POST, GET, PUT, DELETE, OPTIONS'
    };
  };

const PORT = 8081,
  url = 'mongodb://localhost:27017/CRM',

  FO_UserCollection = 'FO_UserCollection';

/**
 * Функция предобработки всех запросов - всё запросы попадают в неё
 * в зависимости от метода и url - выполняем тот или иной запрос к БД
 * @param {Object} request - объект запроса
 * @param {Object} response - объект ответа
 */
function handleRequest(request, response) {
  // Дальше велосипед, просьба слабонервным не смотреть
  if (request.method === 'POST') {
    switch (request.url) {
      case '/admin/addFrontOfficeUser':
        request.on('data', function (chunk) {
          addUser(url, FO_UserCollection, JSON.parse(chunk.toString()), function (res) {
            response.writeHead(200, getCommonHeaders(request));
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/admin/authFrontOfficeUser':
        request.on('data', function (chunk) {
          checkAuth(url, FO_UserCollection, JSON.parse(chunk.toString()), function (res) {
            response.writeHead(200, getCommonHeaders(request));
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/admin/deleteFrontOfficeUser':
        request.on('data', function (chunk) {
          deleteUser(url, FO_UserCollection, JSON.parse(chunk.toString()), function (res) {
            response.writeHead(200, getCommonHeaders(request));
            response.end(JSON.stringify(res));
          });
        });
        break;
      default:
        response.writeHead(404, {'content-type': 'text/html'});
        response.end();
    }
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(200, getCommonHeaders(request));
    response.end();
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT);
});