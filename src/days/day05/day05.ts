import Day from "../day.ts";

export default class Day05 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 143]];
  expectedPart2Results = () => [["sample.txt", 123]];

  part1 = run
  part2 = (input: string) => run(input, true)
}

const run = (input: string, part2 = false) => 
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
      updates
        .filter((update) => part2 ? !isValid(update, ruleMap) : isValid(update, ruleMap))
        .mapNonNull((update) => {
          let pages = [...update];
          while (!isValid(pages, ruleMap)) {
            const brokenRules = pages
              .mapNonNull((page, i) =>
                (ruleMap[page] ?? []).find((rule) =>
                  pages.slice(0, i).includes(rule)
                )
              )
              .unique() as string[];
            pages = pages.filter((page) => !brokenRules.includes(page));
            pages.push(...brokenRules);
          }
          return pages;
        })
    )
    .map((update) => update[Math.floor(update.length / 2)])
    .toNums()
    .sum();

const isValid = (pages: string[], ruleMap: Record<string, string[]>) =>
  pages.every(
    (page, i) =>
      !(ruleMap[page] ?? []).some((required) =>
        pages.slice(0, i).includes(required)
      )
  );

if (import.meta.main) {
  new Day05().run();
}
