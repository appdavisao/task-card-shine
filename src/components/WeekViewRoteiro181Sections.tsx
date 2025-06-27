
import React from 'react';

interface Roteiro181SectionsProps {
  contentCard: any;
}

export const Roteiro181Section1 = ({ contentCard }: Roteiro181SectionsProps) => {
  if (contentCard.roteiro_number !== 181) return null;

  return (
    <div className="bg-orange-50 p-4 rounded-lg mb-4">
      <h3 className="text-orange-800 font-bold mb-3 flex items-center">
        <span className="mr-2">💭</span>
        Tipos de situações negativas eficazes:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border-l-4 border-red-400">
          <h4 className="font-semibold text-red-600 mb-1">💼 Profissionais</h4>
          <p className="text-sm text-gray-600">Perder cliente importante, falhar em projeto, ser rejeitado</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-green-600 mb-1">💰 Financeiras</h4>
          <p className="text-sm text-gray-600">Perder dinheiro em investimento, ter prejuízo no negócio</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-600 mb-1">👤 Pessoais</h4>
          <p className="text-sm text-gray-600">Quebrar hábito, falhar em compromisso, tomar decisão errada</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-600 mb-1">🤝 Relacionais</h4>
          <p className="text-sm text-gray-600">Conflito com equipe, mal-entendido, decepcionar alguém</p>
        </div>
      </div>
    </div>
  );
};

export const Roteiro181Section2 = ({ contentCard }: Roteiro181SectionsProps) => {
  if (contentCard.roteiro_number !== 181) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h3 className="text-blue-800 font-bold mb-3 flex items-center">
        <span className="mr-2">✨</span>
        Elementos que tornam autêntico:
      </h3>
      <div className="space-y-3">
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-gray-800 mb-1">🎯 Especificidade</h4>
          <p className="text-sm text-gray-600">Detalhes concretos, não generalizações</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-gray-800 mb-1">💪 Responsabilidade</h4>
          <p className="text-sm text-gray-600">Assuma sua parte sem buscar culpados</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-gray-800 mb-1">⏰ Timing</h4>
          <p className="text-sm text-gray-600">Conte quando ainda está "fresco" emocionalmente</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibant text-gray-800 mb-1">💝 Vulnerabilidade</h4>
          <p className="text-sm text-gray-600">Mostre impacto real na sua vida</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-red-400">
          <h4 className="font-semibold text-gray-800 mb-1">📈 Crescimento</h4>
          <p className="text-sm text-gray-600">Foque no que aprendeu, não na autopiedade</p>
        </div>
      </div>
    </div>
  );
};

export const Roteiro181Section3 = ({ contentCard }: Roteiro181SectionsProps) => {
  if (contentCard.roteiro_number !== 181) return null;

  return (
    <div className="bg-green-50 p-4 rounded-lg mb-4">
      <h3 className="text-green-800 font-bold mb-3 flex items-center">
        <span className="mr-2">📚</span>
        Lições valiosas comuns:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-green-600 mb-2">🔧 Sobre preparação</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Pressa é inimiga da perfeição"</li>
            <li>• "Due diligence nunca é demais"</li>
            <li>• "Backup plans salvam vidas"</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-600 mb-2">🤝 Sobre relacionamentos</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Comunicação clara evita problemas"</li>
            <li>• "Expectativas alinhadas são essenciais"</li>
            <li>• "Feedback regular previne surpresas"</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-600 mb-2">🧠 Sobre emoções</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Decisões emocionais custam caro"</li>
            <li>• "Pausa antes de reagir salva relacionamentos"</li>
            <li>• "Ego é o maior inimigo do crescimento"</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-600 mb-2">⚙️ Sobre sistemas</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Processos existem por uma razão"</li>
            <li>• "Atalhos geralmente custam mais caro"</li>
            <li>• "Consistência vence talento"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const Roteiro181Section4 = ({ contentCard }: Roteiro181SectionsProps) => {
  if (contentCard.roteiro_number !== 181) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-gray-800 font-bold mb-3 flex items-center">
        <span className="mr-2">⚠️</span>
        Cuidados importantes:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-start space-x-2">
          <span className="text-blue-600 font-bold text-lg">🔒</span>
          <div>
            <strong className="text-gray-800">Privacidade:</strong>
            <span className="text-gray-600 text-sm"> Proteja outras pessoas envolvidas</span>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-green-600 font-bold text-lg">💼</span>
          <div>
            <strong className="text-gray-800">Profissionalismo:</strong>
            <span className="text-gray-600 text-sm"> Mantenha detalhes confidenciais privados</span>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-purple-600 font-bold text-lg">💝</span>
          <div>
            <strong className="text-gray-800">Autocompaixão:</strong>
            <span className="text-gray-600 text-sm"> Evite autocrítica excessiva</span>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-orange-600 font-bold text-lg">📖</span>
          <div>
            <strong className="text-gray-800">Contexto:</strong>
            <span className="text-gray-600 text-sm"> Dê informação suficiente para entenderem</span>
          </div>
        </div>
      </div>
    </div>
  );
};
