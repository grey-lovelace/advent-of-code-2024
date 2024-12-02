import { between, range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day02 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 2]];
  expectedPart2Results = () => [["sample.txt", 4]];

  part1 = findSafeReports;
  part2 = (input: string) => findSafeReports(input, true);
}

const findSafeReports = (input: string, canSkipNumber = false) =>
  input
    .lines()
    .map((line) => line.findNumbers())
    .map((report) => [
      report,
      ...(canSkipNumber
        ? range(0, report.length).map((i) => report.toSpliced(i, 1))
        : []),
    ])
    .map((reportOptions) => reportOptions.some(isSafe))
    .count(true);

const isSafe = (report: number[]) =>
  report
    .slice(0, -1)
    .every((num, i) => between(report[i + 1], num - 3, num - 1)) ||
  report
    .slice(0, -1)
    .every((num, i) => between(report[i + 1], num + 1, num + 3));

if (import.meta.main) {
  new Day02().run();
}
