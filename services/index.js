'use default';

module.exports = {
  promisify(foo) {
    return new Promise(
      (resolve, reject) => {
        foo((error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
      });
  }
}
