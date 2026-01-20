import { CertificateTemplateProps } from "@/types/certificate";

export default function Template3({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-16 relative box-border overflow-hidden flex flex-col font-serif">
      <div className="absolute inset-8 border-2 border-amber-500/30"></div>
      <div className="absolute inset-12 border border-amber-500/20"></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[600px] h-auto object-contain brightness-0 invert"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-6 py-4">
        {data.logo && (
          <img
            src={data.logo}
            alt="Logo"
            className="h-20 w-auto object-contain brightness-0 invert opacity-90"
          />
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent to-amber-500"></div>
            <h1 className="text-5xl font-bold text-amber-400 tracking-widest uppercase">
              {data.title}
            </h1>
            <div className="w-16 h-px bg-linear-to-l from-transparent to-amber-500"></div>
          </div>
          <div className="w-32 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="flex gap-8 items-center max-w-4xl mx-auto">
          {data.productImage && (
            <div className="shrink-0">
              <img
                src={data.productImage}
                alt="Product"
                className="w-40 h-40 object-contain rounded-lg border border-amber-500/30 bg-white/5 p-2 shadow-2xl"
              />
            </div>
          )}
          <div className="bg-amber-900/20 backdrop-blur-sm p-6 rounded-lg border border-amber-500/20 text-left">
            <div
              className="text-base text-amber-100/80 leading-relaxed italic rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-3xl w-full">
          <div className="text-left border-l-2 border-amber-500 pl-4">
            <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-1 font-bold">
              Product Certified
            </p>
            <p className="text-2xl font-bold text-white tracking-tight">
              {data.productName}
            </p>
            <p className="text-xs text-slate-400 mt-1 uppercase">
              {data.productCategory} | {data.productForm}
            </p>
          </div>
          <div className="text-left border-l-2 border-amber-500 pl-4">
            <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-1 font-bold">
              Verification ID
            </p>
            <p className="text-xl font-mono font-bold text-white">
              {data.certNumber}
            </p>
            <p className="text-xs text-green-400 font-black mt-1 uppercase tracking-tighter">
              {data.certificationStatus}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-4xl border-y border-amber-500/20 py-6 text-[11px] text-slate-300">
          <div className="space-y-1">
            <h4 className="text-amber-500 font-black uppercase text-[9px] mb-2 tracking-widest">
              Specifications
            </h4>
            <p>
              <span className="text-slate-500 font-bold">Dietary:</span>{" "}
              {data.dietaryCompliance}
            </p>
            <p>
              <span className="text-slate-500 font-bold">Ingredients:</span>{" "}
              {data.keyActiveIngredients}
            </p>
            {data.companyUrl && (
              <p className="text-amber-400 font-bold mt-2">{data.companyUrl}</p>
            )}
          </div>
          <div className="space-y-1 border-x border-amber-500/10 px-6">
            <h4 className="text-amber-500 font-black uppercase text-[9px] mb-2 tracking-widest">
              Ratings
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <p>
                <span className="text-slate-500">Safety:</span>{" "}
                <span className="text-white font-bold">
                  {data.safetyRating}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Quality:</span>{" "}
                <span className="text-white font-bold">
                  {data.ingredientsQualityRating}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Efficacy:</span>{" "}
                <span className="text-white font-bold">
                  {data.effectivenessRating}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Overall:</span>{" "}
                <span className="text-amber-400 font-black">
                  {data.overallExpertRating}
                </span>
              </p>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <h4 className="text-amber-500 font-black uppercase text-[9px] mb-2 tracking-widest">
              Support & Shop
            </h4>
            <p className="font-bold text-white">{data.customerSupportEmail}</p>
            <p className="text-slate-400 font-medium">
              {data.customerSupportPhone}
            </p>
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-amber-500 text-slate-900 px-6 py-2 rounded-md font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg active:scale-95"
              >
                Shop Now
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-4xl mt-6">
          <div className="text-left space-y-1">
            <p className="text-[9px] text-amber-500 uppercase font-bold tracking-widest">
              Authorization
            </p>
            <p className="text-xl font-bold text-amber-200">
              {data.personName}
            </p>
            <p className="text-xs text-slate-400">{data.role}</p>
            <p className="text-[10px] text-slate-500 mt-2 italic">
              {data.manufacturerName} - {data.location}
            </p>
          </div>

          <div className="flex gap-12 items-center">
            {data.signature && (
              <div className="text-center">
                <img
                  src={data.signature}
                  alt="Sign"
                  className="h-12 w-auto brightness-0 invert opacity-90 mx-auto"
                />
                <div className="w-32 border-t border-amber-500/50 mt-1"></div>
              </div>
            )}
            {data.badge && (
              <img
                src={data.badge}
                alt="Badge"
                className="h-20 w-auto brightness-0 invert opacity-90 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
              />
            )}
          </div>
        </div>

        <div className="absolute bottom-16 right-16 text-right">
          <p className="text-[10px] text-amber-500/50 font-mono">
            ISSUED: {data.issuedDate}
          </p>
          <p className="text-[10px] text-amber-500/50 font-mono uppercase font-bold">
            {data.finalVerdict}
          </p>
        </div>
      </div>
    </div>
  );
}
