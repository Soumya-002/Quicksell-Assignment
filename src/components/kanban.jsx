import React, { useState, useEffect } from 'react';
import groupByStatus from './groupByStatus';
import groupByUser from './groupByUser';
import groupByPriority from './groupByPriority';
import GroupSelector from './GroupSelector';
import KanbanColumn from './KanbanColumn';
import './css/KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState(() => {
    
    const savedGroupBy = localStorage.getItem('groupBy');
    console.log('Initializing groupBy from local storage:', savedGroupBy);
    return savedGroupBy ? savedGroupBy : 'status';
  });
  const [sortBy, setSortBy] = useState(() => {
    const savedSortBy = localStorage.getItem('sortBy');
    console.log('Initializing sortBy from local storage:', savedSortBy);
    return savedSortBy ? savedSortBy : 'priority';
  });
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    console.log('Updated groupBy in local storage:', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
    console.log('Updated sortBy in local storage:', sortBy);
  }, [sortBy]);

  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const sortedTickets = sortTickets(tickets);
  const groupedTickets = (groupBy === 'status')
    ? groupByStatus(sortedTickets)
    : (groupBy === 'user')
    ? groupByUser(sortedTickets, users)
    : groupByPriority(sortedTickets);

  return (
    <div>
      <GroupSelector 
        onGroupChange={setGroupBy} 
        onOrderChange={setSortBy} 
        groupBy={groupBy}
        sortBy={sortBy}   
      />
      <div className="kanban-board">
        {Object.keys(groupedTickets).map(group => (
          <KanbanColumn key={group} title={group} tickets={groupedTickets[group]} groupBy={groupBy} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
