import { useState } from "react";
import "./App.css";

function App() {
	const tvList = [
		{ showName: "Love Island" },
		{ showName: "Succession" },
		{ showName: "In the Night Garden" },
	];
	/*
	example form logic
	const [tvList, setTvList] = useState([
		{ showName: "Love Island" },
		{ showName: "Succession" },
		{ showName: "In the Night Garden" },
	]);
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
	*/

	return (
		<section>
			<header>
				<h1>TV Tracker</h1>
				<h2>My watchlist</h2>
			</header>
			<section>
				<ul>
					{tvList.map((tvShow) => {
						return <li key={tvShow.showName}>{tvShow.showName}</li>;
					})}
				</ul>
			</section>
			<footer>
				<form>
					<input placeholder="Next show to watch..." type="text" id="tvshow" />
					<input type="submit" value="Add to list" />
				</form>
			</footer>
		</section>
	);
}

export default App;
