"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { MessageSquare, Send, Paperclip, User, Users, ChevronDown, MoreHorizontal, Search, Phone, Video, Image, File } from "lucide-react"
import styles from "./chat.module.css"

interface Message {
  id: number
  senderId: number
  senderName: string
  content: string
  timestamp: Date
  isRead: boolean
  attachment?: {
    type: 'image' | 'file'
    name: string
    url: string
  }
}

interface ChatUser {
  id: number
  name: string
  role: string
  status: 'online' | 'offline' | 'away'
  avatar?: string
  lastSeen?: Date
  unreadCount?: number
}

interface ChatGroup {
  id: number
  name: string
  participants: number[]
  isGroup: true
  unreadCount?: number
}

type ChatItem = ChatUser | ChatGroup

export default function CommitteeChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [chatUsers, setChatUsers] = useState<ChatItem[]>([])
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  const messageEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Dummy users and messages for demo purposes
  useEffect(() => {
    // This would be an API call in a real application
    const users: ChatItem[] = [
      {
        id: 1,
        name: "Technical Team",
        participants: [1, 2, 3, 4],
        isGroup: true,
        unreadCount: 3
      },
      {
        id: 2,
        name: "Event Planning",
        participants: [1, 3, 5, 6],
        isGroup: true
      },
      {
        id: 3,
        name: "John Smith",
        role: "Tech Lead",
        status: "online"
      },
      {
        id: 4,
        name: "Sarah Johnson",
        role: "Event Coordinator",
        status: "online"
      },
      {
        id: 5,
        name: "Michael Brown",
        role: "Design Lead",
        status: "away",
        lastSeen: new Date(Date.now() - 30 * 60000) // 30 mins ago
      },
      {
        id: 6,
        name: "Emily Davis",
        role: "Marketing Specialist",
        status: "offline",
        lastSeen: new Date(Date.now() - 120 * 60000), // 2 hours ago
        unreadCount: 2
      },
      {
        id: 7,
        name: "David Wilson",
        role: "Technical Member",
        status: "online"
      }
    ];

    const demoMessages: Message[] = [
      {
        id: 1,
        senderId: 3,
        senderName: "John Smith",
        content: "Hey everyone, just checking in on the progress for the upcoming tech conference.",
        timestamp: new Date(Date.now() - 60 * 60000),
        isRead: true
      },
      {
        id: 2,
        senderId: 4,
        senderName: "Sarah Johnson",
        content: "I've finalized the schedule for the conference. Will share it shortly.",
        timestamp: new Date(Date.now() - 40 * 60000),
        isRead: true
      },
      {
        id: 3,
        senderId: 5,
        senderName: "Michael Brown",
        content: "The design assets are ready. Here's the presentation template everyone should use.",
        timestamp: new Date(Date.now() - 30 * 60000),
        isRead: true,
        attachment: {
          type: 'file',
          name: 'presentation_template.pptx',
          url: '#'
        }
      },
      {
        id: 4,
        senderId: 3,
        senderName: "John Smith",
        content: "Thanks Michael! That looks great.",
        timestamp: new Date(Date.now() - 20 * 60000),
        isRead: true
      },
      {
        id: 5,
        senderId: 6,
        senderName: "Emily Davis",
        content: "Quick update on marketing: social media campaign is live and we've already got 200+ registrations!",
        timestamp: new Date(Date.now() - 15 * 60000),
        isRead: false
      },
      {
        id: 6,
        senderId: 4,
        senderName: "Sarah Johnson",
        content: "Here's the final schedule as promised:",
        timestamp: new Date(Date.now() - 10 * 60000),
        isRead: false,
        attachment: {
          type: 'image',
          name: 'conference_schedule.png',
          url: '#'
        }
      },
      {
        id: 7,
        senderId: 7,
        senderName: "David Wilson",
        content: "I'll be handling the technical setup. Let me know if anyone needs anything specific for their presentations.",
        timestamp: new Date(Date.now() - 5 * 60000),
        isRead: false
      }
    ];

    setChatUsers(users);
    setMessages(demoMessages);
    setSelectedChat(1); // Select the first chat by default
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 0, // Current user ID would be used in a real app
      senderName: "You", // Current user name would be used in a real app
      content: message,
      timestamp: new Date(),
      isRead: true
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'online': return styles.statusOnline;
      case 'away': return styles.statusAway;
      case 'offline': return styles.statusOffline;
      default: return '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log("File selected:", e.target.files);
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredChatUsers = chatUsers.filter(chat => 
    'isGroup' in chat 
      ? chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      : chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        chat.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatDetails = chatUsers.find(chat => chat.id === selectedChat);

  return (
    <DashboardLayout role="committee">
      <div className={styles.container}>
        <div className={styles.chatLayout}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>Messages</h2>
            </div>
            
            <div className={styles.searchContainer}>
              <Search size={16} className={styles.searchIcon} />
              <input 
                type="text"
                placeholder="Search chats..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={styles.chatList}>
              {filteredChatUsers.map(chat => (
                <div 
                  key={chat.id}
                  className={`${styles.chatItem} ${selectedChat === chat.id ? styles.active : ''}`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className={styles.chatAvatar}>
                    {'isGroup' in chat ? (
                      <div className={styles.groupAvatar}>
                        <Users size={18} />
                      </div>
                    ) : (
                      <div className={styles.userAvatar}>
                        {getInitials(chat.name)}
                        {'status' in chat && (
                          <span className={`${styles.statusIndicator} ${getStatusClass(chat.status)}`}></span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.chatInfo}>
                    <div className={styles.chatName}>
                      {chat.name}
                      {chat.unreadCount && chat.unreadCount > 0 && (
                        <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                      )}
                    </div>
                    {'role' in chat ? (
                      <div className={styles.chatMeta}>
                        <span className={styles.chatRole}>{chat.role}</span>
                        {'status' in chat && chat.status === 'online' && (
                          <span className={styles.onlineText}>Online</span>
                        )}
                        {'lastSeen' in chat && chat.lastSeen && chat.status !== 'online' && (
                          <span className={styles.lastSeen}>
                            Last seen {formatTime(chat.lastSeen)}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className={styles.chatMeta}>
                        <span className={styles.participantCount}>
                          {chat.participants.length} participants
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Content */}
          <div className={styles.chatContent}>
            {selectedChat && (
              <>
                <div className={styles.chatHeader}>
                  <div className={styles.chatHeaderInfo}>
                    {'isGroup' in selectedChatDetails! ? (
                      <>
                        <div className={styles.groupAvatarLarge}>
                          <Users size={22} />
                        </div>
                        <div>
                          <h3 className={styles.chatHeaderName}>{selectedChatDetails!.name}</h3>
                          <span className={styles.chatHeaderMeta}>
                            {selectedChatDetails!.participants.length} participants
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`${styles.userAvatarLarge} ${selectedChatDetails && 'status' in selectedChatDetails ? getStatusClass(selectedChatDetails.status) : ''}`}>
                          {getInitials(selectedChatDetails!.name)}
                        </div>
                        <div>
                          <h3 className={styles.chatHeaderName}>{selectedChatDetails!.name}</h3>
                          <span className={styles.chatHeaderMeta}>
                            {selectedChatDetails && 'role' in selectedChatDetails ? selectedChatDetails.role : ''}
                            {selectedChatDetails && 'status' in selectedChatDetails && selectedChatDetails.status === 'online' && (
                              <span className={styles.onlineTextHeader}>Online</span>
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className={styles.chatHeaderActions}>
                    <button className={styles.headerAction} title="Voice Call">
                      <Phone size={18} />
                    </button>
                    <button className={styles.headerAction} title="Video Call">
                      <Video size={18} />
                    </button>
                    <button className={styles.headerAction} title="More Options">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
                
                <div className={styles.messageContainer}>
                  {messages.map((msg, index) => {
                    const isUserMessage = msg.senderId === 0;
                    const showDate = index === 0 || new Date(messages[index-1].timestamp).toDateString() !== new Date(msg.timestamp).toDateString();
                    
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className={styles.dateSeperator}>
                            <span>{formatDate(msg.timestamp)}</span>
                          </div>
                        )}
                        <div className={`${styles.message} ${isUserMessage ? styles.userMessage : styles.otherMessage}`}>
                          {!isUserMessage && (
                            <div className={styles.messageAvatar}>
                              {getInitials(msg.senderName)}
                            </div>
                          )}
                          <div className={styles.messageContent}>
                            {!isUserMessage && (
                              <div className={styles.messageSender}>{msg.senderName}</div>
                            )}
                            <div className={styles.messageText}>{msg.content}</div>
                            {msg.attachment && (
                              <div className={styles.attachment}>
                                {msg.attachment.type === 'image' ? (
                                  <div className={styles.imageAttachment}>
                                    <Image size={18} />
                                    <span>{msg.attachment.name}</span>
                                  </div>
                                ) : (
                                  <div className={styles.fileAttachment}>
                                    <File size={18} />
                                    <span>{msg.attachment.name}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className={styles.messageTime}>
                              {formatTime(msg.timestamp)}
                              {isUserMessage && <span className={styles.messageStatus}>✓✓</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messageEndRef} />
                </div>
                
                <div className={styles.inputContainer}>
                  <button 
                    className={styles.attachButton} 
                    title="Attach File"
                    onClick={triggerFileInput}
                  >
                    <Paperclip size={20} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className={styles.fileInput} 
                    onChange={handleFileChange}
                  />
                  <textarea
                    className={styles.messageInput}
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    rows={1}
                  />
                  <button 
                    className={styles.sendButton} 
                    onClick={handleSendMessage}
                    disabled={message.trim() === ""}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </>
            )}
            
            {!selectedChat && (
              <div className={styles.noSelection}>
                <MessageSquare size={48} />
                <h3>Select a chat to start messaging</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 