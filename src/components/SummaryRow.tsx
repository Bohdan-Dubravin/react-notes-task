import React from 'react';
import Summary from '../types/Summary';

type props = {
  summary: Summary;
};

const Row: React.FC<props> = ({ summary }) => {
  return (
    <tr>
      <td>{summary.category}</td>
      <td>{summary.activeCount}</td>
      <td>{summary.archiveCount}</td>
    </tr>
  );
};

export default Row;
