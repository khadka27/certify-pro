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

    try {
      if (fileName.endsWith(".csv")) {
        await handleCSV(file);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        await handleExcel(file);
      } else if (fileName.endsWith(".json")) {
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

          if (hasHeaders) {
            // Row-based format: headers in first row
            const headers = rows[0];
            const dataRows = rows
              .slice(1)
              .filter((row) => row.some((cell) => cell.trim()));

            const records = dataRows.map((row) => {
              const record: any = {};
              headers.forEach((header, index) => {
                if (row[index]) {
                  record[header.trim()] = row[index].trim();
                }
              });
              return record;
            });

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
          const data = e.target?.result;
          const workbook = await import("xlsx").then((XLSX) => {
            return XLSX.read(data, { type: "binary" });
          });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const XLSX = await import("xlsx");
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          }) as string[][];

          if (jsonData.length === 0) {
            reject(new Error("Excel file is empty"));
            return;
          }

          // Check format similar to CSV
          const firstRow = jsonData[0];
          const hasHeaders = firstRow.some(
            (cell) =>
              typeof cell === "string" &&
              (cell.toLowerCase().includes("name") ||
                cell.toLowerCase().includes("title") ||
                cell.toLowerCase().includes("number")),
          );

          if (hasHeaders) {
            // Row-based format
            const headers = jsonData[0];
            const dataRows = jsonData
              .slice(1)
              .filter((row) => row.some((cell) => cell));

            const records = dataRows.map((row) => {
              const record: any = {};
              headers.forEach((header, index) => {
                if (row[index]) {
                  record[String(header).trim()] = String(row[index]).trim();
                }
              });
              return record;
            });

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Batch Data
        </CardTitle>
        <CardDescription>
          Upload CSV, Excel, or JSON files to load certificate data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
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
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-green-600">
                {fileName.endsWith(".csv") && <FileText className="h-8 w-8" />}
                {(fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) && (
                  <FileSpreadsheet className="h-8 w-8" />
                )}
                {fileName.endsWith(".json") && <FileText className="h-8 w-8" />}
              </div>
              <p className="font-medium text-sm">{fileName}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supports CSV, Excel (.xlsx, .xls), and JSON formats
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  JSON
                </Button>
              </div>
            </div>
          )}
        </div>

        <Alert>
          <AlertDescription className="text-xs">
            <strong>Supported Formats:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Row-based:</strong> First row contains column headers
                (Product Name, Certificate Number, etc.)
              </li>
              <li>
                <strong>Columnar:</strong> First column contains field names,
                subsequent columns contain data for each certificate
              </li>
              <li>
                <strong>JSON:</strong> Array of certificate objects or single
                certificate object
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
