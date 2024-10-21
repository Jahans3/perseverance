import { describe, expect, it } from "@jest/globals";
import { main, validateBounds, validateInstructionSet } from "./robot";

describe("perseverance", () => {
  it("should not throw an error if a valid instruction set is provided", () => {
    const validInput = `5 3
    1 1 N
    RFRFRFRF`;

    expect(() => main(validInput)).not.toThrow();
  });

  it("should produce the expected output for a valid instruction set", () => {
    const validInput = `5 3
    1 1 N
    RFRFRFRF`;

    expect(main(validInput)).toEqual("1 1 N");
  });

  it("should report when a robot is lost", () => {
    const validInput = `5 3
    3 2 N
    FRRFLLFFRRFLL`;

    expect(main(validInput)).toEqual("3 3 N LOST");
  });
});

describe("validateBounds", () => {
  it("should throw an error if the input does not contain a set of positive coordinates", () => {
    const malformedInput = `5 X`;

    expect(() => validateBounds(malformedInput)).toThrow(
      "The first line of the input must be a set of positive coordinates. E.g. '5 3'",
    );
  });
});

describe("validateInstructionSet", () => {
  it("should throw an error if the second line of the input is not a set of positive coordinates followed by a bearing (NSEW)", () => {
    const malformedInput = `5 3
      1 1 X`;

    expect(() => validateInstructionSet(malformedInput, "")).toThrow(
      "The second line of the input must be a set of positive coordinates followed by a bearing (NSEW)",
    );
  });

  it("should throw an error if the third line of the input is not a valid series of movement instructions (LRF)", () => {
    const malformedInput = `5 3
      1 1 N
      X`;

    expect(() => validateInstructionSet("1 1 N", malformedInput)).toThrow(
      "The third line of the input must be a valid series of movement instructions (LRF)",
    );
  });
});
