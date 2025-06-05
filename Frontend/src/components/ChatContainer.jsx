import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedContact, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedContact._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedContact._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({
            behavior: "smooth"
      });
    }
    
  }, [messages]);

  if (isMessagesLoading) { 
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    ) 
  }
  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        { messages.map((message) => (
          <div  key={message._id}
                className={`chat ${message.senderId === selectedContact._id ? "chat-start" : "chat-end"}`}
                ref={messageEndRef}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={message.senderId === selectedContact._id ? selectedContact.profilePic : authUser.profilePic}
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50">{formatMessageTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble chat-bubble-neutral rounded-md flex flex-col">
              {message.image && (
                <img src={message.image}
                      className="sm:max-w-[200px] rounded-md mb-2"/>
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer