const btn = Array.from(document.getElementsByClassName("btnEdit"));
const btnValid = "<button type=\"button\" class=\"btn btn-primary mt-2\">Save changes</button>";
const formEdit =
    "<form>\n" +
    "  <div class=\"form-group\">\n" +
    "    <input type=\"email\" class=\"form-control\" id=\"editLine\" aria-describedby=\"editTable\">\n" +
    "  </div>"
    "</form>";

btn.map((item,index)=> {
    item.addEventListener("click", e=> {
        e.preventDefault();
        const mod = new EZModal("mod_edt"+index)
            .setElement("body", formEdit)
            .setElement("footer", btnValid)
            .show();

        console.log(item)
    })
});

console.log(btn);