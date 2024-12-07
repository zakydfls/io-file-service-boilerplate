import pdfParse from "pdf-parse";

export interface PDFResponse {
  text?: string;
  error?: string;
}

export const handlePDFRead = async (body: any): Promise<PDFResponse> => {
  if (!body || !body.file) {
    return { error: "No file uploaded!" };
  }

  try {
    console.log("Type of body.file:", typeof body.file);
    console.log("File details:", body.file);

    const arrayBuffer = await body.file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const pdfData = await pdfParse(pdfBuffer);

    return {
      text: pdfData.text,
    };
  } catch (error) {
    console.error("Error parsing PDF:", (error as Error).message);
    return { error: "Failed to process the PDF file." };
  }
};
