import React from "react";
import { useState } from "react";
import { Panel } from "rsuite";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CustomDragLayer } from "./components/CustomDragLayer";
import Form from "./components/Form";
import RangePicker from "./components/RangePicker";

const getCellsRange = (startHour, endHour) => {
  return Array.from(Array((endHour - startHour) * 2))
    .reduce((acc, _cur, index) => {
      return acc.concat([startHour + 0.5 * index]);
    }, [])
    .concat([endHour]);
};

const App = () => {
  const [startHour, setStartHour] = useState(2); // 刻度开始
  const [endHour, setEndHour] = useState(30); // 刻度结束
  const [selectedStartIndex, setSelectedStartIndex] = useState(0); // 选中区间开始
  const [selectedEndIndex, setSelectedEndIndex] = useState(0); // 选中区间结束
  const [selectedPickerId, setSelectedPickerId] = useState(null); // 当前选中哪个选择器
  const cellsRange = getCellsRange(startHour, endHour); // 所有刻度值

  return (
    <div className="flex">
      <div>
        <DndProvider backend={HTML5Backend}>
          <CustomDragLayer
            selectedRange={selectedEndIndex - selectedStartIndex}
          />
          <Panel shaded className="mr-[20px]">
            {Array.from("1234").map((item) => {
              return (
                <RangePicker
                  selectedStartIndex={selectedStartIndex}
                  selectedEndIndex={selectedEndIndex}
                  setSelectedStartIndex={setSelectedStartIndex}
                  setSelectedEndIndex={setSelectedEndIndex}
                  setSelectedPickerId={setSelectedPickerId}
                  cellsRange={cellsRange}
                  key={item}
                  selectedPickerId={selectedPickerId}
                  id={item}
                />
              );
            })}
          </Panel>
        </DndProvider>
      </div>
      <Panel shaded className="mb-[20px]">
        <Form
          startHour={startHour}
          endHour={endHour}
          setStartHour={setStartHour}
          setEndHour={setEndHour}
        />
      </Panel>
    </div>
  );
};

export default App;
