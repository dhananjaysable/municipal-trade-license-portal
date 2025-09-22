// components/ChatBot/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Fade,
  Zoom,
  Collapse,
  CircularProgress,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Close,
  Clear,
  Person,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useChat } from '../../contexts/ChatContext';

const ChatBot = () => {
  const { isOpen, messages, isTyping, sendMessage, toggleChat, clearChat } = useChat();
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    'How to apply?',
    'Required documents',
    'Application status',
    'License fees',
    'Renewal process',
    'Contact support'
  ];

  const handleQuickAction = (action) => {
    sendMessage(action);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) {
    return (
      <Zoom in={true}>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Tooltip title="Ask AI Assistant" placement="left">
            <IconButton
              onClick={toggleChat}
              sx={{
                width: 64,
                height: 64,
                background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 12px 40px rgba(0, 122, 255, 0.4)',
                },
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <SmartToy sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Zoom>
    );
  }

  return (
    <Zoom in={isOpen}>
      <Paper
        elevation={24}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: { xs: 'calc(100vw - 32px)', sm: 380 },
          height: isMinimized ? 64 : { xs: 'calc(100vh - 100px)', sm: 600 },
          maxHeight: 'calc(100vh - 100px)',
          borderRadius: 3,
          overflow: 'hidden',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <SmartToy />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="600">
                AI Assistant
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Trade License Helper
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton
              onClick={() => setIsMinimized(!isMinimized)}
              sx={{ color: 'white', mr: 1 }}
            >
              <KeyboardArrowDown
                sx={{
                  transform: isMinimized ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </IconButton>
            <IconButton onClick={clearChat} sx={{ color: 'white', mr: 1 }}>
              <Clear />
            </IconButton>
            <IconButton onClick={toggleChat} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={!isMinimized}>
          {/* Messages Area */}
          <Box
            sx={{
              height: 420,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#C7C7CC',
                borderRadius: '2px',
              },
            }}
          >
            {messages.map((message) => (
              <Fade key={message.id} in={true} timeout={300}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '80%',
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 1,
                      flexDirection: message.isBot ? 'row' : 'row-reverse',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: message.isBot
                          ? 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)'
                          : '#6D6D80',
                      }}
                    >
                      {message.isBot ? <SmartToy sx={{ fontSize: 16 }} /> : <Person sx={{ fontSize: 16 }} />}
                    </Avatar>
                    <Box>
                      <Paper
                        sx={{
                          p: 1.5,
                          borderRadius: message.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                          background: message.isBot
                            ? '#F2F2F7'
                            : 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                          color: message.isBot ? '#000' : '#fff',
                          maxWidth: '100%',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            lineHeight: 1.4,
                          }}
                        >
                          {message.text}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 0.5,
                          opacity: 0.7,
                          textAlign: message.isBot ? 'left' : 'right',
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            ))}

            {isTyping && (
              <Fade in={isTyping}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    }}
                  >
                    <SmartToy sx={{ fontSize: 16 }} />
                  </Avatar>
                  <Paper
                    sx={{
                      p: 1.5,
                      borderRadius: '16px 16px 16px 4px',
                      background: '#F2F2F7',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {[0, 1, 2].map((dot) => (
                        <Box
                          key={dot}
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#007AFF',
                            animation: `pulse 1.4s infinite ${dot * 0.2}s`,
                            '@keyframes pulse': {
                              '0%, 60%, 100%': { opacity: 0.3 },
                              '30%': { opacity: 1 },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </Fade>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <Box sx={{ p: 2, pt: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Quick actions:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {quickActions.map((action) => (
                  <Chip
                    key={action}
                    label={action}
                    onClick={() => handleQuickAction(action)}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(0, 122, 255, 0.1)',
                      color: '#007AFF',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 122, 255, 0.2)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Divider />

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              gap: 1,
              alignItems: 'flex-end',
            }}
          >
            <TextField
              ref={inputRef}
              fullWidth
              multiline
              maxRows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about trade licenses..."
              variant="outlined"
              size="small"
              disabled={isTyping}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: '#F2F2F7',
                },
              }}
            />
            <IconButton
              onClick={handleSend}
              disabled={!inputText.trim() || isTyping}
              sx={{
                width: 44,
                height: 44,
                backgroundColor: '#007AFF',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#0051D5',
                },
                '&.Mui-disabled': {
                  backgroundColor: '#C7C7CC',
                  color: 'white',
                },
              }}
            >
              {isTyping ? (
                <CircularProgress size={20} sx={{ color: 'white' }} />
              ) : (
                <Send sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Box>
        </Collapse>
      </Paper>
    </Zoom>
  );
};

export default ChatBot;
