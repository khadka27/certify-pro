'use client';

import { useEffect, useState } from 'react';
import { useCertificateStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Upload, X } from 'lucide-react';
import { convertImageToBase64, validateImageFile } from '@/lib/image-utils';
import { useToast } from '@/hooks/use-toast';

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
            <CardDescription>Please wait while we load your data</CardDescription>
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
    field: 'logo' | 'signature' | 'badge'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      const base64 = await convertImageToBase64(file);
      updateField(field, base64);
      toast({
        title: 'Image uploaded',
        description: 'Your image has been successfully uploaded.',
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    }
  };

  const removeImage = (field: 'logo' | 'signature' | 'badge') => {
    updateField(field, '');
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
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Certificate of Authenticity"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certNumber">Certificate Number</Label>
            <Input
              id="certNumber"
              value={certificateData.certNumber}
              onChange={(e) => updateField('certNumber', e.target.value)}
              placeholder="CERT-2026-0001"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issuedDate">Issued Date</Label>
              <Input
                id="issuedDate"
                type="date"
                value={certificateData.issuedDate}
                onChange={(e) => updateField('issuedDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={certificateData.expiryDate || ''}
                onChange={(e) => updateField('expiryDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={certificateData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Enter certificate description"
              rows={4}
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
              onChange={(e) => updateField('productName', e.target.value)}
              placeholder="Premium Product Name"
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
              onChange={(e) => updateField('personName', e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role / Designation</Label>
            <Input
              id="role"
              value={certificateData.role}
              onChange={(e) => updateField('role', e.target.value)}
              placeholder="Quality Assurance Manager"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={certificateData.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder="Your Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={certificateData.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="New York, USA"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding Assets</CardTitle>
          <CardDescription>Upload logo, signature, and badge images</CardDescription>
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
                  onClick={() => removeImage('logo')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
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
                  onClick={() => removeImage('signature')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'signature')}
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
                  onClick={() => removeImage('badge')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'badge')}
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
          <CardTitle>Additional Options</CardTitle>
          <CardDescription>Optional QR code and other features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qrText">QR Code Text (Optional)</Label>
            <Input
              id="qrText"
              value={certificateData.qrText || ''}
              onChange={(e) => updateField('qrText', e.target.value)}
              placeholder="URL or text for QR code"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
