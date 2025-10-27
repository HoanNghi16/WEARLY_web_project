//Phần đăng ký và kiểm tra dữ liệu
//Đăng ký thành công -> lưu thông tin người dùng vào localStorage với key là ID đăng nhập (email hoặc số điện thoại)

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

function ktraDangKy(){
    let HoTen = ktraHoTen();
    let ID_DangNhap = ktraEmail();
    let SDT = '';
    let Email = '';
    let sampleMail = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    if (sampleMail.test(ID_DangNhap)){
        Email = ID_DangNhap;
    }
    else{
        SDT = ID_DangNhap;
    }

    let NgaySinh = ktraNgaySinh();
    let GioiTinh = ktraGioiTinh();
    let MatKhau = ktraMatKhau();
    ktraNhapLai();
    if (!HoTen || !ID_DangNhap || !NgaySinh || !GioiTinh || !MatKhau){
        document.getElementById('DangKy').type = 'button';
        return false;
    }
    else{
        let user = {HoTen : HoTen, ID : ID_DangNhap,Email : Email,SDT: SDT, NgaySinh : NgaySinh, GioiTinh : GioiTinh, MatKhau : MatKhau};
        localStorage.setItem(`${ID_DangNhap}`, JSON.stringify(user));
        document.getElementById('DangKy').type = 'submit';
        return true;
    }
}

//Phần đăng nhập
//Kiểm tra ID đăng nhập có tồn tại không.
function ktraID_DangNhap(){
    let input_ID_DangNhap = document.getElementById('ID_DangNhap').value;
    if (!localStorage.getItem(input_ID_DangNhap)){
        document.getElementById('error_ID_DangNhap').innerHTML='Số điện thoại hoặc email không tồn tại.';
        document.getElementById('error_DangNhap').innerHTML='';
        return false
    }
    else{
        document.getElementById('error_ID_DangNhap').innerHTML='';
        return input_ID_DangNhap;
    }
}

function ktraDangNhap(){
    let ID_DangNhap = ktraID_DangNhap();
    let MatKhau = document.getElementById('MatKhauDN').value;
    let user = JSON.parse(localStorage.getItem(ID_DangNhap));
    if (!ID_DangNhap || MatKhau.length == 0){
        document.getElementById('error_DangNhap').innerHTML='Vui lòng nhập đầy đủ thông tin.';
        document.getElementById('error_ID_DangNhap').innerHTML='';
        return false;
    }
    else if (user.MatKhau !== MatKhau){
        document.getElementById('error_DangNhap').innerHTML='Sai mật khẩu. Vui lòng thử lại.';
        return false;
    }
    else{
        window.location.href = 'home.html';
        document.getElementById('error_DangNhap').innerHTML='';
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
}