import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { Todo } from "../store/todoSlice";
import {
  FormContainer,
  Input,
  TextArea,
  SubmitButton,
} from "../util/StyledComponents";

interface TodoFormProps {
  show: boolean;
  editingTodo: Todo | null;
  onSave: (title: string, description: string) => void;
  onClose: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  show,
  editingTodo,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, description);
    setTitle("");
    setDescription("");
  };

  if (!show) return null;

  return (
    <FormContainer
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        placeholder={t("todos.form.title_placeholder")}
        required
      />
      <TextArea
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(e.target.value)
        }
        placeholder={t("todos.form.description_placeholder")}
        required
      />
      <SubmitButton type="submit">
        {editingTodo ? <FiEdit2 /> : <FiPlus />}
        {editingTodo ? t("todos.form.edit") : t("todos.form.add")}
      </SubmitButton>
    </FormContainer>
  );
};
