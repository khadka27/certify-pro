"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileSpreadsheet, FileText, X } from "lucide-react";
import { useCertificateStore, getInitialData } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FileImporter() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadColumnarData = useCertificateStore(
    (state) => state.loadColumnarData,
  );
  const loadData = useCertificateStore((state) => state.loadData);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const fileName = file.name.toLowerCase();
    setFileName(file.name);

    try {
      if (fileName.endsWith(".csv")) {
        await handleCSV(file);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        await handleExcel(file);
      } else if (fileName.endsWith(".json")) {
        await handleJSON(file);
      } else {
        throw new Error("Unsupported file type.");
      }

      toast({
        title: "File imported successfully",
        description: `${file.name} has been loaded.`,
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import file",
        variant: "destructive",
      });
      setFileName("");
    }
  };

  const processRows = (headers: string[], dataRows: any[][]) => {
    const fieldMap: Record<string, string> = {
      "Certificate Title": "title",
      "Sub Title": "subTitle",
      "Certified By": "certifiedBy",
      "Certificate Number": "certNumber",
      "Certification Status": "certificationStatus",
      "Issue Date": "issuedDate",
      "Expiry Date": "expiryDate",
      "Valid Until": "expiryDate",
      "Product Name": "productName",
      "Product Category": "productCategory",
      Category: "productCategory",
      "Product Form": "productForm",
      Form: "productForm",
      "Product Description": "description",
      Description: "description",
      "Key Active Ingredients": "keyActiveIngredients",
      Ingredients: "keyActiveIngredients",
      "Dietary Compliance": "dietaryCompliance",
      Compliance: "dietaryCompliance",
      "Side Effects": "sideEffects",
      Cautions: "cautions",
      "Expert Rating Text": "expertRating",
      "Expert Rating": "expertRating",
      Expert: "expertRating",
      "Final Verdict": "finalVerdict",
      Verdict: "finalVerdict",
      "Verification Statement": "verificationStatement",
      "Certifications And Approvals": "certificationsAndApprovals",
      "Third Party Testing": "thirdPartyTesting",
      "Refund Policy": "refundPolicy",
      "Overall Expert Rating": "overallExpertRating",
      "Overall Rating": "overallExpertRating",
      Rating: "overallExpertRating",
      Score: "overallExpertRating",
      "Safety Rating": "safetyRating",
      Safety: "safetyRating",
      "Effectiveness Rating": "effectivenessRating",
      Effectiveness: "effectivenessRating",
      "Ingredients Quality Rating": "ingredientsQualityRating",
      "Ingredients Quality": "ingredientsQualityRating",
      "Certifications QC Rating": "certificationsQCRating",
      "Certifications QC": "certificationsQCRating",
      "Value For Money Rating": "valueForMoneyRating",
      Value: "valueForMoneyRating",
      "Evidence Strength Rating": "evidenceStrengthRating",
      "Evidence Strength": "evidenceStrengthRating",
      "User Experience Rating": "userExperienceRating",
      "User Experience": "userExperienceRating",
      "Versatility Use Case Fit": "versatilityUseCaseFit",
      Versatility: "versatilityUseCaseFit",
      Logo: "logo",
      Signature: "signature",
      Badge: "badge",
      Watermark: "watermark",
      "QR Code Text": "qrText",
      "QR Text": "qrText",
      "Company URL": "companyUrl",
      "Website": "companyUrl",
      "Customer Support Email": "customerSupportEmail",
      "Support Email": "customerSupportEmail",
      "Customer Support Phone": "customerSupportPhone",
      "Support Phone": "customerSupportPhone",
      "Buy Now URL": "buyNowUrl",
      "Product Image": "productImage",
    };

    return dataRows.map((row) => {
      const record: any = { ...getInitialData() };
      headers.forEach((header, index) => {
        const cellValue = row[index];
        if (cellValue != null && String(cellValue).trim()) {
          const trimmedHeader = String(header).trim();
          let fieldName = fieldMap[trimmedHeader];

          if (!fieldName) {
            const lowerHeader = trimmedHeader.toLowerCase();
            const foundKey = Object.keys(fieldMap).find(
              (key) => key.toLowerCase() === lowerHeader
            );
            if (foundKey) fieldName = fieldMap[foundKey];
          }

          if (fieldName) {
            record[fieldName] = String(cellValue).trim();
          }
        }
      });

      // Post-processing
      if (record.issuedDate && !record.expiryDate) {
        const parts = String(record.issuedDate).split("-");
        if (parts.length === 3) {
          const year = parseInt(parts[0]);
          if (!isNaN(year)) record.expiryDate = `${year + 3}-${parts[1]}-${parts[2]}`;
        }
      }

      const ratingKeys = [
        "safetyRating",
        "effectivenessRating",
        "ingredientsQualityRating",
        "certificationsQCRating",
        "valueForMoneyRating",
        "evidenceStrengthRating",
        "userExperienceRating",
        "versatilityUseCaseFit",
      ];
      let sum = 0;
      let count = 0;
      ratingKeys.forEach((key) => {
        const val = parseFloat(record[key]);
        if (!isNaN(val) && val > 0) {
          sum += val;
          count++;
        }
      });
      if (count > 0 && (!record.overallExpertRating || record.overallExpertRating === "9.8")) {
        record.overallExpertRating = (sum / count).toFixed(1);
      }

      return record;
    });
  };

  const handleCSV = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split("\n").filter((line) => line.trim());
          if (lines.length === 0) throw new Error("File is empty");

          const rows = lines.map((line) => {
            const values: string[] = [];
            let current = "";
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') inQuotes = !inQuotes;
              else if (char === "," && !inQuotes) {
                values.push(current.trim());
                current = "";
              } else current += char;
            }
            values.push(current.trim());
            return values;
          });

          const isColumnar = !rows[0].some(cell => 
            typeof cell === "string" && (cell.toLowerCase().includes("name") || cell.toLowerCase().includes("title"))
          );

          if (isColumnar) {
            loadColumnarData(rows);
          } else {
            const headers = rows[0];
            const dataRows = rows.slice(1).filter(r => r.some(c => c.trim()));
            loadData(processRows(headers, dataRows));
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleExcel = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = e.target?.result;
          const XLSX = await import("xlsx");
          const workbook = XLSX.read(data, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

          if (jsonData.length === 0) throw new Error("File is empty");

          const hasHeaders = jsonData[0].some(cell => 
            typeof cell === "string" && (cell.toLowerCase().includes("name") || cell.toLowerCase().includes("title"))
          );

          if (hasHeaders) {
            const headers = jsonData[0] as string[];
            const dataRows = jsonData.slice(1).filter(r => r && r.some(c => c != null && c !== ""));
            loadData(processRows(headers, dataRows));
          } else {
            loadColumnarData(jsonData as string[][]);
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsBinaryString(file);
    });
  };

  const handleJSON = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          loadData(Array.isArray(jsonData) ? jsonData : [jsonData]);
          resolve();
        } catch (err) {
          reject(new Error("Invalid JSON"));
        }
      };
      reader.readAsText(file);
    });
  };

  const clearFile = () => {
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="border-2 border-blue-100 bg-linear-to-br from-blue-50/30 to-slate-50/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <Upload className="h-4 w-4 text-white" />
          </div>
          Import Batch Data
        </CardTitle>
        <CardDescription className="text-xs lg:text-sm">
          Upload CSV, Excel, or JSON files to load certificate data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 lg:p-8 text-center transition-all cursor-pointer ${
            isDragging ? "border-blue-600 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,.json"
            onChange={handleFileInput}
            className="hidden"
          />

          {fileName ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <FileText className="h-10 w-10" />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-sm text-green-800">{fileName}</p>
                <p className="text-xs text-green-600 mt-1">✓ File loaded successfully</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                Change File
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                  <FileSpreadsheet className="h-10 w-10" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">Click or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">CSV, Excel, or JSON (max. 10MB)</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
