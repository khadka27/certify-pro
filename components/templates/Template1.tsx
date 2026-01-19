import { CertificateTemplateProps } from "@/types/certificate";

export default function Template1({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-16 relative border-8 border-amber-600 shadow-2xl box-border overflow-hidden flex flex-col">
      <div className="absolute inset-12 border-4 border-amber-400"></div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-between text-center py-4">
        {data.logo && (
          <img
            src={data.logo}
            alt="Logo"
            className="h-20 w-auto object-contain mb-4"
          />
        )}

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <h1 className="text-6xl font-serif font-bold text-amber-800 tracking-wide">
            {data.title}
          </h1>

          {data.subTitle && (
            <p className="text-xl font-medium text-amber-700 mt-2 uppercase tracking-widest">
              {data.subTitle}
            </p>
          )}

          <div className="w-32 h-1 bg-amber-600"></div>

          <div
            className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-12 rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <div className="space-y-2 mt-8">
            <p className="text-2xl font-semibold text-gray-800">
              Product:{" "}
              <span className="text-amber-700">{data.productName}</span>
            </p>
            <p className="text-lg text-gray-600">
              Certificate No: {data.certNumber}
            </p>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-xl font-medium text-gray-800">
              {data.personName}
            </p>
            <p className="text-base text-gray-600">{data.role}</p>
            <p className="text-sm text-gray-500">{data.companyName}</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full mt-8">
          <div className="text-left">
            <p className="text-sm text-gray-600">Issued Date</p>
            <p className="font-medium text-gray-800">{data.issuedDate}</p>
            {data.expiryDate && (
              <>
                <p className="text-sm text-gray-600 mt-2">Expiry Date</p>
                <p className="font-medium text-gray-800">{data.expiryDate}</p>
              </>
            )}
          </div>

          {data.signature && (
            <div className="text-center">
              <img
                src={data.signature}
                alt="Signature"
                className="h-16 w-auto mb-2"
              />
              <div className="w-48 border-t-2 border-gray-800"></div>
              <p className="text-sm text-gray-600 mt-1">Authorized Signature</p>
            </div>
          )}

          {data.badge && (
            <img src={data.badge} alt="Badge" className="h-20 w-auto" />
          )}

          <div className="text-right">
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium text-gray-800">{data.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
