// 邮箱
export function isEmail(email){
    var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    return reg1.test( email );
}

export function isPostalCode(postalCode){
    var reg=/^[0-9]\d{5}(?!\d)$/;
    return reg.test(postalCode);
}

export function isTel( tel ){
    var reg = /^[\d|\-|\s|\_]+$/; //只允许使用数字-空格等
    return reg.test( tel );
}