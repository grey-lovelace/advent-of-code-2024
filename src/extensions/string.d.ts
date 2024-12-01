interface String {
    paragraphs(this: string): string[]
    lines(this: string): string[]
    letters(this: string): string[]
    reverse(this: string): string
    asNumber(this: string): number
    findNumbers(this: string): number[]
    matchAllAsList(this: string, regexp: RegExp): RegExpMatchArray[]
}