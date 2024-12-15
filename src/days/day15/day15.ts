import { Direction } from "../../utils/directions.ts";
import { Point, stringToGrid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day15 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [
    ["sample.txt", 2028],
    ["sample2.txt", 10092],
  ];
  expectedPart2Results = () => [["sample2.txt", 9021]];

  part1 = moveRobot;

  part2 = (input: string) =>
    moveRobot(input, "[", {
      "#": "##",
      O: "[]",
      ".": "..",
      "@": "@.",
    });
}

const moveRobot = (
  input: string,
  measureBoxesFrom = "O",
  replacements: Record<string, string> = {}
) =>
  input
    .let((x) =>
      replacements
        .entries()
        .reduce((acc, [key, val]) => acc.replaceAll(key, val), x)
    )
    .paragraphs()
    .let(([a, b]) => ({
      grid: stringToGrid(a),
      instructions: b.replaceAll("\n", "").letters(),
    }))
    .also(({ grid, instructions }) =>
      instructions.forEach((instr) => {
        const dir = dirMap[instr]!;
        const currentPoint = grid.points.find((point) => point.val === "@")!;
        const nextPoint = currentPoint[dir]()!;
        if (nextPoint.val === ".") {
          currentPoint.val = ".";
          nextPoint.val = "@";
        }
        else if (nextPoint.val === "O") {
          let nextNonBox = nextPoint[dir]()!;
          while (nextNonBox.val === "O") nextNonBox = nextNonBox[dir]()!;
          if (nextNonBox.val === "#") return;
          currentPoint.val = ".";
          nextPoint.val = "@";
          nextNonBox.val = "O";
        }
        else if (["[", "]"].includes(nextPoint.val)) {
          if (["east", "west"].includes(dir)) {
            let nextNonBox = nextPoint[dir]()!;
            const boxPoints = [];
            while (["[", "]"].includes(nextNonBox.val)) {
              boxPoints.push(nextNonBox);
              nextNonBox = nextNonBox[dir]()!;
            }
            if (nextNonBox.val === "#") return;
            currentPoint.val = ".";
            nextPoint.val = "@";
            nextNonBox.val = dir === "east" ? "]" : "[";
            boxPoints.forEach(
              (boxPoint) => (boxPoint.val = boxPoint.val === "[" ? "]" : "[")
            );
          } else {
            const boxPoints: Point<string>[] = [];
            const cascadeBoxes = (boxPoint: Point<string>): Point<string>[] => {
              const otherBoxPoint =
                boxPoint.val === "[" ? boxPoint.east()! : boxPoint.west()!;
              boxPoints.push(boxPoint);
              boxPoints.push(otherBoxPoint);
              return [boxPoint, otherBoxPoint].flatMap((point) =>
                ["[", "]"].includes(point[dir]()!.val)
                  ? cascadeBoxes(point[dir]()!)
                  : [point[dir]()!]
              );
            };
            const upcomingPoints = cascadeBoxes(nextPoint);
            if (upcomingPoints.map((point) => point.val).includes("#")) return;
            [...upcomingPoints, ...boxPoints]
              .map((point) => {
                const targetValPoint =
                  point[dir === "north" ? "south" : "north"]()!;
                return {
                  point,
                  targetVal: boxPoints.includes(targetValPoint)
                    ? targetValPoint.val
                    : ".",
                };
              })
              .forEach(({ point, targetVal }) => (point.val = targetVal));
            currentPoint.val = ".";
            nextPoint.val = "@";
          }
        }
      })
    )
    .grid.points.filter((point) => point.val === measureBoxesFrom)
    .map((box) => 100 * box.y + box.x)
    .sum();

const dirMap: Record<string, Direction> = {
  "<": "west",
  "^": "north",
  ">": "east",
  v: "south",
} as const;

if (import.meta.main) {
  new Day15().run();
}
