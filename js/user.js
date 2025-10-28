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
    let input_Email = document.getElementById('Email').value;
    if (input_Email.length == 0){
        document.getElementById('error_Email').innerHTML = 'Vui lòng nhập email.'
    }
    if (email.test(input_Email)){
        document.getElementById('error_Email').innerHTML = ''
        return input_Email
    }
    else{
        document.getElementById('error_Email').innerHTML = 'Email sai (vd: example@gmail.com).'
        return false
    }

}

function ktraSDT(){
    let sdt = /^0[3-9]{1}[0-9]{8}$/;
    let input_SDT = document.getElementById('SDT').value
    if (input_SDT.length == 0){
        document.getElementById('error_SDT').innerHTML = 'Vui lòng nhập số điện thoại'
        return false
    }
    if (sdt.test(input_SDT)){
        document.getElementById('error_SDT').innerHTML = ''
        return input_SDT
    }
    else{
        document.getElementById('error_SDT').innerHTML = 'Số điện thoại sai (vd: 03xxxxxxxx)'
        return false
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
    document.getElementById('error_GioiTinh').innerHTML='';
    return input_GioiTinh;
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
function show_password(pw){
    return currentUser.MatKhau;
}

function boostUserInfo(){
    if (currentUser){
        document.getElementById("userName").innerText = currentUser.HoTen;
        document.getElementById("ID_DangNhap").innerText = currentUser.ID + ' (ID)';
        document.getElementById("userEmail").innerText = currentUser.Email;
        document.getElementById("userSDT").innerText = currentUser.SDT;
        document.getElementById("userNgaySinh").innerText = currentUser.NgaySinh;
        document.getElementById("userGioiTinh").innerText = currentUser.GioiTinh;
        document.getElementById("userMatKhau").innerText = hide_password(currentUser.MatKhau);
    }
}
function accept(attribute,newInfoID,htmlID){
    var input_info = ''
    var err = document.getElementById(`error_${attribute}`).innerHTML
    if (attribute == "GioiTinh"){
        input_info = ktraGioiTinh()
    }
    else{
        input_info = document.getElementById(newInfoID).value;
    }
    if (input_info && input_info.length >0 && err.length == 0 ){
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
        <input id="HoTen" type="text" style="width: 200px;" onkeyup="ktraHoTen()">
        <span class="text-danger" id="error_HoTen" style="font-size: 14px;"></span>
    `
    document.getElementById('nutSuaHoTen').innerHTML = `
        <button class="btn btn-dark" onclick="accept('HoTen','HoTen','userName')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}
function suaEmail(){
    document.getElementById('userEmail').innerHTML = `<input type="text" id="Email" style="width: 200px; height: 30px;"  onkeyup="ktraEmail()">
     <span class="text-danger" id="error_Email" style="font-size: 10px;"></span>
    `
    document.getElementById('nutSuaEmail').innerHTML = `
        <button class="btn btn-dark" onclick="accept('Email','Email','userEmail')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}

function suaSDT(){
    document.getElementById('userSDT').innerHTML = `<input onkeyup="ktraSDT()" type="text" id="SDT" style="width: 200px; height: 30px;">
     <span class="text-danger" id="error_SDT" style="font-size: 10px;"></span>
    `
    document.getElementById('nutSuaSDT').innerHTML = `
        <button class="btn btn-dark" onclick="accept('SDT','SDT','userSDT')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}
function suaNgaySinh(){
    document.getElementById('userNgaySinh').innerHTML = `<input onkeyup="ktraNgaySinh()" type="date" id="NgaySinh" style="width: 200px; height: 30px;">
     <span class="text-danger" id="error_NgaySinh" style="font-size: 10px;"></span>
     `
    document.getElementById('nutSuaNgaySinh').innerHTML = `
        <button class="btn btn-dark" onclick="accept('NgaySinh','NgaySinh','userNgaySinh')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}
function suaGioiTinh(){
    document.getElementById('userGioiTinh').innerHTML = `
        <label for="gender">Giới tính:</label>
        <input type="radio" name="gender" id="Nam" onchange="ktraGioiTinh()" value="Nam" style="width: 20px" />
        <label for="gender">Nam</label>
        <input type="radio" name="gender" id="Nu" onchange="ktraGioiTinh()" value="Nữ" style="width: 20px" />
        <label for="gender">Nữ</label> <br />
        <span class="text-danger" style="font-size:10px" id="error_GioiTinh"></span>`
    document.getElementById('nutSuaGioiTinh').innerHTML =`
        <button class="btn btn-dark" onclick="accept('GioiTinh','GioiTinh','userGioiTinh')">lưu</button>
        <button class="btn btn-outline-dark" onclick="denied()">hủy</button>
    `
}
function xemMatKhau(){
    document.getElementById('userMatKhau').innerHTML = show_password();
    document.getElementById('nutXemMatKhau').innerHTML = 
    `
    <button class="btn btn-dark" id="xem" style="padding:5px;"
    onclick="suaMatKhau()">
        sửa
    </button>
        <button class="btn btn-outline-dark" id="xem" style="padding:5px;"
    onclick="anMatKhau()">
        ẩn
    </button>
    `
}

function anMatKhau(){
    document.getElementById('userMatKhau').innerHTML = hide_password(show_password());
    denied()
}
function suaMatKhau(){
    document.getElementById('userMatKhau').innerHTML=
    `<input onkeyup="ktraMatKhau()" type="password" id="MatKhau" style="width: 200px; height: 30px;">
     <span class="text-danger" id="error_MatKhau" style="font-size: 10px;"></span>
     `
    document.getElementById('nutXemMatKhau').innerHTML = `
    <button class="btn btn-outline-dark" id="xem" style="padding:5px;"
    onclick="accept('MatKhau','MatKhau','userMatKhau')">
        lưu
    </button>
    <button class="btn btn-outline-dark" id="xem" style="padding:5px;"
    onclick="denied()">
        hủy
    </button>
    `
}

function DangXuat(){
    localStorage.setItem('currentUser', null)
    window.location.href = '../html/home.html'
}

document.addEventListener('DOMContentLoaded',()=>{
    boostUserInfo()
})