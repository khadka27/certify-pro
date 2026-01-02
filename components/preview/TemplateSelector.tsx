'use client';

import { useCertificateStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const templates = [
  { id: 1, name: 'Classic Gold', preview: 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-600' },
  { id: 2, name: 'Modern Blue', preview: 'bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-600' },
  { id: 3, name: 'Elegant Dark', preview: 'bg-gradient-to-br from-slate-800 to-slate-900 border-amber-500' },
  { id: 4, name: 'Fresh Green', preview: 'bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-600' },
  { id: 5, name: 'Luxury Rose', preview: 'bg-gradient-to-br from-rose-100 to-pink-100 border-rose-600' },
  { id: 6, name: 'Professional Slate', preview: 'bg-gradient-to-r from-slate-800 to-white border-slate-800' },
  { id: 7, name: 'Vibrant Orange', preview: 'bg-gradient-to-br from-orange-100 to-amber-100 border-orange-600' },
  { id: 8, name: 'Corporate Teal', preview: 'bg-white border-teal-600' },
  { id: 9, name: 'Traditional Gray', preview: 'bg-white border-gray-800 border-double' },
  { id: 10, name: 'Premium Violet', preview: 'bg-gradient-to-br from-violet-900 to-fuchsia-900 border-violet-400' },
  { id: 11, name: 'Professional Certificate', preview: 'bg-white border-blue-600 border-8' },
];

export default function TemplateSelector() {
  const selectedTemplate = useCertificateStore((state) => state.certificateData.selectedTemplate);
  const updateField = useCertificateStore((state) => state.updateField);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Template</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`cursor-pointer transition-all w-32 ${
                  selectedTemplate === template.id
                    ? 'ring-2 ring-primary shadow-lg'
                    : 'hover:shadow-md'
                }`}
                onClick={() => updateField('selectedTemplate', template.id)}
              >
                <CardContent className="p-3 space-y-2">
                  <div
                    className={`h-20 rounded border-4 ${template.preview} relative`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-primary rounded-full p-1">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center font-medium truncate">
                    {template.name}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
