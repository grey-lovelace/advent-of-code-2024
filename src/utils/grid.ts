export class Grid<T extends string | number> {
  constructor(matrix: T[][]) {
    this.maxX = matrix[0].length - 1;
    this.maxY = matrix.length - 1;
    this.pointMatrix = matrix.map((row, y) =>
      row.map((cell, x) => new Point(x, y, this, cell))
    );
    this.points = this.pointMatrix.flat();
  }
  maxX: number;
  maxY: number;
  pointMatrix: Point<T>[][];
  points: Point<T>[];

  printGrid = () =>
    this.pointMatrix.forEach((line) =>
      console.log(line.map((point) => point.val.toString()).join(""))
    );

  at(x: number, y: number): Point<T> | undefined {
    if (x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY)
      return this.pointMatrix[y][x];
  }
}

export class Point<T extends string | number> {
  constructor(
    public x: number,
    public y: number,
    public grid: Grid<T>,
    public val: T
  ) {}
  distance: number | undefined = undefined;
  visited = false;
  toString = () => JSON.stringify({ x: this.x, y: this.y, val: this.val });
  isOnEdge = () =>
    [0, this.grid.maxX].includes(this.x) ||
    [0, this.grid.maxY].includes(this.y);
  equals = (point: Point<T>) => this.x === point.x && this.y === point.y;
  north = () => this.grid.at(this.x, this.y - 1);
  south = () => this.grid.at(this.x, this.y + 1);
  west = () => this.grid.at(this.x - 1, this.y);
  east = () => this.grid.at(this.x + 1, this.y);
  northeast = () => this.grid.at(this.x + 1, this.y - 1);
  southeast = () => this.grid.at(this.x + 1, this.y + 1);
  northwest = () => this.grid.at(this.x - 1, this.y - 1);
  southwest = () => this.grid.at(this.x - 1, this.y + 1);
  orthogonalPoints = () =>
    [this.north(), this.south(), this.west(), this.east()].filter(
      (it) => it != null
    ) as Point<T>[];
  diagonalPoints = () =>
    [
      this.northeast(),
      this.southeast(),
      this.northwest(),
      this.southwest(),
    ].filter((it) => it != null) as Point<T>[];
  adjPoints = (includeDiagonal = false) => [
    ...this.orthogonalPoints(),
    ...(includeDiagonal ? this.diagonalPoints() : []),
  ];
  manhattanDistance = (point: Point<T>) =>
    Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
}

export const orthogonalDirections = ["north", "east", "south", "west"] as const;
export const diagonalDirections = [
  "northeast",
  "southeast",
  "northwest",
  "southwest",
] as const;
export const directions = [...orthogonalDirections, ...diagonalDirections];

export const stringToGrid = (multiLineString: string) =>
  multiLineString
    .lines()
    .map((line) => line.letters())
    .let((grid) => new Grid(grid));
