import React, { useState } from 'react'
import Modal from './Modal'
import { Document, Page, pdfjs } from 'react-pdf';
type Props = {
    isOpen: boolean,
    onClose:()=>void,
    resumePath:string
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const BASE_API_URL = import.meta.env.VITE_API_URL

const ResumeLayout = ({isOpen, onClose, resumePath}: Props) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const pdfUrl = `${BASE_API_URL}/${resumePath}`;

    function onDocumentLoadSuccess({ numPages }:{numPages:number}) {
        setNumPages(numPages);
    }
  return (
    <Modal onClose={onClose} isOpen={isOpen} title={"Cover Letter"}>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner">
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 max-h-[700px] overflow-y-auto">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>

      {/* Navigation Controls */}
      <div className="mt-4 flex items-center gap-4">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(prev => prev - 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium disabled:opacity-50 transition"
        >
          Previous
        </button>
        <p className="text-sm font-semibold text-gray-700">
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(prev => prev + 1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
    </Modal>
  )
}

export default ResumeLayout