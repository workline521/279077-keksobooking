'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var Code = {
    SUCCESS: 200,
    MOVED: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };
  window.backend = {
    getData: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case Code.SUCCESS:
            onLoad(xhr.response);
            break;
          case Code.MOVED:
            error = 'Временно перемещено, попробуйте позже';
            break;
          case Code.BAD_REQUEST:
            error = 'Неверный запрос';
            break;
          case Code.UNAUTHORIZED:
            error = 'Пользователь не авторизован';
            break;
          case Code.NOT_FOUND_ERROR:
            error = 'Ничего не найдено, попробуйте позже';
            break;
          case Code.SERVER_ERROR:
            error = 'Ошибка сервера';
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          onError(error);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000;
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    sendData: function (data, onLoad, onError) {

      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();


