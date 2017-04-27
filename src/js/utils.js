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
      let outputObj = {
        status: request.status,
      };

      if (request.status !== 200) {
        outputObj.response = request.statusText;
        then.resolve(outputObj);
        return;
      }

      lastResponse = request.response;
      outputObj.response = lastResponse;
      if (lastResponse.error) {
        console.error(lastResponse);
        then.reject(outputObj);
        return;
      }

      try {
        data = lastResponse;
      } catch (e) {
        then.reject({ error: e, response: lastResponse, status: request.status });
        return;
      }

      then.resolve(outputObj);
    }

    request.send(type === "POST" ? payload : null);
    return then.promise;
  },

  queryParams: function(json) {
    let queryParams = [];

    if (!json) return "";

    json = typeof json === "string" ? eval(`(function(window, document, json){ return ${json}; })({}, {}, json)`) : json;

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
