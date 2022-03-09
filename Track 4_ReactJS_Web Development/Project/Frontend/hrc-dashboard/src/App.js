import "./App.css";
import logo from "./logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [res, setRes] = useState({});

	const doPost = async () => {
		const { status, data } = await axios.post(
			`http://192.168.0.134:280/RESTDatabase_war_exploded/getrows?start=${10}&limit=${10}`
		);
		if (status === 200) {
			setRes(data);
			console.log(data);
		}
	};

	useEffect(() => {
		console.log(res);
		(async () => await doPost())();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
