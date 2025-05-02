import React from 'react';

// defines a cost table display for 3 arrays passed as arguments
function Table({cost = [], profit = [], net = []}) {
    const rowCount = Math.min(cost.length, profit.length, net.length); //should be 25 but can be safe
    return (
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Year</th> {/* Index column */}
            <th>Costs</th>
            <th>Earnings</th>
            <th>Net</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <tr key={i}>
              <td>{i}</td>         {/* Index */}
              <td>{cost[i]}</td>
              <td>{profit[i]}</td>
              <td>{net[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default Table;