const groupByUser = (tickets, users) => {
  return tickets.reduce((groups, ticket) => {
    const userName = users[ticket.userId];
    if (!groups[userName]) {
      groups[userName] = [];
    }
    groups[userName].push(ticket);
    return groups;
  }, {});
};

export default groupByUser;
