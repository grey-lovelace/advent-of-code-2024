import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day14 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 12]];
  expectedPart2Results = () => [];

  part1 = (input: string) => {
    const robots = input.lines().map((line) => line.findNumbers());
    const constraints =
      robots.map((robot) => robot[1]).max() > 10 ? [101, 103] : [11, 7];
    return robots
      .map(([px, py, vx, vy]) => {
        return range(1, 100).reduce(
          (acc, _) => {
            return [
              (acc[0] + vx) % constraints[0],
              (acc[1] + vy) % constraints[1],
            ].map((coord, i) => (coord < 0 ? coord + constraints[i] : coord));
          },
          [px, py]
        );
      })
      .filter(
        (position) =>
          position[0] !== Math.floor(constraints[0] / 2) &&
          position[1] !== Math.floor(constraints[1] / 2)
      )
      .groupedBy((position) =>
        [
          position[0] < Math.floor(constraints[0] / 2),
          position[1] < Math.floor(constraints[1] / 2),
        ].join(",")
      )
      .values()
      .map((quad) => quad.length)
      .product();
  };

  part2 = (input: string) => {
    let robots = input.lines().map((line) => line.findNumbers());
    const constraints =
      robots.map((robot) => robot[1]).max() > 10 ? [101, 103] : [11, 7];
    let seconds = 0;
    while (true) {
      const grid = range(0, constraints[1]).map((x) =>
        range(0, constraints[0]).map((y) => ".")
      );
      robots.forEach(([px, py, vx, vy]) => {
        grid[py][px] = "X";
      });
      // Check for tree by seeing if all positions are unique
      if (
        robots.map(([px, py]) => [px, py].toString()).unique().length ===
        robots.length
      )
        break;
      seconds++;
      robots = robots.map(([px, py, vx, vy]) => {
        const newPositions = [
          (px + vx) % constraints[0],
          (py + vy) % constraints[1],
          vx,
          vy,
        ];
        if (newPositions[0] < 0) newPositions[0] += constraints[0];
        if (newPositions[1] < 0) newPositions[1] += constraints[1];
        return newPositions;
      });
    }
    return seconds;
  };
}

if (import.meta.main) {
  new Day14().run();
}
