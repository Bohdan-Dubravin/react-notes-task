import React from 'react';
import '../styles/table.css';
import Note from '../types/Note';
import Summary from '../types/Summary';
import Row from './Row';
import SummaryRow from './SummaryRow';

type props = {
  headContent: string[];
  list: Note[];
  summary?: Summary[];
};

const Table: React.FC<props> = ({ headContent, list, summary = [] }) => {
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
          <Row key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
