import React from "react";
import { AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { ErrorContainer, CloseButton } from "../util/StyledComponents";

interface ErrorMessageProps {
  error: string;
  onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  onClose,
}) => {
  if (!error) return null;

  return (
    <AnimatePresence>
      {error && (
        <ErrorContainer
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <span>{error}</span>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        </ErrorContainer>
      )}
    </AnimatePresence>
  );
};
