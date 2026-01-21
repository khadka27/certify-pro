"use client";

import Navbar from "@/components/layout/Navbar";
import CertificateForm from "@/components/editor/CertificateForm";
import CertificatePreview from "@/components/preview/CertificatePreview";
import TemplateSelector from "@/components/preview/TemplateSelector";
import ExportButtons from "@/components/preview/ExportButtons";
import FileImporter from "@/components/editor/FileImporter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none"></div>

      <Navbar />
      <Toaster />

      <div className="container mx-auto px-4 py-4 lg:px-6 lg:py-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 h-[calc(100vh-6rem)]">
          {/* Left Panel - Editor */}
          <div className="flex flex-col h-full overflow-hidden min-w-0">
            <Card className="flex flex-col shadow-2xl h-full border-2 border-slate-200 bg-white/95 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-2.5 pt-3 bg-gradient-to-r from-blue-100 via-blue-50 to-slate-50 border-b-2 border-blue-200 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full shadow-md shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent truncate">
                      Certificate Editor
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5 text-slate-600 truncate">
                      Import data or customize your certificate details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0 min-h-0">
                <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100 p-0">
                  <div className="space-y-4 lg:space-y-5 p-4 lg:p-5 max-w-full">
                    <FileImporter />
                    <Separator className="my-3" />
                    <CertificateForm />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex flex-col gap-4 h-full overflow-y-auto min-w-0 pr-1 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100">
            {/* Controls Card */}
            <Card className="shadow-2xl shrink-0 border-2 border-slate-200 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-2.5 pt-3 bg-gradient-to-r from-slate-50 via-green-50 to-blue-50 border-b-2 border-green-200 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-1.5 bg-gradient-to-b from-green-600 to-green-400 rounded-full shadow-md shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg lg:text-xl font-bold bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent truncate">
                      Live Preview
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5 text-slate-600 truncate">
                      Updates in real-time as you make changes
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 pb-4">
                {/* Template Selector */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-blue-600 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Choose Template
                    </h3>
                  </div>
                  <TemplateSelector />
                </div>

                <Separator className="my-1" />

                {/* Export Buttons */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-green-600 rounded-full"></div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Export Options
                    </h3>
                  </div>
                  <ExportButtons />
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-2 border-slate-200">
              <CardHeader className="py-2.5 px-4 bg-gradient-to-r from-slate-100 to-slate-50 border-b-2 border-slate-200 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-slate-500 rounded-full shrink-0"></div>
                  <CardTitle className="text-sm font-bold text-slate-700 truncate">
                    Certificate Preview
                  </CardTitle>
                  <div className="ml-auto shrink-0">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                      Live
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 lg:p-5 bg-gradient-to-br from-slate-50 via-white to-slate-50">
                  <CertificatePreview />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    
  );
}
