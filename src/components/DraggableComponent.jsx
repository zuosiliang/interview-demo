import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DragType } from "../constants";

/**
 * 可拖拽组件
 * 通过传入自定义onHover和onDrop函数,实现组件触发hover或drop动作时操作
 * renderComponent可获取isDragging, isOver的状态,实现被拖拽或被覆盖时自定义样式
 */
const DraggableComponent = ({
  onDrop,
  onHover,
  id,
  itemProp,
  customDragLayer = true,
  renderComponent,
  draggableType,
  hideWhenDragging = false,
  draggable,
  dragWrapperDivClassName = "",
}) => {
  const ref = useRef(null);

  const [{ isDragging }, dragger, preview] = useDrag({
    type: draggableType,
    item: {
      type: draggableType,
      id,
      itemProp,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [{ isOver }, dropper] = useDrop({
    accept: [DragType.Range, DragType.Stretch],
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item) {
      onDrop?.(item);
    },
    hover(item) {
      onHover?.(item);
    },
  });

  // 如果需要自定义拖拽显示Dom, 那就提供一个空白的拖拽预览图像
  useEffect(() => {
    if (customDragLayer) {
      preview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }, []);

  useEffect(() => {
    dragger(dropper(ref));
  }, [dragger, dropper, draggable]);

  return draggable ? (
    <div className={`${dragWrapperDivClassName || ""}`}>
      <div
        ref={ref}
        style={{ opacity: hideWhenDragging && isDragging ? 0 : 1 }}
      >
        {renderComponent(isDragging, isOver)}
      </div>
    </div>
  ) : (
    <div className={`${dragWrapperDivClassName || ""}`}>
      {renderComponent(isDragging, isOver)}
    </div>
  );
};

export default DraggableComponent;
