'use client';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatMessage {
  chatId: number;
  ideaId: number;
  sender: string;
  content: string;
  replyTo?: number | null;
}

interface Props {
  ideaId: number;
  backendActor: any; 
}

export default function DiscussionSection({ ideaId, backendActor }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const fetchMessages = async () => {
    const res = await backendActor.getMessagesByIdea(ideaId);
    console.log('Fetched messages:', res);
    setMessages(res);
  }; 

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyMessage('');
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await backendActor.createMessageAsParent(newMessage, ideaId);
    setNewMessage('');
    fetchMessages();
  };

  const sendReply = async () => {
    if (!replyMessage.trim() || !replyingTo) return;
    await backendActor.createMessageAsReply(replyMessage, replyingTo);
    setReplyMessage('');
    setReplyingTo(null);
    fetchMessages();
  };

  const handleReply = (chatId: number) => {
    setReplyingTo(chatId);
  };

  
  const renderMessage = (msg: ChatMessage, isReply = false) => {
    const replies = messages.filter(m => m.replyTo === msg.chatId);
    
    return (
      <div key={msg.chatId} className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}`}>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-800">@{String(msg.sender)}</span>
          </div>
          <div className="text-gray-700 mb-3">{msg.content}</div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button 
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              onClick={() => handleReply(msg.chatId)}
            >
              <MessageCircle size={16} />
              <span>Reply</span>
            </button>
          </div>
          
          {replyingTo === msg.chatId && (
            <div className="mt-3 pl-4 border-l-2 border-blue-500">
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder={`Reply to @${String(msg.sender)}...`}
                  value={replyMessage}
                  onChange={e => setReplyMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && sendReply()}
                />
                <button
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  onClick={sendReply}
                >
                  Reply
                </button>
                <button
                  className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  onClick={cancelReply}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        
        {replies.length > 0 && (
          <div className="mt-2 space-y-2">
            {replies.map(reply => renderMessage(reply, true))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    fetchMessages();
  }, [ideaId]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm h-[93vh] flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800">Discussion</h3>
      </div>

      <div className="px-6 py-4 space-y-4 flex-1 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.chatId} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-800">@{String(msg.sender)}</span>
            </div>
            
            {replyingTo === msg.chatId && (
              <div className="mt-3 pl-4 border-l-2 border-blue-500">
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder={`Reply to @${String(msg.sender)}...`}
                    value={replyMessage}
                    onChange={e => setReplyMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendReply()}
                  />
                  <button
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    onClick={sendReply}
                  >
                    Reply
                  </button>
                  <button
                    className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                    onClick={cancelReply}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="text-gray-700 mb-3">{msg.content}</div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <button 
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                onClick={() => handleReply(msg.chatId)}
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Comment"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}