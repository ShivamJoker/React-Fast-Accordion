import React from "react";
import { faker } from "@faker-js/faker";
import "./app.css";
import Accordion from "../src";

const data = Array.from({ length: 200 }, () => {
  return {
    id: faker.datatype.uuid(),
    title: faker.hacker.noun(),
    content: faker.hacker.phrase(),
  };
});

type CompProps = typeof data[0] & {
  isOpen: boolean;
};

const HeaderComp = ({ title, isOpen }: CompProps) => (
  <div className="header">
    {title} <span className={(isOpen ? "open" : "") + " chevron"}>👇</span>
  </div>
);

const ContentComp = ({ content }: CompProps) => <p>{content}</p>;

const App = () => {
  return (
    <div>
      <Accordion
        items={data}
        SummaryComponent={HeaderComp}
        DetailComponent={ContentComp}
      />
    </div>
  );
};

export default App;
