import Day from "../day.ts";

export default class Day03 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 161]];
  expectedPart2Results = () => [["sample2.txt", 48]];

  part1 = multiplyNonCorrupted;
  part2 = (input: string) =>
    input
      .split("do()")
      .map((instruction) => instruction.split("don't()")[0])
      .join("")
      .let(multiplyNonCorrupted);
}

const multiplyNonCorrupted = (input: string) =>
  input
    .matchAllAsList(/mul\(\d+,\d+\)/g)
    .map((match) => match[0].findNumbers().product())
    .sum();

if (import.meta.main) {
  new Day03().run();
}
