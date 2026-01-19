"use client";

import { Button } from "@/components/ui/button";
import { Download, Upload, RotateCcw, FileJson, Settings } from "lucide-react";
import { useCertificateStore, getInitialData } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CertificateData } from "@/types/certificate";
import Link from "next/link";

export default function Navbar() {
  const records = useCertificateStore((state) => state.records);
  const setRecords = useCertificateStore((state) => state.setRecords);
  const loadColumnarData = useCertificateStore(
    (state) => state.loadColumnarData,
  );
  const resetData = useCertificateStore((state) => state.resetData);
  const { toast } = useToast();

  const handleSaveData = () => {
    try {
      // If we have multiple records, we save them as a JSON array
      const filename =
        records.length > 1
          ? `certificates-batch-${new Date().toISOString().split("T")[0]}`
          : `certificate-${records[0].certNumber}`;

      const json = JSON.stringify(records, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.json`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Data saved",
        description: `${records.length} record(s) saved as JSON`,
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save certificate data",
        variant: "destructive",
      });
    }
  };

  const handleLoadData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (file.name.endsWith(".csv")) {
        import("papaparse").then((Papa) => {
          Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.data && results.data.length > 0) {
                console.log("Loading CSV via Store mapping:", results.data);
                loadColumnarData(results.data);
                toast({
                  title: "CSV Imported",
                  description:
                    "Certificate data loaded successfully via columnar mapping.",
                });
              }
            },
            error: (error) => {
              toast({
                title: "Error",
                description: "Failed to parse CSV file.",
                variant: "destructive",
              });
            },
          });
        });
      } else {
        try {
          const text = await file.text();
          const data = JSON.parse(text);
          console.log("Loading JSON Data via Store Mapping:", data);
          loadColumnarData(data);
          toast({
            title: "Data loaded",
            description: "Certificate data loaded successfully",
          });
        } catch (error) {
          toast({
            title: "Load failed",
            description: "Failed to parse JSON file",
            variant: "destructive",
          });
        }
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (
      confirm("Are you sure you want to reset all data? This cannot be undone.")
    ) {
      resetData();
      toast({
        title: "Data reset",
        description: "All certificate data has been reset",
      });
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <FileJson className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            CertifyPro
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/settings">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
