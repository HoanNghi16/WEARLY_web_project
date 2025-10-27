function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
function show_name(val){
    val = val.split(' ');
    console.log(val)
    return val[val.length-1]+ ' ' + val[0]
}

function chanageIcon(){
    let usericon = document.getElementById('usericon');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser){
        usericon.innerHTML = `
            <a href="../html/user.html">
                <img src="../img/icons/user.png" alt="User Icon" style="width:30px; height:30px;">
                ${show_name(currentUser.HoTen,10)}
            </a>
        `;
    }
    else{
        usericon.innerHTML = `
            <a href="../html/signin.html">SIGN UP/SIGN IN</a>
            `
    }
}

addEventListener("DOMContentLoaded", () => {
    chanageIcon();
});