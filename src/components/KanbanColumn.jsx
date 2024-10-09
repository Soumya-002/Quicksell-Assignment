import React from "react";
import "./css/KanbanBoard.css";
import dot from "../Assests/icons_FEtask/3 dot menu.svg";
import add from "../Assests/icons_FEtask/add.svg";
import Todo from "../Assests/icons_FEtask/To-do.svg";
import In_progress from "../Assests/icons_FEtask/in-progress.svg";
import Backlog from "../Assests/icons_FEtask/Backlog.svg";
import No_priority from "../Assests/icons_FEtask/No-priority.svg";
import Urgent from "../Assests/icons_FEtask/SVG - Urgent Priority colour.svg";
import High from "../Assests/icons_FEtask/Img - High Priority.svg";
import Medium from "../Assests/icons_FEtask/Img - Medium Priority.svg";
import Low from "../Assests/icons_FEtask/Img - Low Priority.svg";
import urgent from "../Assests/icons_FEtask/SVG - Urgent Priority grey.svg";


  const priorityIconMap = {
      4: Urgent,
      3: High,
      2: Medium,
      1: Low,
      0: No_priority,
  };
  const priorityMap = {
      4: "Urgent",
      3: "High",
      2: "Medium",
      1: "Low",
      0: "No priority",
  };
  const Map = {
      Todo: Todo,
      "In progress": In_progress,
      Backlog: Backlog,
    };

const KanbanColumn = ({ title, tickets , groupBy }) => {
  const displayTitle = title.startsWith("Priority")? title.split(" ")[1]: title;
  console.log('groupBy:', groupBy);

  return (
    <div>
      <div className="Column-Header">
        <div className="SubHeader">
        <img
            src={
              groupBy === "user"
                ? Backlog
                : groupBy === "priority"
                ? priorityIconMap[displayTitle]
                : Map[displayTitle]
            }
            alt="profile"
            className="column-icon"
          />
          <p>
            {!isNaN(displayTitle) ? priorityMap[displayTitle] : displayTitle}{" "}
            &nbsp;&nbsp;<span>{tickets.length}</span>
          </p>
        </div>
        <div className="SubHeader">
          <img src={add} alt="add" className="column-icon" />
          <img src={dot} alt="Display Icon" className="column-icon" />
        </div>
      </div>
      <div className="kanban-column">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="kanban-card">
            <div className="CardHeader">
              <p>{ticket.id}</p>
              <img src={Todo} alt="Display Icon" className="column-icon" />
            </div>

            <h5>{ticket.title}</h5>
            <div className="SubHeader">
              <img src={urgent} alt="Display Icon" className="display-icon" id="card-body" />
              &nbsp;&nbsp;
              <img src={Todo} alt="Display Icon" className="display-icon" id="card-body" />
              <p id="card-body">{ticket.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;

// I Have Used Backlog and Todo logo as user profile in the cards //