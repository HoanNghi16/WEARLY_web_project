function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
function show_name(val){
    val = val.split(' ');
    if (val.length == 1){
        return val[0]
    }
    console.log(val)
    return val[val.length-1]+ ' ' + val[0]
}
function DangXuat(){
    localStorage.setItem('currentUser', null)
    window.location.href = '../html/home.html'
}
function chanageIcon(){
    let usericon = document.getElementById('usericon');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser){
        usericon.innerHTML = `
            <div class="user-menu">
                <a href="../html/user.html">
                    <img src="../img/icons/user.png" alt="User Icon" style="width:30px; height:30px;">
                    ${show_name(currentUser.HoTen,10)}
                </a>
                <div class="dropdown-content">
                    <ul>
                        <li><a href="../html/user.html">Hồ sơ</a></li>
                        <li><a href="#" id="logout-btn" onclick="DangXuat()">Đăng xuất</a></li>
                    </ul>            
                </div>
            </div>
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