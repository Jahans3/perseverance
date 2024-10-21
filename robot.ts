import { readFileSync, writeFileSync } from "fs";

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

const directions = ["N", "E", "S", "W"];

export function rotateLeft(bearing: string) {
  const index = directions.indexOf(bearing);
  return directions[(index + 3) % 4];
}

export function rotateRight(bearing: string) {
  const index = directions.indexOf(bearing);
  return directions[(index + 1) % 4];
}

function updateCoordinates(boundX: number, boundY: number, isLost: boolean) {
  return (x: number, y: number, bearing: string) => {
    switch (bearing) {
      case "N": {
        if (y + 1 > boundY) isLost = true;
        else y++;
        break;
      }
      case "E": {
        if (x + 1 > boundX) isLost = true;
        else x++;
        break;
      }
      case "S": {
        if (y - 1 < 0) isLost = true;
        else y--;
        break;
      }
      case "W": {
        if (x - 1 < 0) isLost = true;
        else x--;
        break;
      }
    }
  };
}

export function moveRobot(
  bounds: string,
  initialPosition: string,
  movementInstructions: string,
) {
  const [initialX, initialY, initialDirection] = initialPosition.split(" ");
  const [maxX, maxY] = bounds.split(" ");
  const boundX = parseInt(maxX);
  const boundY = parseInt(maxY);

  const update = updateCoordinates(boundX, boundY, false);

  let x = parseInt(initialX);
  let y = parseInt(initialY);
  let bearing = initialDirection;
  let isLost = false;

  for (let i = 0; i < movementInstructions.length; i++) {
    const instruction = movementInstructions[i];

    if (instruction === "L") {
      bearing = rotateLeft(bearing);
    } else if (instruction === "R") {
      bearing = rotateRight(bearing);
    } else if (instruction === "F") {
      update(x, y, bearing);
    }

    if (isLost) {
      return `${x} ${y} ${bearing} LOST`;
    }
  }

  return `${x} ${y} ${bearing}`;
}

export function main(input: string) {
  const [bounds, ...instructions] = input.split("\n");
  let output = ``;

  validateBounds(bounds);

  for (let i = 0; i < instructions.length; i += 2) {
    if (instructions[i] === "") i++;
    if (!instructions[i + 1]) break;

    const initialPosition = instructions[i].trim();
    const movementInstructions = instructions[i + 1].trim();

    validateInstructionSet(initialPosition, movementInstructions);

    output = `${output}\n${moveRobot(bounds, initialPosition, movementInstructions)}`;
  }

  writeFileSync("./output.txt", output.trim());
}

main(inputFile);
