import { CertificateTemplateProps } from "@/types/certificate";

export default function Template9({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-gray-100 to-slate-200 p-8 relative box-border overflow-hidden flex flex-col font-serif">
      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[600px] h-auto object-contain rotate-[-30deg] grayscale"
          />
        </div>
      )}

      <div className="flex-1 bg-white border-8 border-double border-gray-800 p-12 relative z-10 shadow-2xl">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white px-10 py-3 border-4 border-gray-800 rounded-full shadow-lg">
          {data.logo ? (
            <img
              src={data.logo}
              alt="Logo"
              className="h-14 w-auto object-contain"
            />
          ) : (
            <p className="text-lg font-black text-gray-800 uppercase tracking-tighter">
              {data.manufacturerName}
            </p>
          )}
        </div>

        {data.badge && (
          <div className="absolute -top-10 right-12 bg-white p-3 border-4 border-gray-800 rounded-full shadow-xl">
            <img src={data.badge} alt="Badge" className="h-20 w-auto" />
          </div>
        )}

        <div className="h-full flex flex-col justify-between pt-6">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-black text-gray-900 tracking-tight uppercase">
              {data.title}
            </h1>
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-0.5 bg-gray-800"></div>
              <div className="w-4 h-4 border-2 border-gray-800 rotate-45 flex-shrink-0"></div>
              <div className="w-24 h-0.5 bg-gray-800"></div>
            </div>
            {data.subTitle && (
              <p className="text-xl italic text-gray-500 font-medium">
                {data.subTitle}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center px-10 space-y-8">
            <div className="flex gap-10 items-center">
              {data.productImage && (
                <div className="flex-shrink-0 bg-white p-4 border-4 border-gray-800 shadow-[8px_8px_0px_rgba(31,41,55,1)]">
                  <img
                    src={data.productImage}
                    alt="Product"
                    className="w-40 h-40 object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              )}
              <div
                className="text-lg text-gray-800/90 leading-relaxed text-left rich-text-content flex-1 italic"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>

            <div className="bg-gray-50 border-4 border-gray-800 p-8 rounded-none relative">
              <div className="absolute top-0 right-0 bg-gray-800 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">
                A-CLASS RECORD
              </div>
              <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-1">
                Authenticated Entity
              </p>
              <p className="text-4xl font-black text-gray-900 leading-none mb-6">
                {data.productName}
              </p>

              <div className="grid grid-cols-2 gap-10 border-t-2 border-gray-800 pt-6">
                <div className="space-y-2 text-[11px] font-bold text-gray-600">
                  <p className="flex justify-between border-b border-gray-200 pb-1">
                    <span>ID NUMBER:</span>{" "}
                    <span className="text-gray-900 font-mono tracking-widest">
                      {data.certNumber}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-gray-200 pb-1">
                    <span>STATUS:</span>{" "}
                    <span className="text-gray-900">
                      {data.certificationStatus}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-gray-200 pb-1">
                    <span>CATEGORY:</span>{" "}
                    <span className="text-gray-900">
                      {data.productCategory}
                    </span>
                  </p>
                  <p className="flex justify-between border-b border-gray-200 pb-1">
                    <span>INGREDIENTS:</span>{" "}
                    <span className="text-gray-900 truncate max-w-[150px]">
                      {data.keyActiveIngredients}
                    </span>
                  </p>
                </div>
                <div className="space-y-2 text-[11px] font-bold text-gray-600 border-l-2 border-gray-800 pl-10">
                  <p className="font-black text-gray-900 mb-2 uppercase tracking-tight">
                    Assistance & Support
                  </p>
                  <p className="text-gray-900">{data.customerSupportEmail}</p>
                  <p className="text-gray-900">{data.customerSupportPhone}</p>
                  <p className="text-gray-500 font-medium italic mt-2 leading-tight">
                    "{data.verificationStatement}"
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-4 text-center border-t-2 border-gray-800 pt-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase">Safety</p>
                  <p className="text-xl font-black text-gray-900 leading-none">
                    {data.safetyRating}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase">Quality</p>
                  <p className="text-xl font-black text-gray-900 leading-none">
                    {data.ingredientsQualityRating}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase">Efficacy</p>
                  <p className="text-xl font-black text-gray-900 leading-none">
                    {data.effectivenessRating}
                  </p>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded-none">
                  <p className="text-[9px] font-black uppercase opacity-60">
                    Expert Total
                  </p>
                  <p className="text-xl font-black">
                    {data.overallExpertRating}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between pt-10 px-6">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Dated Records
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {data.issuedDate} // {data.expiryDate}
                </p>
              </div>
              {data.buyNowUrl && (
                <a
                  href={data.buyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-gray-800 px-6 py-2 font-black text-gray-900 hover:bg-gray-800 hover:text-white transition-all uppercase tracking-tighter text-center"
                >
                  Official Store Link →
                </a>
              )}
            </div>

            <div className="text-center group">
              {data.signature && (
                <img
                  src={data.signature}
                  alt="Sign"
                  className="h-16 w-auto mx-auto mb-1 mix-blend-multiply grayscale hover:grayscale-0 transition-all scale-125"
                />
              )}
              <div className="w-56 h-1 bg-gray-800 mx-auto"></div>
              <p className="text-xl font-black text-gray-900 mt-2 uppercase tracking-tighter">
                {data.personName}
              </p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                {data.role}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Verified Location
              </p>
              <p className="text-sm font-bold text-gray-900 uppercase">
                {data.location}
              </p>
              <p className="text-[10px] font-black text-gray-900 mt-2 italic flex flex-col">
                <span>FINAL VERDICT:</span>
                <span className="text-gray-800 text-xs">
                  {data.finalVerdict}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
