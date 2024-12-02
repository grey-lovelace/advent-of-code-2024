import { assertEquals } from "@std/assert";
import "../extensions/string-extensions.ts";
import "../extensions/array-extensions.ts";
import "../extensions/object-extensions.ts";
import { copy } from "https://deno.land/x/clipboard@v0.0.3/mod.ts";

export default abstract class Day {
  abstract dayPath(): string;
  abstract expectedPart1Results(): any[][];
  abstract expectedPart2Results(): any[][];
  abstract part1(input: string): any;
  abstract part2(input: string): any;
  // Sometimes if things are not going well, want to easily shut off running the main parts. These do that.
  runPart1 = true;
  runPart2 = true;
  // Sometimes we need to change the input between parts.
  inputPart1 = "input.txt";
  inputPart2 = this.inputPart1;

  run = () => {
    const execute = (func: (input: string) => any, inputFile: string) =>
      func(Deno.readTextFileSync(`${this.dayPath()}/data/${inputFile}`));

    const executePart = (
      part: string,
      func: (input: string) => any,
      shouldRun: boolean,
      inputFile: string,
      tests: any[][]
    ) => {
      tests.forEach(([testFile, expected]) => {
        console.log(`${part} - ${testFile} - ${expected}`);
        assertEquals(execute(func, testFile), expected);
        console.log("\u001b[32mPASSED\u001b[0m");
      });

      if (shouldRun) {
        const output = execute(func, inputFile);
        console.log(`${part} - ${output}\n`);
        copy(output).then(() => console.log(`Copied answer ${output} to clipboard!`))// Copy output to clipboard so it is easy to paste into submit
      }
    };

    executePart(
      "Part1",
      this.part1,
      this.runPart1,
      this.inputPart1,
      this.expectedPart1Results()
    );
    executePart(
      "Part2",
      this.part2,
      this.runPart2,
      this.inputPart2,
      this.expectedPart2Results()
    );
  };
}
