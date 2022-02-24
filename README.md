# React Fast Accordion ⚡️

Dynamic, fast, accessible & zero dependency accordion for React

[![Npm version](https://img.shields.io/npm/v/react-fast-accordion?style=flat-square)](https://www.npmjs.com/package/react-fast-accordion)
![Downloads](https://img.shields.io/npm/dm/react-fast-accordion?style=flat-square)

## How it's fast?

- Instead of adding event listener on all the items, it only adds to the container.
- It has zero dependency, the animations are done using web animation API
- Detail component dynamically gets added to the DOM

## Demo

![Screen recording of accordion](https://user-images.githubusercontent.com/23727670/155312319-7ebafee5-e532-43c6-821a-52dc5d753cd3.gif)


[![Edit React fast accordion demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/festive-yalow-fm0hkf?fontsize=14&hidenavigation=1&theme=dark&view=preview)

## Video tutorial
[![Accordion tutorial-5](https://user-images.githubusercontent.com/23727670/155474669-91e23e2f-98e2-4776-9a3b-7b86d72e77fe.jpg)](https://youtu.be/Ey96fsnqaEc)


## Installation

Install with npm

```bash
  npm install react-fast-accordion
```

Install with yarn

```bash
  yarn add react-fast-accordion
```

## Example

```ts
import React from "react";
import { faker } from "@faker-js/faker";
import Accordion from "react-fast-accordion";

// Your list - array of objects, id is required
const data = Array.from({ length: 200 }, () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.hacker.noun(),
    content: faker.hacker.phrase(),
  };
});

// create type if you need intellisense
type CompProps = typeof data[0] & {
  isOpen: boolean;
  onClick: (txt: string) => void;
};

// all the props get passed here with isOpen
const SummaryComponent = ({ title, isOpen }: CompProps) => (
  <div className="header">
    {title} <span className={(isOpen ? "open" : "") + " chevron"}>👇</span>
  </div>
);

// component will get wrapped in <div class="acc-content">
const DetailComponent = ({ content, onClick }: CompProps) => (
  <p onClick={() => onClick(content)}>{content}</p>
);

const App = () => {
  return (
    <div>
      <Accordion
        items={data}
        // you can pass any props,
        // it will be passed to the Detail & Summary
        onClick={(txt: string) => alert("You clicked on\n" + txt)}
        // set it to false if you want only one accordion to open
        multiExpand={true}
        SummaryComponent={SummaryComponent}
        DetailComponent={DetailComponent}
      />
    </div>
  );
};
```

## Accordion props

| Parameter         | Type                          | Description                      | Required
| :---------------- | :---------------------------- | :------------------------------- | :-------|
| `items`           | `Array<{id: string, ...}>`    | List which you want to render    | Yes  ✅ |
| `SummaryComponent`| `React.Element`               | Component for rendering summary  | Yes  ✅ |
| `DetailComponent` | `React.Element`               | Component shown on expanding     | Yes  ✅ |
| `multiExpand`     | `boolean` **`default:false`** | Expand only one at a time        | No.  ❌ |
