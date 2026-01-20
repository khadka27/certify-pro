import { CertificateTemplateProps } from "@/types/certificate";

export default function Template10({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-violet-900 via-fuchsia-900 to-violet-900 p-16 relative box-border overflow-hidden flex flex-col font-sans">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[500px] h-auto object-contain brightness-0 invert"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 border-4 border-violet-400/30 backdrop-blur-xl bg-violet-950/20 p-12 flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between mb-8">
          {data.logo && (
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
          )}

          <div className="text-right">
            <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              <p className="text-[10px] text-fuchsia-300 font-black uppercase tracking-widest">
                {data.manufacturerName}
              </p>
              {data.companyUrl && (
                <p className="text-[9px] text-violet-200 mt-1">
                  {data.companyUrl}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"></div>
              <p className="text-sm text-fuchsia-300 uppercase tracking-[0.5em] font-black">
                {data.subTitle || "PLATINUM CERTIFIED"}
              </p>
              <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse"></div>
            </div>

            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-fuchsia-200 to-violet-100 tracking-tighter leading-none">
              {data.title}
            </h1>
            <div className="h-1.5 w-64 mx-auto bg-linear-to-r from-transparent via-fuchsia-500 to-transparent rounded-full shadow-[0_0_15px_rgba(217,70,239,0.5)] mt-4"></div>
          </div>

          <div className="flex gap-8 items-center max-w-5xl mx-auto w-full">
            {data.productImage && (
              <div className="flex-shrink-0 bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/20 shadow-2xl relative group">
                <div className="absolute inset-0 bg-linear-to-br from-fuchsia-500/20 to-violet-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-48 h-48 object-contain relative z-10 brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                />
              </div>
            )}
            <div className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl text-left relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
              <div
                className="text-lg text-violet-100 leading-relaxed rich-text-content italic font-medium"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
              <div className="mt-6 bg-linear-to-r from-violet-600/40 to-fuchsia-600/40 p-6 rounded-2xl border border-white/10 shadow-inner">
                <p className="text-[10px] text-fuchsia-300 font-black uppercase tracking-widest mb-1">
                  Authenticated Entity
                </p>
                <p className="text-3xl font-black text-white leading-none tracking-tight">
                  {data.productName}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-violet-200 uppercase">
                    {data.productCategory} • {data.productForm}
                  </span>
                  <span className="bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-fuchsia-400/30">
                    {data.certificationStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Spec Bar */}
        <div className="grid grid-cols-3 gap-8 w-full mt-8 py-6 border-y border-white/10 text-[11px] text-violet-200">
          <div className="space-y-1">
            <h4 className="font-black text-fuchsia-400 uppercase text-[9px] mb-2 tracking-[0.2em]">
              Technical Metadata
            </h4>
            <p>
              <span className="text-white/40">ID:</span>{" "}
              <span className="font-bold text-white font-mono tracking-widest">
                {data.certNumber}
              </span>
            </p>
            <p>
              <span className="text-white/40">ORIGIN:</span>{" "}
              <span className="font-bold text-white">{data.location}</span>
            </p>
            <p>
              <span className="text-white/40">REG:</span>{" "}
              <span className="font-bold text-white">
                {data.thirdPartyTesting}
              </span>
            </p>
          </div>
          <div className="space-y-1 border-x border-white/10 px-8 text-center">
            <h4 className="font-black text-fuchsia-400 uppercase text-[9px] mb-2 tracking-[0.2em]">
              Global Connect
            </h4>
            <p className="font-bold text-white">{data.customerSupportEmail}</p>
            <p className="font-bold text-white">{data.customerSupportPhone}</p>
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 bg-white text-violet-900 font-black py-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform uppercase tracking-tighter italic text-center"
              >
                Link to Interface →
              </a>
            )}
          </div>
          <div className="space-y-1 text-right">
            <h4 className="font-black text-fuchsia-400 uppercase text-[9px] mb-2 tracking-[0.2em]">
              Authority Ratings
            </h4>
            <div className="flex justify-end gap-4">
              <div className="text-center">
                <span className="block text-[8px] text-white/40">SAFETY</span>
                <span className="text-sm font-black text-white">
                  {data.safetyRating}
                </span>
              </div>
              <div className="text-center">
                <span className="block text-[8px] text-white/40">QUALITY</span>
                <span className="text-sm font-black text-white">
                  {data.ingredientsQualityRating}
                </span>
              </div>
              <div className="text-center bg-violet-500/50 p-1 px-3 rounded-lg border border-white/20">
                <span className="block text-[8px] text-fuchsia-200 font-black">
                  INDEX
                </span>
                <span className="text-sm font-black text-white">
                  {data.overallExpertRating}
                </span>
              </div>
            </div>
            <p className="text-[10px] italic text-white/40 mt-2 truncate">
              "{data.verificationStatement}"
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="space-y-4">
            <div className="flex gap-10">
              <div className="bg-white/5 border border-white/10 p-2 px-4 rounded-xl">
                <p className="text-[8px] text-fuchsia-300 font-black uppercase tracking-widest">
                  Temporal Entry
                </p>
                <p className="text-xs font-bold text-white">
                  {data.issuedDate}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-2 px-4 rounded-xl">
                <p className="text-[8px] text-fuchsia-300 font-black uppercase tracking-widest">
                  Temporal Exit
                </p>
                <p className="text-xs font-bold text-white">
                  {data.expiryDate}
                </p>
              </div>
            </div>
            <p className="text-xs font-black text-fuchsia-400 uppercase italic tracking-tighter">
              {data.finalVerdict}
            </p>
          </div>

          <div className="flex items-center gap-12">
            <div className="text-center">
              {data.signature && (
                <img
                  src={data.signature}
                  alt="Sign"
                  className="h-16 w-auto mb-1 brightness-0 invert opacity-90 mx-auto"
                />
              )}
              <div className="w-48 h-0.5 bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
              <p className="text-xl font-black text-white mt-1 leading-none uppercase tracking-tighter">
                {data.personName}
              </p>
              <p className="text-[10px] text-fuchsia-300 font-bold uppercase tracking-widest mt-1">
                {data.role}
              </p>
            </div>
            {data.badge && (
              <img
                src={data.badge}
                alt="Badge"
                className="h-28 w-auto brightness-0 invert opacity-90 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
