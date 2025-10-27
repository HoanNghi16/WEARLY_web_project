function ktraHoTen(){
    let ten = /^[A-Z]{1}[a-z]*(\s[A-Z]{1}[a-z]*)*$/;
    let input_HoTen = document.getElementById('HoTen').value
    console.log(input_HoTen)
    if (input_HoTen.length == 0){
        document.getElementById('error_HoTen').innerHTML='Vui lòng nhập họ tên.'
        return false
    }
    else if (ten.test(input_HoTen)){
        document.getElementById('error_HoTen').innerHTML='';
        return input_HoTen;
    }
    else{
        document.getElementById('error_HoTen').innerHTML='Họ tên sai (vd: Tran Van A)'
        return false
    }
}

function ktraEmail(){
    let email = /^[a-zA-Z0-9._%+-]+@gmail.com$/
    let phone = /^0[3-9]{1}[0-9]{8}$/;
    let input_Email = document.getElementById('Email').value;
    if (localStorage.getItem(input_Email)){
        document.getElementById('error_Email').innerHTML='Email hoặc số điện thoại đã được sử dụng.'
        return false
    }
    if (input_Email.length == 0){
        document.getElementById('error_Email').innerHTML='Vui lòng nhập email hoặc số điện thoại.'
        return false
    }
    else if( !email.test(input_Email) && !phone.test(input_Email)){
        document.getElementById('error_Email').innerHTML='ID đăng nhập sai (vidu@gmail.com hoặc 09XXXXXXXX)'
        return false
    }
    else{
        document.getElementById('error_Email').innerHTML='';
        return input_Email;
    }

}

function ktraNgaySinh(){
    let input_NgaySinh = document.getElementById('NgaySinh').value;
    let current_year = new Date().getFullYear();
    if (input_NgaySinh.length == 0){
        document.getElementById('error_NgaySinh').innerHTML='Vui lòng nhập ngày sinh.'
        return false
    }
    else{
        let namSinh = input_NgaySinh.split('-')[0];
        if (current_year - Number(namSinh) < 18){
            document.getElementById('error_NgaySinh').innerHTML='Bạn phải đủ 18 tuổi trở lên.';
            return false
        }
        else{
            document.getElementById('error_NgaySinh').innerHTML='';
            return input_NgaySinh;
        }
    }
}

function ktraGioiTinh(){
    let Nam = document.getElementById('Nam');
    let Nu = document.getElementById('Nu');
    var input_GioiTinh = '';
    if (Nam.checked){
        input_GioiTinh = Nam.value;
    }
    else if (Nu.checked){
        input_GioiTinh = Nu.value;
    }
    if (input_GioiTinh.length == 0){
        document.getElementById('error_GioiTinh').innerHTML='Vui lòng chọn giới tính.'
        return false
    }
    else{
        document.getElementById('error_GioiTinh').innerHTML='';
        return input_GioiTinh;
    }
}

function ktraMatKhau(){
    let input_MatKhau = document.getElementById('MatKhau').value;
    if (input_MatKhau.length == 0){
        document.getElementById('error_MatKhau').innerHTML='Vui lòng nhập mật khẩu.'
        return false
    }
    if (input_MatKhau.length < 6){
        document.getElementById('error_MatKhau').innerHTML='Mật khẩu phải có ít nhất 6 ký tự.'
        return false
    }
    else{
        document.getElementById('error_MatKhau').innerHTML='';
        return input_MatKhau;
    }
}
function ktraNhapLai(){
    let input_NhapLaiMatKhau = document.getElementById('NhapLaiMatKhau').value;
    let input_MatKhau = ktraMatKhau();
    if (input_NhapLaiMatKhau.length == 0){
        document.getElementById('error_NhapLaiMatKhau').innerHTML='Vui lòng nhập lại mật khẩu.'
        return false
    }
    if (input_NhapLaiMatKhau !== input_MatKhau){
        document.getElementById('error_NhapLaiMatKhau').innerHTML='Mật khẩu không khớp.'
        return false
    }
    else{
        document.getElementById('error_NhapLaiMatKhau').innerHTML='';
        return true;
    }
}
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
function hide_password(pw){
    let re = ''
    for(let i = 0; i < pw.length;i++){
        re += '*';
    }
    return re;
}

function boostUserInfo(){
    if (currentUser){
        document.getElementById("userName").innerText = currentUser.HoTen;
        document.getElementById("ID_DangNhap").innerText = currentUser.ID;
        document.getElementById("userEmail").innerText = currentUser.Email;
        document.getElementById("SDT").innerText = currentUser.SDT;
        document.getElementById("NgaySinh").innerText = currentUser.NgaySinh;
        document.getElementById("GioiTinh").innerText = currentUser.GioiTinh;
        document.getElementById("MatKhau").innerText = hide_password(currentUser.MatKhau);
    }
}
function accept(attribute,newInfoID,htmlID){
    var input_info = document.getElementById(newInfoID).value;
    if (input_info.length >0){
        currentUser[attribute] = input_info;
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        localStorage.setItem(currentUser['ID'], JSON.stringify(currentUser));  
        document.getElementById(htmlID).innerHTML=currentUser[attribute];
    }
    denied();
    
}
function denied(){
    location.reload()
}

function suaHoTen(){
    document.getElementById('userName').innerHTML=`
        <input id="HoTen" type="text" style="width: 200px;" onkeyup="ktraHoTen()"> <br>
        <span class="text-danger" id="error_HoTen" style="font-size: 14px;"></span>
    `
    document.getElementById('nutSuaHoTen').innerHTML = `
        <button class="btn btn-dark" onclick="accept('HoTen','HoTen','userName')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}
function suaEmail(){
    document.getElementById('userEmail').innerHTML = `<input type="text" id="Email" style="width: 200px; height: 30px;"  onkeyup="ktraEmail()">
     <span class="text-danger" id="error_Email" style="font-size: 14px;"></span>
    `
    document.getElementById('nutSuaEmail').innerHTML = `
        <button class="btn btn-dark" onclick="accept('Email','Email','Email')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}
function DangXuat(){
    localStorage.setItem('currentUser', null)
    window.location.href = '../html/home.html'
}

document.addEventListener('DOMContentLoaded',()=>{
    boostUserInfo()
})