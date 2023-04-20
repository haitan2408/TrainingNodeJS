function validateNameClass(nameClass: string): boolean {
    const regexNameClass = "^(C|A|P)[0-9]{4}(G|H|I|K|L|M)$"
    if(nameClass.match(regexNameClass)) {
        return true;
    } else {
        return false;
    }
}

console.log(validateNameClass("C1238G"));
