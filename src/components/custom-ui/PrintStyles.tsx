export const PrintStyles = () => {
  return (
    <style jsx global>{`
      @media print {
        body {
          font-size: 12pt;
        }

        .print-hidden,
        button,
        .timeline-slider,
        .timeline-slider-vertical {
          display: none !important;
        }

        .timeline-event {
          break-inside: avoid;
          margin-bottom: 20px;
          page-break-inside: avoid;
        }

        h1 {
          font-size: 24pt;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 18pt;
        }

        .container {
          max-width: 100% !important;
          width: 100% !important;
        }

        .timeline-event-image {
          max-height: 300px;
          object-fit: contain !important;
        }
      }
    `}</style>
  );
};
