import React, { memo } from "react";

interface ListItemProps {
  SummaryComponent: React.ElementType;
  DetailComponent: React.ElementType;
  id: string | number;
  isOpen: boolean;
}
const ListItem = ({
  id,
  isOpen,
  SummaryComponent,
  DetailComponent,
  ...rest
}: ListItemProps) => {
  return (
    <li
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={`acc-content-${id}`}
      id={id.toString()}
      className="acc-item"
    >
      <SummaryComponent {...rest} isOpen={isOpen} />
      {isOpen && (
        <div role="definition" className="acc-content" id={`acc-content-${id}`}>
          <DetailComponent {...rest} isOpen={isOpen} />
        </div>
      )}
    </li>
  );
};

export default memo(ListItem);
