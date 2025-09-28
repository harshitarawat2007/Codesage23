import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { CandidateDashboard } from "@/components/manager/CandidateDashboard";
import { 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  TrendingUp,
  UserCheck,
  Clock,
  Star
} from "lucide-react";

const mockUser = {
  name: "Sarah Johnson",
  email: "sarah@company.com",
  role: "manager" as const,
  avatar: undefined
};

const mockMetrics = {
  totalCandidates: 247,
  activeInterviews: 12,
  avgScore: 86.2,
  avgDuration: "42m",
  topPerformers: 18,
  completedToday: 8
};

export default function ManagerPortal() {
  const [activeTab, setActiveTab] = useState("candidates");

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Manager Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor candidate performance and make data-driven hiring decisions
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Total</span>
            </div>
            <div className="text-xl font-bold text-primary">{mockMetrics.totalCandidates}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Active</span>
            </div>
            <div className="text-xl font-bold text-accent">{mockMetrics.activeInterviews}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Avg Score</span>
            </div>
            <div className="text-xl font-bold text-primary">{mockMetrics.avgScore}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <div className="text-xl font-bold text-accent">{mockMetrics.avgDuration}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <UserCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Top Tier</span>
            </div>
            <div className="text-xl font-bold text-primary">{mockMetrics.topPerformers}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Today</span>
            </div>
            <div className="text-xl font-bold text-accent">{mockMetrics.completedToday}</div>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="candidates" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Candidates</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Candidates View */}
          <TabsContent value="candidates">
            <CandidateDashboard />
          </TabsContent>

          {/* Analytics View */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Performance charts coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Skills Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Algorithms & Data Structures</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">System Design</span>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '72%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Code Quality</span>
                        <span className="text-sm font-medium">91%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '91%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Interview Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 glass-panel rounded-xl">
                    <div className="text-3xl font-bold text-success mb-2">94%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                  
                  <div className="text-center p-6 glass-panel rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2">38m</div>
                    <div className="text-sm text-muted-foreground">Avg Interview Time</div>
                  </div>
                  
                  <div className="text-center p-6 glass-panel rounded-xl">
                    <div className="text-3xl font-bold text-accent mb-2">2.3</div>
                    <div className="text-sm text-muted-foreground">Avg Hints per Session</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports View */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 rounded-xl">
                    <h4 className="font-semibold mb-3">Candidate Performance Report</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive analysis of individual candidate performance with detailed metrics
                    </p>
                    <button className="btn-hero w-full">Generate Report</button>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-xl">
                    <h4 className="font-semibold mb-3">Team Analytics Summary</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Aggregate insights and trends across all interviews and candidates
                    </p>
                    <button className="btn-hero w-full">Generate Summary</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings View */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Interview Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Default Settings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 glass-panel rounded-lg">
                        <span className="text-sm">Interview Duration</span>
                        <span className="text-sm font-medium">45 minutes</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-panel rounded-lg">
                        <span className="text-sm">Default Difficulty</span>
                        <span className="text-sm font-medium">Medium</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-panel rounded-lg">
                        <span className="text-sm">Voice Recording</span>
                        <span className="text-sm font-medium">Enabled</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Notification Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 glass-panel rounded-lg">
                        <span className="text-sm">Interview Completed</span>
                        <span className="text-sm font-medium">Email + In-app</span>
                      </div>
                      <div className="flex justify-between items-center p-3 glass-panel rounded-lg">
                        <span className="text-sm">Weekly Reports</span>
                        <span className="text-sm font-medium">Email</span>
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