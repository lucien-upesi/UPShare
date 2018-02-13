// Get element button from table
const btnEdit = Array.from(document.getElementsByClassName("btnEdit"));
const btnRemove = Array.from(document.getElementsByClassName("btnRemove"));

function edit(href) {
    console.log(href);
}

// Html template for ModalEdit
const formEdit =
    "<form>\n" +
    "  <div class=\"form-group\">\n" +
    "    <input type=\"email\" class=\"form-control\" id=\"editLine\" aria-describedby=\"editTable\">\n" +
    "  </div>" +
    "</form>";

// Function to create eventListener on click Edit w/ Modal.show()
btnEdit.map((item, index) => {
    item.addEventListener("click", e => {
        e.preventDefault();

        const btnValid = document.createElement("button");
        btnValid.classList.add("btn", "btn-primary");
        btnValid.innerText = "Save Changes";
        btnValid.setAttribute("onclick", `edit("${item.href}")`);

        const modEdt = new EZModal("mod_edt" + index)
            .setElement("header", "Edit this line")
            .setElement("body", formEdit)
            .setElement("footer", btnValid)
            .show();
    })
});

// Function to create eventListener on click Remove w/ Modal.show()
btnRemove.map((item, index) => {
    item.addEventListener("click", e => {
        e.preventDefault();

        const btnValid = document.createElement("button");
        btnValid.classList.add("btn", "btn-primary");
        btnValid.innerText = "Save Changes";
        btnValid.setAttribute("onclick", `edit("${item.href}")`);

        const modRmv = new EZModal("mod_rmv" + index)
            .setElement("body", "Are you sure to remove it ?")
            .setElement("footer", btnValid)
            .show();
    })
});
