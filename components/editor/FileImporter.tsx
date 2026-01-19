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
import { useCertificateStore } from "@/lib/store";
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

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
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

    console.log("📁 File selected:", file.name);
    console.log("File type:", file.type);
    console.log("File size:", file.size, "bytes");

    try {
      if (fileName.endsWith(".csv")) {
        console.log("Handling as CSV file");
        await handleCSV(file);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        console.log("Handling as Excel file");
        await handleExcel(file);
      } else if (fileName.endsWith(".json")) {
        console.log("Handling as JSON file");
        await handleJSON(file);
      } else {
        throw new Error(
          "Unsupported file type. Please upload CSV, Excel, or JSON files.",
        );
      }

      toast({
        title: "File imported successfully",
        description: `${file.name} has been loaded.`,
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description:
          error instanceof Error ? error.message : "Failed to import file",
        variant: "destructive",
      });
      setFileName("");
    }
  };

  const handleCSV = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const lines = text.split("\n").filter((line) => line.trim());

          if (lines.length === 0) {
            reject(new Error("CSV file is empty"));
            return;
          }

          // Parse CSV manually (simple parser)
          const rows = lines.map((line) => {
            const values: string[] = [];
            let current = "";
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
              const char = line[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === "," && !inQuotes) {
                values.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }
            values.push(current.trim());
            return values;
          });

          // Check if first row looks like headers (contains text field names)
          const firstRow = rows[0];
          const hasHeaders = firstRow.some(
            (cell) =>
              (isNaN(Number(cell)) && cell.toLowerCase().includes("name")) ||
              cell.toLowerCase().includes("title") ||
              cell.toLowerCase().includes("number"),
          );

          console.log("CSV Parsed Rows:", rows);
          console.log("First Row (Headers):", rows[0]);
          console.log("Has Headers:", hasHeaders);

          if (hasHeaders) {
            // Row-based format: headers in first row
            const headers = rows[0];
            const dataRows = rows
              .slice(1)
              .filter((row) => row.some((cell) => cell.trim()));

            console.log("Headers:", headers);
            console.log("Data Rows:", dataRows);

            // Field name mapping from CSV headers to certificate data structure
            const fieldMap: Record<string, string> = {
              "Product Name": "productName",
              "product name": "productName",
              ProductName: "productName",
              "Certificate Number": "certNumber",
              "certificate number": "certNumber",
              CertificateNumber: "certNumber",
              "Cert Number": "certNumber",
              "Certification Status": "certificationStatus",
              "certification status": "certificationStatus",
              Status: "certificationStatus",
              "Issue Date": "issuedDate",
              "issue date": "issuedDate",
              IssuedDate: "issuedDate",
              "Issued Date (UTC)": "issuedDate",
              "Valid Until": "expiryDate",
              "valid until": "expiryDate",
              "Expiry Date": "expiryDate",
              ExpiryDate: "expiryDate",
              "Product Category": "productCategory",
              "product category": "productCategory",
              Category: "productCategory",
              "Product Form": "productForm",
              "product form": "productForm",
              Form: "productForm",
              "Product Description": "description",
              "product description": "description",
              Description: "description",
              "Product Image": "productImage",
              "product image": "productImage",
              Title: "title",
              "Certificate Title": "title",
              "Sub Title": "subTitle",
              subtitle: "subTitle",
              "Certified By": "certifiedBy",
              "certified by": "certifiedBy",
              "Manufacturer Name": "manufacturerName",
              "manufacturer name": "manufacturerName",
              Manufacturer: "manufacturerName",
              "Company Name": "manufacturerName",
              "Manufacturer Address": "manufacturerAddress",
              "manufacturer address": "manufacturerAddress",
              "Person Name": "personName",
              "person name": "personName",
              "Signer Name": "personName",
              Role: "role",
              role: "role",
              Location: "location",
              location: "location",
              "Customer Support Email": "customerSupportEmail",
              "customer support email": "customerSupportEmail",
              "Support Email": "customerSupportEmail",
              Email: "customerSupportEmail",
              "Customer Support Phone": "customerSupportPhone",
              "customer support phone": "customerSupportPhone",
              "Support Phone": "customerSupportPhone",
              Phone: "customerSupportPhone",
              "Buy Now URL": "buyNowUrl",
              "buy now url": "buyNowUrl",
              URL: "buyNowUrl",
              "Key Active Ingredients": "keyActiveIngredients",
              "key active ingredients": "keyActiveIngredients",
              Ingredients: "keyActiveIngredients",
              "Dietary Compliance": "dietaryCompliance",
              "dietary compliance": "dietaryCompliance",
              Compliance: "dietaryCompliance",
              "Side Effects": "sideEffects",
              "side effects": "sideEffects",
              Cautions: "cautions",
              cautions: "cautions",
              "Expert Rating": "expertRating",
              "expert rating": "expertRating",
              "Final Verdict": "finalVerdict",
              "final verdict": "finalVerdict",
              "Verification Statement": "verificationStatement",
              "verification statement": "verificationStatement",
              "Certifications And Approvals": "certificationsAndApprovals",
              "certifications and approvals": "certificationsAndApprovals",
              "Third Party Testing": "thirdPartyTesting",
              "third party testing": "thirdPartyTesting",
              "Refund Policy": "refundPolicy",
              "refund policy": "refundPolicy",
              "Overall Expert Rating": "overallExpertRating",
              "Safety Rating": "safetyRating",
              "Effectiveness Rating": "effectivenessRating",
              "Ingredients Quality Rating": "ingredientsQualityRating",
              "Certifications QC Rating": "certificationsQCRating",
              "Value For Money Rating": "valueForMoneyRating",
              "Evidence Strength Rating": "evidenceStrengthRating",
              "User Experience Rating": "userExperienceRating",
              "Versatility Use Case Fit": "versatilityUseCaseFit",
              Logo: "logo",
              Signature: "signature",
              Badge: "badge",
              Watermark: "watermark",
              "QR Text": "qrText",
            };

            const records = dataRows.map((row, rowIndex) => {
              const record: any = {};
              headers.forEach((header, index) => {
                const cellValue = row[index];
                if (cellValue && cellValue.trim()) {
                  const trimmedHeader = header.trim();
                  // Try exact match first, then case-insensitive match, then use as-is
                  let fieldName = fieldMap[trimmedHeader];

                  // If no exact match, try case-insensitive
                  if (!fieldName) {
                    const lowerHeader = trimmedHeader.toLowerCase();
                    const foundKey = Object.keys(fieldMap).find(
                      (key) => key.toLowerCase() === lowerHeader,
                    );
                    if (foundKey) {
                      fieldName = fieldMap[foundKey];
                    } else {
                      fieldName = trimmedHeader;
                    }
                  }

                  record[fieldName] = cellValue.trim();
                  console.log(
                    `Row ${rowIndex}, Header "${trimmedHeader}" -> Field "${fieldName}" = "${cellValue.trim()}"`,
                  );
                }
              });
              console.log(`Parsed Record ${rowIndex}:`, record);
              return record;
            });

            console.log(
              "Final CSV JSON Data:",
              JSON.stringify(records, null, 2),
            );
            loadData(records);
          } else {
            // Columnar format: field names in first column
            loadColumnarData(rows);
          }

          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read CSV file"));
      reader.readAsText(file);
    });
  };

  const handleExcel = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          console.log("📊 Reading Excel file...");
          const data = e.target?.result;
          const workbook = await import("xlsx").then((XLSX) => {
            return XLSX.read(data, { type: "binary" });
          });

          const firstSheetName = workbook.SheetNames[0];
          console.log("Sheet name:", firstSheetName);
          const worksheet = workbook.Sheets[firstSheetName];
          const XLSX = await import("xlsx");
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }) as any[][];

          console.log("Excel parsed data:", jsonData);

          if (jsonData.length === 0) {
            reject(new Error("Excel file is empty"));
            return;
          }

          // Check format similar to CSV
          const firstRow = jsonData[0];
          console.log("First row:", firstRow);
          const hasHeaders = firstRow.some(
            (cell) =>
              typeof cell === "string" &&
              (cell.toLowerCase().includes("name") ||
                cell.toLowerCase().includes("title") ||
                cell.toLowerCase().includes("number") ||
                cell.toLowerCase().includes("date") ||
                cell.toLowerCase().includes("category") ||
                cell.toLowerCase().includes("form") ||
                cell.toLowerCase().includes("status")),
          );
          console.log("Has headers:", hasHeaders);

          if (hasHeaders) {
            // Row-based format
            const headers = jsonData[0];
            const dataRows = jsonData
              .slice(1)
              .filter(
                (row) => row && row.some((cell) => cell != null && cell !== ""),
              );

            console.log("Headers:", headers);
            console.log("Data rows count:", dataRows.length);

            // Field name mapping (same as CSV)
            const fieldMap: Record<string, string> = {
              "Product Name": "productName",
              "product name": "productName",
              ProductName: "productName",
              "Certificate Number": "certNumber",
              "certificate number": "certNumber",
              CertificateNumber: "certNumber",
              "Cert Number": "certNumber",
              "Certification Status": "certificationStatus",
              "certification status": "certificationStatus",
              Status: "certificationStatus",
              "Issue Date": "issuedDate",
              "issue date": "issuedDate",
              IssuedDate: "issuedDate",
              "Issued Date (UTC)": "issuedDate",
              "Valid Until": "expiryDate",
              "valid until": "expiryDate",
              "Expiry Date": "expiryDate",
              ExpiryDate: "expiryDate",
              "Product Category": "productCategory",
              "product category": "productCategory",
              Category: "productCategory",
              "Product Form": "productForm",
              "product form": "productForm",
              Form: "productForm",
              "Product Description": "description",
              "product description": "description",
              Description: "description",
              "Product Image": "productImage",
              "product image": "productImage",
              Title: "title",
              "Certificate Title": "title",
              "Sub Title": "subTitle",
              subtitle: "subTitle",
              "Certified By": "certifiedBy",
              "certified by": "certifiedBy",
              "Manufacturer Name": "manufacturerName",
              "manufacturer name": "manufacturerName",
              Manufacturer: "manufacturerName",
              "Company Name": "manufacturerName",
              "Manufacturer Address": "manufacturerAddress",
              "manufacturer address": "manufacturerAddress",
              "Person Name": "personName",
              "person name": "personName",
              "Signer Name": "personName",
              Role: "role",
              role: "role",
              Location: "location",
              location: "location",
              "Customer Support Email": "customerSupportEmail",
              "customer support email": "customerSupportEmail",
              "Support Email": "customerSupportEmail",
              Email: "customerSupportEmail",
              "Customer Support Phone": "customerSupportPhone",
              "customer support phone": "customerSupportPhone",
              "Support Phone": "customerSupportPhone",
              Phone: "customerSupportPhone",
              "Buy Now URL": "buyNowUrl",
              "buy now url": "buyNowUrl",
              URL: "buyNowUrl",
              "Key Active Ingredients": "keyActiveIngredients",
              "key active ingredients": "keyActiveIngredients",
              Ingredients: "keyActiveIngredients",
              "Dietary Compliance": "dietaryCompliance",
              "dietary compliance": "dietaryCompliance",
              Compliance: "dietaryCompliance",
              "Side Effects": "sideEffects",
              "side effects": "sideEffects",
              Cautions: "cautions",
              cautions: "cautions",
              "Expert Rating": "expertRating",
              "expert rating": "expertRating",
              "Final Verdict": "finalVerdict",
              "final verdict": "finalVerdict",
              "Verification Statement": "verificationStatement",
              "verification statement": "verificationStatement",
              "Certifications And Approvals": "certificationsAndApprovals",
              "certifications and approvals": "certificationsAndApprovals",
              "Third Party Testing": "thirdPartyTesting",
              "third party testing": "thirdPartyTesting",
              "Refund Policy": "refundPolicy",
              "refund policy": "refundPolicy",
              "Overall Expert Rating": "overallExpertRating",
              "Safety Rating": "safetyRating",
              "Effectiveness Rating": "effectivenessRating",
              "Ingredients Quality Rating": "ingredientsQualityRating",
              "Certifications QC Rating": "certificationsQCRating",
              "Value For Money Rating": "valueForMoneyRating",
              "Evidence Strength Rating": "evidenceStrengthRating",
              "User Experience Rating": "userExperienceRating",
              "Versatility Use Case Fit": "versatilityUseCaseFit",
              Logo: "logo",
              Signature: "signature",
              Badge: "badge",
              Watermark: "watermark",
              "QR Text": "qrText",
            };

            const records = dataRows.map((row, rowIndex) => {
              const record: any = {};
              headers.forEach((header, index) => {
                const cellValue = row[index];
                if (cellValue != null && String(cellValue).trim()) {
                  const trimmedHeader = String(header).trim();
                  // Try exact match first, then case-insensitive match
                  let fieldName = fieldMap[trimmedHeader];

                  if (!fieldName) {
                    const lowerHeader = trimmedHeader.toLowerCase();
                    const foundKey = Object.keys(fieldMap).find(
                      (key) => key.toLowerCase() === lowerHeader,
                    );
                    if (foundKey) {
                      fieldName = fieldMap[foundKey];
                    } else {
                      fieldName = trimmedHeader;
                    }
                  }

                  record[fieldName] = String(cellValue).trim();
                  console.log(
                    `Excel Row ${rowIndex}, Header "${trimmedHeader}" -> Field "${fieldName}" = "${String(cellValue).trim()}"`,
                  );
                }
              });
              console.log(`Excel Parsed Record ${rowIndex}:`, record);
              return record;
            });

            console.log(
              "Final Excel JSON Data:",
              JSON.stringify(records, null, 2),
            );
            loadData(records);
          } else {
            // Columnar format
            loadColumnarData(jsonData);
          }

          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read Excel file"));
      reader.readAsBinaryString(file);
    });
  };

  const handleJSON = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const jsonData = JSON.parse(text);

          if (Array.isArray(jsonData)) {
            loadData(jsonData);
          } else {
            loadData([jsonData]);
          }

          resolve();
        } catch (error) {
          reject(new Error("Invalid JSON format"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read JSON file"));
      reader.readAsText(file);
    });
  };

  const clearFile = () => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50/30 to-slate-50/30">
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
      <CardContent className="space-y-3 lg:space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 lg:p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-blue-600 bg-blue-50 scale-[0.98] shadow-inner"
              : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
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
                {fileName.endsWith(".csv") && (
                  <FileText className="h-10 w-10" />
                )}
                {(fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) && (
                  <FileSpreadsheet className="h-10 w-10" />
                )}
                {fileName.endsWith(".json") && (
                  <FileText className="h-10 w-10" />
                )}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-sm text-green-800">
                  {fileName}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ✓ File loaded successfully
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Remove File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-blue-400" />
              <div>
                <p className="text-base lg:text-lg font-semibold text-slate-700">
                  Drop your file here or click to browse
                </p>
                <p className="text-xs lg:text-sm text-slate-500 mt-1">
                  Supports CSV, Excel (.xlsx, .xls), and JSON formats
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs pointer-events-none border-slate-300"
                >
                  <FileText className="h-3 w-3 mr-1.5" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs pointer-events-none border-slate-300"
                >
                  <FileSpreadsheet className="h-3 w-3 mr-1.5" />
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs pointer-events-none border-slate-300"
                >
                  <FileText className="h-3 w-3 mr-1.5" />
                  JSON
                </Button>
              </div>
            </div>
          )}
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-xs">
            <strong className="text-blue-900">Supported Formats:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-blue-800">
              <li>
                <strong>Row-based:</strong> First row contains headers (Product
                Name, Certificate Number, etc.)
              </li>
              <li>
                <strong>Columnar:</strong> First column contains field names
              </li>
              <li>
                <strong>JSON:</strong> Array of certificate objects
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
