const generator = (length) => {
  var chars = "0123456789";
  var randomstring = "";
  for (var i = 0; i < length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
};

module.exports = {
  genKey: (type) => {
    let randomstring = generator(3) + "-" + generator(3);

    if (type === "fields") return "F-".concat(randomstring);
    if (type === "type") return "T-".concat(randomstring);
    if (type === "album") return "A-".concat(randomstring);
    if (type === "data") return "D-".concat(randomstring);
    return `${type}-`.concat(randomstring);
  },
};
