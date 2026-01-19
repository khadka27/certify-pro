"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText, File } from "lucide-react";
import {
  exportToPNG,
  exportToJPEG,
  exportToPDF,
  exportToDOCX,
  generateDOCXBlob,
} from "@/lib/export";
import { useCertificateStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

import { useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { toPng, toJpeg } from "html-to-image";
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";
import Template7 from "@/components/templates/Template7";
import Template8 from "@/components/templates/Template8";
import Template9 from "@/components/templates/Template9";
import Template10 from "@/components/templates/Template10";
import Template11 from "@/components/templates/Template11";
import Template12 from "@/components/templates/Template12";
import Template13 from "@/components/templates/Template13";
import Template14 from "@/components/templates/Template14";

const templates = [
  { id: 1, component: Template1 },
  { id: 2, component: Template2 },
  { id: 3, component: Template3 },
  { id: 4, component: Template4 },
  { id: 5, component: Template5 },
  { id: 6, component: Template6 },
  { id: 7, component: Template7 },
  { id: 8, component: Template8 },
  { id: 9, component: Template9 },
  { id: 10, component: Template10 },
  { id: 11, component: Template11 },
  { id: 12, component: Template12 },
  { id: 13, component: Template13 },
  { id: 14, component: Template14 },
];

export default function ExportButtons() {
  const records = useCertificateStore((state) => state.records);
  const activeRecordIndex = useCertificateStore(
    (state) => state.activeRecordIndex,
  );
  const certificateData = records[activeRecordIndex];

  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [renderingCert, setRenderingCert] = useState<any>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const handleExport = async (type: "png" | "jpg" | "pdf" | "docx") => {
    if (records.length === 0) return;

    setIsExporting(true);
    setExportingType(type);
    setProgress(0);

    try {
      if (records.length === 1) {
        // Single export (existing behavior)
        const filename = `certificate-${certificateData.certNumber}`;
        switch (type) {
          case "png":
            await exportToPNG("certificate-preview", filename);
            break;
          case "jpg":
            await exportToJPEG("certificate-preview", filename);
            break;
          case "pdf":
            await exportToPDF("certificate-preview", filename);
            break;
          case "docx":
            await exportToDOCX(certificateData, filename);
            break;
        }
      } else {
        // Bulk export
        const zip = new JSZip();
        const batchId = new Date().getTime();

        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          const filename = `${record.certNumber}_${record.productName.replace(/[^a-z0-9]/gi, "_")}`;

          setRenderingCert(record);
          setProgress(Math.round(((i + 1) / records.length) * 100));

          // Wait for render
          await new Promise((resolve) => setTimeout(resolve, 200));

          if (type === "docx") {
            const docxBlob = await generateDOCXBlob(record);
            zip.file(`${filename}.docx`, docxBlob);
          }

          if (hiddenRef.current) {
            const element = hiddenRef.current.firstElementChild as HTMLElement;
            if (element) {
              let blob: Blob | null = null;
              if (type === "png" || type === "pdf") {
                const dataUrl = await toPng(element, {
                  quality: 0.95,
                  pixelRatio: 2,
                  backgroundColor: "#ffffff",
                });
                const base64Data = dataUrl.replace(
                  /^data:image\/png;base64,/,
                  "",
                );

                if (type === "png") {
                  zip.file(`${filename}.png`, base64Data, { base64: true });
                } else if (type === "pdf") {
                  // PDF generation for bulk
                  const imgProps = element.getBoundingClientRect();
                  const pdf = new (await import("jspdf")).default({
                    orientation: imgProps.width > imgProps.height ? "l" : "p",
                    unit: "px",
                    format: [imgProps.width, imgProps.height],
                  });
                  pdf.addImage(
                    dataUrl,
                    "PNG",
                    0,
                    0,
                    imgProps.width,
                    imgProps.height,
                  );
                  zip.file(`${filename}.pdf`, pdf.output("blob"));
                }
              } else if (type === "jpg") {
                const dataUrl = await toJpeg(element, {
                  quality: 0.95,
                  pixelRatio: 2,
                  backgroundColor: "#ffffff",
                });
                const base64Data = dataUrl.replace(
                  /^data:image\/jpeg;base64,/,
                  "",
                );
                zip.file(`${filename}.jpg`, base64Data, { base64: true });
              }
            }
          }
        }

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `certificates-bulk-${type}-${batchId}.zip`);
      }

      toast({
        title: "Export successful",
        description:
          records.length > 1
            ? `Batch of ${records.length} exported as ZIP`
            : `Certificate exported as ${type.toUpperCase()}`,
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to export certificate",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
      setExportingType(null);
      setRenderingCert(null);
      setProgress(0);
    }
  };

  const SelectedTemplateComponent = renderingCert
    ? templates.find((t) => t.id === renderingCert.selectedTemplate)
        ?.component || Template1
    : null;

  return (
    <div className="flex flex-col gap-3">
      {isExporting && records.length > 1 && (
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => handleExport("png")}
            disabled={isExporting}
            variant="default"
            className="gap-2"
          >
            <FileImage className="h-4 w-4" />
            {exportingType === "png"
              ? records.length > 1
                ? `${progress}%`
                : "Exporting..."
              : "PNG"}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => handleExport("jpg")}
            disabled={isExporting}
            variant="default"
            className="gap-2"
          >
            <FileImage className="h-4 w-4" />
            {exportingType === "jpg"
              ? records.length > 1
                ? `${progress}%`
                : "Exporting..."
              : "JPEG"}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => handleExport("pdf")}
            disabled={isExporting}
            variant="default"
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            {exportingType === "pdf"
              ? records.length > 1
                ? `${progress}%`
                : "Exporting..."
              : "PDF"}
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => handleExport("docx")}
            disabled={isExporting}
            variant="default"
            className="gap-2"
          >
            <File className="h-4 w-4" />
            {exportingType === "docx"
              ? records.length > 1
                ? `${progress}%`
                : "Exporting..."
              : "DOCX"}
          </Button>
        </motion.div>
      </div>

      {/* Hidden Container for Rendering Bulk */}
      <div className="fixed top-0 left-0 overflow-hidden w-0 h-0 opacity-0 pointer-events-none">
        <div ref={hiddenRef} style={{ width: "1000px", height: "auto" }}>
          {renderingCert && SelectedTemplateComponent && (
            <SelectedTemplateComponent data={renderingCert} />
          )}
        </div>
      </div>
    </div>
  );
}
