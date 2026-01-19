import { CertificateTemplateProps } from "@/types/certificate";

export default function Template9({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-linear-to-br from-gray-50 to-slate-100 p-8 relative box-border overflow-hidden flex flex-col">
      <div className="flex-1 bg-white border-8 border-double border-gray-800 p-12 relative z-10">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8 py-2 border-4 border-gray-800 rounded-full">
          {data.logo ? (
            <img
              src={data.logo}
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          ) : (
            <p className="text-sm font-bold text-gray-800">
              {data.companyName}
            </p>
          )}
        </div>

        {data.badge && (
          <div className="absolute -top-6 right-12 bg-white p-2 border-4 border-gray-800 rounded-full">
            <img src={data.badge} alt="Badge" className="h-16 w-auto" />
          </div>
        )}

        <div className="h-full flex flex-col justify-center space-y-8 pt-4">
          <div className="text-center">
            <h1 className="text-6xl font-serif font-bold text-gray-800 mb-4">
              {data.title}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="w-20 h-px bg-gray-800"></div>
              <div className="w-3 h-3 border-2 border-gray-800 rotate-45"></div>
              <div className="w-20 h-px bg-gray-800"></div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center px-16 space-y-8">
            <div
              className="text-lg text-slate-700 leading-relaxed text-center rich-text-content"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="bg-gray-50 border-2 border-gray-800 p-8 rounded-none">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                Product Certified
              </p>
              <p className="text-4xl font-bold text-gray-900 mb-6">
                {data.productName}
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-300">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Certificate
                  </p>
                  <p className="font-bold text-gray-800">{data.certNumber}</p>
                  <p className="text-[10px] text-gray-500 uppercase mt-1">
                    {data.certificationStatus}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Expert Rating
                  </p>
                  <p className="font-bold text-gray-800">
                    {data.overallExpertRating || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Location
                  </p>
                  <p className="font-bold text-gray-800">{data.location}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    Issue Date
                  </p>
                  <p className="font-bold text-gray-800">{data.issuedDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-12 pt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {data.personName}
              </p>
              <p className="text-sm text-gray-600 mt-1">{data.role}</p>
              <p className="text-xs text-gray-500 mt-1">{data.companyName}</p>

              {data.signature && (
                <div className="mt-4">
                  <img
                    src={data.signature}
                    alt="Signature"
                    className="h-16 w-auto mx-auto mb-2"
                  />
                  <div className="w-52 border-t-2 border-gray-800 mx-auto"></div>
                  <p className="text-xs text-gray-500 mt-1">
                    Authorized Signature
                  </p>
                </div>
              )}
            </div>
          </div>

          {data.expiryDate && (
            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
              <span className="font-semibold">Valid Until:</span>{" "}
              {data.expiryDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
