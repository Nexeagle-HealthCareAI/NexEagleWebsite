import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as signalR from "@microsoft/signalr";
import { v4 as uuidv4 } from "uuid";

// Pointing to local backend since the Azure API isn't updated with the latest fixes yet
const API_BASE_URL = "http://localhost:5176";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState(localStorage.getItem("nex_eagle_guest_name") || "");
  const [guestEmail, setGuestEmail] = useState(localStorage.getItem("nex_eagle_guest_email") || "");
  const [isRegistered, setIsRegistered] = useState(!!localStorage.getItem("nex_eagle_guest_name"));
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ senderType: string; messageText: string; sentAt: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && isRegistered && !connection) {
      const guestId = localStorage.getItem("nex_eagle_guest_id") || uuidv4();
      localStorage.setItem("nex_eagle_guest_id", guestId);

      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${API_BASE_URL}/chathub`)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    }
  }, [isOpen, isRegistered]);

  useEffect(() => {
    if (connection && connection.state === signalR.HubConnectionState.Disconnected) {
      connection.start()
        .then(() => {
          console.log("Connected to SignalR");
          setIsConnected(true);
          const guestId = localStorage.getItem("nex_eagle_guest_id");
          const gName = localStorage.getItem("nex_eagle_guest_name");
          const gEmail = localStorage.getItem("nex_eagle_guest_email");
          connection.invoke("JoinSession", guestId, gName, gEmail);

          connection.on("LoadHistory", (history) => {
            if (history.length > 0) {
              setSessionId(history[0].sessionId);
              setChatMessages(history);
            } else {
              // Initial greeting if no history
              setChatMessages([
                {
                  senderType: "Agent",
                  messageText: "Hi! 👋 I'm here to help. What can I assist you with today?",
                  sentAt: new Date().toISOString()
                }
              ]);
            }
          });

          connection.on("SessionJoined", (id) => {
            setSessionId(id);
          });

          connection.on("ReceiveMessage", (msg) => {
            setSessionId(msg.sessionId);
            setChatMessages(prev => [...prev, msg]);
          });

          connection.on("SessionClosed", () => {
            setChatMessages(prev => [
              ...prev,
              {
                senderType: "Agent",
                messageText: "This chat session has been closed. Thank you for reaching out!",
                sentAt: new Date().toISOString()
              }
            ]);
            setSessionId(null);
          });

          connection.onreconnecting(() => setIsConnected(false));
          connection.onreconnected(() => setIsConnected(true));
          connection.onclose(() => setIsConnected(false));
        })
        .catch(e => {
            console.error("Connection failed: ", e);
            setIsConnected(false);
        });
    }
  }, [connection]);

  const handleSendMessage = async () => {
    if (message.trim() && connection && isConnected) {
      const guestId = localStorage.getItem("nex_eagle_guest_id");
      try {
        await connection.invoke("SendMessage", sessionId || uuidv4(), message, "Guest", guestId);
        setMessage("");
      } catch (e) {
        console.error("Error sending message: ", e);
      }
    }
  };

  const quickActions = [
    "Schedule a demo",
    "See pricing",
    "Talk to sales",
    "Technical support"
  ];

  const handleQuickAction = (action: string) => {
    setMessage(action);
    // Auto send quick action
    if (connection && isConnected) {
       const guestId = localStorage.getItem("nex_eagle_guest_id");
       connection.invoke("SendMessage", sessionId || uuidv4(), action, "Guest", guestId);
       setMessage("");
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 flex flex-col transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[600px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-bold text-white">NexEagle Support</h3>
            <p className="text-xs text-blue-100">We're online • Reply in ~2 min</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {!isRegistered ? (
             <div className="flex-1 p-6 space-y-4 bg-slate-50 flex flex-col justify-center overflow-y-auto">
               <div className="text-center space-y-2 mb-4">
                 <h4 className="font-bold text-slate-800">Welcome to NexEagle Support</h4>
                 <p className="text-sm text-slate-500">Please enter your details to start chatting.</p>
               </div>
               <div className="space-y-3">
                 <Input 
                   placeholder="Your Name" 
                   value={guestName} 
                   onChange={e => setGuestName(e.target.value)} 
                   className="h-10"
                 />
                 <Input 
                   placeholder="Your Email (Optional)" 
                   type="email"
                   value={guestEmail} 
                   onChange={e => setGuestEmail(e.target.value)} 
                   className="h-10"
                 />
                 <Button 
                   onClick={() => {
                     if(guestName.trim()) {
                       localStorage.setItem("nex_eagle_guest_name", guestName.trim());
                       if (guestEmail.trim()) {
                           localStorage.setItem("nex_eagle_guest_email", guestEmail.trim());
                       }
                       setIsRegistered(true);
                     }
                   }}
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
                   disabled={!guestName.trim()}
                 >
                   Start Chat
                 </Button>
               </div>
             </div>
          ) : (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.senderType === "Guest" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl transform transition-all duration-300 hover:-translate-y-0.5 ${
                    msg.senderType === "Guest" ? "rounded-br-sm shadow-md" : "shadow-sm border border-slate-600 rounded-bl-sm"
                  }`}
                  style={{ 
                    backgroundColor: msg.senderType === "Guest" ? "#2563eb" : "#334155",
                    color: "white" 
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: "white" }}>{msg.messageText}</p>
                  <p className={`text-[10px] mt-1 opacity-80 ${msg.senderType === "Guest" ? "text-right" : "text-left"}`} style={{ color: "white" }}>
                    {new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Quick Actions */}
            {chatMessages.length <= 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-slate-600 px-2">Quick actions:</p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="w-full text-left px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-sm font-medium text-slate-700 hover:text-blue-600 transition-all"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 bg-white rounded-b-2xl shrink-0">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={isConnected ? "Type your message..." : "Connecting to support..."}
                className="flex-1 h-10 border-2 border-slate-200 focus:border-blue-500"
                disabled={!isConnected}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!isConnected || !message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              Our team typically responds in under 2 minutes.
            </p>
          </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LiveChat;
