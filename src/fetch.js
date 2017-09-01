/** Just to get a json resource, need to replace with actual lib */
export default {
  /** Simple request to get a ajax request */
  _request: function(url, type, load, delay) {
    let request = new XMLHttpRequest();
    request.onload = load;
    request.open(type, url, true);
    if (delay === undefined) {
      request.send();
    }
    return request;
  },

  /** A get request that run a function when retrieved */
  get: function(url, results) {
    let request = this._request(url, 'GET', function() {
      let response = null,
        error = null;

      try {
        response = JSON.parse(request.responseText);
      } catch (e) {
        error = e;
      } finally {
        results(response, error);
      }
    });

    return request;
  },

  /** Send a post request */
  post: function(url, data, results) {
    let request = this._request(
      url,
      'POST',
      function() {
        let response = null,
          error = null;

        try {
          response = JSON.parse(request.responseText);
        } catch (e) {
          error = e;
        } finally {
          results(response, error);
        }
      },
      true
    );

    let string = JSON.stringify(data);

    request.send(string);
  }
};
