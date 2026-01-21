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

    const width = certificateElement.offsetWidth || 1000;
    const height = certificateElement.offsetHeight || 707;

    const dataUrl = await toPng(certificateElement, {
      quality: 1.0,
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#ffffff",
    });

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

  // Title
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.title.toUpperCase(),
          bold: true,
          size: 48,
          color: "1F3A8A", // Navy Blue
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
  );

  if (data.subTitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.subTitle,
            size: 24,
            italics: true,
            color: "4B5563",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
    );
  }

  // Certificate Identity
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Certificate ID: ${data.certNumber}`,
          bold: true,
          size: 20,
          color: "374151",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
  );

  // Main Description
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.description.replace(/<[^>]*>/g, ""), // Simple HTML tag removal
          size: 20,
          color: "1F2937",
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { before: 200, after: 400 },
    }),
  );

  // Product Section Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "PRODUCT SPECIFICATIONS",
          bold: true,
          size: 24,
          underline: {},
          color: "1F3A8A",
        }),
      ],
      spacing: { before: 200, after: 200 },
    }),
  );

  const productFields = [
    ["Product Name", data.productName],
    ["Category", data.productCategory],
    ["Format", data.productForm],
    ["Ingredients", data.keyActiveIngredients],
    ["Compliance", data.dietaryCompliance],
    ["Manufacturer", data.manufacturerName],
    ["Address", data.manufacturerAddress],
  ];

  productFields.forEach(([label, value]) => {
    if (value) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${label}: `, bold: true, size: 18 }),
            new TextRun({ text: value, size: 18 }),
          ],
          spacing: { after: 100 },
        }),
      );
    }
  });

  // Ratings Section
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "EXPERT ANALYSIS & RATINGS",
          bold: true,
          size: 24,
          underline: {},
          color: "1F3A8A",
        }),
      ],
      spacing: { before: 400, after: 200 },
    }),
  );

  const ratingFields = [
    ["Safety Rating", data.safetyRating],
    ["Quality Rating", data.ingredientsQualityRating],
    ["Effectiveness", data.effectivenessRating],
    ["Overall Expert Index", data.overallExpertRating],
  ];

  ratingFields.forEach(([label, value]) => {
    if (value) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${label}: `, bold: true, size: 18 }),
            new TextRun({ text: value, size: 18, color: "059669" }),
          ],
          spacing: { after: 100 },
        }),
      );
    }
  });

  // Verdict Section
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "FINAL VERDICT",
          bold: true,
          size: 24,
          underline: {},
          color: "1F3A8A",
        }),
      ],
      spacing: { before: 400, after: 200 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.finalVerdict?.toUpperCase() || "APPROVED",
          bold: true,
          size: 28,
          color: "059669",
        }),
      ],
      spacing: { after: 200 },
    }),
  );

  if (data.verificationStatement) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `"${data.verificationStatement}"`,
            italics: true,
            size: 18,
            color: "4B5563",
          }),
        ],
        spacing: { after: 400 },
      }),
    );
  }

  // Footer / Authority
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Issued on: ${data.issuedDate}`,
          size: 16,
        }),
      ],
      spacing: { before: 400, after: 100 },
    }),
  );

  if (data.expiryDate) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Valid until: ${data.expiryDate}`,
            size: 16,
          }),
        ],
        spacing: { after: 100 },
      }),
    );
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Certified By: ${data.personName}`,
          bold: true,
          size: 20,
        }),
      ],
      spacing: { before: 200, after: 50 },
    }),
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: data.role,
          size: 16,
          italics: true,
        }),
      ],
      spacing: { after: 400 },
    }),
  );

  // Contact Info
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Support: ${data.customerSupportEmail} | ${data.customerSupportPhone}`,
          size: 14,
          color: "6B7280",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
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
