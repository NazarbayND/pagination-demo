import React from "react";
import "./ModeSwitcher.scss";

interface ModeSwitcherProps {
  checked: boolean;
  onChange: () => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div className="mode-switcher">
      <h3>Mode</h3>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider">
          <span className={`slider-text ${checked ? "active" : ""}`}>
            {checked ? "Looped" : "Normal"}
          </span>
        </span>
      </label>
    </div>
  );
};
