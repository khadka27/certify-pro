import { CertificateTemplateProps } from "@/types/certificate";

export default function Template2({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-blue-50 to-cyan-50 p-12 relative box-border overflow-hidden flex flex-col font-sans">
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[500px] h-auto object-contain"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col bg-white rounded-lg p-12 relative z-10 shadow-sm">
        <div className="flex items-start justify-between mb-8">
          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          )}
          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-20 w-auto drop-shadow-sm"
            />
          )}
        </div>

        <div className="text-center flex-1 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center justify-center">
            <div className="h-px w-20 bg-blue-600/30"></div>
            <h1 className="text-5xl font-black text-blue-900 mx-6 tracking-tight">
              {data.title}
            </h1>
            <div className="h-px w-20 bg-blue-600/30"></div>
          </div>

          <div className="flex gap-8 items-center text-left">
            {data.productImage && (
              <div className="shrink-0">
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-48 h-48 object-contain rounded-xl border border-blue-100 bg-blue-50/30 p-4 shadow-inner"
                />
              </div>
            )}
            <div className="flex-1 bg-blue-50/50 border-l-4 border-blue-600 p-6">
              <div
                className="text-lg text-gray-700 leading-relaxed rich-text-content"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 px-4 text-left">
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                Product Details
              </p>
              <p className="text-2xl font-bold text-gray-900 leading-tight">
                {data.productName}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {data.productCategory} • {data.productForm}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
                Certificate Authority
              </p>
              <p className="text-xl font-bold text-gray-800 tracking-tight">
                {data.certNumber}
              </p>
              <p className="text-xs font-black text-green-600 mt-1 uppercase tracking-wider">
                {data.certificationStatus}
              </p>
            </div>
          </div>

          {/* Ratings Summary */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase">
                Expert Rating
              </p>
              <p className="text-2xl font-black text-blue-700">
                {data.overallExpertRating}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase">
                Safety
              </p>
              <p className="text-lg font-bold text-slate-700">
                {data.safetyRating}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase">
                Quality
              </p>
              <p className="text-lg font-bold text-slate-700">
                {data.ingredientsQualityRating}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase">
                Efficacy
              </p>
              <p className="text-lg font-bold text-slate-700">
                {data.effectivenessRating}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Specs Tabs-like Footer */}
        <div className="mt-8 grid grid-cols-3 gap-8 py-6 border-t border-slate-100 text-[11px]">
          <div className="space-y-2">
            <h4 className="font-bold text-blue-600 uppercase tracking-widest text-[9px]">
              Manufacturer & Support
            </h4>
            <p className="font-bold text-slate-900">{data.manufacturerName}</p>
            <p className="text-slate-600">{data.manufacturerAddress}</p>
            <p className="text-slate-600 font-medium">
              {data.customerSupportEmail}
            </p>
            <p className="text-slate-600 font-medium">
              {data.customerSupportPhone}
            </p>
          </div>
          <div className="space-y-2 border-x border-slate-100 px-8">
            <h4 className="font-bold text-blue-600 uppercase tracking-widest text-[9px]">
              Compliance & Links
            </h4>
            <p className="text-slate-600">
              <span className="font-bold text-slate-800">Dietary:</span>{" "}
              {data.dietaryCompliance}
            </p>
            {data.companyUrl && (
              <p className="text-blue-600 font-bold truncate">
                {data.companyUrl}
              </p>
            )}
            {data.buyNowUrl && (
              <a
                href={data.buyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-pdf-link="buy-now"
                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                Buy Now
              </a>
            )}
          </div>
          <div className="space-y-2 text-right">
            <h4 className="font-bold text-blue-600 uppercase tracking-widest text-[9px]">
              Verification
            </h4>
            <p className="text-slate-600 text-justify italic leading-tight">
              "{data.verificationStatement}"
            </p>
            <div className="pt-2">
              {data.signature ? (
                <div className="flex flex-col items-end">
                  <img
                    src={data.signature}
                    alt="Sign"
                    className="h-10 w-auto object-contain mix-blend-multiply"
                  />
                  <div className="w-32 border-t border-slate-300"></div>
                  <p className="font-bold text-slate-900">{data.personName}</p>
                  <p className="text-slate-500">{data.role}</p>
                </div>
              ) : (
                <div className="flex flex-col items-end pt-4">
                  <div className="w-32 border-t border-slate-300"></div>
                  <p className="font-bold text-slate-900">{data.personName}</p>
                  <p className="text-slate-500">{data.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span>ISSUED: {data.issuedDate}</span>
          <span>EXPIRES: {data.expiryDate}</span>
          <span>LOC: {data.location}</span>
        </div>
      </div>
    </div>
  );
}
