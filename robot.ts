import { readFileSync, writeFileSync } from "fs";

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

export function detectScent(x: number, y: number, scents: number[][]) {
  return scents.some(([scentX, scentY]) => scentX === x && scentY === y);
}

export function addScent(x: number, y: number, scents: number[][]) {
  scents.push([x, y]);
}

export function rotateLeft(bearing: string) {
  const index = directions.indexOf(bearing);
  return directions[(index + 3) % 4];
}

export function rotateRight(bearing: string) {
  const index = directions.indexOf(bearing);
  return directions[(index + 1) % 4];
}

function updateCoordinates(boundX: number, boundY: number, scents: number[][]) {
  return (x: number, y: number, bearing: string) => {
    let isLost = false;
    switch (bearing) {
      case "N": {
        const nextY = y + 1;

        if (nextY > boundY) {
          if (!detectScent(x, y, scents)) {
            isLost = true;
            addScent(x, y, scents);
          }
        } else {
          y++;
        }
        break;
      }
      case "E": {
        const nextX = x + 1;

        if (nextX > boundX) {
          if (!detectScent(x, y, scents)) {
            isLost = true;
            addScent(x, y, scents);
          }
        } else {
          x++;
        }
        break;
      }
      case "S": {
        const nextY = y - 1;

        if (nextY < 0) {
          if (!detectScent(x, y, scents)) {
            isLost = true;
            addScent(x, y, scents);
          }
        } else {
          y--;
        }
        break;
      }
      case "W": {
        const nextX = x - 1;

        if (nextX < 0) {
          if (!detectScent(x, y, scents)) {
            isLost = true;
            addScent(x, y, scents);
          }
        } else {
          x--;
        }
        break;
      }
    }

    return { x, y, isLost };
  };
}

export function moveRobot(
  bounds: string,
  initialPosition: string,
  movementInstructions: string,
  scents: number[][],
) {
  const [initialX, initialY, initialDirection] = initialPosition.split(" ");
  const [maxX, maxY] = bounds.split(" ");
  const boundX = parseInt(maxX);
  const boundY = parseInt(maxY);

  let x = parseInt(initialX);
  let y = parseInt(initialY);
  let bearing = initialDirection;

  const update = updateCoordinates(boundX, boundY, scents);

  for (let i = 0; i < movementInstructions.length; i++) {
    const instruction = movementInstructions[i];

    if (instruction === "L") {
      bearing = rotateLeft(bearing);
    } else if (instruction === "R") {
      bearing = rotateRight(bearing);
    } else if (instruction === "F") {
      const result = update(x, y, bearing);
      x = result.x;
      y = result.y;
      if (result.isLost) {
        return `${x} ${y} ${bearing} LOST`;
      }
    }
  }

  return `${x} ${y} ${bearing}`;
}

export function main(input: string) {
  const [bounds, ...instructions] = input.split("\n");
  const scents: number[][] = [];
  let output = ``;

  validateBounds(bounds);

  for (let i = 0; i < instructions.length; i += 2) {
    if (instructions[i] === "") i++;
    if (!instructions[i + 1]) break;

    const initialPosition = instructions[i].trim();
    const movementInstructions = instructions[i + 1].trim();

    validateInstructionSet(initialPosition, movementInstructions);

    output = `${output}\n${moveRobot(bounds, initialPosition, movementInstructions, scents)}`;
  }

  writeFileSync("./output.txt", output.trim());
  console.log(output.trim());
}

main(inputFile);
