String.prototype.paragraphs = function (this) {
  return this.split(/(?:\r?\n){2}/);
};

String.prototype.lines = function (this) {
  return this.split(/(?:\r?\n){1}/);
};

String.prototype.letters = function (this) {
  return this.split("");
};

String.prototype.reverse = function (this) {
  return this.split("").reverse().join("");
};

String.prototype.findNumbers = function (this) {
  return this.matchAllAsList(/[\-\d]+/g)
    .map(i => i[0])
    .toNums();
};

String.prototype.matchAllAsList = function (this, regexp) {
  return [...this.matchAll(regexp)]
}

String.prototype.asNumber = function (this) {
  return Number(this)
}