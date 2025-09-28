import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";
import { CodeEditor } from "@/components/candidate/CodeEditor";
import { AIInterviewer } from "@/components/candidate/AIInterviewer";
import { 
  Code, 
  MessageSquare, 
  History, 
  Gamepad2, 
  Settings, 
  Play,
  Trophy,
  Clock,
  Star,
  TrendingUp
} from "lucide-react";

const mockUser = {
  name: "Alex Thompson",
  email: "alex@example.com",
  role: "candidate" as const,
  avatar: undefined
};

const mockStats = {
  totalInterviews: 12,
  averageScore: 87,
  bestScore: 94,
  totalDuration: "8h 34m",
  problemsSolved: 47,
  hintsUsed: 23
};

export default function CandidatePortal() {
  const [activeTab, setActiveTab] = useState("interview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back, {mockUser.name}!
          </h1>
          <p className="text-muted-foreground">
            Ready to showcase your coding skills? Choose your challenge below.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Interviews</span>
            </div>
            <div className="text-xl font-bold text-primary">{mockStats.totalInterviews}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Avg Score</span>
            </div>
            <div className="text-xl font-bold text-accent">{mockStats.averageScore}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Best Score</span>
            </div>
            <div className="text-xl font-bold text-primary">{mockStats.bestScore}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Total Time</span>
            </div>
            <div className="text-xl font-bold text-accent">{mockStats.totalDuration}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Problems</span>
            </div>
            <div className="text-xl font-bold text-primary">{mockStats.problemsSolved}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Hints Used</span>
            </div>
            <div className="text-xl font-bold text-accent">{mockStats.hintsUsed}</div>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="interview" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Interview</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="battle" className="flex items-center space-x-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Battle</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Interview Mode */}
          <TabsContent value="interview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <span>AI Interview Mode</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Experience a realistic coding interview with Phoenixx AI. Get real-time feedback, 
                      hints, and performance analysis.
                    </p>
                    <Button className="btn-hero w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start AI Interview
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Interview Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Difficulty</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Duration</span>
                      <Badge variant="secondary">45 min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Voice Mode</span>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Recent Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Last Score</span>
                        <span className="font-medium text-success">94/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Improvement</span>
                        <span className="font-medium text-success">+12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <AIInterviewer />
          </TabsContent>

          {/* Practice Mode */}
          <TabsContent value="practice" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-primary" />
                  <span>Practice Mode</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Sharpen your skills with our practice problems. No time pressure, 
                  full access to hints and detailed explanations.
                </p>
              </CardContent>
            </Card>
            
            <CodeEditor />
          </TabsContent>

          {/* Battle Mode */}
          <TabsContent value="battle" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                  <span>Battle Mode</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold mb-4">Coming Soon!</h3>
                  <p className="text-muted-foreground mb-6">
                    Challenge other developers in real-time coding duels. 
                    Compete for the leaderboard and prove your skills!
                  </p>
                  <Button disabled className="btn-hero">
                    <Trophy className="w-4 h-4 mr-2" />
                    Join Battle Queue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-primary" />
                  <span>Interview History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="glass-panel p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Technical Interview #{12 - index}</h4>
                        <p className="text-sm text-muted-foreground">
                          January {15 - index}, 2024 • 42 minutes • 3 problems
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-success text-success-foreground">
                          {94 - index * 3}/100
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Replay
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Interview Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Enable Voice Mode</span>
                        <Badge variant="default">Enabled</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Preferred Difficulty</span>
                        <Badge variant="secondary">Medium</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Programming Language</span>
                        <Badge variant="secondary">Python</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}