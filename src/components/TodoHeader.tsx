import React from "react";
import { FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { HeaderContainer, Title, SaveButton } from "../util/StyledComponents";
import { IconWrapper } from "../util/StyledComponents";

interface TodoHeaderProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
  showForm,
  setShowForm,
}) => {
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      <Title>{t("todos.title")}</Title>
      <SaveButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowForm(!showForm)}
      >
        <IconWrapper>
          {showForm ? (
            <>
              <FiPlus style={{ transform: "rotate(45deg)" }} />
              {t("todos.cancel")}
            </>
          ) : (
            <>
              <FiPlus />
              {t("todos.add_todo")}
            </>
          )}
        </IconWrapper>
      </SaveButton>
    </HeaderContainer>
  );
};
