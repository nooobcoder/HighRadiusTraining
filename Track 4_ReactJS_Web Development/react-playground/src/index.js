import React from 'react';
import './index.css';
import App from './App';
import {createRoot} from "react-dom/client";

// ⚠️ React 17 code (Soon to be LEGACY!) ⚠️
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

/*
 https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#:~:text=function%20AppWithCallbackAfterRender()%20%7B%0A%20%20useEffect(()%20%3D%3E%20%7B%0A%20%20%20%20console.log(%27rendered%27)%3B%0A%20%20%7D)%3B%0A%0Areturn%20%3CApp%20tab%3D%22home%22%20/%3E%0A%7D%0A%0Aconst%20container%20%3D%20document.getElementById(%27app%27)%3B%0Aconst%20root%20%3D%20ReactDOM.createRoot(container)%3B%0Aroot.render(%3CAppWithCallbackAfterRender%20/%3E)%3B
* */
/*const AppWithCallbackAfterRender = () => {
  useEffect(() => {
    console.log("[ ROOT RENDERED ]")
  })
  return <App/>
}*/

// ⚠️ NEW! React 18 has the new Client Rendering API.
// Read more from the release candidate: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>)
// root.render(<AppWithCallbackAfterRender/>);