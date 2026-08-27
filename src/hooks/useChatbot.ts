import { useContext, createContext } from 'react';

export interface ChatbotContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbotContext must be used within ChatbotProvider');
  }
  return context;
};
