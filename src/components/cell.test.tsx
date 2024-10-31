import { Cell } from "./cell";
import { render, screen } from "@testing-library/react";

describe("render cell", () => {
  it("it renders correct value in wrong position", () => {
    render(<Cell value="9" guessResultType={2} />);
    const element = screen.getByText("9");
    expect(element.innerHTML).toEqual("9");
    expect(element.classList.contains("bg-yellow-600")).toEqual(true);
  });
  it("it renders correct value in correct position", () => {
    render(<Cell value="6" guessResultType={1} />);
    const element = screen.getByText("6");
    expect(element.innerHTML).toEqual("6");
    expect(element.classList.contains("bg-green-500")).toEqual(true);
  });
  it("it renders wrong value in wrong position", () => {
    render(<Cell value="*" guessResultType={0} />);
    const element = screen.getByText("*");
    expect(element.innerHTML).toEqual("*");
    expect(element.classList.contains("bg-gray-500")).toEqual(true);
  });
  it("it renders wrong value in wrong position", () => {
    render(<Cell />);
    const element = screen.getByText("");
    expect(element.innerHTML).toEqual("");
    expect(element.classList.contains("transparent")).toEqual(true);
  });
  it("it renders active value that has not yet been submitted", () => {
    render(<Cell value="2" guessResultType={null} />);
    const element = screen.getByText("2");
    expect(element.innerHTML).toEqual("2");
    expect(element.classList.contains("bg-[#d4ddeb]")).toEqual(true);
  });
});
