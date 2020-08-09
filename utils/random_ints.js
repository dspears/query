
  // Get a random integer in range low to high (high inclusive)
  function getRandomInt(low, high) {
    return Math.floor(Math.random()*(high-low+1))+low;
  }

  // Get a set of random integers in range low to high (high inclusive)
  function getRandomIntSet(low, high, howMany) {
    if (high-low+1 < howMany) {
      throw new Exception("Range error");
    }
    let set = new Set();
    do {
      set.add(getRandomInt(low, high));
    } while (set.size < howMany);
    return set;
  }

  module.exports.getRandomInt = getRandomInt;
  module.exports.getRandomIntSet = getRandomIntSet;
