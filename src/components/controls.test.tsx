import { GameContext, GameProvider } from "@/provider/game";
import { Controls } from "./controls";
import { act, render, screen } from "@testing-library/react";
import { useContext } from "react";
import { Game } from "@/utils/game";

jest.mock("react"); // Mock the module
jest.mock("react", () => {
  const originalModule = jest.requireActual("react");

  return {
    ...originalModule, // Keep the original implementations
    useContext: jest.fn(() => ({
      game: { guess: jest.fn },
      setActiveGuess: jest.fn,
      activeGuess: "",
    })), // Mock the 'add' function
  };
});

function mockFetch(data: { expression: string; answer: string }) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}
window.fetch = mockFetch({ expression: "2+3+6", answer: "11" });

describe("render Controls", () => {
  it("it calls the guess function when the user enters there guess", async () => {
    await act(async () =>
      render(
        <GameProvider game={null}>
          <Controls />
        </GameProvider>
      )
    );

    const fakeHook = useContext(GameContext);
    const spy = jest.spyOn(fakeHook.game as Game, "guess");
    (fakeHook.game as Game).guess("");
    const buttonElement = screen.getByTestId("ENTER");
    buttonElement.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("it calls the setActiveGuess function when the user clicks on number button", async () => {
    await act(async () =>
      render(
        <GameProvider game={null}>
          <Controls />
        </GameProvider>
      )
    );
    const fakeHook = useContext(GameContext);
    const spy = jest.spyOn(fakeHook, "setActiveGuess");
    fakeHook.setActiveGuess();

    const buttonElement = screen.getByTestId("5");
    buttonElement.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("it calls the setActiveGuess function when the user clicks on Delete button", async () => {
    await act(async () =>
      render(
        <GameProvider game={null}>
          <Controls />
        </GameProvider>
      )
    );
    const fakeHook = useContext(GameContext);
    const spy = jest.spyOn(fakeHook, "setActiveGuess");
    fakeHook.setActiveGuess();

    const buttonElement = screen.getByTestId("DELETE");
    buttonElement.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
