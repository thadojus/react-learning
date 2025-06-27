import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Circle,
  BookOpen,
  Target,
  Award,
  RotateCcw,
} from "lucide-react";

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  category: "Beginner" | "Intermediate" | "Advanced";
  concepts: string[];
}

interface ProgressTrackerProps {
  topics: LearningTopic[];
  currentTopicId?: string;
}

export const ProgressTracker = ({
  topics,
  currentTopicId,
}: ProgressTrackerProps) => {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    new Set(),
  );

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("react-master-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedTopics(new Set(parsed));
      } catch (error) {
        console.error("Failed to load progress:", error);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "react-master-progress",
      JSON.stringify(Array.from(completedTopics)),
    );
  }, [completedTopics]);

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const resetProgress = () => {
    setCompletedTopics(new Set());
    localStorage.removeItem("react-master-progress");
  };

  const getStats = () => {
    const total = topics.length;
    const completed = completedTopics.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const byCategory = topics.reduce(
      (acc, topic) => {
        const isCompleted = completedTopics.has(topic.id);
        acc[topic.category].total++;
        if (isCompleted) acc[topic.category].completed++;
        return acc;
      },
      {
        Beginner: { completed: 0, total: 0 },
        Intermediate: { completed: 0, total: 0 },
        Advanced: { completed: 0, total: 0 },
      },
    );

    return { total, completed, percentage, byCategory };
  };

  const stats = getStats();

  const categoryColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Learning Progress</CardTitle>
          </div>
          <Button
            onClick={resetProgress}
            variant="ghost"
            size="sm"
            className="text-gray-500"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        <CardDescription>
          Track your React learning journey across all topics
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">
              Overall Progress
            </span>
            <Badge variant="default" className="bg-primary">
              {stats.percentage}%
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {stats.completed} of {stats.total} topics completed
          </div>
        </div>

        {/* Category Progress */}
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(stats.byCategory).map(([category, data]) => (
            <div key={category} className="text-center p-3 bg-gray-50 rounded">
              <div className="text-lg font-bold">
                {data.completed}/{data.total}
              </div>
              <div className="text-xs text-gray-600">{category}</div>
            </div>
          ))}
        </div>

        {/* Achievement Badges */}
        {stats.percentage >= 100 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">
                🎉 React Master Achieved!
              </span>
            </div>
          </div>
        )}

        {stats.percentage >= 50 && stats.percentage < 100 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">
                Halfway There! Keep Going!
              </span>
            </div>
          </div>
        )}

        {/* Topic List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">
            Topics Checklist:
          </h4>
          {topics.map((topic) => {
            const isCompleted = completedTopics.has(topic.id);
            const isCurrent = currentTopicId === topic.id;

            return (
              <div
                key={topic.id}
                className={`flex items-start space-x-3 p-2 rounded border transition-colors ${
                  isCurrent
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <button
                  onClick={() => toggleTopicCompletion(topic.id)}
                  className="mt-0.5 text-gray-400 hover:text-green-500 transition-colors"
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-medium ${
                        isCompleted
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {topic.title}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${categoryColors[topic.category]}`}
                    >
                      {topic.category}
                    </Badge>
                    {isCurrent && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      isCompleted ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {topic.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {topic.concepts.slice(0, 3).map((concept, index) => (
                      <span
                        key={index}
                        className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-600"
                      >
                        {concept}
                      </span>
                    ))}
                    {topic.concepts.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{topic.concepts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
