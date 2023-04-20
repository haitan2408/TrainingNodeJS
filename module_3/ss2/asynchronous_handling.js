function asynchronousHandling(money) {
  return new Promise((resolve, reject) => {
      if(money > 1000000000) {
          resolve("Đủ tiền mua xe");
      } else {
          reject("Không đủ tiền mua xe");
      }
  })
}

const promise = asynchronousHandling(100000).then(result => {
    console.log(result)
}, error => {
    console.log(error);
})
