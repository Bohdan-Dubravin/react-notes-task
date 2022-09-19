import React from 'react';
import Summary from '../types/Summary';

type props = {
  summary: Summary;
};

const Row: React.FC<props> = ({ summary }) => {
  return (
    <tr>
      <td>{summary.categoryName}</td>
      <td>{summary.active}</td>
      <td>{summary.archived}</td>
    </tr>
  );
};

export default Row;
