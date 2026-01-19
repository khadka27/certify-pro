import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  ImageRun,
} from "docx";
import { CertificateData } from "@/types/certificate";

export async function exportToPNG(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Certificate element not found");
  }

  try {
    const certificateElement = element.querySelector("div") as HTMLElement;
    if (!certificateElement) {
      throw new Error("Certificate content not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await toPng(certificateElement, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error exporting to PNG:", error);
    throw error;
  }
}

export async function exportToJPEG(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Certificate element not found");
  }

  try {
    const certificateElement = element.querySelector("div") as HTMLElement;
    if (!certificateElement) {
      throw new Error("Certificate content not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await toJpeg(certificateElement, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.download = `${filename}.jpg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error exporting to JPEG:", error);
    throw error;
  }
}

export async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Certificate element not found");
  }

  try {
    const certificateElement = element.querySelector("div") as HTMLElement;
    if (!certificateElement) {
      throw new Error("Certificate content not found");
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const dataUrl = await toPng(certificateElement, {
      quality: 1.0,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

    const width = certificateElement.offsetWidth;
    const height = certificateElement.offsetHeight;

    const pdf = new jsPDF({
      orientation: width > height ? "landscape" : "portrait",
      unit: "px",
      format: [width, height],
    });

    pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw error;
  }
}

async function imageUrlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return "";
  }
}

export async function generateDOCXBlob(data: CertificateData): Promise<Blob> {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.title,
          bold: true,
          size: 48,
          color: "1F2937",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.description,
          size: 24,
          color: "4B5563",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Product Name: ",
          bold: true,
          size: 28,
        }),
        new TextRun({
          text: data.productName,
          size: 28,
          color: "059669",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Certificate Number: ${data.certNumber}`,
          size: 20,
          color: "6B7280",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Company: ${data.manufacturerName}`,
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Location: ${data.location}`,
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.personName,
          bold: true,
          size: 32,
          color: "1F2937",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.role,
          size: 22,
          color: "4B5563",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Issued: ${data.issuedDate}`,
          size: 18,
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { after: 100 },
    }),
  );

  if (data.expiryDate) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Expires: ${data.expiryDate}`,
            size: 18,
          }),
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
      }),
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: children,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export async function exportToDOCX(data: CertificateData, filename: string) {
  try {
    const blob = await generateDOCXBlob(data);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.docx`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting to DOCX:", error);
    throw error;
  }
}

export function saveAsJSON(data: CertificateData, filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export function loadFromJSON(file: File): Promise<CertificateData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(new Error("Invalid JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
