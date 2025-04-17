// Session-specific storage utilities

export interface SurveyData {
  completed?: boolean;
  lastStep?: number;
  data?: Record<string, any>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sender: 'user' | 'ai';
  id?: string;
  timestamp?: string;
  userId?: string;
}

export class SessionStorageManager {
  private static SURVEY_KEY = 'ecosense_survey';
  private static readonly CHAT_HISTORY_KEY = 'chatHistory';
  private static readonly USER_ID_KEY = 'userId';

  static generateUserId(): string {
    const existingUserId = localStorage.getItem(this.USER_ID_KEY);
    if (existingUserId) return existingUserId;

    const newUserId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(this.USER_ID_KEY, newUserId);
    return newUserId;
  }

  // Survey methods
  static saveSurvey(surveyData: SurveyData): void {
    try {
      sessionStorage.setItem(this.SURVEY_KEY, JSON.stringify(surveyData));
    } catch (error) {
      console.error('Error saving survey to sessionStorage:', error);
    }
  }

  static getSurvey(): SurveyData | null {
    try {
      const surveyData = sessionStorage.getItem(this.SURVEY_KEY);
      return surveyData ? JSON.parse(surveyData) : null;
    } catch (error) {
      console.error('Error retrieving survey from sessionStorage:', error);
      return null;
    }
  }

  static clearSurvey(): void {
    try {
      sessionStorage.removeItem(this.SURVEY_KEY);
    } catch (error) {
      console.error('Error clearing survey from sessionStorage:', error);
    }
  }

  // Chat history methods
  static saveChatMessage(message: ChatMessage): void {
    try {
      console.error('EXTREME DEBUG: Saving Chat Message', {
        message,
        timestamp: new Date().toISOString()
      });

      const chatHistory = this.getChatHistory() || [];
      const updatedHistory = [...chatHistory, message];
      
      console.error('EXTREME DEBUG: Updated Chat History', {
        historyLength: updatedHistory.length,
        lastMessage: updatedHistory[updatedHistory.length - 1]
      });

      sessionStorage.setItem(this.CHAT_HISTORY_KEY, JSON.stringify(updatedHistory));
      
      // Verify storage
      const verificationHistory = this.getChatHistory();
      console.error('EXTREME DEBUG: Verification After Save', {
        verificationLength: verificationHistory?.length,
        verificationLastMessage: verificationHistory?.[verificationHistory.length - 1]
      });
    } catch (error) {
      console.error('CRITICAL ERROR: Saving chat message to sessionStorage failed', {
        error,
        message,
        timestamp: new Date().toISOString()
      });
    }
  }

  static getChatHistory(): ChatMessage[] {
    try {
      const chatHistory = sessionStorage.getItem(this.CHAT_HISTORY_KEY);
      
      console.error('EXTREME DEBUG: Retrieving Chat History', {
        rawStorageValue: chatHistory,
        timestamp: new Date().toISOString()
      });

      const parsedHistory = chatHistory ? JSON.parse(chatHistory) : [];
      
      console.error('EXTREME DEBUG: Parsed Chat History', {
        historyLength: parsedHistory.length,
        firstMessage: parsedHistory[0],
        lastMessage: parsedHistory[parsedHistory.length - 1]
      });

      return parsedHistory;
    } catch (error) {
      console.error('CRITICAL ERROR: Retrieving chat history from sessionStorage failed', {
        error,
        timestamp: new Date().toISOString()
      });
      return [];
    }
  }

  static clearChatHistory(): void {
    try {
      console.error('EXTREME DEBUG: Clearing Chat History', {
        timestamp: new Date().toISOString()
      });
      sessionStorage.removeItem(this.CHAT_HISTORY_KEY);
    } catch (error) {
      console.error('CRITICAL ERROR: Clearing chat history from sessionStorage failed', {
        error,
        timestamp: new Date().toISOString()
      });
    }
  }
}

// Export for direct use in components
export default SessionStorageManager;
