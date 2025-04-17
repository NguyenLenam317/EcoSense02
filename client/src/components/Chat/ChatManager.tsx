import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { AxiosError } from 'axios';
import SessionStorageManager from '../../utils/sessionStorage';

// Explicitly type chat message
interface ChatMessage {
  role: 'user' | 'assistant';
  sender: 'user' | 'ai';
  content: string;
  userId?: string;
  timestamp?: string;
}

// Explicitly type API response
interface ChatAPIResponse {
  response: string;
  userId?: string;
}

// Global JSX type declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const ChatManager: FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const userId = SessionStorageManager.generateUserId();
        
        const response = await axios.get(`/api/chat/history?userId=${userId}`);
        const chatHistory: ChatMessage[] = (response.data || []).map((msg: any) => ({
          ...msg,
          sender: msg.sender || 'ai',
          role: msg.role || 'assistant',
          userId: userId,
          timestamp: msg.timestamp || new Date().toISOString()
        }));

        // Save to session storage and update state
        chatHistory.forEach(msg => SessionStorageManager.saveChatMessage(msg));
        setMessages(chatHistory);
      } catch (err) {
        console.error('Error fetching chat history:', err);
        
        // Fallback to local storage
        const localHistory = SessionStorageManager.getChatHistory();
        setMessages(localHistory);
        setError('Could not fetch chat history');
      }
    };

    fetchChatHistory();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userId = SessionStorageManager.generateUserId();
    const userMessage: ChatMessage = {
      role: 'user',
      sender: 'user',
      content: inputMessage,
      userId,
      timestamp: new Date().toISOString()
    };

    try {
      setIsLoading(true);
      const response = await axios.post('/api/chat/message', { 
        content: inputMessage, 
        userId 
      });

      const aiMessage: ChatMessage = {
        role: 'assistant',
        sender: 'ai',
        content: response.data.response,
        userId,
        timestamp: new Date().toISOString()
      };

      const updatedMessages = [...messages, userMessage, aiMessage];
      
      // Update state and save to storage
      setMessages(updatedMessages);
      SessionStorageManager.saveChatMessage(userMessage);
      SessionStorageManager.saveChatMessage(aiMessage);

      // Clear input
      setInputMessage('');
      setError(null);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        role: 'assistant',
        sender: 'ai',
        content: 'Sorry, there was an error processing your message.',
        userId,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    SessionStorageManager.clearChatHistory();
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="chat-input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !inputMessage.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        <button onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
};

export default ChatManager;

// Explicitly type chat message
interface ChatMessage {
  role: 'user' | 'assistant';
  sender: 'user' | 'ai';
  content: string;
  userId?: string;
  timestamp?: string;
}

// Explicitly type API response
interface ChatAPIResponse {
  response: string;
  userId?: string;
}

// Global JSX type declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Type declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Explicitly type axios response
type ChatAPIResponse = {
  response: string;
  userId?: string;
};

// Explicitly type chat message
type ChatMessage = {
  role: 'user' | 'assistant';
  sender: 'user' | 'ai';
  content: string;
  userId?: string;
  timestamp?: string;
};

// Type declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Explicitly type axios response
type ChatAPIResponse = {
  response: string;
  userId?: string;
};

// Explicitly type chat message
type ChatMessage = {
  role: 'user' | 'assistant';
  sender: 'user' | 'ai';
  content: string;
  userId?: string;
  timestamp?: string;
};

    }
  }
}

type ChatMessage = {
  role: 'user' | 'assistant';
  sender: 'user' | 'ai';
  content: string;
  userId?: string;
};

type ChatManagerProps = {
  // Add any props if needed
};

type ChatManagerState = {
  messages: ChatMessage[];
  newMessage: string;
};

