import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/store";
import { addTodo, updateTodo, deleteTodo, Todo } from "../store/todoSlice";
import { TodoForm } from "./TodoFrom";
import { TodoItem } from "./TodoItem";
import { TodoHeader } from "./TodoHeader";
import { ErrorMessage } from "./ErrorMessage";
import { TodoList, TodoContainer } from "../util/StyledComponents";

import { todoAnimations } from "../util/animation";

const Todos: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [error, setError] = useState<string>("");

  const handleSaveTodo = (title: string, description: string) => {
    if (!title.trim() || !description.trim()) {
      setError(t("todos.validation.required_fields"));
      return;
    }

    if (editingTodo) {
      dispatch(
        updateTodo({
          ...editingTodo,
          title: title.trim(),
          description: description.trim(),
          updatedAt: new Date().toISOString(),
        })
      );
      setEditingTodo(null);
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          title: title.trim(),
          description: description.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }

    setShowForm(false);
    setError("");
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
    setError("");
  };

  const handleDeleteTodo = (id: number) => {
    if (window.confirm(t("todos.confirm_delete"))) {
      dispatch(deleteTodo(id));
    }
  };

  const handleToggleComplete = (todo: Todo) => {
    dispatch(
      updateTodo({
        ...todo,
        completed: !todo.completed,
        updatedAt: new Date().toISOString(),
      })
    );
  };

  return (
    <TodoContainer>
      <TodoHeader showForm={showForm} setShowForm={setShowForm} />

      <ErrorMessage error={error} onClose={() => setError("")} />

      <TodoForm
        show={showForm}
        editingTodo={editingTodo}
        onSave={handleSaveTodo}
        onClose={() => {
          setShowForm(false);
          setEditingTodo(null);
        }}
      />

      <TodoList
        variants={todoAnimations.list}
        initial="hidden"
        animate="visible"
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleComplete}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </TodoList>
    </TodoContainer>
  );
};

export default Todos;
