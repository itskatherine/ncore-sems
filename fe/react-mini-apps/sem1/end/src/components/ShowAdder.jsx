import { useState } from "react";

const ShowAdder = (props) => {
  const setTvList = props.setTvList;
  const [input, setInput] = useState("");

  function handleKeyInput(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newShow = { showName: input };
    setTvList((currList) => {
      return [...currList, newShow];
    });
    setInput("");
  }
  return (
    <footer>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Next show to watch..."
          type="text"
          id="tvshow"
          onChange={handleKeyInput}
          value={input}
        />
        <input type="submit" value="Add to list" />
      </form>
    </footer>
  );
};

export default ShowAdder;
