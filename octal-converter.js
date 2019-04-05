function octalString(str) {
    return new Promise((resolve, reject) => {
    var octalTemp = '';
    for (let i = 0; i <= str.length; i++){
        if(str[i] == '\\'){
            var temp = str.substr(i + 1, 3);
            temp = temp.toString();
            var octal = parseInt(temp, 8);
            var octalFinal = String.fromCharCode(octal);
            octalTemp = octalTemp + octalFinal;
            i = i + 3;
        }
    }
    resolve(octalTemp);
    reject(Error("loi"));
    })
}

module.exports = octalString;