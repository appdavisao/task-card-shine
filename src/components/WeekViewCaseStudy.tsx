
import React from 'react';

interface CaseStudyProps {
  contentCard: any;
}

const WeekViewCaseStudy = ({ contentCard }: CaseStudyProps) => {
  const isCaseStudy = (contentCard as any).content_type === 'case_study';
  const caseDetails = isCaseStudy ? (contentCard as any).case_details : null;
  
  if (!isCaseStudy || !caseDetails) return null;

  return (
    <div className="case-study-container space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
        <h4 className="text-blue-700 font-semibold text-lg mb-2 flex items-center">
          🎯 Desafio do Cliente
        </h4>
        <p className="text-blue-800 leading-relaxed">{caseDetails.client_request}</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
        <h4 className="text-green-700 font-semibold text-lg mb-2 flex items-center">
          ⚙️ Processo de Solução
        </h4>
        <p className="text-green-800 leading-relaxed">{caseDetails.solution_process}</p>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-500">
        <h4 className="text-yellow-700 font-semibold text-lg mb-2 flex items-center">
          📈 Resultado Prático
        </h4>
        <p className="text-yellow-800 leading-relaxed font-medium">{caseDetails.practical_result}</p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-l-purple-500">
        <h4 className="text-purple-700 font-semibold text-lg mb-2 flex items-center">
          💡 Insight Chave
        </h4>
        <p className="text-purple-800 leading-relaxed font-medium">{caseDetails.key_insight}</p>
      </div>
    </div>
  );
};

export default WeekViewCaseStudy;
