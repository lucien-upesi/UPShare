class EZForm{
    constructor(form_id, button_id){
        this._form = document.getElementById(form_id);
        this._button = document.getElementById(button_id);

        this._init();
    }

    _init(){
        this._button.addEventListener("click", (e) => {
            e.preventDefault();
            const formdata = new FormData(this._form);

            new EZAjax(this._form.getAttribute("action"),this._form.getAttribute("method"), formdata, {"x-csrf-token": document.querySelector("input[name='_csrf']").value}).then(res=>{
                if(typeof this._callback === 'function')
                this._callback(res);
            })

        });
    }

    then(callback){
        this._callback = callback;
    }
}