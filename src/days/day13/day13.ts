import Day from "../day.ts";

export default class Day13 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 480]];
  expectedPart2Results = () => [];

  part1 = playMachines;
  part2 = (input: string) => playMachines(input, 10000000000000);
}

const playMachines = (input: string, offset = 0) => {
  return input
    .paragraphs()
    .map((p) => p.findNumbers())
    .map(([ax, ay, bx, by, zx, zy]) => [
      ax,
      ay,
      bx,
      by,
      zx + offset,
      zy + offset,
    ])
    .map(([ax, ay, bx, by, zx, zy]) => ({
      // aMoves * a.x + bMoves * b.x = prize.x
      // aMoves * a.y + bMoves * b.y = prize.y
      aMoves: (zx * by - zy * bx) / (ax * by - ay * bx),
      bMoves: (zy * ax - zx * ay) / (ax * by - ay * bx),
    }))
    .filter(
      ({ aMoves, bMoves }) =>
        aMoves === Math.trunc(aMoves) && bMoves === Math.trunc(bMoves)
    )
    .map(({ aMoves, bMoves }) => 3 * aMoves + bMoves)
    .sum();
};

if (import.meta.main) {
  new Day13().run();
}
