import { describe, expect, it } from "@jest/globals";
import { main } from "./robot";

describe("perseverance", () => {
  it("should throw an error if the first line of the input is not a set of positive coordinates", () => {
    expect(() => main("")).toThrow(
      "The first line of the input must be a set of positive coordinates. E.g. '5 3'",
    );
  });

  it("should throw an error if the second line of the input is not a set of positive coordinates followed by a bearing (NSEW)", () => {});
  it("should throw an error if the third line of the input is not a valid series of movement instructions (LRF)", () => {});
  it("should produce the expected output for a valid instruction set", () => {});
  it("should report when a robot is lost", () => {});
});
