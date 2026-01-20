"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trash2,
  Plus,
  Save,
  ArrowLeft,
  Building2,
  UserCheck,
  Award,
  Loader2,
  Upload,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
  defaultRating: string;
}

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [data, setData] = useState<SettingsData>({
    companies: [],
    signers: [],
    badges: [],
    validityYears: 3,
    defaultRating: "9.8",
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
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setData(newData);
        toast({
          title: "Saved Successfully",
          description: "Your settings have been updated.",
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
    } finally {
      setSaving(false);
    }
  };

  const updateValidity = (val: string) => {
    const num = parseInt(val);
    if (!isNaN(num)) {
      const newData = { ...data, validityYears: num };
      setData(newData);
    }
  };

  // --- CRUD Helpers ---
  const addCompany = () => {
    const newComp: Company = {
      id: crypto.randomUUID(),
      name: "New Company",
      url: "",
      logo: "",
    };
    setData({ ...data, companies: [...data.companies, newComp] });
  };
  const updateCompany = (id: string, field: keyof Company, val: string) => {
    const newComps = data.companies.map((c) =>
      c.id === id ? { ...c, [field]: val } : c,
    );
    setData({ ...data, companies: newComps });
  };
  const deleteCompany = (id: string) => {
    const newComps = data.companies.filter((c) => c.id !== id);
    setData({ ...data, companies: newComps });
  };

  const addSigner = () => {
    const newSigner: Signer = {
      id: crypto.randomUUID(),
      name: "New Signer",
      role: "",
      signature: "",
    };
    setData({ ...data, signers: [...data.signers, newSigner] });
  };
  const updateSigner = (id: string, field: keyof Signer, val: string) => {
    const newSigners = data.signers.map((s) =>
      s.id === id ? { ...s, [field]: val } : s,
    );
    setData({ ...data, signers: newSigners });
  };
  const deleteSigner = (id: string) => {
    const newSigners = data.signers.filter((s) => s.id !== id);
    setData({ ...data, signers: newSigners });
  };

  const addBadge = () => {
    const newBadge: Badge = {
      id: crypto.randomUUID(),
      name: "New Badge",
      image: "",
    };
    setData({ ...data, badges: [...data.badges, newBadge] });
  };
  const updateBadge = (id: string, field: keyof Badge, val: string) => {
    const newBadges = data.badges.map((b) =>
      b.id === id ? { ...b, [field]: val } : b,
    );
    setData({ ...data, badges: newBadges });
  };
  const deleteBadge = (id: string) => {
    const newBadges = data.badges.filter((b) => b.id !== id);
    setData({ ...data, badges: newBadges });
  };

  // File upload handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    category: "logos" | "signatures" | "badges",
    callback: (url: string) => void,
    itemId: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(itemId);
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
            description: "Image saved successfully.",
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
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-slate-600 font-medium">Loading settings...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4 space-y-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-slate-500 text-sm">
                  Manage your reusable assets and configurations
                </p>
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => saveSettings(data)}
              disabled={saving}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all px-6"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : "Save All Changes"}
            </Button>
          </motion.div>
        </motion.div>

        {/* General Config */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings2 className="h-4 w-4 text-blue-600" />
                </div>
                General Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    Default Validity Period (Years)
                  </Label>
                  <Input
                    type="number"
                    value={data.validityYears}
                    onChange={(e) => updateValidity(e.target.value)}
                    className="max-w-[200px] border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <p className="text-xs text-slate-500">
                    Auto-sets the "Valid Until" date for new certificates.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    Default Expert Rating
                  </Label>
                  <Input
                    value={data.defaultRating}
                    onChange={(e) =>
                      setData({ ...data, defaultRating: e.target.value })
                    }
                    className="max-w-[200px] border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    placeholder="e.g. 9.8"
                  />
                  <p className="text-xs text-slate-500">
                    The starting value for the Overall Expert Rating.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="companies" className="w-full">
            <TabsList className="w-full max-w-lg grid grid-cols-3 h-12 p-1 bg-white shadow-lg rounded-xl">
              <TabsTrigger
                value="companies"
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Building2 className="h-4 w-4" />
                Companies
              </TabsTrigger>
              <TabsTrigger
                value="signers"
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <UserCheck className="h-4 w-4" />
                Signers
              </TabsTrigger>
              <TabsTrigger
                value="badges"
                className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Award className="h-4 w-4" />
                Badges
              </TabsTrigger>
            </TabsList>

            {/* Companies Tab */}
            <TabsContent value="companies" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Registered Companies ({data.companies.length})
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={addCompany}
                      className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4" /> Add Company
                    </Button>
                  </motion.div>
                </div>
                <AnimatePresence>
                  <div className="grid grid-cols-1 gap-4">
                    {data.companies.map((comp, index) => (
                      <motion.div
                        key={comp.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white overflow-hidden group">
                          <CardContent className="p-6">
                            <div className="flex gap-6 items-start">
                              <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:border-blue-400 transition-colors">
                                  {uploading === comp.id ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                                  ) : comp.logo ? (
                                    <img
                                      src={comp.logo}
                                      className="w-full h-full object-contain p-2"
                                      alt="logo"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <Upload className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                                      <span className="text-[10px] text-slate-400">
                                        Upload Logo
                                      </span>
                                    </div>
                                  )}
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                      handleFileUpload(
                                        e,
                                        "logos",
                                        (url) =>
                                          updateCompany(comp.id, "logo", url),
                                        comp.id,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-slate-600 text-sm">
                                      Company Name
                                    </Label>
                                    <Input
                                      value={comp.name}
                                      onChange={(e) =>
                                        updateCompany(
                                          comp.id,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      className="border-slate-200 focus:border-blue-400"
                                      placeholder="Enter company name"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-slate-600 text-sm">
                                      Company URL
                                    </Label>
                                    <Input
                                      value={comp.url}
                                      onChange={(e) =>
                                        updateCompany(
                                          comp.id,
                                          "url",
                                          e.target.value,
                                        )
                                      }
                                      className="border-slate-200 focus:border-blue-400"
                                      placeholder="https://example.com"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deleteCompany(comp.id)}
                                      className="gap-2 shadow-md hover:shadow-lg"
                                    >
                                      <Trash2 className="h-4 w-4" /> Delete
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
                {data.companies.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <Building2 className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p>
                      No companies added yet. Click "Add Company" to get
                      started.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Signers Tab */}
            <TabsContent value="signers" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    Authorized Signers ({data.signers.length})
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={addSigner}
                      className="gap-2 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4" /> Add Signer
                    </Button>
                  </motion.div>
                </div>
                <AnimatePresence>
                  <div className="grid grid-cols-1 gap-4">
                    {data.signers.map((signer, index) => (
                      <motion.div
                        key={signer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white overflow-hidden group">
                          <CardContent className="p-6">
                            <div className="flex gap-6 items-start">
                              <div className="relative">
                                <div className="w-40 h-20 bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:border-green-400 transition-colors">
                                  {uploading === signer.id ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                                  ) : signer.signature ? (
                                    <img
                                      src={signer.signature}
                                      className="w-full h-full object-contain p-2"
                                      alt="signature"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <Upload className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                                      <span className="text-[10px] text-slate-400">
                                        Upload Signature
                                      </span>
                                    </div>
                                  )}
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                      handleFileUpload(
                                        e,
                                        "signatures",
                                        (url) =>
                                          updateSigner(
                                            signer.id,
                                            "signature",
                                            url,
                                          ),
                                        signer.id,
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="text-slate-600 text-sm">
                                      Signer Name
                                    </Label>
                                    <Input
                                      value={signer.name}
                                      onChange={(e) =>
                                        updateSigner(
                                          signer.id,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      className="border-slate-200 focus:border-green-400"
                                      placeholder="Enter signer name"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-slate-600 text-sm">
                                      Role / Title
                                    </Label>
                                    <Input
                                      value={signer.role}
                                      onChange={(e) =>
                                        updateSigner(
                                          signer.id,
                                          "role",
                                          e.target.value,
                                        )
                                      }
                                      className="border-slate-200 focus:border-green-400"
                                      placeholder="e.g. Chief Quality Officer"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => deleteSigner(signer.id)}
                                      className="gap-2 shadow-md hover:shadow-lg"
                                    >
                                      <Trash2 className="h-4 w-4" /> Delete
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
                {data.signers.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <UserCheck className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p>
                      No signers added yet. Click "Add Signer" to get started.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    Badges & Stamps ({data.badges.length})
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={addBadge}
                      className="gap-2 bg-amber-600 hover:bg-amber-700 shadow-md hover:shadow-lg transition-all"
                    >
                      <Plus className="h-4 w-4" /> Add Badge
                    </Button>
                  </motion.div>
                </div>
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.badges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white overflow-hidden group">
                          <CardContent className="p-6 space-y-4">
                            <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-amber-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative overflow-hidden group-hover:border-amber-400 transition-colors">
                              {uploading === badge.id ? (
                                <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                              ) : badge.image ? (
                                <img
                                  src={badge.image}
                                  className="w-full h-full object-contain p-4"
                                  alt="badge"
                                />
                              ) : (
                                <div className="text-center">
                                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                                  <span className="text-xs text-slate-400">
                                    Upload Badge Image
                                  </span>
                                </div>
                              )}
                              <Input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) =>
                                  handleFileUpload(
                                    e,
                                    "badges",
                                    (url) =>
                                      updateBadge(badge.id, "image", url),
                                    badge.id,
                                  )
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-slate-600 text-sm">
                                Badge Name
                              </Label>
                              <Input
                                value={badge.name}
                                onChange={(e) =>
                                  updateBadge(badge.id, "name", e.target.value)
                                }
                                className="border-slate-200 focus:border-amber-400"
                                placeholder="Enter badge name"
                              />
                            </div>
                            <div className="flex justify-end">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteBadge(badge.id)}
                                  className="gap-2 shadow-md hover:shadow-lg"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
                {data.badges.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <Award className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p>
                      No badges added yet. Click "Add Badge" to get started.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
