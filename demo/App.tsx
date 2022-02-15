import React, { useState } from "react";
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

const HeaderComp = ({ title, isOpen }: { isOpen: boolean }) => (
  <div className="header">
    {title} <span className={`${isOpen}`}>▾</span>
  </div>
);

const ContentComp = ({ content }) => <p>{content}</p>;

const App = () => {
  return (
    <div>
      <Accordion
        items={data}
        HeaderComponent={HeaderComp}
        ContentComponent={ContentComp}
      />
    </div>
  );
};

export default App;
