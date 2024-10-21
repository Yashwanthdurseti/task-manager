import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = () => {
    const columns = {
        'todo': [],
        'in-progress': [],
        'done': [],
    };

    const onDragEnd = (result) => {
        // Handle moving tasks between columns
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {Object.keys(columns).map(columnId => (
                <Droppable key={columnId} droppableId={columnId}>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {columns[columnId].map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {task.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ))}
        </DragDropContext>
    );
};

export default Dashboard;
