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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Navbar />
      <Toaster />

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-5rem)]">
          <Card className="flex flex-col shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Certificate Editor</CardTitle>
              <CardDescription>
                Import data or customize your certificate by filling in the
                details below
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-6 pr-4">
                  <FileImporter />
                  <Separator />
                  <CertificateForm />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6 h-full">
            <Card className="shadow-xl shrink-0">
              <CardHeader>
                <CardTitle className="text-2xl">Live Preview</CardTitle>
                <CardDescription>
                  Your certificate updates in real-time as you make changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <TemplateSelector />
                <Separator />
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Export Certificate</h3>
                  <ExportButtons />
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 overflow-hidden shadow-xl min-h-0 bg-slate-100/20">
              <ScrollArea className="h-full w-full">
                <CertificatePreview />
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
