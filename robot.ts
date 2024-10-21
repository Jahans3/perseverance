import { readFileSync } from "fs";

// Take input:
// upper-right bounds of world (x, y)
// initial position (x, y) and initial direction (N, S, E, W)
// a series of instructions ('L', 'R', 'F')

const inputFile = readFileSync("./input.txt", "utf-8");

export function validateBounds(bounds: string) {
  if (bounds === "" || !bounds.match(/^\d+ \d+$/)) {
    throw new Error(
      "The first line of the input must be a set of positive coordinates. E.g. '5 3'",
    );
  }
}

export function validateInstructionSet(
  initialPosition: string,
  movementInstructions: string,
) {
  if (!initialPosition.match(/^\d+ \d+ [NSEW]$/)) {
    throw new Error(
      "The second line of the input must be a set of positive coordinates followed by a bearing (NSEW)",
    );
  }

  if (!movementInstructions.match(/^[LRF]+$/)) {
    throw new Error(
      "The third line of the input must be a valid series of movement instructions (LRF)",
    );
  }
}

export function main(input: string) {
  const [bounds, ...instructions] = input.split("\n");

  validateBounds(bounds);

  for (let i = 0; i < instructions.length; i += 2) {
    if (instructions[i] === "") i++;
    if (!instructions[i + 1]) break;

    const initialPosition = instructions[i].trim();
    const movementInstructions = instructions[i + 1].trim();

    validateInstructionSet(initialPosition, movementInstructions);
  }

  console.log({
    bounds,
    instructions,
  });
}

main(inputFile);
