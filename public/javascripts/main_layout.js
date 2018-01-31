const icon_control_btn = document.getElementById('icon_control_btn');
document.getElementById('sidebar_btn').addEventListener("click", (e)=>{
    $("#sidebar").animate({width:'toggle'}, 'fast');


    icon_control_btn.innerText = icon_control_btn.innerText==='keyboard_arrow_left' ? "keyboard_arrow_right":"keyboard_arrow_left";

});
