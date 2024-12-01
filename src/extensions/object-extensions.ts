Object.prototype.entries = function (this) {
  return Object.entries(this)
}

Object.prototype.keys = function (this) {
  return Object.keys(this)
}

Object.prototype.values = function (this) {
  return Object.values(this)
}

Object.prototype.let = function (this, func) {
  return func(this)
}

Object.prototype.also = function (this, func) {
  func(this)
  return this
}