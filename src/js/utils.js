import q from "q";

const utils = {
  xhr: function(url, payload, headers = []) {
    let
      data = null,
      lastResponse = null,
      request = new XMLHttpRequest(),
      then = q.defer();

    let type = payload ? "POST" : "GET";

    request.open(type, url);
    headers.forEach(header => request.setRequestHeader(header[0], header[1]));
    request.responseType = "json";
    request.onload = function() {
      if (request.status !== 200) {
        console.log("here", request);
        then.resolve(request.statusText);
        return;
      }

      lastResponse = request.response;
      if (lastResponse.error) {
        console.error(lastResponse);
        then.reject(lastResponse);
        return;
      }

      try {
        data = lastResponse;
      } catch (e) {
        then.reject({ error: e, response: lastResponse });
        return;
      }

      then.resolve(data);
    }
    request.send(type === "POST" ? payload : null);
    return then.promise;
  },

  queryParams: function(json) {
    let queryParams = [];

    // convert json into query params
    Object.keys(json).forEach(key => queryParams.push([key, json[key]]));
    return queryParams.map(segment => {
      let output;
      if (Array.isArray(segment[1])) { // [ key, [val1, val2, val3] ]
        output = segment[1].map(val => String(segment[0] + "[]=" + val)).join("&");
      } else {
        output = segment.join("=");
      }
      return output;
    }).join("&");
  },
};

module.exports = utils;
