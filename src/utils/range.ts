export const range = (start: number, end: number) => Array.from(
    {length: (end - start + 1)},
    (v, k) => k + start
)

export const between = (num: number, a: number, b: number) => {
    return Math.min(a,b) <= num && num <= Math.max(a,b)
};