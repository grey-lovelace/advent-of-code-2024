interface Object {
    entries<T>(this: { [s: string]: T }): [string, T][]
    keys<T>(this: { [s: string]: T }): string[]
    values<T>(this: { [s: string]: T }): T[]
    let<T, K>(this: T, func: (arg: T) => K): K
    also<T, K>(this: T, func: (arg: T) => K): T
}