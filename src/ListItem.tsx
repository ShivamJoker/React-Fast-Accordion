import React from "react";

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
    <li id={id + ""} className="acc-item">
      <SummaryComponent {...rest} isOpen={isOpen} />
      {isOpen && (
        <div className="acc-content" id={`acc-item-${id}`}>
          <DetailComponent {...rest} isOpen={isOpen} />
        </div>
      )}
    </li>
  );
};

export default ListItem;
