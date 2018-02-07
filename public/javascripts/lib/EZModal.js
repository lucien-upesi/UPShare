class Modal{
    constructor() {

        this.skeleton = document.createElement('template');
        this.skeleton.innerHTML = this.HTMLSkeleton().trim();

        this.header = this.skeleton.content.querySelector(".modal-header");
        this.body = this.skeleton.content.querySelector(".modal-body");
        this.footer = this.skeleton.content.querySelector(".modal-footer");

    }


    HTMLSkeleton(){
        return "<div class=\"modal fade\" id=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-title\" aria-hidden=\"true\">" +
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

    setTitle(tag, text, dismissable = true){
        const title = this.createElement(tag, text);
        title.id = "modal-title";
        title.classList.add("modal-title");
        this.header.insertBefore(title, this.header.firstChild);
        if(dismissable){
            const btn = document.createElement("button");
            btn.classList.add("close");
            btn.setAttribute("data-dismiss", "modal");
            btn.setAttribute("arial-label", "Close");
            btn.innerHTML = "<span aria-hidden=\"true\">&times;</span>";
            this.header.appendChild(btn)
        }


        return this;
    }

    setElement(type, html){
        const el = document.createElement('div');
        el.innerHTML = html;
        if (type === "header" || type === "footer" || type === "body"){
            this[type].appendChild(el);
        }

        return this;
    }


    createElement(type, innerHTML){
        const el = document.createElement(type);
        el.innerHTML = innerHTML;

        return el;
    }

    show(){
        const div = document.createElement("div");
        div.innerHTML = this.skeleton.innerHTML;
        document.body.appendChild(div);
        $(document.getElementById("modal")).modal("show");

    }

}

