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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, X, Building2, UserCheck, Globe, Loader2, Award } from "lucide-react";
import { convertImageToBase64, validateImageFile } from "@/lib/image-utils";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";
import { Switch } from "@/components/ui/switch";

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

  // Settings state for dynamic dropdowns
  interface SettingsCompany {
    id: string;
    name: string;
    url: string;
    logo: string;
  }
  interface SettingsSigner {
    id: string;
    name: string;
    role: string;
    signature: string;
  }
  interface SettingsBadge {
    id: string;
    name: string;
    image: string;
  }
  const [companies, setCompanies] = useState<SettingsCompany[]>([]);
  const [signers, setSigners] = useState<SettingsSigner[]>([]);
  const [badges, setBadges] = useState<SettingsBadge[]>([]);

  useEffect(() => {
    setMounted(true);
    // Fetch settings for dropdowns
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.companies) setCompanies(data.companies);
        if (data.signers) setSigners(data.signers);
        if (data.badges) setBadges(data.badges);

        // Apply global defaults if record is fresh/default
        if (data.defaultRating && certificateData.overallExpertRating === "9.8") {
          updateGlobalField("overallExpertRating", data.defaultRating);
        }
      })
      .catch((err) => console.error("Failed to load settings", err));
  }, []);

  if (!mounted || !hasHydrated) {
    return (
      <div className="space-y-6">
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
                    onChange={(e) => handleImageUpload(e, "signature", true)}
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
            <div className="space-y-3 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                Badge / Stamp
              </Label>

              {/* Current badge preview */}
              {certificateData.badge && (
                <div className="flex items-center gap-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="relative">
                    <img
                      src={certificateData.badge}
                      alt="Current Badge"
                      className="h-16 w-16 object-contain border rounded-md bg-white p-1"
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
                  <div className="text-sm">
                    <p className="font-medium text-slate-700">Current Badge</p>
                    <p className="text-slate-500 text-xs">Click X to remove</p>
                  </div>
                </div>
              )}

              {/* Badge selector from settings */}
              {badges.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">
                    Select from saved badges:
                  </Label>
                  <Select
                    onValueChange={(badgeId) => {
                      const matchedBadge = badges.find((b) => b.id === badgeId);
                      if (matchedBadge && matchedBadge.image) {
                        updateGlobalField("badge", matchedBadge.image);
                        toast({
                          title: "Badge Applied",
                          description: `${matchedBadge.name} set as certificate badge.`,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full bg-white border-slate-200 hover:border-amber-400 transition-colors">
                      <SelectValue placeholder="Choose a badge from settings..." />
                    </SelectTrigger>
                    <SelectContent>
                      {badges.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Manual upload */}
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
                  className="cursor-pointer flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-accent text-center flex-1 justify-center"
                >
                  <Upload className="h-4 w-4" /> Upload Custom Badge
                </Label>
              </div>

              {badges.length === 0 && !certificateData.badge && (
                <p className="text-xs text-slate-400">
                  No badges saved.{" "}
                  <a href="/settings" className="text-blue-600 hover:underline">
                    Add badges in Settings
                  </a>
                </p>
              )}
            </div>
            <div className="space-y-3 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-600" />
                Watermark / Badge
              </Label>
              <div className="flex items-center gap-4">
                <Switch
                  checked={certificateData.showWatermark || false}
                  onCheckedChange={(checked) =>
                    updateGlobalField("showWatermark", checked)
                  }
                />
                <span className="text-sm text-muted-foreground">
                  {certificateData.showWatermark
                    ? "Watermark Enabled"
                    : "Watermark Disabled"}
                </span>
              </div>

              {/* Current watermark preview */}
              {(certificateData.watermark || certificateData.logo) && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border">
                  <div className="relative">
                    <img
                      src={certificateData.watermark || certificateData.logo}
                      alt="Current Watermark"
                      className="h-16 w-16 object-contain border rounded-md bg-white p-1"
                    />
                    {certificateData.watermark && (
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5"
                        onClick={() => removeImage("watermark", true)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-slate-700">
                      Current Watermark
                    </p>
                    <p className="text-slate-500 text-xs">
                      {certificateData.watermark
                        ? "Custom uploaded"
                        : "Using company logo"}
                    </p>
                  </div>
                </div>
              )}

              {/* Badge selector from settings */}
              {badges.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs text-slate-500">
                    Select from saved badges:
                  </Label>
                  <Select
                    onValueChange={(badgeId) => {
                      const matchedBadge = badges.find((b) => b.id === badgeId);
                      if (matchedBadge && matchedBadge.image) {
                        updateGlobalField("watermark", matchedBadge.image);
                        toast({
                          title: "Badge Applied",
                          description: `${matchedBadge.name} set as watermark.`,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-full bg-white border-slate-200 hover:border-purple-400 transition-colors">
                      <SelectValue placeholder="Choose a badge..." />
                    </SelectTrigger>
                    <SelectContent>
                      {badges.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Manual upload */}
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "watermark", true)}
                  className="hidden"
                  id="watermark-upload"
                />
                <Label
                  htmlFor="watermark-upload"
                  className="cursor-pointer flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-accent text-center flex-1 justify-center"
                >
                  <Upload className="h-4 w-4" /> Upload Custom Watermark
                </Label>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                Select Company (Global)
              </Label>
              {companies.length > 0 ? (
                <Select
                  onValueChange={(companyId) => {
                    const matchedCompany = companies.find(
                      (c) => c.id === companyId,
                    );
                    if (matchedCompany) {
                      updateGlobalField("companyUrl", matchedCompany.url);
                      if (matchedCompany.logo) {
                        updateGlobalField("logo", matchedCompany.logo);
                      }
                      if (matchedCompany.name) {
                        updateGlobalField(
                          "manufacturerName",
                          matchedCompany.name,
                        );
                      }
                      toast({
                        title: "Company Assets Loaded",
                        description: `Logo and name for ${matchedCompany.name} applied.`,
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 hover:border-blue-400 transition-colors">
                    <SelectValue placeholder="Choose a company..." />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-slate-500 p-3 bg-slate-50 rounded-md border border-dashed border-slate-300">
                  No companies configured.{" "}
                  <a href="/settings" className="text-blue-600 hover:underline">
                    Add companies in Settings
                  </a>
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
                onChange={(e) => updateGlobalField("buyNowUrl", e.target.value)}
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
              <Label className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-green-600" />
                Select Signer
              </Label>
              {signers.length > 0 ? (
                <Select
                  onValueChange={(signerId) => {
                    const matchedSigner = signers.find(
                      (s) => s.id === signerId,
                    );
                    if (matchedSigner) {
                      updateGlobalField("personName", matchedSigner.name);
                      if (matchedSigner.signature) {
                        updateGlobalField("signature", matchedSigner.signature);
                      }
                      if (matchedSigner.role) {
                        updateGlobalField("role", matchedSigner.role);
                      }
                      toast({
                        title: "Signer Assets Loaded",
                        description: `Signature and role for ${matchedSigner.name} applied.`,
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-full bg-white border-slate-200 hover:border-green-400 transition-colors">
                    <SelectValue placeholder="Choose a signer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {signers.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-slate-500 p-3 bg-slate-50 rounded-md border border-dashed border-slate-300">
                  No signers configured.{" "}
                  <a href="/settings" className="text-blue-600 hover:underline">
                    Add signers in Settings
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Signer Role</Label>
              <Input
                name="role"
                value={certificateData.role}
                onChange={(e) => updateGlobalField("role", e.target.value)}
                className="border-slate-200 focus:border-green-400"
                placeholder="e.g. Chief Quality Officer"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Location (Origin)</Label>
            <Input
              name="location"
              value={certificateData.location}
              onChange={(e) => updateGlobalField("location", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4 py-2">
        <Separator className="flex-1" />
        <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Specific Details
        </span>
        <Separator className="flex-1" />
      </div>

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
            <div className="relative w-full max-w-full">
              <div className="flex flex-nowrap gap-3 overflow-x-auto pb-4 px-1 w-full scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100">
                {records.map((r, i) => (
                  <Button
                    key={i}
                    variant={activeRecordIndex === i ? "default" : "outline"}
                    className={`shrink-0 w-40 h-auto py-3 flex flex-col items-start gap-1 transition-all ${
                      activeRecordIndex === i
                        ? "bg-blue-600 hover:bg-blue-700 shadow-md ring-2 ring-blue-600 ring-offset-2"
                        : "hover:border-blue-400 hover:bg-blue-50 bg-white"
                    }`}
                    onClick={() => setActiveRecordIndex(i)}
                  >
                    <span className="text-[10px] opacity-70 font-medium uppercase tracking-wider">
                      Certificate {i + 1}
                    </span>
                    <span className="font-bold text-xs truncate w-full text-left">
                      {r.productName || r.certNumber || "Untitled"}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Identity */}
      <Card>
        <CardHeader>
          <CardTitle>Product Identity</CardTitle>
          <CardDescription>
            Basic identification details for this record
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>Product Image (Record Specific)</Label>
              {certificateData.productImage ? (
                <div className="relative inline-block">
                  <img
                    src={certificateData.productImage}
                    alt="Product"
                    className="h-32 w-auto border rounded-md object-contain bg-white"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 shadow-md"
                    onClick={() => removeImage("productImage")}
                  >
                    <X className="h-4 w-4" />
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
                    className="cursor-pointer flex flex-col items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg text-sm hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 w-full transition-all group"
                  >
                    <div className="p-2 bg-slate-100 rounded-full group-hover:bg-blue-100 transition-colors">
                      <Upload className="h-6 w-6 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <div className="text-center">
                      <span className="font-semibold">Click to upload</span>
                      <p className="text-xs text-muted-foreground mt-1">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  </Label>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  name="productName"
                  value={certificateData.productName}
                  onChange={(e) => updateField("productName", e.target.value)}
                  placeholder="e.g. Premium Health Supplement"
                />
              </div>
              <div className="space-y-2">
                <Label>Certificate Number</Label>
                <Input
                  name="certNumber"
                  value={certificateData.certNumber}
                  onChange={(e) => updateField("certNumber", e.target.value)}
                  placeholder="e.g. CERT-2024-001"
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
                  placeholder="e.g. Active, Pending"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Specifications & Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>Issue Date (UTC)</Label>
              <Input
                name="issuedDate"
                type="date"
                value={certificateData.issuedDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  updateField("issuedDate", newDate);
                  if (newDate) {
                    const parts = newDate.split("-");
                    if (parts.length === 3) {
                      const year = parseInt(parts[0]);
                      const expiryDate = `${year + 3}-${parts[1]}-${parts[2]}`;
                      updateField("expiryDate", expiryDate);
                    }
                  }
                }}
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
                placeholder="e.g. Electronics, Health"
                onChange={(e) => updateField("productCategory", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Product Form</Label>
              <Input
                name="productForm"
                value={certificateData.productForm || ""}
                placeholder="e.g. Box, Bottle, Unit"
                onChange={(e) => updateField("productForm", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Product Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label className="sr-only">Description</Label>
            <RichTextEditor
              content={certificateData.description}
              onChange={(content) => updateField("description", content)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Standards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>Certifications and Approvals</Label>
              <Input
                name="certificationsAndApprovals"
                value={certificateData.certificationsAndApprovals || ""}
                onChange={(e) =>
                  updateField("certificationsAndApprovals", e.target.value)
                }
                placeholder="e.g. ISO 9001, FDA Approved"
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
                placeholder="e.g. Lab Tested, Verified"
              />
            </div>
            <div className="space-y-2">
              <Label>Key Ingredients</Label>
              <Input
                name="keyActiveIngredients"
                value={certificateData.keyActiveIngredients || ""}
                onChange={(e) =>
                  updateField("keyActiveIngredients", e.target.value)
                }
                placeholder="Comma separated list"
              />
            </div>
            <div className="space-y-2">
              <Label>Dietary Compliance</Label>
              <Input
                name="dietaryCompliance"
                value={certificateData.dietaryCompliance || ""}
                onChange={(e) =>
                  updateField("dietaryCompliance", e.target.value)
                }
                placeholder="e.g. Vegan, Gluten-Free"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Ratings</CardTitle>
          <CardDescription>Enter values (e.g. 0-100 or 0-10)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
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
                <Label
                  className="text-xs font-semibold text-muted-foreground truncate"
                  title={item.l}
                >
                  {item.l}
                </Label>
                <Input
                  name={item.f}
                  type="number"
                  className="h-9"
                  placeholder="-"
                  value={(certificateData as any)[item.f] || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const field = item.f as string;
                    updateField(field as any, val);

                    // Auto-calculate Overall Rating
                    if (field !== "overallExpertRating") {
                      const ratingFields = [
                        "safetyRating",
                        "effectivenessRating",
                        "ingredientsQualityRating",
                        "certificationsQCRating",
                        "valueForMoneyRating",
                        "evidenceStrengthRating",
                        "userExperienceRating",
                        "versatilityUseCaseFit",
                      ];

                      let sum = 0;
                      let count = 0;

                      ratingFields.forEach((rField) => {
                        let rVal = 0;
                        if (rField === field) {
                          rVal = parseFloat(val);
                        } else {
                          rVal = parseFloat((certificateData as any)[rField]);
                        }

                        if (!isNaN(rVal) && rVal > 0) {
                          sum += rVal;
                          count++;
                        }
                      });

                      if (count > 0) {
                        const avg = sum / count;
                        // Ensure max 10 and 1 decimal place
                        const finalAvg = Math.min(avg, 10).toFixed(1);
                        updateField("overallExpertRating", finalAvg);
                      }
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verdict & Safety */}
      <Card>
        <CardHeader>
          <CardTitle>Verdict & Safety Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Side Effects (If Any)</Label>
              <Input
                name="sideEffects"
                value={certificateData.sideEffects || ""}
                onChange={(e) => updateField("sideEffects", e.target.value)}
                placeholder="None or list effects"
              />
            </div>
            <div className="space-y-2">
              <Label>Cautions</Label>
              <Input
                name="cautions"
                value={certificateData.cautions || ""}
                onChange={(e) => updateField("cautions", e.target.value)}
                placeholder="General warnings"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Final Certification Verdict</Label>
              <Input
                name="finalVerdict"
                className="font-bold"
                value={certificateData.finalVerdict || ""}
                onChange={(e) => updateField("finalVerdict", e.target.value)}
                placeholder="e.g. APPROVED, GOLD STANDARD"
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
                placeholder="Short verification text"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Expert Rating Text</Label>
              <Input
                name="expertRating"
                value={certificateData.expertRating || ""}
                onChange={(e) => updateField("expertRating", e.target.value)}
                placeholder="e.g. 9.8/10 Excellent"
              />
            </div>
            <div className="space-y-2">
              <Label>QR Code Text (Optional)</Label>
              <Input
                name="qrText"
                value={certificateData.qrText || ""}
                onChange={(e) => updateField("qrText", e.target.value)}
                placeholder="URL or Text for QR"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
