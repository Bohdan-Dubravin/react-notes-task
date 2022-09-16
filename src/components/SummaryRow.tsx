import React from 'react';

type props = {
  summary: { category: string; activeCount: number; archiveCount: number };
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
