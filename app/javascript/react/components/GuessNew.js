import React, { useState, useEffect } from "react";

import helpers from "./helpers";
import GuessTell from "./GuessTell";
import WordComponent from "./WordComponent";

export const GuessNew = (props) => {
  const [currentguess, setCurrentGuess] = useState([]);
  const [guessStatus, setGuessStatus] = useState([]);
  const [guessRender, setGuessRender] = useState([]);
  const [count, setCount] = useState(0);
  const [wordData, setWordData] = useState([]);

  const handleChange = (event) => {
    setCurrentGuess(event.currentTarget.value);
  };


  let answer;
  if (props.game.answer != undefined) {
    answer = props.game.answer;
  }
  const handleSubmit = (event) => {
    event.preventDefault(event);

    if (guessStatus != "win" && count < 5) {
      answer = helpers.checkGuess(currentguess, answer);

      if (helpers.checkLength(currentguess) && answer) {
        setCount(count + 1);
        props.submitGuess(event, currentguess);
        let answerRenderable = helpers.convertToRender(answer);
        let newRenderArray = guessRender.concat(answerRenderable);
        setGuessRender(newRenderArray);

        if (currentguess.toLowerCase() == props.game.answer.toLowerCase()) {
          setGuessStatus("win");
        } else {
          setCurrentGuess("");

          if (count > 3) {
            setGuessStatus("lose");
          }
        }
      } else {
        alert("Guessses can only contain letters, and be six characters long!");
      }
    }
  };



  if (guessStatus == "win") {
    alert(`You won! The word was ${answer}`);
    setGuessStatus(`The word was ${answer}`)
  }

  if (guessStatus == "lose") {
    alert(`No more guesses! The answer was ${answer}`);
    setGuessStatus(`Oh no! The word was "${answer}". Refresh to try again.`)
  }

  const renderThese = guessRender.map((guess) => {

    return (
      <GuessTell content={guess.props.children} class={guess.props.class} />
    );
  });

  return (
    <div className="grid-x cell">
      <h4 className="">{guessStatus}</h4>
      <div className="grid-x">{renderThese}</div>
      <br />
      <div>
      </div>

      <form onSubmit={handleSubmit} className="float-center guess-form">
        <input
          maxLength={6}
          type="text"
          name="guess"
          value={currentguess}
          onChange={handleChange}
          placeholder="Guess the word!"
          className="submit-field"
        />
        <input className="aux_button button-19" type="submit" value="guess" />
      </form>
    </div>
  );
};

export default GuessNew;
