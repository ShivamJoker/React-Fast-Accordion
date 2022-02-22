import React, {
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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

const Accordion = ({ items, ...rest }: AccorionProps) => {
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const listContainerRef = useRef<HTMLUListElement>(null);

  const mutationCb: MutationCallback = (list) => {
    const contentItem = (list[0].addedNodes[0] as HTMLElement) ?? null;

    if (!contentItem) return;
    const scrollHeight = contentItem.scrollHeight;

    contentItem.animate(
      { maxHeight: `${scrollHeight}px`, opacity: 1 },
      { duration: 100, easing: "ease-in", fill: "forwards" }
    );
  };

  const observer = new MutationObserver(mutationCb);

  useEffect(() => {
    if (!listContainerRef.current) return;

    observer.observe(listContainerRef.current, {
      childList: true,
      subtree: true,
    });
  }, []);

  const clickHandler = (e: MouseEvent | KeyboardEvent): void => {
    let element = e.target as HTMLElement;

    if (element.parentElement?.tagName === "LI") {
      element = element.parentElement;
    }

    if (element.tagName !== "LI") return;

    const id = element.getAttribute("id");

    if (!id) return;

    const isOpen = !!opened[id];

    if (isOpen) {
      const contentItem = document.getElementById(`acc-content-${id}`);

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
  };

  const ariaHandler = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      clickHandler(e);
      e.preventDefault();
    }
  };

  return (
    <ul
      onClick={clickHandler}
      onKeyPress={ariaHandler}
      ref={listContainerRef}
      role="list"
    >
      {items.map(({ id, ...data }) => (
        <ListItem id={id} key={id} isOpen={opened[id]} {...data} {...rest} />
      ))}
    </ul>
  );
};

export default Accordion;
