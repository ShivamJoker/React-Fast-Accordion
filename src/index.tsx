import React, { MouseEvent, useEffect, useState, useRef } from "react";
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

interface ListItemProps {
  SummaryComponent: React.ElementType;
  DetailComponent: React.ElementType;
  id: string | number;
}

const ListItem = ({
  id,
  SummaryComponent,
  DetailComponent,
  ...rest
}: ListItemProps) => {
  const contentItem = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState<boolean>(false);

  const clickHandler = (e: MouseEvent): void => {
    if (opened && contentItem.current) {
      const element = e.target as HTMLElement;
      const clickedInside = contentItem.current.contains(element);
      if (!clickedInside) {
        contentItem.current
          .animate(
            { maxHeight: 0, opacity: 0 },
            { duration: 100, easing: "ease-out" }
          )
          .finished.then(() => setOpened(false));
      }
    } else {
      setOpened(true);
    }
  };

  useEffect(() => {
    if (opened && contentItem && contentItem.current?.scrollHeight) {
      const scrollHeight = contentItem.current.scrollHeight;
      contentItem.current.animate(
        { maxHeight: `${scrollHeight}px`, opacity: 1 },
        { duration: 100, easing: "ease-in", fill: "forwards" }
      );
    }
  }, [opened]);

  return (
    <li onClick={clickHandler} className="acc-item">
      <SummaryComponent {...rest} isOpen={opened} />
      {opened && (
        <div className="acc-content" ref={contentItem}>
          <DetailComponent {...rest} isOpen={opened} />
        </div>
      )}
    </li>
  );
};

const Accordion = ({ items, ...rest }: AccorionProps) => (
  <ul>
    {items.map(({ id, ...data }) => (
      <ListItem id={id} {...data} key={id} {...rest} />
    ))}
  </ul>
);

export default Accordion;
