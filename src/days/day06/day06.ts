import { Direction, turnR } from "../../utils/directions.ts";
import { stringToGrid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day06 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 41]];
  expectedPart2Results = () => [["sample.txt", 6]];

  part1 = (input: string) => input.let(findPath).visitedPoints.length;
  part2 = (input: string) =>
    input
      .let(findPath)
      .visitedPoints.slice(1)
      .count((point) => findPath(input, point).loopFound);
}

const findPath = (input: string, testObstacle: string = `-1,-1`) => {
  const [testX, testY] = testObstacle.split(",").toNums();
  let currentDir: Direction = "north";
  let currentPoint = input
    .let(stringToGrid)
    .also((grid) => grid.at(testX, testY) && (grid.at(testX, testY)!.val = "#"))
    .points.find((point) => point.val === "^")!;
  let loopFound = false;
  const visited = new Set([
    [currentPoint.x, currentPoint.y, currentDir].join(","),
  ]);
  while (currentPoint[currentDir]() !== undefined) {
    const nextPoint = currentPoint[currentDir]()!;
    if (visited.has([nextPoint.x, nextPoint.y, currentDir].join(","))) {
      loopFound = true;
      break;
    } else if (nextPoint.val === "#") {
      currentDir = turnR(currentDir);
    } else {
      currentPoint = nextPoint;
      visited.add([currentPoint.x, currentPoint.y, currentDir].join(","));
    }
  }
  return {
    visitedPoints: [...visited]
      .map((point) => point.split(",").toSpliced(2, 1).join(","))
      .unique(),
    loopFound,
  };
};

if (import.meta.main) {
  new Day06().run();
}
