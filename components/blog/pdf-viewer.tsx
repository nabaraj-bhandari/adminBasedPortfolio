"use client";

interface PdfViewerProps {
  pdfs: Array<{ title: string; url: string }>;
}

export function PdfViewer({ pdfs }: PdfViewerProps) {
  const getEmbedUrl = (url: string): string => {
    // Extract file ID from Google Drive URL
    const fileIdMatch = url.match(/\/file\/d\/([^/]+)/);
    if (!fileIdMatch) return url;

    const fileId = fileIdMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  };

  if (!pdfs?.length) return null;

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Attached Documents</h3>
      <div className="grid gap-6">
        {pdfs.map((pdf, index) => {
          const embedUrl = getEmbedUrl(pdf.url);

          return (
            <div key={index} className="space-y-2">
              <h4 className="text-lg font-medium">{pdf.title}</h4>
              <div className="relative w-full aspect-[1] rounded-lg overflow-hidden border border-border">
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay"
                  loading="lazy"
                  title={`PDF: ${pdf.title}`}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
