import React from "react";

interface ListItemProps {
  HeaderComponent: React.ElementType;
  ContentComponent: React.ElementType;
  id: string | number;
  isOpen: boolean;
}

const ListItem = ({
  id,
  isOpen,
  HeaderComponent,
  ContentComponent,
  ...rest
}: ListItemProps) => {
  return (
    <li id={id + ""} className="acc-item">
      <HeaderComponent {...rest} />
      {isOpen && (
        <div className="acc-content" id={`acc-item-${id}`}>
          <ContentComponent {...rest} isOpen={isOpen} />
        </div>
      )}
    </li>
  );
};

export default ListItem;
