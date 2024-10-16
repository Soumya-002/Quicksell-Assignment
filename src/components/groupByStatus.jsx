const groupByStatus = (tickets) => {
  return tickets.reduce((groups, ticket) => {
    const status = ticket.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(ticket);
    return groups;
  }, {});
};

export default groupByStatus;
