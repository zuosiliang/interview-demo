import React from "react";
import { Panel } from "rsuite";
import Cell from "./Cell";

const RangePicker = ({
  cellsRange,
  selectedStartIndex,
  selectedEndIndex,
  setSelectedStartIndex,
  setSelectedEndIndex,
  setSelectedPickerId,
  selectedPickerId,
  id,
}) => {
  return (
    <Panel header="1 Seat" shaded className="mb-[20px]">
      <div className="flex flex-wrap items-end	">
        {cellsRange.map((rangeValue, index) => {
          const isLastOne = index === cellsRange.length - 1;
          return (
            <div
              className={`flex flex-col ${isLastOne ? "h-[80px]" : ""}`}
              key={rangeValue}
            >
              <div>{rangeValue % 1 === 0 ? `${rangeValue}:00` : ""}</div>
              {isLastOne ? null : (
                <Cell
                  selectedStartIndex={selectedStartIndex}
                  selectedEndIndex={selectedEndIndex}
                  setSelectedStartIndex={setSelectedStartIndex}
                  setSelectedEndIndex={setSelectedEndIndex}
                  setSelectedPickerId={setSelectedPickerId}
                  rangeValue={rangeValue}
                  rangePickerId={id}
                  selectedPickerId={selectedPickerId}
                ></Cell>
              )}
            </div>
          );
        })}
      </div>
    </Panel>
  );
};

export default RangePicker;
