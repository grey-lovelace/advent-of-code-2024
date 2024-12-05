import Day from "../day.ts";

export default class Day05 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 143]];
  expectedPart2Results = () => [["sample.txt", 123]];

  part1 = run;
  part2 = (input: string) => run(input, false);
}

const run = (input: string, persistUnchangedUpdates = true) =>
  input
    .paragraphs()
    .map((p) => p.lines())
    .let(([rules, updates]) => ({
      ruleMap: rules
        .map((rule) => rule.split("|"))
        .groupedBy(
          (rule) => rule[0],
          (rule) => rule[1]
        ),
      updates: updates.map((update) => update.split(",")),
    }))
    .let(({ ruleMap, updates }) =>
      updates.map((update) => ({
        original: update,
        sorted: update.toSorted((page1, page2) =>
          (ruleMap[page1] ?? []).includes(page2) ? -1 : 1
        ),
      }))
    )
    .filter(
      ({ original, sorted }) =>
        (original.join(",") === sorted.join(",")) == persistUnchangedUpdates
    )
    .map(({ sorted }) => sorted[Math.floor(sorted.length / 2)])
    .toNums()
    .sum();

if (import.meta.main) {
  new Day05().run();
}
