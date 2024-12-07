import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { handlePDFRead, PDFResponse } from "./handler/pdf";

const read = new Elysia({ prefix: "/read" }).post("/pdf", async ({ body }): Promise<PDFResponse> => {
  const result = await handlePDFRead(body);
  console.log("Result:", result);
  return result;
});

const app = new Elysia({ prefix: "/api/v1" }).use(read).use(swagger);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
