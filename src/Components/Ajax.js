

export default {
    query: function(data) {
        let query = [];

        for (let i in data) {
            if (data[i] instanceof Array) {
                let temp = [];
                for (let j = 0; j < data[i].length; j++) {
                    temp.push(i + '[]=' + data[i][j]);
                }
                if (temp.length) {
                    query.push(temp.join('&'));
                } else {
                    query.push(i + '[]=');
                }
            } else {
                if (data[i] !== undefined)
                    query.push(i + '=' + data[i]);
            }
        }
        return (query.length ? '?' : '') + query.join('&');
    },
    send: function(options) {
        let timeout, request = new XMLHttpRequest();
        let aborted = false;
		
        let method = options.method || 'GET';
        let url = options.url + (method === 'GET' ? (options.data ? this.query(options.data) : '') : '');

        request.open(method, url, true);
        request.onerror = function () {

        };
        request.upload.onprogress = function(e) {
            if (e.lengthComputable)
                if (options.progress)
                    options.progress(Math.round(100 * e.loaded / e.total));
        };
        request.onreadystatechange = function () {
            var json;
            if (request.readyState === 4) {
                if (aborted)
                    return;

                clearTimeout(timeout);
                if (request.status >= 200 &&
                    request.status < 300) {
                    if (options.success) {
                        try {
                            json = JSON.parse(request.responseText);
                        } catch (e) {
                            json = null;
                        }
                        options.success(json);
                    }
                } else if (request.status === 403) {
                    try {
                        json = JSON.parse(request.responseText);
                    } catch (e) {
                        json = null;
                    }

                    if (json && json.code === -30103 )
                        // window.location.href = '/auth';
                        console.log('auth');
                    else
                        if (options.error)
                            options.error(json, request.status);
                } else {
                    if (options.error) {
                        if (request.responseText) {
                            options.error(JSON.parse(request.responseText), request.status);
                        } else {
                            options.error({message: 'no connection to web server', code: 0}, request.status);
                        }
                    }
                }
            }
        };

        let data = null;

        if (!options.noapi) {
            if (['POST', 'PUT', 'DELETE'].indexOf(options.method) >= 0)
                request.setRequestHeader('Content-Type', 'application/json');

            if (options.method !== 'GET')
                if (options.data)
                    data = JSON.stringify(options.data);
        } else {
            data = options.data;
        }

        timeout = setTimeout(function() {
            if (options.error)
                options.error({message: 'timeout error', code: -11});
            aborted = true;
            request.abort();
        }, options.timeout || 24 * 60 * 60 * 1000);
        request.send(data);
    }
};
