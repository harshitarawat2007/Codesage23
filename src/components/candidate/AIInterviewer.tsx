import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Lightbulb,
  Brain,
  Send
} from "lucide-react";
import { Input } from "@/components/ui/input";
import phoenixxAvatar from "@/assets/phoenixx-avatar.jpg";

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
  hintLevel?: 'nudge' | 'guide' | 'direction';
}

export function AIInterviewer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm Phoenixx, your AI interview partner. I see you're working on the Two Sum problem. This is a great opportunity to demonstrate your problem-solving approach. Take your time to understand the problem first. How would you like to start?",
      timestamp: new Date(),
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [sessionMetrics, setSessionMetrics] = useState({
    duration: "00:05:23",
    hintsUsed: 2,
    difficulty: "Medium",
    progress: 65
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a good start! You're thinking about using a hash map, which is definitely the right direction. Can you tell me what the time complexity would be with this approach?",
        "I noticed you're iterating through the array. That's correct! Now, how can we optimize this to avoid the nested loop?",
        "Excellent observation! You're recognizing the need for efficient lookups. What data structure would give you O(1) lookup time?",
        "I see you're considering the brute force approach first. That's actually a great way to start - solve it first, then optimize. What would be the time complexity of checking every pair?"
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Here you would integrate with speech recognition
  };

  const handleHintRequest = (level: 'nudge' | 'guide' | 'direction') => {
    const hints = {
      nudge: "Think about what information you need to store as you iterate through the array...",
      guide: "Consider using a hash map to store the numbers you've seen and their indices. For each new number, check if its complement exists in the map.",
      direction: "Here's the approach: Create a dictionary/hash map. For each number in the array, calculate target - number. If this complement exists in your map, you found the answer! Otherwise, store the current number and its index in the map."
    };
    
    const hintMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: hints[level],
      timestamp: new Date(),
      hintLevel: level
    };
    
    setMessages(prev => [...prev, hintMessage]);
    setSessionMetrics(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
  };

  const getHintIcon = (level?: string) => {
    switch (level) {
      case 'nudge': return '💡';
      case 'guide': return '🧭';
      case 'direction': return '🎯';
      default: return '';
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-full">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="glass-card h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={phoenixxAvatar} alt="Phoenixx AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <span className="text-lg">Phoenixx AI</span>
                  <Badge className="ml-2 bg-success text-success-foreground">
                    {isSpeaking ? "Speaking" : "Online"}
                  </Badge>
                </div>
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={isAudioEnabled ? "text-primary" : "text-muted-foreground"}
                >
                  {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleVoiceToggle}
                  className={isListening ? "bg-destructive text-destructive-foreground" : ""}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }`}>
                    {message.hintLevel && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs">{getHintIcon(message.hintLevel)}</span>
                        <Badge variant="secondary" className="text-xs">
                          {message.hintLevel} hint
                        </Badge>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="text-xs text-muted-foreground mt-2 flex items-center space-x-2">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.isVoice && <span>🎤</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <div className="flex items-center space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your response or ask a question..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Panel */}
      <div className="space-y-6">
        {/* Session Metrics */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>Session Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="font-medium">{sessionMetrics.duration}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Difficulty</span>
              <Badge variant="secondary">{sessionMetrics.difficulty}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Hints Used</span>
              <span className="font-medium">{sessionMetrics.hintsUsed}</span>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="font-medium">{sessionMetrics.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${sessionMetrics.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hint System */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-accent" />
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Get progressive hints to guide your solution
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleHintRequest('nudge')}
              className="w-full justify-start"
            >
              💡 Nudge - Gentle push in right direction
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleHintRequest('guide')}
              className="w-full justify-start"
            >
              🧭 Guide - More specific guidance
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleHintRequest('direction')}
              className="w-full justify-start"
            >
              🎯 Direction - Clear implementation path
            </Button>
          </CardContent>
        </Card>

        {/* Voice Features */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Voice Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground mb-3">
              Communicate naturally with Phoenixx
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Speech Recognition</span>
              <Badge variant={isListening ? "default" : "secondary"}>
                {isListening ? "Listening" : "Off"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">AI Voice Response</span>
              <Badge variant={isAudioEnabled ? "default" : "secondary"}>
                {isAudioEnabled ? "Enabled" : "Muted"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}