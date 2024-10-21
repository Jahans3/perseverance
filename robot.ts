import { readFileSync } from "fs";

// Take input:
// upper-right bounds of world (x, y)
// initial position (x, y) and initial direction (N, S, E, W)
// a series of instructions ('L', 'R', 'F')

function main() {
  const [bounds, ...instructions] = readFileSync("./input.txt", "utf-8").split(
    "\n",
  );
  console.log({
    bounds,
    instructions,
    a: instructions.findIndex((x) => x === ""),
  });
}

main();
