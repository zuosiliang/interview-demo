import React from "react";
import DraggableComponent from "../components/DraggableComponent";
import { useDragLayer } from "react-dnd";
import { DragType } from "../constants";

const Cell = ({
  selectedStartIndex,
  selectedEndIndex,
  setSelectedStartIndex,
  setSelectedEndIndex,
  rangeValue,
  setSelectedPickerId,
  rangePickerId,
  selectedPickerId,
}) => {
  const collectedProps = useDragLayer((monitor) => {
    return {
      isDragging: monitor.isDragging(),
      type: monitor.getItemType(),
    };
  });

  // 点击回调
  const handleClickCell = () => {
    setSelectedStartIndex(rangeValue);
    setSelectedEndIndex(rangeValue + 0.5);
    setSelectedPickerId(rangePickerId);
  };

  // 拉伸回调
  const handleHover = (item) => {
    if (item.type !== DragType.Stretch) {
      return;
    }

    if (item.itemProp.isStretchStartButton) {
      setSelectedStartIndex(rangeValue);
    } else {
      setSelectedEndIndex(rangeValue);
    }
  };

  // 拖拽回调
  const handleDrop = (item) => {
    if (item.type !== DragType.Range) {
      return;
    }

    setSelectedStartIndex(rangeValue);
    setSelectedEndIndex(rangeValue + selectedEndIndex - selectedStartIndex);
    setSelectedPickerId(rangePickerId);
  };

  return (
    <DraggableComponent
      draggable={true}
      key={rangeValue}
      id={rangeValue}
      draggableType={DragType.Range}
      onHover={handleHover}
      onDrop={handleDrop}
      hideWhenDragging={true}
      renderComponent={(isDragging) => {
        return (
          <div className="relative">
            {(rangeValue === selectedStartIndex ||
              rangeValue === selectedEndIndex) &&
            selectedPickerId === rangePickerId &&
            !isDragging ? (
              <DraggableComponent
                draggable={true}
                id={rangeValue}
                draggableType={DragType.Stretch}
                hideWhenDragging={true}
                itemProp={{
                  isStretchStartButton: rangeValue === selectedStartIndex,
                }}
                renderComponent={() => {
                  return (
                    <div
                      style={{ opacity: collectedProps.isDragging ? 0 : 1 }}
                      className={`w-[8px] h-[8px] rounded-full absolute bg-slate-950 top-[24px] left-[-4px] `}
                    />
                  );
                }}
              />
            ) : null}
            <div
              className={`w-[40px] h-[60px] ${
                rangeValue >= selectedStartIndex &&
                rangeValue < selectedEndIndex &&
                selectedPickerId === rangePickerId &&
                collectedProps.type !== DragType.Range
                  ? "bg-rose-500"
                  : "bg-slate-100"
              }`}
              onClick={handleClickCell}
            ></div>
          </div>
        );
      }}
    />
  );
};

export default Cell;
