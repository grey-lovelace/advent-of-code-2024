export type Direction = "north"|"east"|"south"|"west"
export const directions: Direction[] = ["north","east","south","west"]
export const turn = (currentDir: Direction, turnAmount: number) =>
    directions.at((directions.indexOf(currentDir)! + turnAmount) % directions.length)!
export const turnR = (currentDir: Direction) => turn(currentDir, 1)
export const turnL = (currentDir: Direction) => turn(currentDir, -1)