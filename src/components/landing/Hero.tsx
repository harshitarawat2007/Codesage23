import { Button } from "@/components/ui/button";
import { Play, Code, Brain, Users } from "lucide-react";
import phoenixxAvatar from "@/assets/phoenixx-avatar.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Coding
              <span className="gradient-text block">
                with AI Guidance
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Experience next-generation coding interviews with Phoenixx AI. 
              Real-time code analysis, intelligent hints, and comprehensive 
              performance metrics for both candidates and recruiters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="btn-hero group">
                <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Interview
              </Button>
              <Button size="lg" variant="outline" className="btn-glass">
                <Users className="w-5 h-5 mr-2" />
                For Recruiters
              </Button>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
              <div className="glass-panel px-4 py-2 flex items-center space-x-2">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Real-time Analysis</span>
              </div>
              <div className="glass-panel px-4 py-2 flex items-center space-x-2">
                <Brain className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">AI Interviewer</span>
              </div>
              <div className="glass-panel px-4 py-2 flex items-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Team Analytics</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Phoenixx Preview */}
          <div className="relative">
            <div className="glass-card p-8 animate-float">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={phoenixxAvatar}
                  alt="Phoenixx AI"
                  className="w-16 h-16 rounded-full border-2 border-primary animate-glow"
                />
                <div>
                  <h3 className="font-semibold text-lg">Meet Phoenixx</h3>
                  <p className="text-muted-foreground">Your AI Interview Partner</p>
                </div>
              </div>
              
              <div className="chat-bubble-ai">
                <p className="text-sm">
                  "Hello! I'm ready to guide you through your coding interview. 
                  Let's start with a medium difficulty algorithm problem. 
                  Remember, I'm here to help you succeed!"
                </p>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>🎤 Voice enabled</span>
                <span>⚡ Real-time feedback</span>
                <span>🧠 Adaptive difficulty</span>
              </div>
            </div>
            
            {/* Floating Metrics */}
            <div className="absolute -top-6 -right-6 glass-panel p-4 animate-pulse">
              <div className="text-xs text-muted-foreground mb-1">Runtime</div>
              <div className="text-lg font-bold text-success">O(n log n)</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-panel p-4 animate-pulse">
              <div className="text-xs text-muted-foreground mb-1">Memory</div>
              <div className="text-lg font-bold text-accent">12.4 MB</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}