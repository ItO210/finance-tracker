import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";

const SidebarItem = ({ icon, text, active, to }) => {
  const { expanded, activeItem, setActiveItem } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    setActiveItem(to);
  };

  return (
    <li
      onClick={handleClick}
      role="menuitem"
      className={`flex items-center my-2 px-2 cursor-pointer ${
        activeItem === to ? "border-r-2 border-black" : ""
      }`}
    >
      <div className="p-2">{activeItem === to ? active : icon}</div>
      <div className={`overflow-hidden ${expanded ? "w-auto" : "w-0"}`}>
        {text}
      </div>
    </li>
  );
};

export default SidebarItem;
