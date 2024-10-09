const groupByPriority = (tickets) => {
  return tickets.reduce((groups, ticket) => {
    const priority = `Priority ${ticket.priority}` || 'Unknown';
    if (!groups[priority]) {
      groups[priority] = [];
    }
    groups[priority].push(ticket);
    return groups;
  }, {});
};

export default groupByPriority;
