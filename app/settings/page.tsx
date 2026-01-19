"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface Company {
  id: string;
  name: string;
  url: string;
  logo: string;
}

interface Signer {
  id: string;
  name: string;
  role: string;
  signature: string;
}

interface Badge {
  id: string;
  name: string;
  image: string;
}

interface SettingsData {
  companies: Company[];
  signers: Signer[];
  badges: Badge[];
  validityYears: number;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SettingsData>({
    companies: [],
    signers: [],
    badges: [],
    validityYears: 3,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Failed to load settings", error);
      toast({
        title: "Error",
        description: "Failed to load settings data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newData: SettingsData) => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setData(newData);
        toast({
          title: "Saved",
          description: "Settings updated successfully.",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    }
  };

  const updateValidity = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num)) {
      saveSettings({ ...data, validityYears: num });
    }
  };

  // --- CRUD Helpers ---

  // Companies
  const addCompany = () => {
    const newComp: Company = {
      id: crypto.randomUUID(),
      name: "New Company",
      url: "",
      logo: "",
    };
    saveSettings({ ...data, companies: [...data.companies, newComp] });
  };
  const updateCompany = (id: string, field: keyof Company, val: string) => {
    const newComps = data.companies.map((c) =>
      c.id === id ? { ...c, [field]: val } : c,
    );
    setData({ ...data, companies: newComps }); // Optimistic
  };
  const deleteCompany = (id: string) => {
    const newComps = data.companies.filter((c) => c.id !== id);
    saveSettings({ ...data, companies: newComps });
  };
  const saveCompany = (id: string) => {
    // Trigger save for current state
    saveSettings(data);
  };

  // Signers
  const addSigner = () => {
    const newSigner: Signer = {
      id: crypto.randomUUID(),
      name: "New Signer",
      role: "",
      signature: "",
    };
    saveSettings({ ...data, signers: [...data.signers, newSigner] });
  };
  const updateSigner = (id: string, field: keyof Signer, val: string) => {
    const newSigners = data.signers.map((s) =>
      s.id === id ? { ...s, [field]: val } : s,
    );
    setData({ ...data, signers: newSigners });
  };
  const deleteSigner = (id: string) => {
    const newSigners = data.signers.filter((s) => s.id !== id);
    saveSettings({ ...data, signers: newSigners });
  };

  // Badges
  const addBadge = () => {
    const newBadge: Badge = {
      id: crypto.randomUUID(),
      name: "New Badge",
      image: "",
    };
    saveSettings({ ...data, badges: [...data.badges, newBadge] });
  };
  const updateBadge = (id: string, field: keyof Badge, val: string) => {
    const newBadges = data.badges.map((b) =>
      b.id === id ? { ...b, [field]: val } : b,
    );
    setData({ ...data, badges: newBadges });
  };
  const deleteBadge = (id: string) => {
    const newBadges = data.badges.filter((b) => b.id !== id);
    saveSettings({ ...data, badges: newBadges });
  };

  // File upload handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    category: "logos" | "signatures" | "badges",
    callback: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          callback(json.url);
          toast({
            title: "Upload Successful",
            description: "Image saved to public folder.",
          });
        }
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "Could not save image.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="container mx-auto py-8 space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your reusable assets and configurations
            </p>
          </div>
        </div>
        <Button onClick={() => saveSettings(data)} className="gap-2">
          <Save className="h-4 w-4" /> Save All Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Default Validity Period (Years)</Label>
              <Input
                type="number"
                value={data.validityYears}
                onChange={(e) => updateValidity(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Automatically sets the 'Valid Until' date when creating new
                certificates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="companies" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="companies">Companies & URLs</TabsTrigger>
          <TabsTrigger value="signers">Signers & Signatures</TabsTrigger>
          <TabsTrigger value="badges">Badges & Stamps</TabsTrigger>
        </TabsList>

        {/* --- COMPANIES TAB --- */}
        <TabsContent value="companies" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Registered Companies</h3>
            <Button onClick={addCompany} size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Company
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.companies.map((comp) => (
              <Card key={comp.id} className="bg-slate-50">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-24 h-24 bg-white border rounded-md flex items-center justify-center relative overflow-hidden shrink-0">
                      {comp.logo ? (
                        <img
                          src={comp.logo}
                          className="w-full h-full object-contain"
                          alt="logo"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">No Logo</span>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "logos", (url) =>
                            updateCompany(comp.id, "logo", url),
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Company Name</Label>
                          <Input
                            value={comp.name}
                            onChange={(e) =>
                              updateCompany(comp.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Company URL</Label>
                          <Input
                            value={comp.url}
                            onChange={(e) =>
                              updateCompany(comp.id, "url", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteCompany(comp.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- SIGNERS TAB --- */}
        <TabsContent value="signers" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Authorized Signers</h3>
            <Button onClick={addSigner} size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Signer
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.signers.map((signer) => (
              <Card key={signer.id} className="bg-slate-50">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-40 h-20 bg-white border rounded-md flex items-center justify-center relative overflow-hidden shrink-0">
                      {signer.signature ? (
                        <img
                          src={signer.signature}
                          className="w-full h-full object-contain"
                          alt="signature"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">
                          No Signature
                        </span>
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "signatures", (url) =>
                            updateSigner(signer.id, "signature", url),
                          )
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Signer Name</Label>
                          <Input
                            value={signer.name}
                            onChange={(e) =>
                              updateSigner(signer.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Role / Title</Label>
                          <Input
                            value={signer.role}
                            onChange={(e) =>
                              updateSigner(signer.id, "role", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteSigner(signer.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* --- BADGES TAB --- */}
        <TabsContent value="badges" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Badges & Stamps</h3>
            <Button onClick={addBadge} size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add Badge
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.badges.map((badge) => (
              <Card key={badge.id} className="bg-slate-50">
                <CardContent className="pt-6 space-y-4">
                  <div className="w-full h-32 bg-white border rounded-md flex items-center justify-center relative overflow-hidden">
                    {badge.image ? (
                      <img
                        src={badge.image}
                        className="w-full h-full object-contain"
                        alt="badge"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">
                        Upload Image
                      </span>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleFileUpload(e, "badges", (url) =>
                          updateBadge(badge.id, "image", url),
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Badge Name</Label>
                    <Input
                      value={badge.name}
                      onChange={(e) =>
                        updateBadge(badge.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteBadge(badge.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
