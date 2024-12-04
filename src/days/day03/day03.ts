import Day from "../day.ts";

export default class Day03 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 161]];
  expectedPart2Results = () => [["sample2.txt", 48]];

  part1 = multiplyNonCorrupted;
  part2 = (input: string) =>
    input
      .replaceAll(/(?:don't\(\).*?)*(?:do\(\)|$)/gs, "")
      .let(multiplyNonCorrupted);
}

const multiplyNonCorrupted = (input: string) =>
  input
    .matchAllAsList(/mul\((\d+),(\d+)\)/g)
    .also((it) => console.log(it.length))
    .map((match) => Number(match[1])*Number(match[2]))
    .sum();

if (import.meta.main) {
  new Day03().run();
}
