function test() {
    console.log("wtf");
}
document.getElementById("btn").addEventListener("click", (e)=>{
    e.preventDefault();
    const el = document.createElement("button");
    el.innerText = "LOL";
    el.setAttribute("is", "button");
    el.setAttribute("onclick", "test()");
    // el.addEventListener("click", (e)=>{
    //     e.preventDefault();
    //     console.log("wtf");
    // });
    const modal = new EZModal("modal").setElement("footer", el).show();
});

