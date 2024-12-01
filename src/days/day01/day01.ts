import Day from "../day.ts";

export default class Day01 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 11]];
  expectedPart2Results = () => [["sample.txt", 31]];

  part1(input: string) {
    return input
      .let(parseLists)
      .let(([left, right]) => left.map((num, i) => Math.abs(num - right[i])))
      .sum();
  }

  part2(input: string) {
    return input
      .let(parseLists)
      .let(([left, right]) => left.map((num, i) => num * right.count(num)))
      .sum();
  }
}

const parseLists = (input: string) =>
  input
    .lines()
    .map((line) => line.findNumbers())
    .transposed()
    .map((list) => list.toSorted());

if (import.meta.main) {
  new Day01().run();
}
