import { Grid, Point, stringToGrid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day08 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 14]];
  expectedPart2Results = () => [["sample.txt", 34]];

  part1 = (input: string) =>
    run(input, (grid, point1, point2) =>
      [
        grid.at(
          point1.x - (point2.x - point1.x),
          point1.y - (point2.y - point1.y)
        ),
      ].filter((item) => item != null)
    );

  part2 = (input: string) =>
    run(input, (grid, point1, point2) => {
      const xAmount = point2.x - point1.x;
      const yAmount = point2.y - point1.y;
      const points = [];
      let nextPoint = point1;
      while (nextPoint !== undefined) {
        points.push(nextPoint);
        nextPoint = grid.at(nextPoint.x - xAmount, nextPoint.y - yAmount)!;
      }
      return points;
    });
}

const run = (
  input: string,
  findResonantFrequencies: (
    grid: Grid<string>,
    point1: Point<string>,
    point2: Point<string>
  ) => Point<string>[]
) => {
  const frequencies = input.replaceAll(".", "").letters().unique();
  const grid = input.let(stringToGrid);
  return frequencies
    .map((fr) => grid.points.filter((p) => p.val === fr))
    .flatMap((frPoints) =>
      frPoints.flatMap((frp) => {
        return frPoints
          .filter((frp2) => !frp2.equals(frp))
          .flatMap((frp2) => findResonantFrequencies(grid, frp, frp2));
      })
    )
    .map((point) => point?.toString())
    .unique().length;
};

if (import.meta.main) {
  new Day08().run();
}
