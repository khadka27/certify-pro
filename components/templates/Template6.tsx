import { CertificateTemplateProps } from "@/types/certificate";

export default function Template6({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-slate-100 p-8 relative box-border overflow-hidden flex flex-col font-sans">
      <div className="flex-1 bg-white rounded-none overflow-hidden flex relative z-10 shadow-2xl">
        <div className="w-1/3 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-8 flex flex-col justify-between text-white relative">
          
          {/* Background Watermark in Sidebar */}
          {data.showWatermark && (data.watermark || data.logo) && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none z-0">
              <img
                src={data.watermark || data.logo}
                alt="Watermark"
                className="w-3/4 h-auto object-contain brightness-0 invert"
              />
            </div>
          )}

          <div className="space-y-6 relative z-10">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            )}

            {/* QR Code in Sidebar */}
            {data.qrText && (
              <div className="bg-white p-2 rounded-xl w-fit mx-auto shadow-2xl">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrText)}`}
                  alt="QR Code"
                  className="w-24 h-24 object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6 mt-6 relative z-10">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Certificate Identification</p>
              <p className="text-xl font-mono font-bold text-white tracking-widest">{data.certNumber}</p>
              <span className="inline-block bg-teal-500 text-white px-2 py-0.5 rounded text-[10px] font-black mt-2 uppercase">
                {data.certificationStatus || "CERTIFIED"}
              </span>
            </div>

            <div className="h-px bg-white/10"></div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Period of Validity</p>
                <p className="text-sm font-bold text-slate-200">ISSUED: {data.issuedDate}</p>
                {data.expiryDate && (
                  <p className="text-sm font-bold text-teal-400 mt-1 uppercase">EXPIRES: {data.expiryDate}</p>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Origin Jurisdiction</p>
                <p className="text-sm font-bold text-slate-200 uppercase">{data.location}</p>
              </div>
            </div>

            <div className="h-px bg-white/10"></div>

            {data.companyUrl && (
              <div className="pt-2">
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Company Site</p>
                <p className="text-sm font-bold text-teal-400 truncate">{data.companyUrl}</p>
              </div>
            )}
          </div>

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-28 w-auto mx-auto brightness-0 invert opacity-90 mt-6 relative z-10 drop-shadow-lg"
            />
          )}
        </div>

        <div className="flex-1 p-12 flex flex-col relative">
          
          {/* Watermark in Main Area */}
          {data.showWatermark && (data.watermark || data.logo) && (
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
              <img
                src={data.watermark || data.logo}
                alt="Background Watermark"
                className="w-3/4 h-auto object-contain rotate-[-45deg]"
              />
            </div>
          )}

          <div className="space-y-6 relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-5xl font-black text-slate-900 mb-1 leading-none tracking-tighter">
                  {data.title}
                </h1>
                {data.subTitle && (
                  <p className="text-xl text-slate-400 font-medium tracking-tight mt-2 italic">
                    {data.subTitle}
                  </p>
                )}
                <div className="w-24 h-2 bg-slate-900 mt-6 rounded-full"></div>
              </div>
              <div className="text-center bg-slate-900 text-white p-4 rounded-2xl shadow-xl border-4 border-slate-100">
                <div className="text-4xl font-black">{data.overallExpertRating}</div>
                <div className="text-[9px] uppercase font-black tracking-widest text-slate-400 mt-1">Expert Index</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
               <div className="flex gap-8 items-start mb-8">
                 {data.productImage && (
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner flex-shrink-0">
                      <img src={data.productImage} alt="Product" className="w-32 h-32 object-contain" />
                   </div>
                 )}
                 <div className="flex-1 min-h-[140px] flex flex-col justify-center border-l-4 border-slate-900 pl-6">
                    <div
                      className="text-base text-slate-700 leading-relaxed rich-text-content italic"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                    {data.verificationStatement && (
                      <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        // verified: {data.verificationStatement}
                      </p>
                    )}
                 </div>
               </div>

               <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Product Specifications</p>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                     <div>
                        <p className="text-2xl font-black text-slate-900 border-b border-slate-200 pb-2 mb-2 leading-none uppercase">{data.productName}</p>
                        <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase">
                          <span>{data.productCategory}</span>
                          <span className="text-slate-300">|</span>
                          <span>{data.productForm}</span>
                        </div>
                     </div>
                     <div className="space-y-1 text-[11px]">
                        <p><span className="font-black text-slate-400">INGREDIENTS:</span> {data.keyActiveIngredients}</p>
                        <p><span className="font-black text-slate-400">DIETARY:</span> {data.dietaryCompliance}</p>
                        <p><span className="font-black text-rose-500">CAUTIONS:</span> {data.cautions || "NONE"}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-6 pt-6 border-t border-slate-100">
               <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Technical Analysis</h4>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-800">
                     <p className="bg-slate-50 p-1 px-2 rounded">SAFETY: {data.safetyRating}</p>
                     <p className="bg-slate-50 p-1 px-2 rounded">QUALITY: {data.ingredientsQualityRating}</p>
                     <p className="bg-slate-50 p-1 px-2 rounded">EFFICACY: {data.effectivenessRating}</p>
                     <p className="bg-slate-800 text-white p-1 px-2 rounded text-center">{data.finalVerdict}</p>
                  </div>
                  {data.buyNowUrl && (
                    <a
                      href={data.buyNowUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-slate-900 text-white px-6 py-2 rounded-xl text-center font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl active:scale-95 text-[10px]"
                    >
                      Buy Product Now
                    </a>
                  )}
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Authenticated By</h4>
                       <p className="text-xl font-black text-slate-900 leading-none">{data.personName}</p>
                       <p className="text-[11px] font-medium text-slate-500 mt-1">{data.role}</p>
                       <p className="text-[10px] font-bold text-slate-400 mt-2">{data.customerSupportEmail} | {data.customerSupportPhone}</p>
                     </div>
                     {data.signature && (
                       <div className="text-right">
                         <img src={data.signature} alt="Sign" className="h-14 w-auto object-contain mix-blend-multiply brightness-75 ml-auto" />
                         <div className="w-32 h-0.5 bg-slate-900 ml-auto mt-1"></div>
                       </div>
                     )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
