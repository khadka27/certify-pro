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

export default function CertificateForm() {
  const certificateData = useCertificateStore((state) => state.certificateData);
  const updateField = useCertificateStore((state) => state.updateField);
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
    field: "logo" | "signature" | "badge" | "watermark",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      const base64 = await convertImageToBase64(file);
      updateField(field, base64);
      toast({
        title: "Image uploaded",
        description: "Your image has been successfully uploaded.",
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

  const removeImage = (field: "logo" | "signature" | "badge" | "watermark") => {
    updateField(field, "");
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-4">
      <Card>
        <CardHeader>
          <CardTitle>Certificate Information</CardTitle>
          <CardDescription>Basic details for your certificate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Certificate Title</Label>
            <Input
              id="title"
              value={certificateData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Certificate of Authenticity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subTitle">Certificate Subtitle / Label</Label>
            <Input
              id="subTitle"
              value={certificateData.subTitle || ""}
              onChange={(e) => updateField("subTitle", e.target.value)}
              placeholder="Official Product Certification"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certNumber">Certificate Number</Label>
            <Input
              id="certNumber"
              value={certificateData.certNumber}
              onChange={(e) => updateField("certNumber", e.target.value)}
              placeholder="CERT-2026-0001"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="certifiedBy">Certified By</Label>
              <Input
                id="certifiedBy"
                value={certificateData.certifiedBy || ""}
                onChange={(e) => updateField("certifiedBy", e.target.value)}
                placeholder="Authoritative Body"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certificationStatus">Status</Label>
              <Input
                id="certificationStatus"
                value={certificateData.certificationStatus || ""}
                onChange={(e) =>
                  updateField("certificationStatus", e.target.value)
                }
                placeholder="Active"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issuedDate">Issued Date</Label>
              <Input
                id="issuedDate"
                type="date"
                value={certificateData.issuedDate}
                onChange={(e) => updateField("issuedDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={certificateData.expiryDate || ""}
                onChange={(e) => updateField("expiryDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Word-like Editor)</Label>
            <RichTextEditor
              content={certificateData.description}
              onChange={(content) => updateField("description", content)}
              placeholder="Enter certificate description. Use the toolbar to format your text."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Details about the certified product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={certificateData.productName}
              onChange={(e) => updateField("productName", e.target.value)}
              placeholder="Premium Product Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productCategory">Category</Label>
              <Input
                id="productCategory"
                value={certificateData.productCategory || ""}
                onChange={(e) => updateField("productCategory", e.target.value)}
                placeholder="Health & Wellness"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productForm">Form</Label>
              <Input
                id="productForm"
                value={certificateData.productForm || ""}
                onChange={(e) => updateField("productForm", e.target.value)}
                placeholder="Capsules"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyActiveIngredients">Key Active Ingredients</Label>
            <Input
              id="keyActiveIngredients"
              value={certificateData.keyActiveIngredients || ""}
              onChange={(e) =>
                updateField("keyActiveIngredients", e.target.value)
              }
              placeholder="Vitamin C, Zinc..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dietaryCompliance">Dietary Compliance</Label>
              <Input
                id="dietaryCompliance"
                value={certificateData.dietaryCompliance || ""}
                onChange={(e) =>
                  updateField("dietaryCompliance", e.target.value)
                }
                placeholder="Vegan, Gluten-Free"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sideEffects">Side Effects</Label>
              <Input
                id="sideEffects"
                value={certificateData.sideEffects || ""}
                onChange={(e) => updateField("sideEffects", e.target.value)}
                placeholder="None reported"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cautions">Cautions</Label>
            <Input
              id="cautions"
              value={certificateData.cautions || ""}
              onChange={(e) => updateField("cautions", e.target.value)}
              placeholder="Consult a physician if pregnant"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certification Authority</CardTitle>
          <CardDescription>Person and organization details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personName">Person Name</Label>
            <Input
              id="personName"
              value={certificateData.personName}
              onChange={(e) => updateField("personName", e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role / Designation</Label>
            <Input
              id="role"
              value={certificateData.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Quality Assurance Manager"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={certificateData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Your Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturerAddress">Manufacturer Address</Label>
            <Input
              id="manufacturerAddress"
              value={certificateData.manufacturerAddress || ""}
              onChange={(e) =>
                updateField("manufacturerAddress", e.target.value)
              }
              placeholder="123 Business Rd, Innovation City"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={certificateData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="New York, USA"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ratings & Analysis</CardTitle>
          <CardDescription>Expert ratings and quality metrics</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="overallExpertRating">Overall Expert Rating</Label>
            <Input
              id="overallExpertRating"
              value={certificateData.overallExpertRating || ""}
              onChange={(e) =>
                updateField("overallExpertRating", e.target.value)
              }
              placeholder="9.8/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="safetyRating">Safety</Label>
            <Input
              id="safetyRating"
              value={certificateData.safetyRating || ""}
              onChange={(e) => updateField("safetyRating", e.target.value)}
              placeholder="10/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="effectivenessRating">Effectiveness</Label>
            <Input
              id="effectivenessRating"
              value={certificateData.effectivenessRating || ""}
              onChange={(e) =>
                updateField("effectivenessRating", e.target.value)
              }
              placeholder="9.5/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredientsQualityRating">
              Ingredients Quality
            </Label>
            <Input
              id="ingredientsQualityRating"
              value={certificateData.ingredientsQualityRating || ""}
              onChange={(e) =>
                updateField("ingredientsQualityRating", e.target.value)
              }
              placeholder="9.9/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificationsQCRating">Certifications QC</Label>
            <Input
              id="certificationsQCRating"
              value={certificateData.certificationsQCRating || ""}
              onChange={(e) =>
                updateField("certificationsQCRating", e.target.value)
              }
              placeholder="10/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valueForMoneyRating">Value for Money</Label>
            <Input
              id="valueForMoneyRating"
              value={certificateData.valueForMoneyRating || ""}
              onChange={(e) =>
                updateField("valueForMoneyRating", e.target.value)
              }
              placeholder="9.0/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="evidenceStrengthRating">Evidence Strength</Label>
            <Input
              id="evidenceStrengthRating"
              value={certificateData.evidenceStrengthRating || ""}
              onChange={(e) =>
                updateField("evidenceStrengthRating", e.target.value)
              }
              placeholder="High"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userExperienceRating">User Experience</Label>
            <Input
              id="userExperienceRating"
              value={certificateData.userExperienceRating || ""}
              onChange={(e) =>
                updateField("userExperienceRating", e.target.value)
              }
              placeholder="Excellent"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="versatilityUseCaseFit">
              Versatility & Use Case Fit
            </Label>
            <Input
              id="versatilityUseCaseFit"
              value={certificateData.versatilityUseCaseFit || ""}
              onChange={(e) =>
                updateField("versatilityUseCaseFit", e.target.value)
              }
              placeholder="Versatile"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification & Verdict</CardTitle>
          <CardDescription>Final assessment and policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="finalVerdict">Final Certification Verdict</Label>
            <Input
              id="finalVerdict"
              value={certificateData.finalVerdict || ""}
              onChange={(e) => updateField("finalVerdict", e.target.value)}
              placeholder="Highly Recommended"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verificationStatement">
              Verification Statement
            </Label>
            <Input
              id="verificationStatement"
              value={certificateData.verificationStatement || ""}
              onChange={(e) =>
                updateField("verificationStatement", e.target.value)
              }
              placeholder="Verified by..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certificationsAndApprovals">
              Certifications and Approvals
            </Label>
            <Input
              id="certificationsAndApprovals"
              value={certificateData.certificationsAndApprovals || ""}
              onChange={(e) =>
                updateField("certificationsAndApprovals", e.target.value)
              }
              placeholder="ISO 9001, etc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thirdPartyTesting">Third-Party Testing</Label>
            <Input
              id="thirdPartyTesting"
              value={certificateData.thirdPartyTesting || ""}
              onChange={(e) => updateField("thirdPartyTesting", e.target.value)}
              placeholder="Passed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="refundPolicy">Refund Policy</Label>
            <Input
              id="refundPolicy"
              value={certificateData.refundPolicy || ""}
              onChange={(e) => updateField("refundPolicy", e.target.value)}
              placeholder="30-Day Money Back Guarantee"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact & Links</CardTitle>
          <CardDescription>Support and purchase information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerSupportEmail">Support Email</Label>
              <Input
                id="customerSupportEmail"
                value={certificateData.customerSupportEmail || ""}
                onChange={(e) =>
                  updateField("customerSupportEmail", e.target.value)
                }
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerSupportPhone">Support Phone</Label>
              <Input
                id="customerSupportPhone"
                value={certificateData.customerSupportPhone || ""}
                onChange={(e) =>
                  updateField("customerSupportPhone", e.target.value)
                }
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="buyNowUrl">Buy Now URL</Label>
            <Input
              id="buyNowUrl"
              value={certificateData.buyNowUrl || ""}
              onChange={(e) => updateField("buyNowUrl", e.target.value)}
              placeholder="https://example.com/buy"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding Assets</CardTitle>
          <CardDescription>
            Upload logo, signature, and badge images
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Company Logo</Label>
            {certificateData.logo ? (
              <div className="relative inline-block">
                <img
                  src={certificateData.logo}
                  alt="Logo"
                  className="h-20 w-auto border rounded-lg"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage("logo")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "logo")}
                  className="hidden"
                  id="logo-upload"
                />
                <Label
                  htmlFor="logo-upload"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent"
                >
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Label>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Signature</Label>
            {certificateData.signature ? (
              <div className="relative inline-block">
                <img
                  src={certificateData.signature}
                  alt="Signature"
                  className="h-20 w-auto border rounded-lg"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage("signature")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "signature")}
                  className="hidden"
                  id="signature-upload"
                />
                <Label
                  htmlFor="signature-upload"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent"
                >
                  <Upload className="h-4 w-4" />
                  Upload Signature
                </Label>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Badge / Stamp</Label>
            {certificateData.badge ? (
              <div className="relative inline-block">
                <img
                  src={certificateData.badge}
                  alt="Badge"
                  className="h-20 w-auto border rounded-lg"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage("badge")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "badge")}
                  className="hidden"
                  id="badge-upload"
                />
                <Label
                  htmlFor="badge-upload"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent"
                >
                  <Upload className="h-4 w-4" />
                  Upload Badge
                </Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Watermark (Optional)</CardTitle>
          <CardDescription>
            Add a watermark to your certificate (appears as a faded background)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showWatermark">Show Watermark</Label>
              <p className="text-sm text-muted-foreground">
                Display watermark on the certificate
              </p>
            </div>
            <Switch
              id="showWatermark"
              checked={certificateData.showWatermark || false}
              onCheckedChange={(checked) =>
                updateField("showWatermark", checked)
              }
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Watermark Image</Label>
            {certificateData.watermark ? (
              <div className="relative inline-block">
                <img
                  src={certificateData.watermark}
                  alt="Watermark"
                  className="h-20 w-auto border rounded-lg"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => removeImage("watermark")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "watermark")}
                  className="hidden"
                  id="watermark-upload"
                />
                <Label
                  htmlFor="watermark-upload"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent"
                >
                  <Upload className="h-4 w-4" />
                  Upload Watermark
                </Label>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Watermark will be displayed as a faded background image on your
              certificate
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Options</CardTitle>
          <CardDescription>Optional QR code and other features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qrText">QR Code Text (Optional)</Label>
            <Input
              id="qrText"
              value={certificateData.qrText || ""}
              onChange={(e) => updateField("qrText", e.target.value)}
              placeholder="URL or text for QR code"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
