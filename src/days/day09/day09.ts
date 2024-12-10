import Day from "../day.ts";

export default class Day09 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 1928]];
  expectedPart2Results = () => [["sample.txt", 2858]];

  part1 = (input: string) => {
    const blocks = input
      .letters()
      .toNums()
      .flatMap((num, i) =>
        i % 2 === 0 ? Array(num).fill((i / 2).toString()) : Array(num).fill(".")
      );
    while (
      blocks.indexOf(".") < blocks.findLastIndex((block) => block !== ".")
    ) {
      const lastNum = blocks.findLastIndex((block) => block !== ".");
      const firstSpace = blocks.indexOf(".");
      blocks[firstSpace] = blocks.splice(lastNum, 1, blocks[firstSpace])[0];
    }
    return blocks
      .filter((block) => block !== ".")
      .map((block, i) => block * i)
      .sum();
  };

  part2 = (input: string) => {
    const blocks = input
      .letters()
      .toNums()
      .flatMap((num, i) => ({
        id: i / 2,
        size: num,
        space: i % 2 !== 0,
      }));
    blocks
      .toReversed()
      .filter((block) => !block.space)
      .forEach((block) => {
        const firstSpace = blocks.findIndex(
          (space) =>
            space.space && space.id < block.id && space.size >= block.size
        );
        if (firstSpace >= 0) {
          blocks[firstSpace].size = blocks[firstSpace].size - block.size;
          const blockIndex = blocks.findIndex((b) => b.id === block.id);
          blocks.splice(blockIndex, 1, { ...block, space: true });
          blocks.splice(firstSpace, 0, block);
        }
      });
    return (
      blocks
        .flatMap((block) => Array(block.size).fill(block.space ? 0 : block.id))
        .map((block, i) => block * i)
        .sum()
    );
  };
}

if (import.meta.main) {
  new Day09().run();
}
