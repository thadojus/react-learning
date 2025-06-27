import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Lightbulb, Target, AlertCircle } from "lucide-react";

interface TheorySectionProps {
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  children: ReactNode;
}

interface ConceptCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  type?: "definition" | "concept" | "important" | "tip";
}

interface DefinitionProps {
  term: string;
  children: ReactNode;
}

interface KeyPointsProps {
  points: string[];
}

interface WhenToUseProps {
  scenarios: string[];
}

export const TheorySection = ({
  title,
  description,
  level,
  children,
}: TheorySectionProps) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge className={levelColors[level]}>{level}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none">
        {children}
      </CardContent>
    </Card>
  );
};

export const ConceptCard = ({
  title,
  description,
  icon,
  type = "concept",
}: ConceptCardProps) => {
  const typeStyles = {
    definition: "bg-blue-50 border-blue-200",
    concept: "bg-green-50 border-green-200",
    important: "bg-red-50 border-red-200",
    tip: "bg-yellow-50 border-yellow-200",
  };

  const typeIcons = {
    definition: <BookOpen className="h-4 w-4 text-blue-600" />,
    concept: <Lightbulb className="h-4 w-4 text-green-600" />,
    important: <AlertCircle className="h-4 w-4 text-red-600" />,
    tip: <Target className="h-4 w-4 text-yellow-600" />,
  };

  return (
    <div className={`p-4 rounded-lg border ${typeStyles[type]}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">{icon || typeIcons[type]}</div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
          <p className="text-gray-700 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const Definition = ({ term, children }: DefinitionProps) => (
  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg mb-4">
    <h4 className="font-semibold text-indigo-900 mb-2">📖 {term}</h4>
    <div className="text-indigo-800">{children}</div>
  </div>
);

export const KeyPoints = ({ points }: KeyPointsProps) => (
  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 mb-4">
    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
      <Target className="h-4 w-4 mr-2" />
      Key Points to Remember
    </h4>
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="flex items-start text-emerald-800">
          <span className="text-emerald-600 mr-2">•</span>
          <span className="text-sm">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const WhenToUse = ({ scenarios }: WhenToUseProps) => (
  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-4">
    <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
      <Lightbulb className="h-4 w-4 mr-2" />
      When to Use This
    </h4>
    <ul className="space-y-2">
      {scenarios.map((scenario, index) => (
        <li key={index} className="flex items-start text-amber-800">
          <span className="text-amber-600 mr-2">✓</span>
          <span className="text-sm">{scenario}</span>
        </li>
      ))}
    </ul>
  </div>
);
