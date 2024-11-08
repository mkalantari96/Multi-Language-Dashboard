import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  background: "#ffffff",
  text: "#2D3748",
  textSecondary: "#6B7280",
  accent: "#007bff",
  secondaryBackground: "#F3F4F6",
  border: "#E5E7EB",
  shadow: "rgba(0, 123, 255, 0.2)",
  hover: "#0056b3",
  notification: "#EBF5FF",
  success: "#48BB78",
  error: "#F56565",
};

export const darkTheme = {
  background: "#121212",
  text: "#E2E8F0",
  textSecondary: "#9CA3AF",
  accent: "#bb86fc",
  secondaryBackground: "#1E1E1E",
  border: "#374151",
  shadow: "rgba(187, 134, 252, 0.3)",
  hover: "#9d4edd",
  notification: "#1A1A1A",
  success: "#38A169",
  error: "#E53E3E",
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    transition: all 0.3s ease-in-out;
    min-height: 100vh;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s ease-in-out;
  }

  input, textarea {
    font-family: inherit;
    border: 1px solid ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.2s ease-in-out;
    
    &:focus {
      border-color: ${({ theme }) => theme.accent};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.shadow};
    }
  }
`;
