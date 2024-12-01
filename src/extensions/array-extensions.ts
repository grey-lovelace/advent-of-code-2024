import { range } from "../utils/range.ts";

Array.prototype.toNums = function (this) {
  return this.map(l => Number(l))
}

Array.prototype.sum = function (this) {
  return this.reduce((a, c) => a + c, 0)
}

Array.prototype.product = function (this) {
  return this.reduce((a, c) => a * c, 1)
}

Array.prototype.max = function (this) {
  return Math.max(...this)
}

Array.prototype.min = function (this) {
  return Math.min(...this)
}

Array.prototype.mapNonNull = function (this, func) {
  return this.map(func)
    .filter(item => item != null)
    .map(item => item!)
}

Array.prototype.associateBy = function <T, K extends string | number>(
    this: T[],
    keyFunc: (item: T) => K) {
  return this.reduce((acc, node) => ({
    ...acc,
    [keyFunc(node)]: node
  }), {} as Record<K, T>)
}

Array.prototype.groupedBy = function<T, K extends string | number | symbol, V> (
  this: T[],
  keyFunc: (item: T) => K,
  valFunc: ((item: T) => V) | ((item: T) => T) = (item) => item
) {
  const reduced = this.reduce((a, c) => {
    const key = keyFunc(c)
    a[key] = a[key] || []
    a[key].push(valFunc(c))
    return a
  }, Object.create(null))
  return { ...reduced }
}

Array.prototype.unique = function (this) {
  return [...new Set(this)]
}

Array.prototype.count = function <T>(this: T[], funcOrItem: T | ((item: T) => boolean)) {
  return funcOrItem instanceof Function ?
    this.filter(funcOrItem).length :
    this.filter(item => item === funcOrItem).length
}

Array.prototype.look = function (
  this,
  func = (i) => console.log(i ? i.toString() : i)
) {
  return this.map(i => {
    func(i)
    return i
  })
}

Array.prototype.transposed = function (this) {
  return this.reduce((a: any[], c) => {
    c.forEach((item, i) => {
      if (a.length <= i) a.push([])
      a[i].push(item)
    })
    return a
  }, [])
}

Array.prototype.flatten = function (this) {
  return this.flatMap(x => x)
}

Array.prototype.windowed = function (this, windowSize: number) {
  return this.map((_, i) => range(0,windowSize-1).map(r => this[i+r]))
  .filter((l,i) => i%windowSize == 0)
}