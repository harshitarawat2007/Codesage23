import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Download, 
  Clock, 
  Target, 
  Brain, 
  Code, 
  TrendingUp,
  Calendar,
  Star,
  Filter
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  position: string;
  overallScore: number;
  status: 'completed' | 'in-progress' | 'scheduled';
  lastActivity: string;
  sessions: Array<{
    id: string;
    date: string;
    duration: string;
    difficulty: string;
    problemsSolved: number;
    hintsUsed: number;
    codeQuality: number;
    problemSolving: number;
  }>;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    position: 'Senior Software Engineer',
    overallScore: 87,
    status: 'completed',
    lastActivity: '2 hours ago',
    sessions: [
      {
        id: 's1',
        date: '2024-01-15',
        duration: '45m',
        difficulty: 'Hard',
        problemsSolved: 3,
        hintsUsed: 2,
        codeQuality: 85,
        problemSolving: 90
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    position: 'Frontend Developer',
    overallScore: 92,
    status: 'completed',
    lastActivity: '1 day ago',
    sessions: [
      {
        id: 's2',
        date: '2024-01-14',
        duration: '38m',
        difficulty: 'Medium',
        problemsSolved: 4,
        hintsUsed: 1,
        codeQuality: 95,
        problemSolving: 88
      }
    ]
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael@example.com',
    position: 'Full Stack Developer',
    overallScore: 79,
    status: 'in-progress',
    lastActivity: 'Active now',
    sessions: [
      {
        id: 's3',
        date: '2024-01-15',
        duration: '22m',
        difficulty: 'Medium',
        problemsSolved: 2,
        hintsUsed: 4,
        codeQuality: 75,
        problemSolving: 82
      }
    ]
  }
];

export function CandidateDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'scheduled'>('all');

  const filteredCandidates = mockCandidates.filter(candidate => 
    filter === 'all' || candidate.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'scheduled': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  if (selectedCandidate) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setSelectedCandidate(null)}>
            ← Back to Candidates
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Replay Session
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Candidate Details */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={selectedCandidate.avatar} alt={selectedCandidate.name} />
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-lg">
                  {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                <p className="text-muted-foreground">{selectedCandidate.position}</p>
                <p className="text-sm text-muted-foreground">{selectedCandidate.email}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  <span className={getScoreColor(selectedCandidate.overallScore)}>
                    {selectedCandidate.overallScore}
                  </span>
                  <span className="text-muted-foreground text-lg">/100</span>
                </div>
                <Badge className={getStatusColor(selectedCandidate.status)}>
                  {selectedCandidate.status}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Session Details */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="code-review">Code Review</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="metric-card">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">Duration</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {selectedCandidate.sessions[0]?.duration || 'N/A'}
                </div>
              </Card>

              <Card className="metric-card">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="font-medium">Problems Solved</span>
                </div>
                <div className="text-2xl font-bold text-accent">
                  {selectedCandidate.sessions[0]?.problemsSolved || 0}
                </div>
              </Card>

              <Card className="metric-card">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="w-5 h-5 text-primary" />
                  <span className="font-medium">Hints Used</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {selectedCandidate.sessions[0]?.hintsUsed || 0}
                </div>
              </Card>

              <Card className="metric-card">
                <div className="flex items-center space-x-2 mb-3">
                  <Code className="w-5 h-5 text-accent" />
                  <span className="font-medium">Code Quality</span>
                </div>
                <div className="text-2xl font-bold text-accent">
                  {selectedCandidate.sessions[0]?.codeQuality || 0}%
                </div>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Problem Solving</span>
                    <span className="font-medium">{selectedCandidate.sessions[0]?.problemSolving || 0}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedCandidate.sessions[0]?.problemSolving || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Code Quality</span>
                    <span className="font-medium">{selectedCandidate.sessions[0]?.codeQuality || 0}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedCandidate.sessions[0]?.codeQuality || 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code-review">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Code Review & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="glass-panel p-4">
                    <h4 className="font-medium mb-2">Two Sum Solution</h4>
                    <pre className="code-editor p-4 text-sm">
{`def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`}
                    </pre>
                    <div className="mt-3 flex items-center space-x-4">
                      <Badge className="bg-success text-success-foreground">Time: O(n)</Badge>
                      <Badge className="bg-success text-success-foreground">Space: O(n)</Badge>
                      <Badge className="bg-success text-success-foreground">Clean Code</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      <span>Excellent problem decomposition</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      <span>Clean, readable code structure</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-success rounded-full"></span>
                      <span>Optimal time complexity solutions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-warning rounded-full"></span>
                      <span>Consider edge cases earlier</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-warning rounded-full"></span>
                      <span>Add more descriptive variable names</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Session Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 glass-panel rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-medium">Session Started</span>
                      <span className="text-sm text-muted-foreground ml-2">00:00</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 glass-panel rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-medium">First Solution Attempt</span>
                      <span className="text-sm text-muted-foreground ml-2">12:30</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 glass-panel rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-medium">Hint Requested</span>
                      <span className="text-sm text-muted-foreground ml-2">25:15</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 glass-panel rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-medium">Solution Completed</span>
                      <span className="text-sm text-muted-foreground ml-2">45:00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Candidates</h1>
          <p className="text-muted-foreground">Manage and review candidate performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="btn-hero">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="metric-card">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-medium">Total Interviews</span>
          </div>
          <div className="text-2xl font-bold text-primary">247</div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center space-x-2 mb-3">
            <Star className="w-5 h-5 text-accent" />
            <span className="font-medium">Avg Score</span>
          </div>
          <div className="text-2xl font-bold text-accent">86.2</div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-medium">Avg Duration</span>
          </div>
          <div className="text-2xl font-bold text-primary">42m</div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-5 h-5 text-accent" />
            <span className="font-medium">This Week</span>
          </div>
          <div className="text-2xl font-bold text-accent">23</div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="grid gap-4">
            {filteredCandidates.map((candidate) => (
              <Card 
                key={candidate.id} 
                className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{candidate.name}</h3>
                        <p className="text-muted-foreground">{candidate.position}</p>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">
                          <span className={getScoreColor(candidate.overallScore)}>
                            {candidate.overallScore}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Score</div>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={`${getStatusColor(candidate.status)} mb-2`}>
                          {candidate.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{candidate.lastActivity}</div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        View Details →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}