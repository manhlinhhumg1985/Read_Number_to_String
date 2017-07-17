/**
 * Created by thanhhuyen on 7/13/17.
 */
const Array_numb = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
// phương thức đọc hàng chục
function Read_tens(so) {
    let String = '';
    let Tens = Math.floor(so / 10); // lấy phần hàng chục
    let Unit = so % 10; // Lấy phần đơn vị
    if (Tens > 1) {
        String = " " + Array_numb[Tens] + ' mươi'; // kiểm tra nếu phần hàng chục >1 thì lấy số thứ tự của nó trong mảng + 'mươi'
        if (Unit === 1) {
            String += ' mốt' // nếu phần đơn vị ==1 thì thêm 'mốt'
        }
    } else if (Tens === 1) { // nếu hàng chục =1 thì đọc là mười
        String = ' mười';
        if (Unit === 1) {
            String += ' một'; // nếu hàng đơn vị là 1 thì đọc là 'một'
        }
    }
    if (Tens === 0 && Unit > 0) { //trường hợp số >=100 kiểm tra nếu hàng chục =0 và hàng đơn vị >0  thì phải thêm chuỗi 'lẻ'
        String = ' lẻ'
    }
    if (Unit === 5 && Tens >= 1) {
        String += " lăm"; // trường hợp này kiểm tra nếu số cần đọc lớn
    } else if (Unit > 1 || (Unit === 1 && Tens === 0)) {  // trường hợp này chỉ cần đọc ra vị trí của số đó trong mảng Array_numb
        String += ' ' + Array_numb[Unit]
    }
    return String;
}
// phương thức đọc hàng trăm
function Read_hundred(so) {
    let String = '';
    let Hundred = Math.floor(so / 100);  // lấy phần nguyên của số đó chia 100
    let Number = so % 100; // lấy phần dư của số đó chia 100
    if (Hundred >= 0) {   // nếu hàng trăm >1 thì chỉ cần vị trí của số đó trong mảng + 'trăm'
        String = " " + Array_numb[Hundred] + ' trăm';
        String += Read_tens(Number);  // đồng thời đọc thêm phần đơn vị
    }
    else {
        String = Read_tens(Number)  // nếu số đó <100 thì gọi hàm đọc hàng chục
    }
    return String;
}
function Read_number(so) {
    if (so == 0) return Array_numb[0];  // Nếu số nhập vào =0 thì trả về giá trị của số đó tương ứng trong mảng
    var String = "";
    if (so < 100) {         // nếu số < 100 tiến hành đọc hàng chục
        String += " " + Read_tens(so);
        String = String.replace('lẻ', '')  // với trường hợp số có 2 chữ số thì bị in thêm chuỗi 'lẻ ' ở đầu nên cần xóa chuỗi này đi
    }
    else if (so >= 100 && so <= 999) {   // đọc số >= 100 và < 1000
        String += " " + Read_hundred(so)
    }
    else if (so >= 1000 && so <= 9999) {    // đọc số >=1000 và < 10000
        let _Thousand = Math.floor(so / 1000);      // lấy phần nguyên của số đó chia 1000
        let _Hundred = so % 1000;                   // lấy phần dư của số đó chia 1000
        if (_Thousand > 0) {                        // Nếu hàng nghìn >0 tiến hành đọc hàng nghìn
            String += " " + Array_numb[_Thousand] + " nghìn";
            String += " " + Read_hundred(_Hundred);  // sau đó tiến hành đọc hàng trăm
        }
    }
    else if (so >= 10000 && so <= 99999) {  // đọc số >=10000 và < 100000
        let _Thousand = Math.floor(so / 1000)       // Lấy phần nguyên của số đó chia 1000
        let _Hundred = so % 1000;                   // lấy phần dư của số đó chia 1000
        String += ' ' + Read_tens(_Thousand) + ' nghìn'; // Tiến hành đọc hàng nghìn với cách đọc là số có 2 chữ số + chuỗi 'nghìn'
        String += ' ' + Read_hundred(_Hundred);        // tiến hành đọc hàng trăm như bình thường
    }
    else if (so >= 100000 && so <= 999999) {      // đọc số >=100000 và < 1000000
        let _Thousand = Math.floor(so / 1000);  // lấy phần nguyên của số đó chia 1000  sẽ có kết quả là 3 sô
        let _Hundred = so % 1000;               // lấy phần dư của số đó chia 1000 sẽ có kết quả là 3 số
        String += ' ' + Read_hundred(_Thousand) + ' nghìn';  // tiến hành đọc hàng nghìn với số có 3 chữ số
        String += ' ' + Read_hundred(_Hundred);              // tiến hành đọc hàng trăm
    }
    else if (so >= 1000000 && so <= 999999999) {  // đọc số >=1000000 và < 1000000000
        let _Milion = Math.floor(so / 1000000);   // hàng triệu = phần nguyên của số chia 1000000 sẽ là số có 1 chữ số
        let _Hundred_thousand = so % 1000000;     // hàng trăm nghìn = phần dư của số chia 1000000
        if (_Milion === 1 && _Hundred_thousand === 0) {  // nếu hàng triệu ===1 và hàng trăm nghìn =0 thì là 1 triệu chẵn
            String = Array_numb[_Milion] + ' triệu'
        } else {
            if (_Milion < 100) {                   // nếu hàng triệu chỉ có 2 chữ số thì tiến hành đọc hàng chục sau đó + 'triệu'
                String += ' ' + Read_tens(_Milion) + ' triệu';
            }
            else {
                String += ' ' + Read_hundred(_Milion) + ' triệu';  // nếu hàng triệu >=100 thì tiến hành đọc số có 3 chữ số +'triệu'
            }
            String = String.replace('lẻ', '');
            String += ' ' + Read_hundred(Math.floor(_Hundred_thousand / 1000)) + ' nghìn';  // đọc phần hàng trăm nghìn
            String += ' ' + Read_hundred(_Hundred_thousand % 1000);  // đọc phần hàng trăm như bình thường
        }
    }
    else if (so >= 1000000000 && so <= 999999999999) {  // nếu số > 1 tỷ và < 1000 tỷ
        let _Bilion = Math.floor(so / 1000000000);      // phần tỷ = số chia 1 tỷ lấy phần nguyên
        let _Milion = so % 1000000000;                  // phần triệu  = số chia 1 tỷ lấy phần dư
        let _Hundred_thousand = _Milion % 1000000;      //phần trăm nghìn = phần triệu / 1000000 lấy phần dư
        if (_Bilion === 1 && _Milion === 0) {           // nếu phần tỷ ===1 và phần triệu ==0 thì in 1 tỷ chẵn
            String = Array_numb[_Bilion] + ' tỷ'
        }
        else {
            if (_Bilion < 100) {                        // nếu phần tỷ < 100 tức là phần tỷ có 2 chữ số
                String += ' ' + Read_tens(_Bilion) + ' tỷ';// tiến hành đọc số có 2 chữ số bình thường và cộng thêm chuỗi 'tỷ'
            } else {
                String += ' ' + Read_hundred(_Bilion) + ' tỷ'; // nếu > 100 thì tiến hành đọc sô có 2 chữ số
            }
            String = String.replace('lẻ', '');
            String += ' ' + Read_hundred(Math.floor(_Milion / 1000000)) + ' triệu'; // đọc phần trăm triệu
            String += ' ' + Read_hundred(Math.floor(_Hundred_thousand / 1000)) + ' nghìn';  // đọc phần trăm nghìn
            String += ' ' + Read_hundred(_Hundred_thousand % 1000);  // đọc phần trăm
        }
    }
    return String;
}
console.log('Số đọc thành:',Read_number(990123101005));
