import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day11 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 55312]];
  expectedPart2Results = () => [];

  part1 = simulateBlinks;
  part2 = (input: string) => simulateBlinks(input, 75);
}

const simulateBlinks = (input: string, numOfBLinks = 25) => {
  return input
    .findNumbers()
    .let((stones) =>
      Object.fromEntries(stones.map((stone) => [stone, stones.count(stone)]))
    )
    .let((stoneMap) =>
      range(1, numOfBLinks).reduce((acc, _) => {
        const accMap: Record<string, number> = {};
        acc.entries().forEach(([key, val]) => {
          transformStone(Number(key))
            .map((newNum) => [newNum, val])
            .forEach(
              (pair) => (accMap[pair[0]] = (accMap[pair[0]] ?? 0) + pair[1])
            );
        });
        return accMap;
      }, stoneMap)
    )
    .values()
    .sum();
};

const transformStone = (stone: number): number[] => {
  if (stone === 0) return [1];
  else if (stone.toString().length % 2 === 0) {
    const digits = stone.toString().letters();
    return [
      Number(digits.slice(0, digits.length / 2).join("")),
      Number(digits.slice(digits.length / 2).join("")),
    ];
  } else return [stone * 2024];
};

if (import.meta.main) {
  new Day11().run();
}
