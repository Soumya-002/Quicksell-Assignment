import React, { useState } from 'react';
import displayIcon from '../Assests/icons_FEtask/Display.svg';
import down from '../Assests/icons_FEtask/down.svg';

import './css/GroupSelector.css';

const GroupSelector = ({ onGroupChange, onOrderChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleGroupChange = (e) => {
    const value = e.target.value;
    setGrouping(value);
    onGroupChange(value);
  };

  const handleOrderChange = (e) => {
    const value = e.target.value;
    setOrdering(value);
    onOrderChange(value);
  };

  return (
    <div className="group-selector">
      <button className="display-button" onClick={toggleMenu}>
        <img src={displayIcon} alt="Display Icon" />&nbsp;&nbsp;
        Display &nbsp;
        <img src={down} alt="Display Icon" />&nbsp;&nbsp;
      </button>
      {showMenu && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label className="GroupLabel">Grouping</label>
            <select value={grouping} onChange={handleGroupChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label className="GroupLabel">Ordering</label>
            <select value={ordering} onChange={handleOrderChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSelector;
