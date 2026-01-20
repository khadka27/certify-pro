import { CertificateTemplateProps } from "@/types/certificate";

export default function Template8({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white relative shadow-2xl box-border overflow-hidden flex flex-col font-sans">
      <div className="absolute top-8 left-8 w-32 h-32 border-t-4 border-l-4 border-teal-600"></div>
      <div className="absolute top-8 right-8 w-32 h-32 border-t-4 border-r-4 border-teal-600"></div>
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b-4 border-l-4 border-teal-600"></div>
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b-4 border-r-4 border-teal-600"></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[500px] h-auto object-contain rotate-[-45deg]"
          />
        </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col p-12 py-4">
        <div className="flex items-start justify-between mb-8 overflow-hidden">
          <div className="space-y-1">
            {data.logo && (
              <img
                src={data.logo}
                alt="Logo"
                className="h-16 w-auto object-contain mb-2"
              />
            )}
            <p className="text-xl font-black text-gray-900 tracking-tighter uppercase">
              {data.manufacturerName}
            </p>
            {data.companyUrl && (
              <p className="text-[10px] font-bold text-teal-600 tracking-widest">
                {data.companyUrl}
              </p>
            )}
          </div>

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-28 w-auto drop-shadow-xl"
            />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center text-center space-y-4">
          <div className="max-w-4xl mx-auto w-full">
            <p className="text-[10px] text-teal-600 uppercase font-black tracking-[0.4em] mb-2 opacity-60">
              OFFICIAL CERTIFICATION RECORD
            </p>
            <h1 className="text-6xl font-black text-gray-900 leading-none mb-4 tracking-tighter">
              {data.title}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-0.5 w-24 bg-teal-600/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
              <div className="h-0.5 w-24 bg-teal-600/30"></div>
            </div>
          </div>

          <div className="flex gap-10 items-center max-w-5xl mx-auto w-full mt-6">
            <div className="flex-1 bg-teal-50 shadow-inner p-10 rounded-2xl relative">
              <div className="absolute top-0 left-0 w-8 h-8 bg-teal-600"></div>
              <div
                className="text-lg text-gray-700 leading-relaxed rich-text-content font-medium italic"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
            {data.productImage && (
              <div className="bg-white p-6 rounded-[2rem] border-2 border-teal-50 shadow-2xl relative overflow-hidden flex-shrink-0">
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-52 h-52 object-contain relative z-10"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 max-w-4xl mx-auto w-full mt-8">
            <div className="text-left bg-white p-6 rounded-2xl border-2 border-teal-600/10 shadow-sm relative">
              <p className="absolute -top-3 left-4 bg-teal-600 text-white text-[9px] font-black px-3 py-1 rounded-full">
                PRODUCT CATEGORY
              </p>
              <p className="text-2xl font-black text-gray-900 mb-1">
                {data.productName}
              </p>
              <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase">
                <span>{data.productCategory}</span>
                <span>{data.productForm}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-teal-50 text-[11px] text-gray-600">
                <span className="font-bold text-teal-800">Ingredients:</span>{" "}
                {data.keyActiveIngredients}
              </div>
            </div>
            <div className="text-left bg-white p-6 rounded-2xl border-2 border-teal-600/10 shadow-sm relative">
              <p className="absolute -top-3 left-4 bg-teal-600 text-white text-[9px] font-black px-3 py-1 rounded-full">
                TECHNICAL SCORE
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-3xl font-black text-teal-900 leading-none">
                    {data.overallExpertRating}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 mt-1">
                    EXPERT INDEX
                  </p>
                </div>
                <div className="space-y-1 text-[10px] font-bold text-gray-500">
                  <p className="flex justify-between">
                    <span>SAFETY:</span>{" "}
                    <span className="text-teal-700">{data.safetyRating}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>QUALITY:</span>{" "}
                    <span className="text-teal-700">
                      {data.ingredientsQualityRating}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>EFFICACY:</span>{" "}
                    <span className="text-teal-700">
                      {data.effectivenessRating}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-8 py-6 border-y border-teal-50 text-[11px] text-gray-500 font-medium">
          <div className="space-y-1">
            <h4 className="font-black text-teal-600 uppercase text-[9px] mb-2">
              Registration
            </h4>
            <p>
              Certificate No:{" "}
              <span className="font-bold text-gray-900 font-mono tracking-widest">
                {data.certNumber}
              </span>
            </p>
            <p>
              Jurisdiction:{" "}
              <span className="font-bold text-gray-900">{data.location}</span>
            </p>
          </div>
          <div className="space-y-1 border-x border-teal-50 px-8 text-center">
            <h4 className="font-black text-teal-600 uppercase text-[9px] mb-2">
              Assistance Center
            </h4>
            <p className="font-bold text-gray-900">
              {data.customerSupportEmail}
            </p>
            <p className="font-bold text-gray-900">
              {data.customerSupportPhone}
            </p>
            <p className="text-[10px] mt-2 italic">
              "{data.verificationStatement}"
            </p>
          </div>
          <div className="space-y-1 text-right">
            <h4 className="font-black text-teal-600 uppercase text-[9px] mb-2">
              Direct Action
            </h4>
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-900 text-white font-black p-2 py-3 rounded-xl shadow-xl hover:bg-teal-600 transition-colors uppercase tracking-tight italic text-center"
              >
                Order Verified Product →
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="space-y-4">
            <div className="flex gap-10">
              <div>
                <p className="text-[9px] text-teal-600 font-black uppercase tracking-widest">
                  Issue Date
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {data.issuedDate}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-teal-600 font-black uppercase tracking-widest">
                  Valid Until
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {data.expiryDate}
                </p>
              </div>
            </div>
            <p className="text-xs font-black text-teal-700 bg-teal-50 px-3 py-1 rounded inline-block uppercase">
              VERDICT: {data.finalVerdict}
            </p>
          </div>

          <div className="text-center">
            {data.signature && (
              <img
                src={data.signature}
                alt="Sign"
                className="h-16 w-auto mx-auto mb-1 mix-blend-multiply brightness-75 scale-110"
              />
            )}
            <div className="w-56 h-1 bg-teal-600 rounded-full"></div>
            <p className="text-lg font-black text-gray-900 mt-2 uppercase tracking-tighter leading-none">
              {data.personName}
            </p>
            <p className="text-[11px] font-bold text-teal-600 uppercase tracking-widest mt-1">
              {data.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
