import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PdfPageThumbnail } from './PdfPageThumbnail';

interface SortablePdfPageThumbnailProps {
    id: string; // Unique ID for dnd-kit (e.g., "page-0")
    pdfJsDoc: any;
    pageIndex: number;
    width?: number;
}

export const SortablePdfPageThumbnail: React.FC<SortablePdfPageThumbnailProps> = ({
    id,
    pdfJsDoc,
    pageIndex,
    width = 200
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'transform 200ms ease',
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.9 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none' // Required for pointer sensors
    };

    // Custom drag handle style for better UX, or just wrap the whole thing
    // We'll wrap the whole thumbnail to be draggable
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`relative rounded-xl border-2 transition-all duration-200 ${isDragging ? 'border-canada-red shadow-2xl scale-105 rotate-2' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
        >
            <div className={`bg-white dark:bg-gray-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-shadow ${isDragging ? 'shadow-xl' : ''}`} style={{ width: 'fit-content' }}>
                <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Page {pageIndex + 1}</span>
                    <div className={`text-gray-300 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors ${isDragging ? 'text-canada-red' : ''}`}>
                        {/* Drag Handle Icon - Optional, whole card is draggable */}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1" /><circle cx="9" cy="5" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="19" r="1" /></svg>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 pointer-events-none">
                    {/* Pointer events none on inner thumbnail to prevent interference with drag listeners */}
                    <PdfPageThumbnail
                        pdfJsDoc={pdfJsDoc}
                        pageIndex={pageIndex}
                        isSelected={false}
                        onClick={() => { }}
                        mode="rotate" // Use rotate mode just to show clean preview without delete overlay
                        width={width}
                    />
                </div>
            </div>
        </div>
    );
};
