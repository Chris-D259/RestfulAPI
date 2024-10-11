const topdf = require("docx2pdf-converter");
const inputPath = "flha_output.docx";
topdf.convert(inputPath, "testflha_output.pdf");