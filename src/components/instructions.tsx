export function Instructions() {
  return (
    <div className="mx-auto mb-2 bg-[#2D2928] instructions">
      <h2>How to play Mathler</h2>
      <p>
        Mathler is a math-based game inspired by Wordle. It requires you to use
        the operations +, -, *, and / as well as the digits 0-9 to create an
        equation that equals the answer given.
      </p>
      <p>Unlike Wordle, you get the answer in advance.</p>
      <h3>Try to find the hidden calculation in 6 guesses!</h3>
      <p>
        After each guess, the color of the tiles will change to show how close
        you are to the solution.
      </p>
      <ul>
        <li>Green are in the correct place.</li>
        <li>Orange are in the solution, but in a different place.</li>
        <li>Gray are not in the solution.</li>
      </ul>
      <img src="example-mathler-row.png" alt="Example Mathler guess row" />
      <h3>Additional rules:</h3>
      <ul>
        <li>Numbers and operators can appear multiple times.</li>
        <li>Calculate / or * before - or + (order of operations).</li>
        <li>
          Commutative solutions are accepted, for example 20+7+3 and 3+7+20.
        </li>
        <li>
          Commutative solutions will be automatically rearranged to the exact
          solution
        </li>
      </ul>
      <h3 className="center">An example of a winning game of 83</h3>
      <img src="winning-mathler.png" alt="Example winning Mathler puzzle" />
    </div>
  );
}
