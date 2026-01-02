"use client";

import { useEffect, useState, useRef } from "react";
import { useCertificateStore } from "@/lib/store";
import { motion } from "framer-motion";
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
];

export default function CertificatePreview() {
  const certificateData = useCertificateStore((state) => state.certificateData);
  const hasHydrated = useCertificateStore((state) => state._hasHydrated);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const certificateWidth = 1000;
        const padding = 64;
        const availableWidth = containerWidth - padding;
        const newScale = Math.min(availableWidth / certificateWidth, 1);
        setScale(newScale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [mounted]);

  if (!mounted || !hasHydrated) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-[1000px] h-[707px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Loading preview...</p>
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
      className="flex items-center justify-center p-4 md:p-8 w-full overflow-hidden min-h-[400px]"
    >
      <div
        style={{
          width: Math.max(1000 * scale, 0),
          height: Math.max(707 * scale, 0),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <motion.div
          key={certificateData.selectedTemplate}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          id="certificate-preview"
          style={{
            width: 1000,
            height: 707,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            position: "absolute",
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
          }}
        >
          <SelectedTemplate data={certificateData} />
        </motion.div>
      </div>
    </div>
  );
}
