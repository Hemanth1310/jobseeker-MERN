import React, { useState } from 'react'
import Modal from './Modal'
import { Document, Page, pdfjs } from 'react-pdf';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    resumePath: string
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const BASE_API_URL = import.meta.env.VITE_API_URL

const ResumeLayout = ({ isOpen, onClose, resumePath }: Props) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const pdfUrl = `${BASE_API_URL}/${resumePath}`;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} title={"Resume"}>
            {/* Outer Wrapper: Changed to flex-col and added centering */}
            <div className="flex flex-col items-center bg-white max-h-fit p-4 rounded-xl shadow-md border border-gray-100 w-full max-w-2xl mx-auto">
                
                {/* Scrollable Container just for the PDF Canvas */}
                <div className="w-full overflow-y-auto flex justify-center mb-4 min-h-[400px]">
                    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page 
                            pageNumber={pageNumber} 
                            renderTextLayer={false} 
                            renderAnnotationLayer={false} 
                            className="max-w-full h-auto"
                        />
                    </Document>
                </div>
                
                {/* Pagination Controls: Moved safely outside <Document> */}
                <div className="flex items-center gap-4 border-t border-gray-100 pt-3 w-full justify-center">
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(prev => prev - 1)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-gray-700"
                    >
                        Previous
                    </button>
                    <p className="text-sm font-semibold text-gray-700 select-none">
                        Page {pageNumber} of {numPages || 1}
                    </p>
                    <button
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(prev => prev + 1)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition hover:bg-gray-700"
                    >
                        Next
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default ResumeLayout