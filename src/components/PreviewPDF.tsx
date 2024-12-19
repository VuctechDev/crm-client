import { fileProcessorApiClient } from "@/lib/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import React, { useState, useEffect } from "react";

const PdfPreview = () => {
  const [pdfBase64, setPdfBase64] = useState(null);

  const fetchFile = async () => {
    fileProcessorApiClient
      .get("/get-pdf")
      .then((data) => {
        // const pdfDataUri = `data:application/pdf;base64,${data.pdf}`;
        // window.open(pdfDataUri, "_blank", "noopener,noreferrer");
        setPdfBase64(data.data.pdf);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };

  //   if (!pdfBase64) {
  //     return <div>Loading PDF...</div>;
  //   }
  //   window.open(pdfBase64, "_blank", "noopener,noreferrer");

  const pdfDataUri = `data:application/pdf;base64,${pdfBase64}`;

  return (
    <div>
      <h1>PDF Preview</h1>
      <Button onClick={() => fetchFile()} variant="contained">
        Preview
      </Button>
      <Dialog fullScreen open={!!pdfBase64}>
        <Box sx={{ p: "12px 20px" }}>
          <Button onClick={() => setPdfBase64(null)} variant="contained">
            Close
          </Button>
        </Box>

        <iframe
          src={pdfDataUri}
          title="PDF Preview"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      </Dialog>
    </div>
  );
};

export default PdfPreview;
