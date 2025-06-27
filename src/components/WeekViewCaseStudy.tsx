
import React from 'react';

interface CaseStudyProps {
  contentCard: any;
}

const WeekViewCaseStudy = ({ contentCard }: CaseStudyProps) => {
  const isCaseStudy = (contentCard as any).content_type === 'case_study';
  const caseDetails = isCaseStudy ? (contentCard as any).case_details : null;
  
  if (!isCaseStudy || !caseDetails) return null;

  return (
    <div className="case-study-container space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 rounded-xl border border-blue-200/60 shadow-sm">
        <h4 className="text-blue-800 font-semibold text-lg mb-3 flex items-center">
          🎯 Desafio do Cliente
        </h4>
        <p className="text-blue-700 leading-relaxed">{caseDetails.client_request}</p>
      </div>
      
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200/60 shadow-sm">
        <h4 className="text-emerald-800 font-semibold text-lg mb-3 flex items-center">
          ⚙️ Processo de Solução
        </h4>
        <p className="text-emerald-700 leading-relaxed">{caseDetails.solution_process}</p>
      </div>
      
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-200/60 shadow-sm">
        <h4 className="text-amber-800 font-semibold text-lg mb-3 flex items-center">
          📈 Resultado Prático
        </h4>
        <p className="text-amber-700 leading-relaxed font-medium">{caseDetails.practical_result}</p>
      </div>
      
      <div className="bg-gradient-to-r from-slate-50 to-zinc-50 p-6 rounded-xl border border-slate-200/60 shadow-sm">
        <h4 className="text-slate-800 font-semibold text-lg mb-3 flex items-center">
          💡 Insight Chave
        </h4>
        <p className="text-slate-700 leading-relaxed font-medium">{caseDetails.key_insight}</p>
      </div>
    </div>
  );
};

export default WeekViewCaseStudy;
