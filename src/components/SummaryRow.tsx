import React from "react";
import Summary from "../types/Summary";

type props = {
  summary: Summary;
};

const Row: React.FC<props> = ({ summary }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100 font-medium">
      <td className="py-1 px-6 text-left ">{summary.categoryName}</td>
      <td className="py-1 px-6 text-left ">{summary.active}</td>
      <td className="py-1 px-6 text-left ">{summary.archived}</td>
    </tr>
  );
};

export default Row;
