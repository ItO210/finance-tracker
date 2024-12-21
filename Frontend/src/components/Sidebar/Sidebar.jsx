import { createContext, useState } from "react";
import {
  BiChevronRight,
  BiChevronLeft,
  BiLayout,
  BiCreditCard,
  BiSolidCreditCard,
  BiBarChartAlt2,
  BiSolidBarChartAlt2,
  BiSolidLayout,
} from "react-icons/bi";

import SidebarItem from "./SidebarItem";

export const SidebarContext = createContext();

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  const toggleExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const sidebarItems = [
    {
      text: "Dashboard",
      active: <BiSolidLayout className="size-6" />,
      icon: <BiLayout className="size-6" />,
      to: "/",
    },
    {
      text: "Cashflow",
      active: <BiSolidCreditCard className="size-6" />,
      icon: <BiCreditCard className="size-6" />,
      to: "/transactions",
    },
    {
      text: "Stats",
      active: <BiSolidBarChartAlt2 className="size-6" />,
      icon: <BiBarChartAlt2 className="size-6" />,
      to: "/stats",
    },
  ];

  return (
    <SidebarContext.Provider value={{ expanded, activeItem, setActiveItem }}>
      <nav className="flex flex-col p-2">
        <div className=" flex p-2 justify-center">
          <button onClick={toggleExpanded} className="rounded-lg bg-white p-2">
            {expanded ? (
              <BiChevronLeft className="size-5" />
            ) : (
              <BiChevronRight className="size-5" />
            )}
          </button>
        </div>
        <ul className="flex flex-col p-1 gap-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.active}
              to={item.to}
            />
          ))}
        </ul>
      </nav>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
