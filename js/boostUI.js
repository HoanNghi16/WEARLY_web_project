function truncate(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function chanageIcon(){
    let usericon = document.getElementById('usericon');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser){
        usericon.innerHTML = `
            <a href="../html/user.html">
                <img src="../img/icons/user.png" alt="User Icon" style="width:30px; height:30px;">
                ${truncate(currentUser.HoTen,10)}
            </a>
        `;
    }
}

addEventListener("DOMContentLoaded", () => {
    chanageIcon();
});