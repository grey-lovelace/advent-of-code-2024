import { Direction, turnR } from "../../utils/directions.ts";
import { Point, stringToGrid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day06 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 41]];
  expectedPart2Results = () => [["sample.txt", 6]];

  part1 = (input: string) => {
    const startingPoint = input
      .let(stringToGrid)
      .points.find((point) => point.val === "^");
    let currentPoint = startingPoint!;
    let vistedPoints = new Set([`${currentPoint.x},${currentPoint.y}`]);
    let currentDir: Direction = "north";
    while (currentPoint[currentDir]() !== undefined) {
      if (currentPoint[currentDir]().val === "#") {
        currentDir = turnR(currentDir);
      } else {
        currentPoint = currentPoint[currentDir]();
        vistedPoints.add(`${currentPoint.x},${currentPoint.y}`);
      }
    }
    return vistedPoints.size;
  };

  part2 = (input: string) => {
    const startingPoint = input
      .let(stringToGrid)
      .points.find((point) => point.val === "^");
    let currentPoint = startingPoint!;
    let vistedPoints = new Set([`${currentPoint.x},${currentPoint.y}`]);
    let currentDir: Direction = "north";
    while (currentPoint[currentDir]() !== undefined) {
      if (currentPoint[currentDir]().val === "#") {
        currentDir = turnR(currentDir);
      } else {
        currentPoint = currentPoint[currentDir]();
        vistedPoints.add(`${currentPoint.x},${currentPoint.y}`);
      }
    }
    return [...vistedPoints].slice(1).count((testPoint) => {
      currentPoint = startingPoint!;
      let newVistedPoints = new Set([`${currentPoint.x},${currentPoint.y}`]);
      currentDir = "north";
      let vistedPointsWithDir = [
        `${currentPoint.x},${currentPoint.y},${currentDir}`,
      ];
      while (currentPoint[currentDir]() !== undefined) {
        if (
          currentPoint[currentDir]().val === "#" ||
          `${currentPoint[currentDir]().x},${currentPoint[currentDir]().y}` ===
            testPoint
        ) {
          currentDir = turnR(currentDir);
        } else if (
          vistedPointsWithDir.includes(
            `${currentPoint[currentDir]().x},${
              currentPoint[currentDir]().y
            },${currentDir}`
          )
        ) {
          return true;
        } else {
          currentPoint = currentPoint[currentDir]();
          newVistedPoints.add(`${currentPoint.x},${currentPoint.y}`);
          vistedPointsWithDir.push(
            `${currentPoint.x},${currentPoint.y},${currentDir}`
          );
        }
      }
      return false;
    });
  };
}

if (import.meta.main) {
  new Day06().run();
}
