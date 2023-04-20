function findMaxArrayNumber(arr) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(arr)) {
            reject("Không phải Array")
        } else {
            arr.sort(function (a, b) {
                return b - a;
            })
            resolve(arr[0]);
        }
    })
}

async function f() {
    try {
        let result = await findMaxArrayNumber("123");
        console.log(result)
    } catch (e) {
        console.log(e);
    }
}
f();
