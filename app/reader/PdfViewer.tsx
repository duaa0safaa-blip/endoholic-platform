'use client';

import { useEffect, useState, useRef, useMemo } from 'react';

type Props = {
  file: string | File;
  pageNumber: number;
  onLoadSuccess: (arg: any) => void;
  className?: string;
};

export default function PdfViewer({ file, pageNumber, onLoadSuccess, className }: Props) {
  const [PDFComponents, setPDFComponents] = useState<any>(null);
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);
  const [watermark, setWatermark] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dynamically load react-pdf (client-only) and configure worker
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import('react-pdf');
        const { Document, Page, pdfjs } = mod as any;
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        if (mounted) setPDFComponents({ Document, Page });
      } catch (err) {
        console.error('Failed to load react-pdf in PdfViewer', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Fetch the PDF as ArrayBuffer so the URL is not directly exposed
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (typeof file === 'string') {
          const res = await fetch(file);
          const ab = await res.arrayBuffer();
          if (mounted) setFileData(ab);
        } else if (file instanceof File) {
          const ab = await file.arrayBuffer();
          if (mounted) setFileData(ab);
        }
      } catch (err) {
        console.error('Failed to fetch PDF file into memory', err);
      }
    })();
    return () => { mounted = false; };
  }, [file]);

  // Build a dynamic watermark (timestamp + short UA fragment) to discourage screenshots
  useEffect(() => {
    try {
      const ts = new Date().toLocaleString();
      const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent.split(' ').slice(0,3).join(' ') : 'web';
      setWatermark(`Endoholic — ${ts} — ${ua}`);
    } catch (e) {
      setWatermark('Endoholic');
    }
  }, []);

  // Prevent copy, selection and common shortcuts inside viewer container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleContext = (e: Event) => e.preventDefault();
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) {
        e.preventDefault();
      }
      if (e.key === 'PrintScreen') {
        e.preventDefault();
      }
    };
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();

    el.addEventListener('contextmenu', handleContext);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('copy', handleCopy as EventListener);

    return () => {
      el.removeEventListener('contextmenu', handleContext);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('copy', handleCopy as EventListener);
    };
  }, []);

  // Memoize the file prop: react-pdf/pdf.js transfers (detaches) the ArrayBuffer
  // to its worker on load, so a fresh { data: fileData } object literal on every
  // render would make it try to reload an already-detached buffer and crash.
  const fileProp = useMemo(
    () => (fileData ? { data: fileData } : undefined),
    [fileData]
  );

  if (!PDFComponents) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-800 gap-3 w-full">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium text-sm">Loading secure content...</p>
      </div>
    );
  }

  const { Document, Page } = PDFComponents;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Watermark overlay */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 z-40 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{transform:'rotate(-20deg)', opacity:0.06}} className="text-6xl font-extrabold text-white/90 tracking-wider">
            {watermark}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Document
          file={fileProp}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center p-12 text-slate-800 gap-3 w-full">
              <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-medium text-sm">Loading secure content...</p>
            </div>
          }
          error={<p className="text-rose-600 p-10 font-medium text-xs">Failed to load document.</p>}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className={className}
          />
        </Document>
      </div>

      {/* Prevent selection overlay (extra layer to reduce direct interactions) */}
      <div className="absolute inset-0 z-50" style={{pointerEvents:'none', userSelect:'none'}} />
    </div>
  );
}
