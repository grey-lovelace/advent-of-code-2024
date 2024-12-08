import Day from "../day.ts";

export default class Day07 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 3749]];
  expectedPart2Results = () => [["sample.txt", 11387]];

  part1 = calibrate;
  part2 = (input: string) => calibrate(input, 3);
}

const operators: ((a: number, b: number) => number)[] = [
  (a, b) => a + b,
  (a, b) => a * b,
  (a, b) => Number(a.toString() + b.toString()),
];

const calibrate = (input: string, rulesToUse = 2) =>
  input
    .lines()
    .map((line) => line.split(":"))
    .map(([testVal, nums]) => ({
      testVal: Number(testVal),
      nums: nums.trim().split(" ").toNums(),
    }))
    .filter(({ testVal, nums }) =>
      nums
        .slice(1)
        .reduce(
          (acc, current) =>
            acc
              .flatMap((option) =>
                operators.slice(0, rulesToUse).map((op) => op(option, current))
              )
              .filter((option) => option <= testVal),
          [nums[0]]
        )
        .includes(testVal)
    )
    .map((equation) => equation.testVal)
    .sum();

if (import.meta.main) {
  new Day07().run();
}
