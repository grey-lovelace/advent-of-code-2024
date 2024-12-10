import { Grid, stringToGrid } from "../../utils/grid.ts";
import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day10 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 36]];
  expectedPart2Results = () => [["sample.txt", 81]];

  part1 = pathFind;
  part2 = (input: string) => pathFind(input, true);
}

const pathFind = (input: string, countAllPaths = false) =>
  input
    .let(stringToGrid)
    .points.filter((point) => point.val === "0")
    .map(
      (startingPoint) =>
        range(1, 9)
          .reduce(
            (acc, current) =>
              acc.flatMap((path) =>
                path
                  .at(-1)!
                  .orthogonalPoints()
                  .filter((point) => Number(point.val) === current)
                  .map((point) => [...path, point])
              ),
            [[startingPoint]]
          )
          .map((path) => path.at(-1)!)
          .let((endPoints) => (countAllPaths ? endPoints : endPoints.unique()))
          .length
    )
    .sum();

if (import.meta.main) {
  new Day10().run();
}
