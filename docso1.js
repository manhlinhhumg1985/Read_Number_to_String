/**
 * Created by thanhhuyen on 7/13/17.
 */
const Array_numb = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
function Read_tens(so) {
    let String = '';
    let Tens = Math.floor(so / 10);
    let Unit = so % 10;
    if (Tens > 1) {
        String = " " + Array_numb[Tens] + ' mươi';
        if (Unit === 1) {
            String += ' mốt'
        }
    } else if (Tens === 1) {
        String = ' mười';
        if (Unit === 1) {
            String += ' một';
        }
    }
    if (Tens === 0 && Unit > 0) {
        String = ' lẻ'
    }
    if (Unit === 5 && Tens >= 1) {
        String += " lăm";
    } else if (Unit > 1 || (Unit === 1 && Tens === 0)) {
        String += ' ' + Array_numb[Unit]
    }
    return String;
}
function Read_hundred(so) {
    let String = '';
    let Hundred = Math.floor(so / 100);
    let Number = so % 100;
    if (Hundred >= 0) {
        String = " " + Array_numb[Hundred] + ' trăm';
        String += Read_tens(Number);
    }
    else {
        String = Read_tens(Number)
    }
    return String;
}
function Read_number(so) {
    if (so == 0) return Array_numb[0];
    var String = "";
    if (so < 100) {
        String += " " + Read_tens(so);
        String = String.replace('lẻ', '')
    }
    else if (so >= 100 && so <= 999) {
        String += " " + Read_hundred(so)
    }
    else if (so >= 1000 && so <= 9999) {
        let _Thousand = Math.floor(so / 1000);
        let _Hundred = so % 1000;
        if (_Thousand > 0) {
            String += " " + Array_numb[_Thousand] + " nghìn";
            String += " " + Read_hundred(_Hundred);
        }
    }
    else if (so >= 10000 && so <= 99999) {
        let _Thousand = Math.floor(so / 1000)
        let _Hundred = so % 1000;
        String += ' ' + Read_tens(_Thousand) + ' nghìn';
        String += ' ' + Read_hundred(_Hundred);
    }
    else if (so >= 100000 && so <= 999999) {
        let _Thousand = Math.floor(so / 1000);
        let _Hundred = so % 1000;
        String += ' ' + Read_hundred(_Thousand) + ' nghìn';
        String += ' ' + Read_hundred(_Hundred);
    }
    else if (so >= 1000000 && so <= 999999999) {
        let _Milion = Math.floor(so / 1000000);
        let _Hundred_thousand = so % 1000000;
        if (_Milion === 1 && _Hundred_thousand === 0) {
            String = Array_numb[_Milion] + ' triệu'
        } else {
            if (_Milion < 100) {
                String += ' ' + Read_tens(_Milion) + ' triệu';
            }
            else {
                String += ' ' + Read_hundred(_Milion) + ' triệu';
            }
            String = String.replace('lẻ', '');
            String += ' ' + Read_hundred(Math.floor(_Hundred_thousand / 1000)) + ' nghìn';
            String += ' ' + Read_hundred(_Hundred_thousand % 1000);
        }
    }
    else if (so >= 1000000000 && so <= 999999999999) {
        let _Bilion = Math.floor(so / 1000000000);
        let _Milion = so % 1000000000;
        let _Hundred_thousand = _Milion % 1000000;
        if (_Bilion === 1 && _Milion === 0) {
            String = Array_numb[ty] + ' tỷ'
        }
        else {
            if (_Bilion < 100) {
                String += ' ' + Read_tens(_Bilion) + ' tỷ';
            } else {
                String += ' ' + Read_hundred(_Bilion) + ' tỷ';
            }
            String = String.replace('lẻ', '');
            String += ' ' + Read_hundred(Math.floor(_Milion / 1000000)) + ' triệu';
            String += ' ' + Read_hundred(Math.floor(_Hundred_thousand / 1000)) + ' nghìn';
            String += ' ' + Read_hundred(_Hundred_thousand % 1000);
        }
    }
    return String;
}
console.log(Read_number(111111111110));
// kết quả in ra chuỗi: một trăm mười một tỷ  một trăm mười một triệu  một trăm mười một nghìn  một trăm mười
