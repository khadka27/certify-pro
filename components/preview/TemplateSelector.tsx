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
  {
    id: 13,
    name: "Standard Professional",
    preview: "bg-white border-blue-900 border-8",
  },
  {
    id: 14,
    name: "Authority Verified",
    preview: "bg-[#1e3a8a] border-b-[20px] border-yellow-400",
  },
];

export default function TemplateSelector() {
  const selectedTemplate = useCertificateStore(
    (state) => state.records[state.activeRecordIndex].selectedTemplate,
  );
  const updateGlobalField = useCertificateStore(
    (state) => state.updateGlobalField,
  );
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
    <div className="relative">
      {/* Navigation Arrows */}
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-white/95 backdrop-blur-sm border-2 hover:bg-white hover:scale-110 transition-all"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-white/95 backdrop-blur-sm border-2 hover:bg-white hover:scale-110 transition-all"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent scroll-smooth px-1"
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex-none"
          >
            <Card
              className={`cursor-pointer transition-all w-[110px] ${
                selectedTemplate === template.id
                  ? "ring-2 ring-blue-500 shadow-xl border-blue-500 bg-blue-50"
                  : "hover:shadow-lg hover:border-blue-300 bg-white"
              }`}
              onClick={() => updateGlobalField("selectedTemplate", template.id)}
            >
              <CardContent className="p-2.5 space-y-2">
                <div
                  className={`h-[70px] rounded-md border-2 ${template.preview} relative overflow-hidden shadow-sm`}
                >
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-600/20 backdrop-blur-[1px]">
                      <div className="bg-blue-600 rounded-full p-1.5 shadow-lg ring-2 ring-white">
                        <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-center font-bold tracking-tight leading-tight text-slate-700 line-clamp-2 h-[18px]">
                  {template.name.toUpperCase()}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
