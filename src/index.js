import React from "react";
import ReactDOM from "react-dom";
import JokeList from "./JokeList";

import "./styles.css";

function App() {
	return (
		<div className="App">
			<JokeList />
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
