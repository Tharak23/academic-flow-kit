import React, { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/Navigation/DashboardNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Send, 
  Plus, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  MessageSquare,
  Users
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  type: 'text' | 'file' | 'system';
}

interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'project';
  participants: Array<{
    id: string;
    name: string;
    status: 'online' | 'offline' | 'away';
  }>;
  lastMessage: Message;
  unreadCount: number;
  avatar?: string;
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser] = useState({
    id: 'current-user',
    name: 'You',
    email: 'you@example.com'
  });

  useEffect(() => {
    // Load conversations from localStorage or use mock data
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    } else {
      const mockConversations: Conversation[] = [
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          type: 'direct',
          participants: [
            { id: '1', name: 'Dr. Sarah Johnson', status: 'online' }
          ],
          lastMessage: {
            id: '1',
            content: 'Thanks for sharing the latest research findings!',
            senderId: '1',
            senderName: 'Dr. Sarah Johnson',
            timestamp: '2024-01-20T14:30:00Z',
            type: 'text'
          },
          unreadCount: 2
        },
        {
          id: '2',
          name: 'Climate Modeling Team',
          type: 'project',
          participants: [
            { id: '1', name: 'Dr. Sarah Johnson', status: 'online' },
            { id: '2', name: 'Mike Chen', status: 'away' },
            { id: '3', name: 'Emma Wilson', status: 'offline' }
          ],
          lastMessage: {
            id: '2',
            content: 'Meeting scheduled for tomorrow at 2 PM',
            senderId: '2',
            senderName: 'Mike Chen',
            timestamp: '2024-01-20T12:15:00Z',
            type: 'text'
          },
          unreadCount: 0
        },
        {
          id: '3',
          name: 'Research Coordinators',
          type: 'group',
          participants: [
            { id: '4', name: 'Prof. David Martinez', status: 'online' },
            { id: '5', name: 'Dr. Alex Kumar', status: 'offline' }
          ],
          lastMessage: {
            id: '3',
            content: 'New project guidelines have been uploaded',
            senderId: '4',
            senderName: 'Prof. David Martinez',
            timestamp: '2024-01-19T16:45:00Z',
            type: 'text'
          },
          unreadCount: 1
        }
      ];
      setConversations(mockConversations);
      localStorage.setItem('conversations', JSON.stringify(mockConversations));
    }
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Load messages for selected conversation
      const savedMessages = localStorage.getItem(`messages-${selectedConversation}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        // Mock messages for demonstration
        const mockMessages: Message[] = [
          {
            id: '1',
            content: 'Hi! How\'s the climate modeling project coming along?',
            senderId: '1',
            senderName: 'Dr. Sarah Johnson',
            timestamp: '2024-01-20T10:00:00Z',
            type: 'text'
          },
          {
            id: '2',
            content: 'Great progress! We\'ve completed the data collection phase and are now working on the analysis.',
            senderId: 'current-user',
            senderName: 'You',
            timestamp: '2024-01-20T10:15:00Z',
            type: 'text'
          },
          {
            id: '3',
            content: 'That\'s excellent news. Could you share the preliminary results when they\'re ready?',
            senderId: '1',
            senderName: 'Dr. Sarah Johnson',
            timestamp: '2024-01-20T10:30:00Z',
            type: 'text'
          },
          {
            id: '4',
            content: 'Absolutely! I\'ll have them ready by end of week.',
            senderId: 'current-user',
            senderName: 'You',
            timestamp: '2024-01-20T10:45:00Z',
            type: 'text'
          },
          {
            id: '5',
            content: 'Thanks for sharing the latest research findings!',
            senderId: '1',
            senderName: 'Dr. Sarah Johnson',
            timestamp: '2024-01-20T14:30:00Z',
            type: 'text'
          }
        ];
        setMessages(mockMessages);
        localStorage.setItem(`messages-${selectedConversation}`, JSON.stringify(mockMessages));
      }
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(`messages-${selectedConversation}`, JSON.stringify(updatedMessages));

    // Update conversation's last message
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation
        ? { ...conv, lastMessage: message }
        : conv
    );
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConversationIcon = (conversation: Conversation) => {
    switch (conversation.type) {
      case 'group':
        return <Users className="h-4 w-4" />;
      case 'project':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversation List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Messages</CardTitle>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="space-y-1 p-3">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation === conversation.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {conversation.type === 'direct' 
                                ? conversation.name.split(' ').map(n => n[0]).join('')
                                : getConversationIcon(conversation)
                              }
                            </AvatarFallback>
                          </Avatar>
                          {conversation.type === 'direct' && conversation.participants[0]?.status === 'online' && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">
                              {conversation.name}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate">
                              {conversation.lastMessage.content}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedConv ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {selectedConv.type === 'direct' 
                            ? selectedConv.name.split(' ').map(n => n[0]).join('')
                            : getConversationIcon(selectedConv)
                          }
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedConv.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConv.type === 'direct' 
                            ? selectedConv.participants[0]?.status || 'offline'
                            : `${selectedConv.participants.length} members`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        const isCurrentUser = message.senderId === currentUser.id;
                        const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex items-end space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                              {!isCurrentUser && showAvatar && (
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">
                                    {message.senderName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              {!isCurrentUser && !showAvatar && (
                                <div className="w-6" />
                              )}
                              <div
                                className={`rounded-lg px-3 py-2 ${
                                  isCurrentUser
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                                }`}
                              >
                                {!isCurrentUser && showAvatar && (
                                  <p className="text-xs font-medium mb-1">{message.senderName}</p>
                                )}
                                <p className="text-sm">{message.content}</p>
                                <p className={`text-xs mt-1 ${
                                  isCurrentUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                }`}>
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                      />
                      <Button variant="ghost" size="sm" className="absolute right-1 top-1">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;