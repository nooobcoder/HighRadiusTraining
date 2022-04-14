# React 18 template ⚛️
> Faster as it should be. This template has stripped all tests and dust that is included with CRA (`create-react-app`) template.
> 
> A very minimal and skimmed setup of React. Hope you liked it. ✌🏽

## Default package manager: Yarn (lighter than NPM)
> You can use NPM too, just remove the `yarn.lock` in that case.


![Yarn badge](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white) ![](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![NodeJS Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555) ![ts-strict](https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565)
[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## ⚠️This template uses React 18-rc⚠️
Since React18 is the future and already in the release candidate, i felt confident of using the rc version of react and react-dom in the template. Not major changes would be made in `rc -> latest release`.

Please read the [docs](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html) for more information about the changes from **React 17 to 18**.

### P.S
> React 18 uses a new Client Root API, documented below, same has been explained well in `App.js` inside the `src` folder.


```jsx
// New ROOT API in React 18 ⚛️
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App {...props} />);
```

## Running the project on port 2000
```shell
npm install
npm run start
```
> That's it ✌🏽 (Installing the dependencies might take time, depending upon your workstation's computing power and network bandwidth available).

**After `npm run start` open: [ReactApp🔗](http://127.0.0.1:2000) **

---

### Advanced Implementations ahead (skip if not needed)

**Please checkout the branch as per your requirement, currently the branches are:**

1.  **NextJS with Tailwind** `nextjs-tailwind` -> https://github.com/nooobcoder/clean-react-app/tree/nextjs-tailwind

2.  **NextJS with TypeScript** `nextjs-typescript` -> https://github.com/nooobcoder/clean-react-app/tree/nextjs-typescript

3.  **React with Typescript (very strict typechecks)** `typescript-react-app` -> https://github.com/nooobcoder/clean-react-app/tree/typescript-react-app

---

A very clean React App ⚛️ starter template by [Ankur Paul](https://github.com/nooobcoder)

---

![profile-avatar](https://avatars.githubusercontent.com/u/50350828?s=400&u=82f5ebc3cbedef0c5ca3c59086cf0f38c45dedbc&v=4)
