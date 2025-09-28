import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Square, 
  RotateCcw, 
  Clock, 
  MemoryStick, 
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

interface CodeEditorProps {
  problem?: {
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    examples: Array<{
      input: string;
      output: string;
      explanation?: string;
    }>;
  };
}

export function CodeEditor({ problem }: CodeEditorProps) {
  const [code, setCode] = useState(`def solution(nums, target):
    # Write your solution here
    pass`);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [metrics, setMetrics] = useState({
    runtime: "0ms",
    memory: "0MB",
    complexity: "O(1)",
    testsPassed: 0,
    totalTests: 3
  });

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Test Case 1: ✓ Passed\nTest Case 2: ✓ Passed\nTest Case 3: ✗ Failed\n\nExpected: [2, 7]\nActual: [2, 8]");
      setMetrics({
        runtime: "142ms",
        memory: "12.4MB",
        complexity: "O(n)",
        testsPassed: 2,
        totalTests: 3
      });
    }, 2000);
  };

  const difficultyColors = {
    easy: "bg-success text-success-foreground",
    medium: "bg-warning text-warning-foreground",
    hard: "bg-destructive text-destructive-foreground"
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* Problem Description */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{problem?.title || "Two Sum"}</CardTitle>
            <Badge className={`${difficultyColors[problem?.difficulty || 'medium']} px-3 py-1`}>
              {problem?.difficulty || 'Medium'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-muted-foreground leading-relaxed">
              {problem?.description || "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Examples</h4>
            <div className="space-y-4">
              {(problem?.examples || [{
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
              }]).map((example, index) => (
                <div key={index} className="glass-panel p-4 space-y-2">
                  <div>
                    <span className="font-medium text-sm">Input: </span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{example.input}</code>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Output: </span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{example.output}</code>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="font-medium text-sm">Explanation: </span>
                      <span className="text-sm text-muted-foreground">{example.explanation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Editor and Results */}
      <div className="space-y-6">
        {/* Editor */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Code Editor</CardTitle>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="bg-success hover:bg-success/90"
                >
                  {isRunning ? (
                    <Square className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isRunning ? "Running..." : "Run"}
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-editor w-full h-64 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your code here..."
            />
          </CardContent>
        </Card>

        {/* Results and Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {/* Performance Metrics */}
          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">Runtime</span>
            </div>
            <div className="text-2xl font-bold text-primary">{metrics.runtime}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-3">
              <MemoryStick className="w-5 h-5 text-accent" />
              <span className="font-medium">Memory</span>
            </div>
            <div className="text-2xl font-bold text-accent">{metrics.memory}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-medium">Complexity</span>
            </div>
            <div className="text-2xl font-bold text-primary">{metrics.complexity}</div>
          </Card>

          <Card className="metric-card">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="font-medium">Tests</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {metrics.testsPassed}/{metrics.totalTests}
            </div>
          </Card>
        </div>

        {/* Output Console */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <span>Output</span>
              {output && (
                <Badge variant={metrics.testsPassed === metrics.totalTests ? "default" : "destructive"}>
                  {metrics.testsPassed === metrics.totalTests ? "All Passed" : "Some Failed"}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono h-32 overflow-auto">
              {output || "Click 'Run' to see output..."}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}