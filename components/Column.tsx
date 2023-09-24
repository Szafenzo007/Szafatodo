import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'

type Props = {
    id : TypedColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string;
} = {
    todo: "Todo" ,
    inprogress: "Inprogress", 
    done:  "Done",
}


function Column({id, todos, index}: Props) {
    const [searchString ,setNewTaskType] = useBoardStore((state) => [
        state.searchString,
        state.setNewTaskType
    ]);
    const openModal = useModalStore((state) => state.openModal);

    const handleAddTodo = () => {
        setNewTaskType(id);
        openModal();
    }

  return (

    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {/* render droppable todos in the column */}
            <Droppable droppableId={index.toString()} type="card">
                {(provided, snapshot ) => (
                    <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`pb-2 p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
                    >
                        <h2 className='flex justify-between font-bold text-xl'>{idToColumnText[id]}
                        <span className='text-grey-500 bg-gray-100/50 rounded-full px-2 py-2 text-sm font-normal'>{todos.length}</span>
                        </h2>

                        <div className='space-y-2'>
                            {todos.map((todo, index) =>{
                                if (searchString && 
                                     !todo.title
                                    .toLocaleLowerCase()
                                    .includes(searchString.toLocaleLowerCase())
                                )
                                  return null;

                                return (
                                <Draggable 
                                    key={todo.$id}
                                    draggableId={todo.$id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <TodoCard 
                                             todo={todo}
                                             index={index}
                                             id={id}
                                             
                                             innerRef={provided.innerRef}
                                             draggableProps={provided.draggableProps}
                                             dragHandleProps={provided.dragHandleProps}                                        
                                        />
                                    )}
                                </Draggable>
                            )})}
                            {provided.placeholder}

                            <div className="flex items-end justify-end p-2">
                                <button 
                                onClick={handleAddTodo}
                                className="text-green-500 hover:text-green-600">
                                 <PlusCircleIcon  className="h-10 w-10"/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </Droppable>
            </div>
        )}
    </Draggable>
  )
}

export default Column