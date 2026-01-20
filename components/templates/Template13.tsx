import { CertificateTemplateProps } from "@/types/certificate";

export default function Template13({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-8 relative shadow-2xl box-border overflow-hidden font-sans">
      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[500px] h-auto object-contain rotate-[-15deg] grayscale"
          />
        </div>
      )}

      {/* Decorative side shapes */}
      <div
        className="absolute left-0 top-32 w-0 h-0 border-l-cyan-100 border-t-transparent opacity-60"
        style={{ borderLeftWidth: "120px", borderTopWidth: "120px" }}
      ></div>
      <div
        className="absolute left-0 top-64 w-0 h-0 border-l-cyan-50 border-b-transparent opacity-60"
        style={{ borderLeftWidth: "100px", borderBottomWidth: "100px" }}
      ></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 overflow-hidden px-4">
          <div className="text-left bg-cyan-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
              Validity Period
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-5xl font-black tracking-tighter">
                {data.expiryDate
                  ? new Date(data.expiryDate).getFullYear()
                  : "2026"}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Until Dec
              </p>
            </div>
            {data.companyUrl && (
              <p className="text-[9px] font-mono font-bold text-cyan-200 mt-4 bg-white/10 p-1 px-3 rounded-full border border-white/10 truncate max-w-[150px]">
                {data.companyUrl}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end gap-4">
            {data.logo && (
              <div className="bg-white p-4 border border-cyan-100 shadow-2xl rounded-2xl group flex flex-col items-center">
                <img
                  src={data.logo}
                  alt="Logo"
                  className="h-16 w-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                />
                <p className="text-[8px] font-black text-cyan-900 uppercase tracking-widest mt-2">
                  Certified Authority
                </p>
              </div>
            )}
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Digital Index
              </p>
              <p className="text-xl font-mono font-black text-cyan-600 tracking-widest">
                {data.certNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 relative">
          <h1 className="text-5xl font-black text-cyan-900 tracking-tighter uppercase leading-none">
            {data.title}
          </h1>
          <div className="h-1 w-48 bg-cyan-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(8,145,178,0.5)]"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-10 items-stretch flex-1 px-4 min-h-[250px]">
          <div className="w-1/3 flex flex-col justify-center">
            {data.productImage && (
              <div className="bg-white p-6 rounded-[3rem] border-2 border-cyan-50 shadow-[0_20px_50px_rgba(8,145,178,0.1)] relative group">
                <div className="absolute inset-0 bg-cyan-50/50 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-full h-44 object-contain relative z-10 drop-shadow-2xl"
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-cyan-900 text-cyan-100 text-[9px] font-black px-4 py-1.5 rounded-full shadow-lg border border-cyan-400/30">
                  VERIFIED ITEM
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-6 bg-slate-50/50 p-8 rounded-3xl border border-cyan-50 shadow-inner">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest bg-cyan-50 inline-block px-3 py-1 rounded-full">
                Record Description
              </p>
              <div
                className="text-base text-gray-700 leading-relaxed rich-text-content italic font-medium"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-cyan-100/50">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Authenticated entity
                </p>
                <p className="text-2xl font-black text-cyan-900 leading-none">
                  {data.productName}
                </p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1 italic">
                  {data.productCategory} • {data.productForm}
                </p>
              </div>
              <div className="space-y-1 text-[11px] font-bold text-slate-600 border-l border-cyan-100 pl-8">
                <p>
                  <span className="text-cyan-600 text-[10px] uppercase">
                    SAFETY:
                  </span>{" "}
                  {data.safetyRating}
                </p>
                <p>
                  <span className="text-cyan-600 text-[10px] uppercase">
                    QUALITY:
                  </span>{" "}
                  {data.ingredientsQualityRating}
                </p>
                <p>
                  <span className="text-cyan-900 font-black">
                    OVERALL: {data.overallExpertRating}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scope and Technical Specs */}
        <div className="grid grid-cols-2 gap-10 mt-8 px-4 py-8 border-y border-cyan-50 bg-white/50 backdrop-blur-sm">
          <div className="space-y-4">
            <h2 className="text-xs font-black text-cyan-900 uppercase tracking-widest border-b-2 border-cyan-600 inline-block pb-1">
              Scope of Authorization
            </h2>
            <p className="text-[10px] text-gray-500 leading-relaxed italic font-medium">
              {data.verificationStatement ||
                "This certificate represents extensive analysis of safety, efficacy, and manufacturing standards for the specified product."}
            </p>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-700">
              <p>
                <span className="text-cyan-600 uppercase text-[9px]">
                  Ingredients:
                </span>{" "}
                {data.keyActiveIngredients}
              </p>
              <p>
                <span className="text-cyan-600 uppercase text-[9px]">
                  Standards:
                </span>{" "}
                {data.dietaryCompliance}
              </p>
            </div>
          </div>
          <div className="space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Global Support
                </p>
                <p className="text-[11px] font-black text-cyan-900 leading-tight">
                  {data.customerSupportEmail}
                </p>
                <p className="text-[11px] font-black text-cyan-900 leading-tight">
                  {data.customerSupportPhone}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Jurisdiction
                </p>
                <p className="text-[11px] font-black text-cyan-900 leading-tight uppercase">
                  {data.location}
                </p>
                <p className="text-[11px] font-black text-cyan-600 leading-tight uppercase italic">
                  {data.finalVerdict}
                </p>
              </div>
            </div>
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-cyan-900 text-white px-8 py-3 rounded-2xl text-center shadow-xl hover:bg-cyan-600 transition-all uppercase tracking-tighter italic font-black"
              >
                Secure Verified Purchase →
              </a>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-end px-4 mt-auto py-6">
          <div className="flex gap-12 items-end">
            <div className="text-left flex flex-col items-start">
              {data.signature && (
                <img
                  src={data.signature}
                  alt="Sign"
                  className="h-14 w-auto object-contain mix-blend-multiply brightness-75 transition-transform hover:scale-110 mb-1"
                />
              )}
              <div className="w-48 h-1 bg-cyan-900 rounded-full shadow-lg"></div>
              <p className="text-lg font-black text-gray-900 uppercase tracking-tighter mt-2 leading-none">
                {data.personName}
              </p>
              <p className="text-[10px] font-bold text-cyan-600 uppercase italic tracking-widest mt-1">
                {data.role}
              </p>
            </div>
            {data.badge && (
              <img
                src={data.badge}
                alt="Seal"
                className="h-28 w-auto mix-blend-multiply opacity-80"
              />
            )}
          </div>

          <div className="text-right">
            <div className="inline-block border-t-2 border-cyan-100 pt-2">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                Authorized Manufacturing Entity
              </p>
              <p className="text-sm font-black text-cyan-900 uppercase tracking-tight">
                {data.manufacturerName}
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                Registration Date: {data.issuedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
