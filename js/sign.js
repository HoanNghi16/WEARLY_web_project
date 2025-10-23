function ktraHoTen(){
    let ten = /^[A-Z]{1}[a-z]*(\s[A-Z]{1}[a-z]*)*$/;
    let input_HoTen = document.getElementById('HoTen').value
    console.log(input_HoTen)
    if (ten.test(input_HoTen)){
        document.getElementById('error_HoTen').innerHTML='';
        localStorage.setItem('username',input_HoTen)
        return true
    }
    else{
        document.getElementById('error_HoTen').innerHTML='Họ tên sai (vd: Tran Van A)'
        return false
    }
}