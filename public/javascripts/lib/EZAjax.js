class EZAjax {
    constructor(url, method, data = null, headers = null) {
        this._xhr = new XMLHttpRequest();
        this._data = data;
        this._isFormdata = true;

        this._url = url;
        this._method = method;

        this._beforeSend = null;

        this._headers = headers;

        this._init();
    }

    _init() {
        this._xhr.onreadystatechange = () => {
            if (this._xhr.readyState === XMLHttpRequest.OPENED) {
                if (this._beforeSend && typeof this._beforeSend === 'function') {
                    this._beforeSend();
                }
            }
            else if (this._xhr.readyState === XMLHttpRequest.DONE) {
                const response = {
                    headers:{}
                };

                response.body = this._xhr.responseText;
                response.status = this._xhr.status;
                const tab = this._xhr.getAllResponseHeaders().split("\r\n");

                for(let i=0;i< tab.length; i++){
                    response.headers[tab[i].split(": ")[0]] = tab[i].split(": ")[1];
                }

                this._callback(JSON.stringify(response));
            }

        };

        this._xhr.open(this._method, this._url, true);

        if (this._headers) {
            for (let v in this._headers) {
                this._xhr.setRequestHeader(v, this._headers[v]);
            }
        }


        // check if data is formdata and contain file
        try {
            for(let item of this._data.entries()){
                if(item[0] === 'file' && item[1].size === 0) throw new Error();
            }

        }
        catch (e) {
            const json = {};
            for(let item of this._data.entries()){
                json[item[0]] = item[1];
            }
            this._isFormdata = false;
            this._xhr.setRequestHeader("Content-Type", "application/json");
            this._data = JSON.stringify(json);
        }


        this._xhr.send(this._data);

    }

    then(callback){
        this._callback = callback;

    }
}


