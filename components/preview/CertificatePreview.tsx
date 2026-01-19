"use client";

import { useEffect, useState, useRef } from "react";
import { useCertificateStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
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
  { id: 1, name: "Classic Gold", component: Template1 },
  { id: 2, name: "Modern Blue", component: Template2 },
  { id: 3, name: "Elegant Dark", component: Template3 },
  { id: 4, name: "Fresh Green", component: Template4 },
  { id: 5, name: "Luxury Rose", component: Template5 },
  { id: 6, name: "Professional Slate", component: Template6 },
  { id: 7, name: "Vibrant Orange", component: Template7 },
  { id: 8, name: "Corporate Teal", component: Template8 },
  { id: 9, name: "Traditional Gray", component: Template9 },
  { id: 10, name: "Premium Violet", component: Template10 },
  { id: 11, name: "Professional Certificate", component: Template11 },
  { id: 12, name: "Official Authentic", component: Template12 },
  { id: 13, name: "Standard Professional", component: Template13 },
  { id: 14, name: "Authority Verified", component: Template14 },
];

export default function CertificatePreview() {
  const certificateData = useCertificateStore(
    (state) => state.records[state.activeRecordIndex],
  );
  const hasHydrated = useCertificateStore((state) => state._hasHydrated);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [certHeight, setCertHeight] = useState(707);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateScale = () => {
      if (containerRef.current && contentRef.current) {
        const parent = containerRef.current.parentElement;
        if (!parent) return;

        // Measure actual content height
        const actualCertHeight = contentRef.current.scrollHeight;
        if (actualCertHeight > 0 && actualCertHeight !== certHeight) {
          setCertHeight(actualCertHeight);
        }

        const availableWidth = parent.clientWidth - 48;
        const availableHeight = parent.clientHeight - 48;

        const scaleW = availableWidth / 1000;
        const scaleH = availableHeight / actualCertHeight;

        const newScale = Math.max(Math.min(scaleW, scaleH, 1), 0.1);
        setScale(newScale);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current?.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      resizeObserver.disconnect();
    };
  }, [mounted, certHeight, certificateData]);

  if (!mounted || !hasHydrated) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px] w-full bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl border-2 border-dashed border-blue-200 shadow-inner">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-600 font-semibold text-sm">
            Preparing Certificate Preview...
          </p>
          <p className="text-slate-400 text-xs">This will only take a moment</p>
        </div>
      </div>
    );
  }

  const SelectedTemplate =
    templates.find((t) => t.id === certificateData.selectedTemplate)
      ?.component || Template1;

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-start min-h-full w-full py-8 overflow-y-auto bg-slate-100/30"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={certificateData.selectedTemplate}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="relative shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-sm overflow-hidden bg-white"
          style={{
            width: 1000 * scale,
            height: certHeight * scale,
            flexShrink: 0,
          }}
        >
          <div
            id="certificate-preview"
            ref={contentRef}
            style={{
              width: 1000,
              minHeight: 707,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          >
            <SelectedTemplate data={certificateData} />
          </div>
        </motion.div>
      </AnimatePresence>

      {scale < 0.95 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm"
        >
          Viewing at {Math.round(scale * 100)}% zoom for full page display
        </motion.p>
      )}
    </div>
  );
}
