import { CertificateTemplateProps } from "@/types/certificate";

export default function Template6({ data }: CertificateTemplateProps) {
  return (
    <div className="w-[1000px] min-h-[707px] h-auto bg-slate-100 p-8 relative box-border overflow-hidden flex flex-col">
      <div className="flex-1 bg-white rounded-none overflow-hidden flex relative z-10">
        <div className="w-1/3 bg-linear-to-b from-slate-800 via-slate-700 to-slate-800 p-8 flex flex-col justify-between text-white">
          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              className="h-16 w-auto object-contain brightness-0 invert mb-8"
            />
          )}

          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Certificate No
              </p>
              <p className="text-lg font-bold">{data.certNumber}</p>
            </div>

            <div className="h-px bg-white/20"></div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Issued Date
              </p>
              <p className="text-base font-medium">{data.issuedDate}</p>
            </div>

            {data.expiryDate && (
              <div>
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                  Valid Until
                </p>
                <p className="text-base font-medium">{data.expiryDate}</p>
              </div>
            )}

            <div className="h-px bg-white/20"></div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-2">
                Location
              </p>
              <p className="text-base font-medium">{data.location}</p>
            </div>
          </div>

          {data.badge && (
            <img
              src={data.badge}
              alt="Badge"
              className="h-20 w-auto mx-auto brightness-0 invert opacity-80"
            />
          )}
        </div>

        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-slate-800 mb-2">
                {data.title}
              </h1>
              <div className="w-24 h-1 bg-slate-800"></div>
            </div>

            <div className="bg-slate-50 border-y border-slate-200 py-8 my-8 px-8">
              <div
                className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto rich-text-content"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>

            <div className="bg-slate-50 p-6 border-l-4 border-slate-800">
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-2">
                Product Name
              </p>
              <p className="text-3xl font-bold text-slate-800">
                {data.productName}
              </p>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-slate-300">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {data.productCategory}{" "}
                    <span className="text-slate-400">|</span> {data.productForm}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-slate-200 text-slate-800 px-2 py-1 rounded font-bold">
                    {data.certificationStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Extended Detail View - Slate/Sky Theme */}
            <div className="mt-6 border-t border-slate-200 pt-4">
              <div className="flex gap-8 text-[11px] text-slate-600">
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-slate-800 uppercase mb-1">
                    Product Details
                  </p>
                  <p>Category: {data.productCategory}</p>
                  <p>Dietary: {data.dietaryCompliance}</p>
                  <p>Ingredients: {data.keyActiveIngredients}</p>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-slate-800 uppercase mb-1">
                    Verification
                  </p>
                  <p>Mfr: {data.manufacturerAddress}</p>
                  <p>Tested: {data.thirdPartyTesting}</p>
                  <p>Approved: {data.certificationsAndApprovals}</p>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-slate-800 uppercase mb-1">
                    Support
                  </p>
                  <p>Email: {data.customerSupportEmail}</p>
                  <p>Refund: {data.refundPolicy}</p>
                  <p>Statement: {data.verificationStatement}</p>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 p-3 rounded border border-slate-200">
                <div className="grid grid-cols-6 gap-2 text-center text-[10px] text-slate-600 font-medium">
                  <div className="bg-white p-1 rounded border border-slate-100">
                    <span className="block text-slate-400 uppercase text-[9px]">
                      Value
                    </span>
                    {data.valueForMoneyRating}
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-100">
                    <span className="block text-slate-400 uppercase text-[9px]">
                      Evidence
                    </span>
                    {data.evidenceStrengthRating}
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-100">
                    <span className="block text-slate-400 uppercase text-[9px]">
                      User Exp
                    </span>
                    {data.userExperienceRating}
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-100">
                    <span className="block text-slate-400 uppercase text-[9px]">
                      Versatility
                    </span>
                    {data.versatilityUseCaseFit}
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-100">
                    <span className="block text-slate-400 uppercase text-[9px]">
                      Effective
                    </span>
                    {data.effectivenessRating}
                  </div>
                  <div className="col-span-1 flex items-center justify-center bg-slate-800 text-white rounded">
                    <span className="font-bold uppercase tracking-tighter">
                      {data.finalVerdict}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div>
                <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">
                  Certified by
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {data.personName}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-600">{data.role}</p>
                <p className="text-sm font-medium text-slate-700">
                  {data.companyName}
                </p>
              </div>

              {data.signature && (
                <div className="pt-4">
                  <img
                    src={data.signature}
                    alt="Signature"
                    className="h-16 w-auto mb-2"
                  />
                  <div className="w-56 border-t-2 border-slate-800"></div>
                  <p className="text-xs text-slate-500 mt-1">
                    Authorized Signature
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
