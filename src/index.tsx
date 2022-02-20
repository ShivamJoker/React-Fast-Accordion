import React, { MouseEvent, useEffect, useState } from "react";
import ListItem from "./ListItem";
import "./style.css";

interface AccordionItem {
  [name: string | number | symbol]: unknown;
  id: string | number;
}
interface AccorionProps {
  items: AccordionItem[];
  SummaryComponent: React.ElementType;
  DetailComponent: React.ElementType;
  [rest: string | number | symbol]: unknown;
}

let interval: number;

const Accordion = ({ items, ...rest }: AccorionProps) => {
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const clickHandler = (e: MouseEvent): void => {
    let element = e.target as HTMLElement;

    if (element.parentElement?.tagName === "LI") {
      element = element.parentElement;
    }

    if (element.tagName !== "LI") return;

    const id = element.getAttribute("id");

    if (!id) return;

    const isOpen = !!opened[id];

    if (isOpen) {
      const contentItem = document.getElementById(`acc-item-${id}`);

      if (!contentItem) return;

      contentItem
        .animate(
          { maxHeight: 0, opacity: 0 },
          { duration: 100, easing: "ease-out" }
        )
        .finished.then(() => {
          setOpened((prv) => ({ ...prv, [id]: false }));
        });
      return;
    }

    setOpened((prv) => ({ ...prv, [id]: true }));

    // listen for DOM to be added
    interval = setInterval(() => {
      const contentItem = document.getElementById(`acc-item-${id}`);
      if (!contentItem) return;
      if (contentItem?.scrollHeight) {
        const scrollHeight = contentItem.scrollHeight;

        contentItem.animate(
          { maxHeight: `${scrollHeight}px`, opacity: 1 },
          { duration: 100, easing: "ease-in", fill: "forwards" }
        );
        clearInterval(interval);
      }
    }, 5);
  };

  useEffect(() => {
    // remove on unmount
    return clearInterval(interval);
  }, []);

  return (
    <ul onClick={clickHandler}>
      {items.map(({ id, ...data }) => (
        <ListItem id={id} {...data} key={id} isOpen={opened[id]} {...rest} />
      ))}
    </ul>
  );
};

export default Accordion;
