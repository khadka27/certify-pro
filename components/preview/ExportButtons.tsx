'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileImage, FileText, File } from 'lucide-react';
import { exportToPNG, exportToJPEG, exportToPDF, exportToDOCX } from '@/lib/export';
import { useCertificateStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function ExportButtons() {
  const certificateData = useCertificateStore((state) => state.certificateData);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportingType, setExportingType] = useState<string | null>(null);

  const handleExport = async (type: 'png' | 'jpg' | 'pdf' | 'docx') => {
    setIsExporting(true);
    setExportingType(type);
    const filename = `certificate-${certificateData.certNumber}`;

    try {
      switch (type) {
        case 'png':
          await exportToPNG('certificate-preview', filename);
          break;
        case 'jpg':
          await exportToJPEG('certificate-preview', filename);
          break;
        case 'pdf':
          await exportToPDF('certificate-preview', filename);
          break;
        case 'docx':
          await exportToDOCX(certificateData, filename);
          break;
      }

      toast({
        title: 'Export successful',
        description: `Certificate exported as ${type.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export failed',
        description: error instanceof Error ? error.message : 'Failed to export certificate',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
      setExportingType(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => handleExport('png')}
          disabled={isExporting}
          variant="default"
          className="gap-2"
        >
          <FileImage className="h-4 w-4" />
          {exportingType === 'png' ? 'Exporting...' : 'PNG'}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => handleExport('jpg')}
          disabled={isExporting}
          variant="default"
          className="gap-2"
        >
          <FileImage className="h-4 w-4" />
          {exportingType === 'jpg' ? 'Exporting...' : 'JPEG'}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => handleExport('pdf')}
          disabled={isExporting}
          variant="default"
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          {exportingType === 'pdf' ? 'Exporting...' : 'PDF'}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => handleExport('docx')}
          disabled={isExporting}
          variant="default"
          className="gap-2"
        >
          <File className="h-4 w-4" />
          {exportingType === 'docx' ? 'Exporting...' : 'DOCX'}
        </Button>
      </motion.div>
    </div>
  );
}
