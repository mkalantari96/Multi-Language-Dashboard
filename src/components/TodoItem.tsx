import React from "react";
import { FiCheck, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Todo } from "../store/todoSlice";
import {
  TodoItemContainer,
  TodoContent,
  TodoTitle,
  TodoDescription,
  TodoActions,
  ActionButton,
  CompleteButton,
} from "../util/StyledComponents";
import { todoAnimations } from "../util/animation";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => (
  <TodoItemContainer variants={todoAnimations.item} $completed={todo.completed}>
    <TodoContent>
      <CompleteButton
        onClick={() => onToggle(todo)}
        $completed={todo.completed}
      >
        {todo.completed && <FiCheck />}
      </CompleteButton>
      <div>
        <TodoTitle $completed={todo.completed}>
          {todo.title}
          {todo.completed ? "  ✅" : "  ⚒️"}
        </TodoTitle>
        <TodoDescription $completed={todo.completed}>
          {todo.description}
        </TodoDescription>
      </div>
    </TodoContent>
    <TodoActions>
      <ActionButton type="edit" onClick={() => onEdit(todo)}>
        <FiEdit2 />
      </ActionButton>
      <ActionButton type="delete" onClick={() => onDelete(todo.id)}>
        <FiTrash2 />
      </ActionButton>
    </TodoActions>
  </TodoItemContainer>
);
