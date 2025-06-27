import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Code, Eye } from "lucide-react";

interface CodeSnippetProps {
  title: string;
  code: string;
  language?: string;
  description?: string;
  highlights?: string[];
}

export const CodeSnippet = ({
  title,
  code,
  language = "typescript",
  description,
  highlights = [],
}: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const formatCode = (code: string) => {
    // Simple syntax highlighting for key React concepts
    return code
      .replace(
        /(useState|useEffect|useCallback|useMemo|useReducer|useRef|useContext)/g,
        '<span style="color: #2563eb; font-weight: 600;">$1</span>',
      )
      .replace(
        /(function|const|let|var|return|if|else|for|while|import|export|from)/g,
        '<span style="color: #7c3aed; font-weight: 600;">$1</span>',
      )
      .replace(
        /(React|ReactDOM|Component|Props|State)/g,
        '<span style="color: #059669; font-weight: 600;">$1</span>',
      )
      .replace(
        /\/\*(.*?)\*\//g,
        '<span style="color: #6b7280; font-style: italic;">/*$1*/</span>',
      )
      .replace(
        /\/\/(.*?)$/gm,
        '<span style="color: #6b7280; font-style: italic;">//$1</span>',
      );
  };

  return (
    <div className="bg-gray-50 rounded-lg border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white border-b">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-gray-600" />
          <span className="font-medium text-sm">{title}</span>
          <Badge variant="outline" className="text-xs">
            {language}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowCode(!showCode)}
            variant="ghost"
            size="sm"
            className="h-7 px-2"
          >
            <Eye className="h-3 w-3 mr-1" />
            {showCode ? "Hide" : "Show"} Code
          </Button>
          {showCode && (
            <Button
              onClick={copyToClipboard}
              variant="ghost"
              size="sm"
              className="h-7 px-2"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="p-3 bg-blue-50 border-b">
          <p className="text-sm text-blue-800">{description}</p>
        </div>
      )}

      {/* Key Highlights */}
      {highlights.length > 0 && (
        <div className="p-3 bg-yellow-50 border-b">
          <p className="text-xs font-medium text-yellow-800 mb-2">
            Key Concepts:
          </p>
          <div className="flex flex-wrap gap-1">
            {highlights.map((highlight, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Code Display */}
      {showCode && (
        <div className="relative">
          <pre className="p-4 text-sm overflow-x-auto bg-gray-900 text-gray-100">
            <code
              dangerouslySetInnerHTML={{
                __html: formatCode(code),
              }}
            />
          </pre>
        </div>
      )}
    </div>
  );
};
