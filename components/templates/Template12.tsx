import { CertificateTemplateProps } from "@/types/certificate";

export default function Template12({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-12 relative box-border overflow-hidden text-black flex flex-col font-serif select-none">
      {/* Background Watermark */}
      {data.showWatermark && (data.watermark || data.logo) && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img
            src={data.watermark || data.logo}
            alt="Watermark"
            className="w-[600px] h-auto object-contain rotate-[-15deg]"
          />
        </div>
      )}

      {/* 1. Header with Logo and Title */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-red-800 pb-4 relative z-10">
        <div className="flex items-center gap-6">
          {data.logo ? (
            <img
              src={data.logo}
              alt="Logo"
              className="h-20 w-auto object-contain"
            />
          ) : (
            <div className="w-16 h-16 rounded-full border-4 border-red-800 flex items-center justify-center">
              <span className="text-red-800 font-bold text-xs text-center leading-none">
                OFFICIAL
                <br />
                SEAL
              </span>
            </div>
          )}
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight text-red-900 leading-none">
              {data.title || "Product Certificate"}
            </h1>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest mt-2 flex items-center gap-2">
              {data.subTitle || "Official Certification Document"}
              {data.companyUrl && (
                <span className="text-red-600 text-[10px] normal-case bg-red-50 px-2 rounded tracking-normal font-mono font-bold">
                  {data.companyUrl}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            RECORD ID
          </p>
          <p className="text-2xl font-mono font-black text-red-600 leading-none tracking-widest">
            {data.certNumber}
          </p>
          <div className="flex gap-2 justify-end mt-3">
            <span className="text-[10px] font-black bg-green-100 text-green-800 px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm border border-green-200">
              {data.certificationStatus || "PASS"}
            </span>
            <span className="text-[10px] font-black bg-red-800 text-white px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm">
              SCORE: {data.overallExpertRating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-8 flex-1 relative z-10">
        {/* Left Column: Product & Manufacturer Details */}
        <div className="w-2/3 space-y-6">
          <div className="bg-slate-50 p-6 border-l-8 border-red-800 shadow-inner rounded-r-2xl">
            <p className="text-base italic text-gray-700 leading-relaxed font-medium">
              "
              {data.verificationStatement ||
                "This document uses rigorous testing and analysis to certify the authenticity and quality of the product described herein."}
              "
            </p>
          </div>

          <div className="flex gap-6 items-start">
            {data.productImage && (
              <div className="shrink-0 bg-white p-4 border-2 border-slate-100 rounded-3xl shadow-xl flex items-center justify-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={data.productImage}
                  alt="Product"
                  className="w-40 h-40 object-contain relative z-10"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-[10px] font-black uppercase text-red-900 border-b border-gray-200 mb-2 pb-1 tracking-widest">
                  Specifications
                </h3>
                <p className="text-2xl font-black text-gray-900 leading-none mb-1">
                  {data.productName}
                </p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                  {data.productCategory} • {data.productForm}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-black text-red-800 uppercase text-[9px]">
                    Ingredients
                  </p>
                  <p className="text-gray-800 line-clamp-2">
                    {data.keyActiveIngredients}
                  </p>
                </div>
                <div>
                  <p className="font-black text-red-800 uppercase text-[9px]">
                    Dietary
                  </p>
                  <p className="text-gray-800">{data.dietaryCompliance}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase text-red-900 border-b border-gray-200 mb-2 pb-1 tracking-widest">
              Detail & Analysis
            </h3>
            <div
              className="text-xs text-gray-600 leading-relaxed text-justify rich-text-content italic font-medium"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                Authority Info
              </p>
              <p className="text-sm font-black text-gray-900 leading-none">
                {data.manufacturerName}
              </p>
              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-tighter">
                {data.manufacturerAddress}
              </p>
              <p className="text-[10px] font-bold text-gray-500 mt-2">
                {data.location}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
                Support Center
              </p>
              <p className="text-sm font-black text-gray-900">
                {data.customerSupportEmail}
              </p>
              <p className="text-sm font-black text-gray-900">
                {data.customerSupportPhone}
              </p>
              <p className="text-[10px] font-bold text-red-600 mt-2 uppercase italic">
                {data.refundPolicy}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Ratings & Verdict */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden border-2 border-red-800/20">
            <div className="absolute top-0 right-0 p-4 rotate-12 -mr-8 -mt-8">
              <div className="w-20 h-20 bg-red-800/10 rounded-full blur-2xl"></div>
            </div>
            <h3 className="text-center font-black text-red-500 uppercase tracking-widest text-[10px] mb-4">
              Official Metrics
            </h3>
            <div className="space-y-2">
              {[
                { l: "Safety", v: data.safetyRating },
                { l: "Quality", v: data.ingredientsQualityRating },
                { l: "Efficacy", v: data.effectivenessRating },
                { l: "QC Standards", v: data.certificationsQCRating },
                { l: "Evidence", v: data.evidenceStrengthRating },
                { l: "User Experience", v: data.userExperienceRating },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-[11px] border-b border-white/5 pb-1"
                >
                  <span className="text-slate-400 font-bold uppercase tracking-tighter">
                    {m.l}
                  </span>
                  <span className="font-black text-white">{m.v}</span>
                </div>
              ))}
              <div className="pt-6 text-center">
                <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em] mb-1">
                  Master Score
                </p>
                <p className="text-6xl font-black text-white leading-none tracking-tighter">
                  {data.overallExpertRating}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-800 text-white p-6 rounded-3xl shadow-xl border-4 border-red-100 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">
              Master Verdict
            </p>
            <p className="text-2xl font-black uppercase italic tracking-tighter leading-none">
              {data.finalVerdict}
            </p>
            <p className="text-[9px] mt-2 font-black uppercase bg-white/10 p-1 rounded inline-block">
              PROVEN AUTHENTICITY
            </p>
          </div>

          <div className="mt-auto space-y-6">
            <div className="flex justify-between items-end gap-10">
              <div className="flex-1">
                {data.signature && (
                  <img
                    src={data.signature}
                    alt="Sign"
                    className="h-14 w-auto object-contain mix-blend-multiply brightness-75 transition-transform hover:scale-110"
                  />
                )}
                <div className="border-t-2 border-red-800 w-full mt-1"></div>
                <p className="text-sm font-black uppercase text-gray-900 mt-2 leading-none">
                  {data.personName}
                </p>
                <p className="text-[10px] font-bold text-red-600 uppercase mt-1 tracking-widest italic">
                  {data.role}
                </p>
              </div>
              {data.qrText && (
                <div className="w-20 h-20 bg-white p-2 border border-slate-100 rounded-xl shadow-inner">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrText)}`}
                    alt="QR"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {data.badge && (
              <img
                src={data.badge}
                alt="Seal"
                className="h-28 w-auto mx-auto drop-shadow-2xl"
              />
            )}
          </div>
        </div>
      </div>

      {/* Modern Footer with Action */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-[10px] relative z-10">
        <div className="flex gap-10 font-black text-gray-400 uppercase tracking-widest">
          <p>ISSUED: {data.issuedDate}</p>
          <p className="text-red-600 font-black">
            EXPIRATION: {data.expiryDate}
          </p>
        </div>
        <div>
          {data.buyNowUrl && (
            <a
              href={data.buyNowUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-pdf-link="buy-now"
              className="inline-block bg-red-800 text-white font-black px-8 py-3 rounded-full shadow-lg hover:shadow-red-200 transition-all uppercase tracking-widest italic text-center"
            >
              Order Through Verified Channel →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
