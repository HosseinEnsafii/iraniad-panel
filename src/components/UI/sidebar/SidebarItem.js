import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "../../../assets/icons";
import { Link } from "react-router-dom";

function SidebarItem({ item }) {
  const { subCategories, name, id } = item;
  const [open, setOpen] = useState(false);
  if (subCategories.length > 0) {
    return (
      <li className={`sidebar__item`}>
        <div
          onClick={() => setOpen((prevState) => !prevState)}
          className={`sidebar__item-label ${
            open ? "sidebar__item-label--open" : ""
          }`}
        >
          <div className="flex gap-4">
            <p>{name}</p>
          </div>

          {<span>{open ? <BiChevronDown /> : <BiChevronUp />}</span>}
        </div>

        {open && (
          <ul className=" space-y-4 bg-gray-100 px-1 py-2 dark:bg-gray-600">
            {subCategories.map((item, i) => (
              <SidebarItem key={i} item={item} />
            ))}
          </ul>
        )}
      </li>
    );
  } else {
    return (
      <li className="sidebar__item">
        <Link className="sidebar__item-label" to={`search?cat_id=${id}`}>
          {name}{" "}
        </Link>
      </li>
    );
  }
}

export default SidebarItem;
