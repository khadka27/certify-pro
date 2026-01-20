import { CertificateTemplateProps } from "@/types/certificate";

export default function Template11({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-8 relative box-border overflow-hidden text-slate-900 flex flex-col font-serif">
      <div className="absolute inset-4 border-8 border-blue-600 rounded-sm"></div>

      <div
        className="absolute inset-6 rounded-sm opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px), repeating-linear-gradient(90deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px), repeating-linear-gradient(180deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px), repeating-linear-gradient(270deg, #2563eb 0px, #2563eb 2px, transparent 2px, transparent 6px)",
          backgroundSize: "100% 16px, 16px 100%, 100% 16px, 16px 100%",
          backgroundPosition: "0 0, 0 0, 0 100%, 100% 0",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[500px] h-auto object-contain rotate-[-45deg]"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col p-12 pt-8">
        <div className="flex items-start justify-between mb-4 overflow-hidden">
          <div className="flex flex-col gap-2">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            )}
            <p className="text-xl font-black text-blue-900 leading-none uppercase tracking-tighter">
              {data.manufacturerName}
            </p>
            {data.companyUrl && (
              <p className="text-[10px] font-bold text-blue-600 tracking-widest leading-none">
                {data.companyUrl}
              </p>
            )}
          </div>
          {data.badge && (
            <div className="flex flex-col items-center">
              <img
                src={data.badge}
                alt="Badge"
                className="h-24 w-auto drop-shadow-xl"
              />
              <p className="text-[9px] font-black text-blue-800 uppercase mt-2 tracking-widest opacity-60">
                Authentication Seal
              </p>
            </div>
          )}
        </div>

        <div className="text-center space-y-2 mb-6">
          <h1 className="text-6xl font-black text-blue-900 uppercase tracking-tight leading-none">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-20 bg-blue-600"></div>
            <p className="text-xs font-black text-blue-800 uppercase tracking-[0.4em]">
              Registered Document // {data.certNumber}
            </p>
            <div className="h-1 w-20 bg-blue-600"></div>
          </div>
        </div>

        <div className="flex gap-10 items-center max-w-5xl mx-auto w-full mt-4">
          {data.productImage && (
            <div className="flex-shrink-0 bg-white p-4 border-4 border-blue-100 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 text-white text-[10px] font-black flex items-center justify-center">
                9.8
              </div>
              <img
                src={data.productImage}
                alt="Product"
                className="w-44 h-44 object-contain"
              />
            </div>
          )}
          <div className="flex-1 bg-white p-8 border-r-4 border-blue-600 shadow-sm min-h-[160px] flex flex-col justify-center">
            <div
              className="text-lg text-gray-800 leading-relaxed text-justify rich-text-content italic font-medium"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 w-full mt-8 bg-blue-50/50 p-6 rounded-sm border border-blue-100 shadow-inner">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-2">
              Technical Description
            </p>
            <p className="text-2xl font-black text-blue-900 leading-none mb-1">
              {data.productName}
            </p>
            <div className="flex gap-6 text-xs font-bold text-gray-500 uppercase">
              <span>{data.productCategory}</span>
              <span>{data.productForm}</span>
            </div>
            <div className="space-y-1 text-[11px] text-gray-600 pt-2">
              <p>
                <span className="font-bold text-blue-900 uppercase text-[9px]">
                  Ingredients:
                </span>{" "}
                {data.keyActiveIngredients}
              </p>
              <p>
                <span className="font-bold text-blue-900 uppercase text-[9px]">
                  Standards:
                </span>{" "}
                {data.dietaryCompliance}
              </p>
            </div>
          </div>
          <div className="space-y-4 border-l-2 border-blue-100 pl-10">
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-b border-blue-100 pb-2">
              Authority Metrics
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 border border-blue-100 rounded">
                <span className="block text-[8px] text-gray-400 font-black">
                  SAFETY
                </span>
                <span className="text-lg font-black text-blue-900 leading-none">
                  {data.safetyRating}
                </span>
              </div>
              <div className="bg-white p-2 border border-blue-100 rounded">
                <span className="block text-[8px] text-gray-400 font-black">
                  QUALITY
                </span>
                <span className="text-lg font-black text-blue-900 leading-none">
                  {data.ingredientsQualityRating}
                </span>
              </div>
              <div className="bg-blue-600 p-2 text-white rounded shadow-lg">
                <span className="block text-[8px] font-black opacity-80 uppercase tracking-widest">
                  Score
                </span>
                <span className="text-lg font-black leading-none">
                  {data.overallExpertRating}
                </span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter mt-1 italic">
              Verdict: {data.finalVerdict}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-8 text-[11px] text-gray-600 font-bold">
          <div className="space-y-4">
            <div>
              <p className="text-[9px] text-blue-600 uppercase tracking-widest mb-1 leading-none">
                Record Identification
              </p>
              <p className="text-sm font-black text-gray-900 uppercase">
                JUR: {data.location}
              </p>
              <p className="text-sm font-black text-gray-900 uppercase">
                ISSUE: {data.issuedDate}
              </p>
            </div>
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg active:scale-95 text-center shadow-blue-200"
              >
                Purchase Interface →
              </a>
            )}
          </div>
          <div className="space-y-4 px-8 border-x border-blue-100 text-center">
            <div>
              <p className="text-[9px] text-blue-600 uppercase tracking-widest mb-1 leading-none">
                Support & Assistance
              </p>
              <p className="text-sm font-black text-gray-900">
                {data.customerSupportEmail}
              </p>
              <p className="text-sm font-black text-gray-900">
                {data.customerSupportPhone}
              </p>
            </div>
            <p className="text-[10px] text-gray-400 italic font-medium leading-tight">
              "{data.verificationStatement}"
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-[9px] text-blue-600 uppercase tracking-widest mb-1 leading-none">
              Certification Authority
            </p>
            <div className="text-right flex flex-col items-end">
              {data.signature && (
                <img
                  src={data.signature}
                  alt="Sign"
                  className="h-14 w-auto mix-blend-multiply brightness-75 transition-transform hover:scale-110 mb-1"
                />
              )}
              <div className="w-48 h-1 bg-blue-900 rounded-full shadow-lg"></div>
              <p className="text-xl font-black text-blue-900 mt-2 leading-none uppercase tracking-tighter">
                {data.personName}
              </p>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-widest italic">
                {data.role}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10">
          <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
            Expiration: {data.expiryDate}
          </p>
        </div>
      </div>
    </div>
  );
}
