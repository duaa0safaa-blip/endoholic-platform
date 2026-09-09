'use client';

import { useEffect, useMemo, useState, useRef } from 'react';

type Props = {
  file: string | File;
  pageNumber: number;
  onLoadSuccess: (arg: any) => void;
  watermarkIdentity?: string;
  className?: string;
};

export default function PdfViewer({ file, pageNumber, onLoadSuccess, watermarkIdentity, className }: Props) {
  const [PDFComponents, setPDFComponents] = useState<any>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [pageWidth, setPageWidth] = useState<number>();
  const watermark = useMemo(() => {
    const ts = new Date().toLocaleString();
    const ua = typeof navigator !== 'undefined'
      ? navigator.userAgent.split(' ').slice(0, 3).join(' ')
      : 'web';
    return `${watermarkIdentity ? `${watermarkIdentity} — ` : ''}Endoholic — ${ts} — ${ua}`;
  }, [watermarkIdentity]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      const availableWidth = element.clientWidth;
      if (availableWidth > 0) setPageWidth(Math.max(240, availableWidth - 16));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, [PDFComponents]);

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

  // Use a Blob URL so react-pdf cannot detach a reusable ArrayBuffer.
  useEffect(() => {
    let mounted = true;
    let objectUrl: string | null = null;
    (async () => {
      try {
        if (typeof file === 'string') {
          const res = await fetch(file);
          if (!res.ok) throw new Error(`PDF request failed with ${res.status}`);
          objectUrl = URL.createObjectURL(await res.blob());
          if (mounted) setFileUrl(objectUrl);
        } else if (file instanceof File) {
          objectUrl = URL.createObjectURL(file);
          if (mounted) setFileUrl(objectUrl);
        }
      } catch (err) {
        console.error('Failed to fetch PDF file into memory', err);
      }
    })();
    return () => {
      mounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

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
    <div ref={containerRef} className="relative w-full min-w-0 overflow-hidden">
      {/* Watermark overlay */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 z-40 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ transform: 'rotate(-20deg)', opacity: 0.06 }} className="max-w-full break-words px-4 text-center text-2xl sm:text-6xl font-extrabold text-white/90 tracking-wider">
            {watermark}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Document
          file={fileUrl ?? undefined}
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
            width={pageWidth}
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