const ChatManager: FC<ChatManagerProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatHistory = async (): Promise<void> => {
      try {
        const userId = SessionStorageManager.generateUserId();

        console.error('EXTREME DEBUG: Fetching Chat History', {
          userId,
          timestamp: new Date().toISOString()
        });

        const response = await axios.get(`/api/chat/history?userId=${userId}`);
        const chatHistory: ChatMessage[] = (response.data || []).map(msg => ({
          ...msg,
          sender: msg.sender || 'ai',
          role: msg.role || 'assistant',
          userId: userId
        }));
            },
            timeout: 5000 // 5-second timeout
          });
          serverChatHistory = response.data || [];
        } catch (requestError) {
          console.warn('Primary chat history request failed:', requestError);
        }

        console.log('Server chat history:', serverChatHistory);

        // Merge server history with local storage history
        const localChatHistory = SessionStorageManager.getChatHistory() || [];
        const mergedHistory = [...serverChatHistory, ...localChatHistory]
          .filter((msg: ChatMessage, index: number, self: ChatMessage[]) => 
            index === self.findIndex((m: ChatMessage) => m.content === msg.content)
          );

        // Always update messages, even if empty
        setMessages(mergedHistory);
        
        // Update local storage
        SessionStorageManager.clearChatHistory();
        mergedHistory.forEach((msg: ChatMessage) => SessionStorageManager.saveChatMessage(msg));

      } catch (error: unknown) {
        console.error('Catastrophic error fetching chat history:', error);
        
        // Ultimate fallback
        const savedChatHistory = SessionStorageManager.getChatHistory() || [];
        console.log('Final fallback to local chat history:', savedChatHistory);
        
        setMessages(savedChatHistory);
      }
    };

    fetchChatHistory();
  }, []);

  const sendMessage = async (): Promise<void> => {
    if (!newMessage.trim()) return;

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId') || '0';

      // Send message to server and get AI response
      console.log('Sending message:', JSON.stringify({ content: newMessage, userId }));
      const response = await axios.post<{ response: string }>('/api/chat/message', 
        { content: newMessage, userId }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'X-User-ID': userId
          }
        }
      );

      // Create user chat message object
      const userMessage: ChatMessage = {
        role: 'user',
        sender: 'user',
        content: newMessage,
        userId: userId
      };

      // Create AI response message object
      const aiMessage: ChatMessage = {
        role: 'assistant',
        sender: 'ai',
        content: response.data.response,
        userId: userId
      };

      // Update local state and sessionStorage
      const updatedMessages = [...messages, userMessage, aiMessage];
      console.log('Updating messages:', updatedMessages);
      
      // Explicitly log each message being saved
      console.log('Saving user message:', userMessage);
      console.log('Saving AI message:', aiMessage);
      
      // Update state and save to session storage
      setMessages(updatedMessages);
      
      try {
        SessionStorageManager.saveChatMessage(userMessage);
        SessionStorageManager.saveChatMessage(aiMessage);
        
        // Verify saved messages
        const savedHistory = SessionStorageManager.getChatHistory();
        console.log('Saved chat history after update:', savedHistory);
      } catch (storageError: unknown) {
        console.error('Error saving messages to session storage:', storageError);
      }

      // Clear input
      setNewMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error sending message:', error.message);
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          stack: error.stack
        });
      } else {
        console.error('Unknown error occurred:', error);
      }
      
      // Optionally, add an error message to chat
      const errorMessage: ChatMessage = {
        role: 'assistant',
        sender: 'ai',
        content: 'Sorry, there was an error processing your message.',
        userId: localStorage.getItem('userId') || '0'
      };
      setMessages([...messages, errorMessage]);
    }
  };

  const clearChat = (): void => {
    // Clear messages from local state and sessionStorage
    setMessages([]);
    SessionStorageManager.clearChatHistory();
  };

  // Debug logging for messages
  useEffect(() => {
    console.log('Current messages:', messages);
  }, [messages]);

  // Comprehensive logging function
  const logMessages = React.useCallback(() => {
    console.group('Chat Messages Debug');
    console.log('Total Messages:', messages.length);
    messages.forEach((msg, index) => {
      console.log(`Message ${index}:`, {
        role: msg.role,
        sender: msg.sender,
        content: msg.content,
        timestamp: msg.timestamp || 'No timestamp'
      });
    });
    console.groupEnd();
  }, [messages]);

  // Log messages whenever they change
  React.useEffect(() => {
    logMessages();
    
    // EXTREME DEBUGGING
    console.error('CRITICAL DEBUG: FULL MESSAGE STATE DUMP');
    console.error('Messages Length:', messages.length);
    console.error('Messages Raw:', JSON.stringify(messages, null, 2));
    console.error('Local Storage User ID:', localStorage.getItem('userId'));
    console.error('Session Storage Chat History:', 
      JSON.stringify(SessionStorageManager.getChatHistory(), null, 2)
    );
  }, [messages, logMessages]);

  // EMERGENCY RENDER OVERRIDE
  const renderEmergencyDebug = () => {
    return (
      <div style={{ backgroundColor: 'red', color: 'white', padding: '20px' }}>
        <h2>EMERGENCY DEBUG INFORMATION</h2>
        <pre>{JSON.stringify({
          messagesLength: messages.length,
          userId: localStorage.getItem('userId'),
          messages: messages
        }, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      {renderEmergencyDebug()}
    <div>
      <div className="chat-messages" style={{ 
        border: '1px solid #e0e0e0', 
        minHeight: '300px', 
        padding: '10px' 
      }}>
        {messages.length === 0 && (
          <div style={{ 
            color: '#888', 
            textAlign: 'center', 
            padding: '20px' 
          }}>
            No messages yet. Start a conversation!
          </div>
        )}
        {messages.map((msg: ChatMessage, index: number) => (
          <div 
            key={index} 
            className={`message ${msg.role}`}
            style={{ 
              padding: '10px', 
              margin: '5px', 
              backgroundColor: msg.role === 'user' ? '#e0f7fa' : '#f0f0f0',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column'
            }}
            >
              <div style={{ 
                fontWeight: msg.role === 'user' ? 'bold' : 'normal',
                color: msg.role === 'user' ? '#0066cc' : '#333'
              }}>
                {msg.role === 'user' ? 'You:' : 'AI:'}
              </div>
              <div>{msg.content}</div>
            </div>
          );
        })}
      </div>
      <div className="chat-input" style={{ 
        display: 'flex', 
        marginTop: '10px' 
      }}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ 
            flex: 1, 
            padding: '10px', 
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button 
          onClick={sendMessage} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
        <button 
          onClick={clearChat} 
          style={{ 
            marginLeft: '10px', 
            padding: '10px 20px', 
            backgroundColor: '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ChatManager;
