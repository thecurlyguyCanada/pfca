import React from 'react';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className = "" }) => {
    // Basic markdown parser for bold, italic, and lists
    const renderContent = (text: string) => {
        if (!text) return null;

        // Split by lines to handle lists
        const lines = text.split('\n');
        const elements: React.ReactNode[] = [];
        let currentList: React.ReactNode[] = [];

        const parseInline = (inlineText: string) => {
            const parts = inlineText.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
            return parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={i}>{part.slice(1, -1)}</em>;
                }
                if (part.startsWith('`') && part.endsWith('`')) {
                    return <code key={i} className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">{part.slice(1, -1)}</code>;
                }
                return part;
            });
        };

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();

            // Handle lists
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                currentList.push(<li key={index}>{parseInline(trimmedLine.slice(2))}</li>);
            } else {
                // If we were in a list, close it
                if (currentList.length > 0) {
                    elements.push(<ul key={`list-${index}`} className="list-disc pl-6 my-4 space-y-2">{currentList}</ul>);
                    currentList = [];
                }

                if (trimmedLine === '') {
                    elements.push(<br key={index} />);
                } else {
                    // Handle headers (very basic)
                    if (trimmedLine.startsWith('### ')) {
                        elements.push(<h3 key={index} className="text-xl font-bold mt-6 mb-3">{parseInline(trimmedLine.slice(4))}</h3>);
                    } else if (trimmedLine.startsWith('## ')) {
                        elements.push(<h2 key={index} className="text-2xl font-bold mt-8 mb-4">{parseInline(trimmedLine.slice(3))}</h2>);
                    } else {
                        elements.push(<p key={index} className="mb-4">{parseInline(line)}</p>);
                    }
                }
            }
        });

        // Close any remaining list
        if (currentList.length > 0) {
            elements.push(<ul key="list-last" className="list-disc pl-6 my-4 space-y-2">{currentList}</ul>);
        }

        return elements;
    };

    return (
        <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
            {renderContent(content)}
        </div>
    );
};
