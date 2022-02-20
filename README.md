# React Fast Accordion ⚡️

Dynamic, fast & zero dependency accordions for React

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
import "./app.css";
import Accordion from "../src";

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
        SummaryComponent={SummaryComponent}
        DetailComponent={DetailComponent}
      />
    </div>
  );
};
```
