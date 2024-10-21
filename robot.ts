import { readFileSync } from "fs";

// Take input:
// upper-right bounds of world (x, y)
// initial position (x, y) and initial direction (N, S, E, W)
// a series of instructions ('L', 'R', 'F')

const inputFile = readFileSync("./input.txt", "utf-8");

export function main(input: string) {
  const [bounds, ...instructions] = input.split("\n");

  if (bounds === "" || !bounds.match(/^\d+ \d+$/)) {
    throw new Error(
      "The first line of the input must be a set of positive coordinates. E.g. '5 3'",
    );
  }

  if (!instructions[0].trim().match(/^\d+ \d+ [NSEW]$/)) {
    throw new Error(
      "The second line of the input must be a set of positive coordinates followed by a bearing (NSEW)",
    );
  }

  console.log({
    bounds,
    instructions,
  });
}

main(inputFile);
