class EZModal{
    constructor(modal_id, dismissable = true) {

        this._modal_id = modal_id;
        this._dismissable = dismissable;

        this._skeleton = document.createElement('template');
        this._skeleton.innerHTML = this.HTMLSkeleton().trim();

        this._header = this._skeleton.content.querySelector(".modal-header");
        this._body = this._skeleton.content.querySelector(".modal-body");
        this._footer = this._skeleton.content.querySelector(".modal-footer");

        this._onShow = false;
    }

    HTMLSkeleton(){
        return "<div class=\"modal fade\" id="+ this._modal_id+" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-title\" aria-hidden=\"true\">" +
            "  <div class=\"modal-dialog modal-dialog-centered\" role=\"document\">" +
            "    <div class=\"modal-content\">" +
            "      <div class=\"modal-header\">" +
            "      </div>" +
            "      <div class=\"modal-body\">" +
            "      </div>" +
            "      <div class=\"modal-footer\">" +
            "      </div>" +
            "    </div>" +
            "  </div>" +
            "</div>";
    }

    setTitle(tag, text){
        const title = this._createElement(tag, text);
        title.id = "modal-title";
        title.classList.add("modal-title");
        this._header.insertBefore(title, this._header.firstChild);

        return this;
    }

    setElement(type, el){
        if(typeof el === 'string'){
            let html = document.createElement('div');
            html.innerHTML = el;

            [el, html] = [html, el];
        }

        if (type === "header" || type === "footer" || type === "body"){
            this["_"+type].appendChild(el);
        }

        return this;
    }


    _createElement(type, innerHTML){
        const el = document.createElement(type);
        el.innerHTML = innerHTML;

        return el;
    }

    show(){
        if(this._dismissable){
            const btn = document.createElement("button");
            btn.classList.add("close");
            btn.setAttribute("data-dismiss", "modal");
            btn.setAttribute("arial-label", "Close");
            btn.innerHTML = "<span aria-hidden=\"true\">&times;</span>";
            this._header.appendChild(btn)
        }

        const div = document.createElement("div");
        div.innerHTML = this._skeleton.innerHTML;
        document.body.appendChild(div);

        this._modal = document.getElementById(this._modal_id);

        $(this._modal).modal("show");

        $(this._modal).on('hidden.bs.modal', function (e) {
            div.outerHTML = "";
        });

        this._onShow = true;

        return this

    }


    onClose(callback){
        if(this._onShow && typeof callback === 'function'){
            $(this._modal).on('hidden.bs.modal', function (e) {
                callback(e)
            });
        }

        return this;
    }

    on(event, callback){
        this._modal.addEventListener(event, callback())
    }

}






