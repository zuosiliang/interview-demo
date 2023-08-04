import React from "react";
import { InputNumber } from "rsuite";

const Form = ({ startHour, setStartHour, endHour, setEndHour }) => {
  const handleSetStartHour = (v) => {
    setStartHour(Number(v));
  };
  const handleSetEndHour = (v) => {
    setEndHour(Number(v));
  };
  return (
    <div>
      <div className="flex">
        startHour:
        <InputNumber value={startHour} onChange={handleSetStartHour} />
      </div>
      <div className="flex">
        endHour:
        <InputNumber value={endHour} onChange={handleSetEndHour} />
      </div>
    </div>
  );
};

export default Form;
