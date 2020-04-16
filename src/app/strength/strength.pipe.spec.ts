import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
  const pipe = new StrengthPipe();

  it("should display weak if strength is 5", () => {
    expect(pipe.transform(5)).toEqual("5 (weak)");
  });

  it("should display strong if stength is 10", () => {
    expect(pipe.transform(10)).toEqual("10 (strong)");
  });
});
