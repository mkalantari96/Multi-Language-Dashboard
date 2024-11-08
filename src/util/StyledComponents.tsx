import { motion } from "framer-motion";
import styled from "styled-components";
// Extend DefaultTheme
import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
// Theme interface
interface Theme {
  border: string;
  background: string;
  text: string;
  accent: string;
  shadow: string;
  hover: string;
  secondaryBackground: string;
  textSecondary: string;
  error: string;
}

// Base styles
const baseButtonStyles = (props: { theme: Theme }) => `
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
`;

const baseInputStyles = (props: { theme: Theme }) => `
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid ${props.theme.border};
  background: ${props.theme.background};
  color: ${props.theme.text};

  &:focus {
    border-color: ${props.theme.accent};
    box-shadow: 0 0 0 2px ${props.theme.shadow};
  }
`;

const baseContainerStyles = (props: { theme: Theme }) => `
  padding: 2rem;
  border-radius: 8px;
  background: ${props.theme.secondaryBackground};
  box-shadow: 0 2px 4px ${props.theme.shadow};
`;

const baseTextStyles = (props: { theme: Theme }) => `
  color: ${props.theme.text};
  font-weight: 500;
`;

// Button Components
export const Button = styled.button`
  ${baseButtonStyles}
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.background};

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.hover};
  }
`;

// Input Components
export const Input = styled.input`
  ${baseInputStyles}
`;

export const TextArea = styled.textarea`
  ${baseInputStyles}
  min-height: 100px;
  resize: vertical;
`;

// Container Components
export const ProfileContainer = styled(motion.div)`
  ${baseContainerStyles}
  max-width: 600px;
  margin: 2rem auto;
`;

export const WeatherCard = styled(motion.div)`
  ${baseContainerStyles}
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

// Text Components
export const Title = styled.h1`
  ${baseTextStyles}
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

export const WeatherTitle = styled.h2`
  ${baseTextStyles}
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
`;

// Message Components
export const StatusMessage = styled(motion.p)<{ isError?: boolean }>`
  color: ${({ theme, isError }) =>
    isError ? theme.error : theme.textSecondary};
  text-align: center;
  padding: 1rem;
`;

// Profile Components
export const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

export const Select = styled.select`
  ${baseInputStyles}
  cursor: pointer;
`;

export const SaveButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: white;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

// Dashboard Components
export const DashboardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2.5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 640px) {
    padding: 2.5rem;
  }
`;

export const GreetingSection = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  border-radius: 1rem;
`;

export const GreetingText = styled.h2`
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  text-shadow: 0 0 20px ${({ theme }) => `${theme.accent}40`};
  margin-bottom: 1rem;
`;

export const TimeText = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: light;
  color: ${({ theme }) => theme.text};
`;

export const TimeValue = styled(motion.span)`
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  text-shadow: 0 0 10px ${({ theme }) => `${theme.accent}40`};
`;

// Welcome Card Components
export const WelcomeCard = styled(motion.div)`
  background-color: ${({ theme }) => `${theme.background}CC`};
  backdrop-filter: blur(10px);
  border: 2px solid ${({ theme }) => `${theme.accent}40`};
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 32rem;
  box-shadow: 0 0 20px ${({ theme }) => `${theme.accent}20`};

  @media (min-width: 640px) {
    padding: 2.5rem;
  }
`;

export const WelcomeTitle = styled.h3`
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.accent};
  text-shadow: 0 0 10px ${({ theme }) => `${theme.accent}30`};
  text-align: center;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${({ theme }) => `${theme.accent}60`};
`;

// Sidebar Components
export const SidebarContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.border};
  border-left: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadow};
`;

export const MenuButton = styled(motion.button)`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.text};

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    margin-top: 1rem;
  }
`;

export const NavButton = styled(motion.button)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.accent : "transparent"};
  color: ${({ theme, $isActive }) => ($isActive ? "#ffffff" : theme.text)};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.accent : theme.secondaryBackground};
  }
`;

export const SettingsContainer = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SettingsButton = styled(motion.button)`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.text};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryBackground};
  }
`;

export const IconWrapper = styled.span`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(motion.span)`
  margin-left: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
`;

// Todo Components
interface TodoStyleProps {
  completed?: boolean;
  type?: "edit" | "delete";
}

export const TodoItemContainer = styled(motion.div)<{ $completed?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.secondaryBackground};
  border-radius: 0.5rem;
  opacity: ${({ $completed }) => ($completed ? 0.7 : 1)};
`;

export const TodoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TodoTitle = styled.h3<{ $completed?: boolean }>`
  color: ${({ theme, $completed }) =>
    $completed ? theme.textSecondary : theme.text};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
`;

export const TodoDescription = styled.p<{ $completed?: boolean }>`
  color: ${({ theme, $completed }) =>
    $completed ? theme.textSecondary : theme.text};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button<TodoStyleProps>`
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.text};
  background: ${({ theme, type }) =>
    type === "delete" ? theme.error : theme.accent};

  &:hover {
    opacity: 0.8;
  }
`;

export const CompleteButton = styled.button<{ $completed?: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid
    ${({ theme, $completed }) => ($completed ? theme.accent : theme.border)};
  background: ${({ theme, $completed }) =>
    $completed ? theme.accent : "transparent"};
  color: ${({ theme, $completed }) =>
    $completed ? "#ffffff" : theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.background};
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export const TodoContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
`;

export const TodoList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

// Weather Components
export const WeatherContainer = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  ${baseContainerStyles}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: all 0.2s;
  box-shadow: 0 1px 2px ${({ theme }) => theme.shadow};

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.accent}40`};
  }
`;

export const SuggestionsList = styled(motion.ul)`
  position: absolute;
  z-index: 10;
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
`;

export const SuggestionItem = styled(motion.li)`
  cursor: pointer;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.secondaryBackground};
  }
`;

export const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const WeatherItem = styled.div`
  text-align: center;
`;

export const WeatherLabel = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
`;

export const WeatherValue = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`;

// Error/Message Components
export const ErrorContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.error};
  color: white;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const ErrorMessage = styled(motion.p)`
  color: ${({ theme }) => theme.error};
  text-align: center;
  padding: 1rem;
`;

export const EmptyMessage = styled(motion.p)`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  padding: 1rem;
`;
