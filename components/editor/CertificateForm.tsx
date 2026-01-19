"use client";

import { useEffect, useState } from "react";
import { useCertificateStore } from "@/lib/store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Upload, X } from "lucide-react";
import { convertImageToBase64, validateImageFile } from "@/lib/image-utils";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CertificateForm() {
  const records = useCertificateStore((state) => state.records);
  const activeRecordIndex = useCertificateStore(
    (state) => state.activeRecordIndex,
  );
  const certificateData = records[activeRecordIndex];

  const updateField = useCertificateStore((state) => state.updateField);
  const updateGlobalField = useCertificateStore(
    (state) => state.updateGlobalField,
  );
  const setActiveRecordIndex = useCertificateStore(
    (state) => state.setActiveRecordIndex,
  );
  const resetData = useCertificateStore((state) => state.resetData);

  const hasHydrated = useCertificateStore((state) => state._hasHydrated);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasHydrated) {
    return (
      <div className="space-y-6 h-full overflow-y-auto pr-4">
        <Card>
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>
              Please wait while we load your data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-100 animate-pulse rounded"></div>
            <div className="h-32 bg-gray-100 animate-pulse rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "signature" | "badge" | "watermark" | "productImage",
    isGlobal: boolean = false,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      const base64 = await convertImageToBase64(file);
      if (isGlobal && field !== "productImage") {
        updateGlobalField(field, base64);
      } else {
        updateField(field, base64);
      }
      toast({
        title: "Image uploaded",
        description: `Your ${field} has been successfully uploaded.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  const removeImage = (
    field: "logo" | "signature" | "badge" | "watermark" | "productImage",
    isGlobal: boolean = false,
  ) => {
    if (isGlobal && field !== "productImage") {
      updateGlobalField(field, "");
    } else {
      updateField(field, "");
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <Card className="border-2 bg-gradient-to-r from-blue-50/50 to-slate-50/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 lg:py-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg lg:text-xl">
                Batch Manager
              </CardTitle>
              {records.length > 1 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {records.length}
                </span>
              )}
            </div>
            <CardDescription className="text-xs">
              {records.length > 1
                ? `Managing ${records.length} certificates`
                : "Configure your certificate details"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetData}
              className="text-xs"
            >
              Reset All
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="record" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="global" className="text-xs lg:text-sm">
            Common Settings
          </TabsTrigger>
          <TabsTrigger value="record" className="text-xs lg:text-sm">
            Specific Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-6">
          {/* Global Branding */}
          <Card>
            <CardHeader>
              <CardTitle>Global Branding & Assets</CardTitle>
              <CardDescription>
                Changes here apply to all certificates in this batch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  {certificateData.logo ? (
                    <div className="relative inline-block">
                      <img
                        src={certificateData.logo}
                        alt="Logo"
                        className="h-16 w-auto border rounded-md"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5"
                        onClick={() => removeImage("logo", true)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "logo", true)}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Label
                        htmlFor="logo-upload"
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent text-center w-full"
                      >
                        <Upload className="h-4 w-4" /> Upload Logo
                      </Label>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Signature</Label>
                  {certificateData.signature ? (
                    <div className="relative inline-block">
                      <img
                        src={certificateData.signature}
                        alt="Signature"
                        className="h-16 w-auto border rounded-md"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5"
                        onClick={() => removeImage("signature", true)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, "signature", true)
                        }
                        className="hidden"
                        id="signature-upload"
                      />
                      <Label
                        htmlFor="signature-upload"
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent text-center w-full"
                      >
                        <Upload className="h-4 w-4" /> Upload Signature
                      </Label>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Badge / Stamp</Label>
                  {certificateData.badge ? (
                    <div className="relative inline-block">
                      <img
                        src={certificateData.badge}
                        alt="Badge"
                        className="h-16 w-auto border rounded-md"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5"
                        onClick={() => removeImage("badge", true)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "badge", true)}
                        className="hidden"
                        id="badge-upload"
                      />
                      <Label
                        htmlFor="badge-upload"
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent text-center w-full"
                      >
                        <Upload className="h-4 w-4" /> Upload Badge
                      </Label>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Watermark</Label>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={certificateData.showWatermark || false}
                      onCheckedChange={(checked) =>
                        updateGlobalField("showWatermark", checked)
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      Enabled
                    </span>
                  </div>
                  {certificateData.watermark ? (
                    <div className="relative inline-block mt-2">
                      <img
                        src={certificateData.watermark}
                        alt="Watermark"
                        className="h-16 w-auto border rounded-md opacity-50"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5"
                        onClick={() => removeImage("watermark", true)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, "watermark", true)
                        }
                        className="hidden"
                        id="watermark-upload"
                      />
                      <Label
                        htmlFor="watermark-upload"
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent text-center w-full"
                      >
                        <Upload className="h-4 w-4" /> Upload Watermark
                      </Label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global Text Info */}
          <Card>
            <CardHeader>
              <CardTitle>Global Company & Authority Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Certificate Title</Label>
                  <Input
                    name="title"
                    value={certificateData.title}
                    onChange={(e) => updateGlobalField("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Certified By</Label>
                  <Input
                    name="certifiedBy"
                    value={certificateData.certifiedBy || ""}
                    onChange={(e) =>
                      updateGlobalField("certifiedBy", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Manufacturer Name</Label>
                <Input
                  name="manufacturerName"
                  value={certificateData.manufacturerName}
                  onChange={(e) =>
                    updateGlobalField("manufacturerName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Manufacturer Address</Label>
                <Input
                  name="manufacturerAddress"
                  value={certificateData.manufacturerAddress || ""}
                  onChange={(e) =>
                    updateGlobalField("manufacturerAddress", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input
                    name="customerSupportEmail"
                    value={certificateData.customerSupportEmail || ""}
                    onChange={(e) =>
                      updateGlobalField("customerSupportEmail", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Support Phone</Label>
                  <Input
                    name="customerSupportPhone"
                    value={certificateData.customerSupportPhone || ""}
                    onChange={(e) =>
                      updateGlobalField("customerSupportPhone", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Buy Now URL</Label>
                  <Input
                    name="buyNowUrl"
                    value={certificateData.buyNowUrl || ""}
                    onChange={(e) =>
                      updateGlobalField("buyNowUrl", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Refund Policy</Label>
                  <Input
                    name="refundPolicy"
                    value={certificateData.refundPolicy || ""}
                    onChange={(e) =>
                      updateGlobalField("refundPolicy", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Signer Name</Label>
                  <Input
                    name="personName"
                    value={certificateData.personName}
                    onChange={(e) =>
                      updateGlobalField("personName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Signer Role</Label>
                  <Input
                    name="role"
                    value={certificateData.role}
                    onChange={(e) => updateGlobalField("role", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location (Origin)</Label>
                <Input
                  name="location"
                  value={certificateData.location}
                  onChange={(e) =>
                    updateGlobalField("location", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="record" className="space-y-6">
          {/* Record Selector */}
          {records.length > 1 && (
            <Card className="border-2 border-amber-100 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <span className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></span>
                    Select Active Record to Edit
                  </Label>
                  <span className="text-xs bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1 rounded-full font-semibold">
                    Record {activeRecordIndex + 1} of {records.length}
                  </span>
                </div>
                <div className="relative">
                  <div className="flex flex-nowrap gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100">
                    {records.map((r, i) => (
                      <Button
                        key={i}
                        variant={
                          activeRecordIndex === i ? "default" : "outline"
                        }
                        size="sm"
                        className={`shrink-0 min-w-[140px] justify-start transition-all ${
                          activeRecordIndex === i
                            ? "bg-blue-600 hover:bg-blue-700 shadow-lg scale-105 border-2 border-blue-600"
                            : "hover:border-blue-400 hover:bg-blue-50"
                        }`}
                        onClick={() => setActiveRecordIndex(i)}
                      >
                        <div className="truncate text-left w-full">
                          <div className="text-[10px] opacity-70 font-medium">
                            Certificate {i + 1}
                          </div>
                          <div className="font-bold text-xs truncate">
                            {r.productName || r.certNumber || "Untitled"}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                  {/* Scroll indicators */}
                  <div className="absolute left-0 top-0 bottom-3 w-8 bg-gradient-to-r from-amber-50/90 to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-amber-50/90 to-transparent pointer-events-none"></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Record Specific Data */}
          <Card>
            <CardHeader>
              <CardTitle>Product Specific Details</CardTitle>
              <CardDescription>
                Unique details for this specific row data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Product Image (Record Specific)</Label>
                  {certificateData.productImage ? (
                    <div className="relative inline-block">
                      <img
                        src={certificateData.productImage}
                        alt="Product"
                        className="h-16 w-auto border rounded-md object-contain bg-white"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5"
                        onClick={() => removeImage("productImage")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "productImage")}
                        className="hidden"
                        id="product-image-upload"
                      />
                      <Label
                        htmlFor="product-image-upload"
                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent text-center w-full"
                      >
                        <Upload className="h-4 w-4" /> Upload Product Image
                      </Label>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    name="productName"
                    value={certificateData.productName}
                    onChange={(e) => updateField("productName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Certificate Number</Label>
                  <Input
                    name="certNumber"
                    value={certificateData.certNumber}
                    onChange={(e) => updateField("certNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Certification Status</Label>
                  <Input
                    name="certificationStatus"
                    value={certificateData.certificationStatus || ""}
                    onChange={(e) =>
                      updateField("certificationStatus", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issue Date (UTC)</Label>
                  <Input
                    name="issuedDate"
                    type="date"
                    value={certificateData.issuedDate}
                    onChange={(e) => updateField("issuedDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valid Until</Label>
                  <Input
                    name="expiryDate"
                    type="date"
                    value={certificateData.expiryDate || ""}
                    onChange={(e) => updateField("expiryDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Category</Label>
                  <Input
                    name="productCategory"
                    value={certificateData.productCategory || ""}
                    placeholder="Category"
                    onChange={(e) =>
                      updateField("productCategory", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Form</Label>
                  <Input
                    name="productForm"
                    value={certificateData.productForm || ""}
                    placeholder="Form"
                    onChange={(e) => updateField("productForm", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Description</Label>
                <RichTextEditor
                  content={certificateData.description}
                  onChange={(content) => updateField("description", content)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Certifications and Approvals</Label>
                  <Input
                    name="certificationsAndApprovals"
                    value={certificateData.certificationsAndApprovals || ""}
                    onChange={(e) =>
                      updateField("certificationsAndApprovals", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Third-Party Testing</Label>
                  <Input
                    name="thirdPartyTesting"
                    value={certificateData.thirdPartyTesting || ""}
                    onChange={(e) =>
                      updateField("thirdPartyTesting", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm">Key Ingredients</Label>
                  <Input
                    name="keyActiveIngredients"
                    value={certificateData.keyActiveIngredients || ""}
                    onChange={(e) =>
                      updateField("keyActiveIngredients", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Dietary Compliance</Label>
                  <Input
                    name="dietaryCompliance"
                    value={certificateData.dietaryCompliance || ""}
                    onChange={(e) =>
                      updateField("dietaryCompliance", e.target.value)
                    }
                  />
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">
                    Expert Ratings for this record
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-4">
                  {[
                    { l: "Safety", f: "safetyRating" },
                    { l: "Effectiveness", f: "effectivenessRating" },
                    { l: "Ingredients Quality", f: "ingredientsQualityRating" },
                    { l: "Certifications QC", f: "certificationsQCRating" },
                    { l: "Value for Money", f: "valueForMoneyRating" },
                    { l: "Overall Expert Rating", f: "overallExpertRating" },
                    { l: "Evidence Strength", f: "evidenceStrengthRating" },
                    { l: "User Experience", f: "userExperienceRating" },
                    { l: "Versatility UseCaseFit", f: "versatilityUseCaseFit" },
                  ].map((item) => (
                    <div key={item.f} className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold truncate">
                        {item.l}
                      </Label>
                      <Input
                        name={item.f}
                        className="h-9 text-sm"
                        value={(certificateData as any)[item.f] || ""}
                        onChange={(e) =>
                          updateField(item.f as any, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Side Effects (If Any)</Label>
                  <Input
                    name="sideEffects"
                    value={certificateData.sideEffects || ""}
                    onChange={(e) => updateField("sideEffects", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cautions</Label>
                  <Input
                    name="cautions"
                    value={certificateData.cautions || ""}
                    onChange={(e) => updateField("cautions", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Final Certification Verdict</Label>
                  <Input
                    name="finalVerdict"
                    className="font-bold"
                    value={certificateData.finalVerdict || ""}
                    onChange={(e) =>
                      updateField("finalVerdict", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Verification Statement</Label>
                  <Input
                    name="verificationStatement"
                    value={certificateData.verificationStatement || ""}
                    onChange={(e) =>
                      updateField("verificationStatement", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expert Rating</Label>
                  <Input
                    name="expertRating"
                    value={certificateData.expertRating || ""}
                    onChange={(e) =>
                      updateField("expertRating", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>QR Code Text (Optional)</Label>
                  <Input
                    name="qrText"
                    value={certificateData.qrText || ""}
                    onChange={(e) => updateField("qrText", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
