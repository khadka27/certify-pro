'use client';

import { Button } from '@/components/ui/button';
import { Download, Upload, RotateCcw, FileJson } from 'lucide-react';
import { useCertificateStore } from '@/lib/store';
import { saveAsJSON, loadFromJSON } from '@/lib/export';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function Navbar() {
  const certificateData = useCertificateStore((state) => state.certificateData);
  const resetData = useCertificateStore((state) => state.resetData);
  const loadData = useCertificateStore((state) => state.loadData);
  const { toast } = useToast();

  const handleSaveJSON = () => {
    try {
      saveAsJSON(certificateData, `certificate-${certificateData.certNumber}`);
      toast({
        title: 'Data saved',
        description: 'Certificate data saved as JSON',
      });
    } catch (error) {
      toast({
        title: 'Save failed',
        description: 'Failed to save certificate data',
        variant: 'destructive',
      });
    }
  };

  const handleLoadJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const data = await loadFromJSON(file);
        loadData(data);
        toast({
          title: 'Data loaded',
          description: 'Certificate data loaded successfully',
        });
      } catch (error) {
        toast({
          title: 'Load failed',
          description: error instanceof Error ? error.message : 'Failed to load data',
          variant: 'destructive',
        });
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      resetData();
      toast({
        title: 'Data reset',
        description: 'All certificate data has been reset',
      });
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
            <FileJson className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            CertifyPro
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSaveJSON} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Save Data
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleLoadJSON} variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Load Data
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
