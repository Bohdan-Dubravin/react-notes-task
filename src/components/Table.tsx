import React from 'react';
import '../styles/table.css';
import Note from '../types/Note';
import Row from './Row';
import SummaryRow from './SummaryRow';

type props = {
  headContent: string[];
  list: Note[];
  showSummary?: boolean;
  summary?: { category: string; activeCount: number; archiveCount: number }[];
};

const Table: React.FC<props> = ({
  headContent,
  list,
  showSummary = false,
  summary = [],
}) => {
  if (summary.length) {
    return (
      <table className="styled-table">
        <thead>
          <tr>
            {headContent.map((title) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summary.map((item) => (
            <SummaryRow key={item.category} summary={item} />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <table className="styled-table">
      <thead>
        <tr>
          {headContent.map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <Row key={item.id} item={item} showSummary={showSummary} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
