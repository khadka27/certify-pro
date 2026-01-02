import { CertificateTemplateProps } from "@/types/certificate";

export default function Template12({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-white p-16 relative box-border overflow-hidden text-black flex flex-col font-serif select-none">
      {/* 1. Logo at Top Center */}
      <div className="flex justify-center mb-4">
        {data.logo ? (
          <img
            src={data.logo}
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        ) : (
          <div className="w-14 h-14 rounded-full border-2 border-blue-900 flex items-center justify-center">
            <div className="text-blue-900 text-[10px] font-bold text-center leading-none">
              CQC
              <br />
              LOGO
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Title & Number */}
      <div className="text-center mb-6">
        <h1 className="text-[36px] font-bold uppercase tracking-tight leading-none mb-1">
          {data.title || "PRODUCT CERTIFICATE"}
        </h1>
        <p className="text-sm font-medium">No.: {data.certNumber}</p>
      </div>

      {/* 3. Dynamic Sections */}
      <div className="flex-1 space-y-4 text-center px-10">
        {/* Applicant Section */}
        <div className="space-y-0.5">
          <h2 className="text-[12px] font-bold uppercase tracking-wide">
            NAME AND ADDRESS OF THE APPLICANT
          </h2>
          <p className="text-[13px] font-medium leading-tight">
            {data.companyName}
          </p>
          <p className="text-[11px] leading-tight text-gray-700">
            {data.location}
          </p>
        </div>

        {/* Manufacturer Section */}
        <div className="space-y-0.5">
          <h2 className="text-[12px] font-bold uppercase tracking-wide">
            NAME AND ADDRESS OF THE MANUFACTURER
          </h2>
          <p className="text-[13px] font-medium leading-tight">
            {data.companyName}
          </p>
          <p className="text-[11px] leading-tight text-gray-700">
            {data.location}
          </p>
        </div>

        {/* Factory Section */}
        <div className="space-y-0.5">
          <h2 className="text-[12px] font-bold uppercase tracking-wide">
            NAME AND ADDRESS OF THE FACTORY
          </h2>
          <p className="text-[13px] font-medium leading-tight">
            {data.companyName} (V016952)
          </p>
          <p className="text-[11px] leading-tight text-gray-700">
            {data.location}
          </p>
        </div>

        {/* Model and Specification Section */}
        <div className="space-y-0.5 min-h-[40px]">
          <h2 className="text-[12px] font-bold uppercase tracking-wide">
            NAME, MODEL AND SPECIFICATION
          </h2>
          <p className="text-[14px] font-bold">{data.productName}</p>
          <div
            className="text-[10px] text-gray-600 italic tracking-tight rich-text-content"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        {/* Standards Section */}
        <div className="space-y-0.5">
          <h2 className="text-[12px] font-bold uppercase tracking-wide">
            THE STANDARDS AND TECHNICAL REQUIREMENTS FOR THE PRODUCTS
          </h2>
          <p className="text-[13px] font-medium italic">
            {data.subTitle || "GB8898-2011; GB4943.1-2011"}
          </p>
        </div>

        {/* Certification Model Section */}
        <div className="space-y-0.5">
          <h2 className="text-[12px] font-bold uppercase tracking-wide">
            CERTIFICATION MODEL
          </h2>
          <p className="text-[12px] leading-tight">
            Type Testing of Product + Initial Factory Inspection + Follow up
            Factory Inspection
          </p>
        </div>

        {/* Legal Statement Section */}
        <div className="pt-2">
          <p className="text-[10px] text-gray-800 leading-[1.3] text-center max-w-2xl mx-auto italic">
            This is to certify that the above mentioned products have met the
            requirements of certification rules
            <span className="font-bold mx-1">CQC11-471302-2015</span>.<br />
            Date of issue:{" "}
            <span className="font-semibold">{data.issuedDate}</span>
            <br />
            Validity of this certificate is subject to positive result of the
            regular follow up inspection by issuing certification body until the
            expiry date.
            <br />
            Date of original certification:{" "}
            <span className="font-semibold">{data.issuedDate}</span>
            <br />
            Accredited by China National Accreditation Service for Conformity
            Assessment CNAS C001-P
          </p>
        </div>
      </div>

      {/* 4. Signature Area & Official Seal */}
      <div className="mt-6 flex items-end justify-between px-10 pb-4 relative">
        <div className="flex-1 text-left">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-[18px] font-bold relative bottom-0.5">
              President:
            </span>
            <div className="relative min-w-[200px]">
              {data.signature ? (
                <img
                  src={data.signature}
                  alt="Signature"
                  className="h-14 w-auto object-contain mix-blend-multiply absolute bottom-2 left-0"
                />
              ) : (
                <div className="h-10"></div>
              )}
              <div className="border-b border-black w-full relative z-10"></div>
              <p className="text-[16px] font-bold mt-1 leading-none">
                {data.personName}
              </p>
            </div>
          </div>
        </div>

        {/* Large Official Red Seal */}
        <div className="absolute right-10 -bottom-4 z-20">
          <div className="w-36 h-36 rounded-full border-[5px] border-red-500/80 flex items-center justify-center p-2 rotate-[-5deg] backdrop-blur-[0.5px]">
            <div className="absolute inset-1.5 rounded-full border border-red-400/30"></div>
            <div className="text-red-600/90 flex flex-col items-center justify-center text-center leading-[0.9]">
              <span className="text-[10px] font-black uppercase mb-1 tracking-tighter">
                QUALITY CERTIFICATION
              </span>
              <span className="text-[14px] font-bold border-y-2 border-red-600/50 py-0.5 my-1">
                CERTIFIED
              </span>
              <span className="text-[10px] font-black uppercase mb-1 tracking-tighter">
                CHINA CENTRE
              </span>

              <svg
                className="w-8 h-8 fill-red-600/80 my-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2l-2.81 6.63L2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Organization Footer Bottom Content */}
      <div className="text-center space-y-0.5 pt-4">
        <h3 className="text-[20px] font-black uppercase tracking-[0.05em] text-gray-900 border-t border-gray-200 pt-2">
          CHINA QUALITY CERTIFICATION CENTRE
        </h3>
        <p className="text-[9px] font-medium text-gray-700">
          Section 9, No. 188, Nansihuan Xilu, Beijing 100070 P.R.China
        </p>
        <p className="text-[9px] font-medium text-blue-600 underline">
          http://www.cqc.com.cn
        </p>
      </div>

      {/* 6. Red Serial Code (Bottom Left) */}
      <div className="absolute bottom-6 left-12 text-[16px] text-red-600 font-bold opacity-80 select-none">
        C 0095757
      </div>
    </div>
  );
}
