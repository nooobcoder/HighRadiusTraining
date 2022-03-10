import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";

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
		<div class="bg-[#50d71e]">
			{/* Header Component */}
			<Header />
		</div>
	);
}

export default App;