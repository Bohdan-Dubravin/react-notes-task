import React from "react";
import Note from "../types/Note";
import Summary from "../types/Summary";
import Row from "./Row";
import SummaryRow from "./SummaryRow";

type props = {
  headContent: string[];
  list: Note[];
  summary?: Summary[];
};

const Table: React.FC<props> = ({ headContent, list, summary = [] }) => {
  if (summary.length) {
    return (
      <table className="table-auto mx-auto">
        <thead className="bg-primary text-center ">
          <tr className="bg-green-lig text-white uppercase text-sm leading-normal">
            {headContent.map((title) => (
              <th className="py-3 px-6 text-left" key={title}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {summary.map((item) => (
            <SummaryRow key={item.categoryName} summary={item} />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <table className="table-auto min-w-full mb-4">
      <thead className="bg-primary text-center">
        <tr className="bg-green-lig text-white uppercase text-sm leading-normal">
          {headContent.map((title) => (
            <th className="py-3 px-6 text-left" key={title}>
              {title}
            </th>
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
