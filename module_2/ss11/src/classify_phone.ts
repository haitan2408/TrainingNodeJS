function classifyPhone(arrPhone: string[]) {
    const viettel = ["086", "096", "097", "097", "032", "033", "034", "035", "036", "037", "038", "039"];
    const vinaphone = ["091", "094", "088", "083", "084", "085", "081", "082"];
    const mobiphone = ["089", "090", "093", "070", "079", "077", "076", "078"];

    let arrOfViettelNumber = [];
    let arrOfVinaNumber = [];
    let arrOfMobiNumber = [];
    const length = arrPhone.length;
    for (let i = 0; i < length; i++) {
        if (viettel.indexOf(arrPhone[i].substring(0, 3)) >= 0) {
            arrOfViettelNumber.push(arrPhone[i]);
        } else if (vinaphone.indexOf(arrPhone[i].substring(0, 3)) >= 0) {
            arrOfVinaNumber.push(arrPhone[i]);
        } else if (mobiphone.indexOf(arrPhone[i].substring(0, 3)) >= 0) {
            arrOfMobiNumber.push(arrPhone[i]);
        }
    }
    console.log("Viettel: " + arrOfViettelNumber);
    console.log("Vinaphone: " + arrOfVinaNumber);
    console.log("Mobiphone: " + arrOfMobiNumber);
}

let arr = [
    "0791234562",
    "0397372316",
    "0769765965",
    "0781234567",
    "0821234556",
    "0953455666",
    "0911234567",
    "0345204358",
];

classifyPhone(arr);
