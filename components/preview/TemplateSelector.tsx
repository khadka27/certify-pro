import { useCertificateStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: 1,
    name: "Classic Gold",
    preview: "bg-linear-to-br from-amber-100 to-yellow-100 border-amber-600",
  },
  {
    id: 2,
    name: "Modern Blue",
    preview: "bg-linear-to-br from-blue-100 to-cyan-100 border-blue-600",
  },
  {
    id: 3,
    name: "Elegant Dark",
    preview: "bg-linear-to-br from-slate-800 to-slate-900 border-amber-500",
  },
  {
    id: 4,
    name: "Fresh Green",
    preview: "bg-linear-to-br from-emerald-100 to-teal-100 border-emerald-600",
  },
  {
    id: 5,
    name: "Luxury Rose",
    preview: "bg-linear-to-br from-rose-100 to-pink-100 border-rose-600",
  },
  {
    id: 6,
    name: "Professional Slate",
    preview: "bg-linear-to-r from-slate-800 to-white border-slate-800",
  },
  {
    id: 7,
    name: "Vibrant Orange",
    preview: "bg-linear-to-br from-orange-100 to-amber-100 border-orange-600",
  },
  { id: 8, name: "Corporate Teal", preview: "bg-white border-teal-600" },
  {
    id: 9,
    name: "Traditional Gray",
    preview: "bg-white border-gray-800 border-double",
  },
  {
    id: 10,
    name: "Premium Violet",
    preview: "bg-linear-to-br from-violet-900 to-fuchsia-900 border-violet-400",
  },
  {
    id: 11,
    name: "Professional Certificate",
    preview: "bg-white border-blue-600 border-8",
  },
  {
    id: 12,
    name: "Official Authentic",
    preview: "bg-slate-50 border-red-800 border-4",
  },
];

export default function TemplateSelector() {
  const selectedTemplate = useCertificateStore(
    (state) => state.certificateData.selectedTemplate
  );
  const updateField = useCertificateStore((state) => state.updateField);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-4 relative group">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Select Template</h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 transition-opacity ${
              showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`h-8 w-8 transition-opacity ${
              showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 pb-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-none"
          >
            <Card
              className={`cursor-pointer transition-all w-32 ${
                selectedTemplate === template.id
                  ? "ring-2 ring-primary shadow-lg border-primary"
                  : "hover:shadow-md"
              }`}
              onClick={() => updateField("selectedTemplate", template.id)}
            >
              <CardContent className="p-3 space-y-2">
                <div
                  className={`h-20 rounded border-2 ${template.preview} relative overflow-hidden`}
                >
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                      <div className="bg-primary rounded-full p-1 shadow-sm">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-center font-bold tracking-tight uppercase truncate">
                  {template.name}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
