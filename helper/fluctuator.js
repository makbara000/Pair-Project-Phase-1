function fluctuator(num) {
    const fluctuation = num * 0.02;
    // const upOrDown = Math.random() < 0.5 ? -1 : 1;
    const randFluctuation = Math.random() * fluctuation;
    const newNum = num + (randFluctuation * 1);
    return newNum;
  }
 module.exports=fluctuator
