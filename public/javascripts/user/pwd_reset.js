function verify() {
    const repwd = document.getElementById("repwd_input");
    const pwd = document.getElementById("pwd_input");
    const btn = document.getElementById("pwd_reset_btn");
    const error = document.getElementById("pwd_reset_error");

    console.log("tap");
    if(repwd.value === pwd.value){
        btn.removeAttribute("disabled");
        $(error).fadeOut("slow").attr("hidden", true);
    }
    else {
        btn.setAttribute("disabled", "true");
        $(error).fadeIn("slow").attr("hidden", false);
    }
}