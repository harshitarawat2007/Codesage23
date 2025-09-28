import { 
  Code2, 
  Brain, 
  Gauge, 
  MessageSquare, 
  PlayCircle, 
  Shield,
  Users,
  BarChart3,
  Mic,
  Lightbulb,
  Timer,
  Trophy
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Interviewer",
    description: "Phoenixx adapts difficulty in real-time and provides intelligent hints",
    color: "primary"
  },
  {
    icon: Code2,
    title: "Live Code Analysis",
    description: "Instant syntax checking, runtime error detection, and complexity analysis",
    color: "accent"
  },
  {
    icon: Gauge,
    title: "Performance Metrics",
    description: "Track execution time, memory usage, and algorithmic complexity",
    color: "primary"
  },
  {
    icon: Mic,
    title: "Voice Integration",
    description: "Think aloud with speech-to-text and voice-enabled AI responses",
    color: "accent"
  },
  {
    icon: Lightbulb,
    title: "Progressive Hints",
    description: "Nudge → Guide → Direction system to help without giving away solutions",
    color: "primary"
  },
  {
    icon: PlayCircle,
    title: "Session Playback",
    description: "Review complete coding journey with timeline and decision points",
    color: "accent"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards for recruiters with candidate insights",
    color: "primary"
  },
  {
    icon: Trophy,
    title: "Battle Mode",
    description: "Competitive coding duels with real-time scoring and AI commentary",
    color: "accent"
  },
  {
    icon: Shield,
    title: "Sandboxed Environment",
    description: "Secure code execution with Judge0 API integration",
    color: "primary"
  },
  {
    icon: Timer,
    title: "Dynamic Difficulty",
    description: "AI adjusts problem complexity based on candidate performance",
    color: "accent"
  },
  {
    icon: Users,
    title: "Multi-Role Support",
    description: "Tailored experiences for candidates, recruiters, and administrators",
    color: "primary"
  },
  {
    icon: MessageSquare,
    title: "Interactive Feedback",
    description: "Real-time suggestions for code optimization and best practices",
    color: "accent"
  }
];

export function FeatureGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need for modern coding interviews, powered by cutting-edge AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="metric-card group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                feature.color === 'primary' 
                  ? 'from-primary to-primary-light' 
                  : 'from-accent to-accent-light'
              } flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-center">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}