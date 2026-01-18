import { CertificateTemplateProps } from "@/types/certificate";

export default function Template13({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-8 relative shadow-2xl box-border overflow-hidden">
      {/* Optional Watermark */}
      {data.showWatermark && data.watermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src={data.watermark}
            alt="Watermark"
            className="opacity-[0.06] w-[500px] h-auto object-contain"
          />
        </div>
      )}

      {/* Decorative left side shapes */}
      <div className="absolute left-0 top-32 w-0 h-0 border-l-[100px] border-l-yellow-300 border-t-[100px] border-t-transparent opacity-40"></div>
      <div className="absolute left-0 top-64 w-0 h-0 border-l-[80px] border-l-yellow-400 border-b-[80px] border-b-transparent opacity-40"></div>
      <div className="absolute left-0 top-96 w-0 h-0 border-l-[60px] border-l-orange-300 border-t-[60px] border-t-transparent opacity-40"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          {/* Left: Valid Until */}
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-600">
              VALID TO{" "}
              {data.expiryDate
                ? new Date(data.expiryDate)
                    .toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })
                    .toUpperCase()
                : "31 DEC"}
            </p>
            <p className="text-5xl font-bold text-cyan-500">
              {data.expiryDate
                ? new Date(data.expiryDate).getFullYear()
                : "2026"}
            </p>
            {data.subTitle && (
              <p className="text-xs text-gray-700 mt-2 max-w-[200px]">
                {data.subTitle}
              </p>
            )}
          </div>

          {/* Right: Logo */}
          {data.logo && (
            <div className="border-2 border-gray-800 p-3 bg-white">
              <img
                src={data.logo}
                alt="Logo"
                className="h-20 w-20 object-contain"
              />
              <p className="text-[8px] text-center text-gray-600 mt-1 uppercase">
                Product Certification
              </p>
            </div>
          )}
        </div>

        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-600 tracking-wide uppercase">
            {data.title}
          </h1>
          <p className="text-xl text-cyan-600 font-semibold mt-1">
            {data.productName}
          </p>
          <p className="text-sm text-gray-600 italic mt-2">
            <span className="font-semibold">Certificate Number:</span>{" "}
            {data.certNumber}
          </p>
        </div>

        {/* Center Badge/Seal */}
        {data.badge && (
          <div className="flex justify-center mb-4">
            <img src={data.badge} alt="Badge" className="h-16 w-auto" />
          </div>
        )}

        {/* Company Name */}
        <div className="text-center mb-6">
          <p className="text-base font-bold text-gray-900 uppercase">
            {data.companyName}
          </p>
          <p className="text-sm text-gray-700">{data.location}</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div
            className="text-xs text-gray-700 leading-relaxed text-justify px-8 rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* Scope of Certification Section */}
        <div className="mb-6 px-8">
          <h2 className="text-lg font-bold text-cyan-700 mb-2">
            SCOPE OF CERTIFICATION
          </h2>
          <div className="text-xs text-gray-700 leading-relaxed">
            <p>
              Specified products listed on this certificate may be supplied
              under ACRS certification only when used for installation directly
              by this certificate holder or supplied to a ACRS Traceability
              Scheme Certified holder with a Scope of Certification including{" "}
              {data.productName}.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-end px-8 mt-8 pt-6 border-t border-gray-300">
          {/* Left: Signature */}
          <div className="text-left">
            <p className="text-xs text-gray-600 mb-2">By authority of</p>
            <p className="text-sm font-bold text-gray-800">{data.personName}</p>
            {data.signature && (
              <img
                src={data.signature}
                alt="Signature"
                className="h-10 w-auto my-1"
              />
            )}
            <p className="text-xs text-gray-700 italic">{data.role}</p>
            <div className="mt-4 space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Valid until:</span>{" "}
                {data.expiryDate || "31 December 2026"}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-semibold">First certified:</span>{" "}
                {data.issuedDate}
              </p>
            </div>
          </div>

          {/* Right: Accreditation Badge */}
          <div className="text-center">
            <div className="border-4 border-cyan-600 rounded-full w-20 h-20 flex items-center justify-center bg-white">
              <span className="text-3xl font-bold text-cyan-600">C</span>
            </div>
            <p className="text-[8px] text-gray-600 mt-1">
              www.jas-anz.org/register
            </p>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-6 px-8">
          <p className="text-[8px] text-gray-500 leading-tight border-t border-gray-200 pt-2">
            This certificate is issued subject to the Terms and Conditions of
            Certification. This certificate remains the property of{" "}
            {data.companyName}. This certificate and products supplied under it
            may only be used by the client to whom it was issued.
          </p>
        </div>
      </div>
    </div>
  );
}
