import { directions, stringToGrid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day04 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 18]];
  expectedPart2Results = () => [["sample.txt", 9]];

  part1 = (input: string) =>
    input
      .let(stringToGrid)
      .points.filter((point) => point.val === "X")
      .map((point) =>
        directions.count(
          (dir) =>
            point[dir]()?.val === "M" &&
            point[dir]()?.[dir]()?.val === "A" &&
            point[dir]()?.[dir]()?.[dir]()?.val === "S"
        )
      )
      .sum();

  part2 = (input: string) =>
    input
      .let(stringToGrid)
      .points.filter((point) => point.val === "M")
      .map((point) =>
        [
          point.southeast()?.val === "A" &&
            point.southeast()?.southeast()?.val === "S" &&
            ((point.east()?.east()?.val === "M" &&
              point.south()?.south()?.val === "S") ||
              (point.east()?.east()?.val === "S" &&
                point.south()?.south()?.val === "M")),
          point.northwest()?.val === "A" &&
            point.northwest()?.northwest()?.val === "S" &&
            ((point.west()?.west()?.val === "M" &&
              point.north()?.north()?.val === "S") ||
              (point.west()?.west()?.val === "S" &&
                point.north()?.north()?.val === "M")),
        ].count(true)
      )
      .sum();
}

if (import.meta.main) {
  new Day04().run();
}
