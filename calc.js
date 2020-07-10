const formula = document.getElementById("formula");
const log = document.getElementById("log");


function btn(string) {
    let fi = formula.innerText;
    if (string === "C" | string === "←"){
        command(string, fi);
    }
    else if (string === "="){
        equal(string, fi);
    }
    else if (isOperator(string)){
        operator(string, fi);
    }
    else if (isPoint(string)){
        point(string, fi);
    }
    else if (string === "\(" | string === "\)"){
        bracket(string, fi);
    }
    else{
        num(string, fi);
    }
}


function clearLog(){
    log.innerText = "";
}


function command(string, fi){
    switch(string){
        case "C":
            formula.innerText = 0;
        break;
        
        case "←":
            if (isNum(fi) & fi !== 0) {
                formula.innerText = 0;
            }
            else if (fi === "-" | fi === "(" ) { formula.innerText = 0;}
            else {
                formula.innerText = fi.slice(0, -1);
            }
            break;
        
        default:
            break;
    }
}

function equal(string, fi){
    if (!fi.match(/[^0-9\+\-\*\/~\(\)\{\}\.]/g)) {
        if (isOperator(fi.slice(-1)) | !bracketNum(fi)) {
            log.innerText += "invalid formula";
            log.innerText += "\n";
        }
        else {formula.innerText = calculation(fi);}
    }
    else {
        log.innerText += "security error";
        log.innerText += "\n";
        
    }
}


function operator(string, fi){
    switch (string) {
        case "+":
            opeCheck(string, fi);
            break;
        case "-":
            if (fi.slice(-1) === "0"){
                formula.innerText = string;
            }
            else if (fi.slice(-1) === "\("){
                formula.innerText += string;
            }
            else{opeCheck(string, fi);}
            break;
        case "*":
            opeCheck(string, fi);
            break;
        case "/":
            opeCheck(string, fi);
            break;
        

        default:
            break;
    }
}

function point(string, fi){
    if (pointCheck(string, fi)){
        formula.innerText += string;
    }
}

function bracket(string, fi){
    if (bracketCheck(string, fi)){
        formula.innerText += string;
    }
}

function num(string, fi){
    if (fi === "0") {
        formula.innerText = string;
    }
    else if (fi.slice(-1) === "\)"){
        formula.innerText += "*";
        formula.innerText += string;
    }
    else { formula.innerText += string;}
}


function calculation(string){
    const answer = String(eval(string));
    log.innerText += answer;
    log.innerText += "\n";
    return answer;
}


function opeCheck(string, fi) {
    if (isNum(fi.slice(-1)) | fi.slice(-1) === "\)"){
        formula.innerText += string;
    }
}

function pointCheck(string, fi){
    for(let step = fi.length-1; step >= 0; step--){
        if (fi[step] === string){
            return false;
        }
        else if (isOperator(fi[step]) | isBracket(fi[step])) {
            if (step === fi.length-1){
                return false;
            }
            else{return true;}
        }
    }
    return true;
}

function bracketCheck(string, fi){
    switch (string) {
        case "\(":
            if (fi === "0") {
                formula.innerText = string;
                break;
            }
            else if (isPoint(fi.slice(-1))){break;}
            else if (isNum(fi.slice(-1)) | fi.slice(-1) === "\)"){
                formula.innerText += "*";
            }
            formula.innerText += string;
            break;
        case "\)":
            let count1 = 0;
            let count2 = 0;
            for (let step = fi.length - 1; step >= 0; step--) {
                if(fi[step] === "\("){count1++;}
                if(fi[step] === "\)"){count2++;}
            }
            if (isPoint(fi.slice(-1))) { break; }
            else if (fi === "0" | fi.slice(-1) === "\(" | fi.slice(-1) === "-") { break; }
            else if (count1 <= count2){ break; }
            formula.innerText += string;
            break;
    
        default:
            break;
    }
}


function isOperator(character){
    if (character === "+" | character === "-" | character === "*" | character === "/"){
            return true;
        }
    else{return false;}
}

function isNum(character){
    if (character === "0" | character === "1" | character === "2" | character === "3" |
        character === "4" | character === "5" | character === "6" |
        character === "7" | character === "8" | character === "9") {
        return true;
    }
    else { return false; }
} //文字の種類判断をここに集約

function isPoint(character){
    if(character === "."){return true;}
    else{return false;}
}

function isBracket(character){
    if (character === "\(" | character === "\)"){
        return true;
    }
    else {return false;}
}

function bracketNum(fi) {
    let count1 = 0;
    let count2 = 0;

    for (let step = fi.length-1; step >= 0; step--) {
        if (fi[step] === "\(") { count1++; }
        else if (fi[step] === "\)") { count2++; }
    }

    if (count1 === count2) { return true; }
    else { return false; }
}