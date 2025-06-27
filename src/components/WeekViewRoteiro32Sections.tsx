
import React from 'react';

interface Roteiro32SectionsProps {
  contentCard: any;
}

// Seção 1: Fatores de Decisão Essenciais (após "Como Criar o Conteúdo")
export const Roteiro32Section1 = ({ contentCard }: Roteiro32SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 32) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
      <h4 className="text-blue-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">⚖️</span>
        Fatores de Decisão Essenciais
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-green-600 mb-1">💰 Impacto Financeiro</h4>
          <p className="text-sm text-gray-600">Custos, retorno, investimento necessário</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-600 mb-1">⏰ Fator Tempo</h4>
          <p className="text-sm text-gray-600">Urgência, prazos, momento certo</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-600 mb-1">🎯 Alinhamento com Objetivos</h4>
          <p className="text-sm text-gray-600">Missão pessoal, valores, visão de futuro</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-600 mb-1">⚠️ Nível de Risco</h4>
          <p className="text-sm text-gray-600">Probabilidade de falha, consequências</p>
        </div>
      </div>
    </div>
  );
};

// Seção 2: Framework de Análise (após "Gatilhos Psicológicos")
export const Roteiro32Section2 = ({ contentCard }: Roteiro32SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 32) return null;

  return (
    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
      <h4 className="text-green-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">🔍</span>
        Framework de Análise
      </h4>
      <div className="space-y-3">
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-gray-800 mb-1">1️⃣ Matriz Prós vs Contras</h4>
          <p className="text-sm text-gray-600">Liste e pese vantagens e desvantagens de cada opção</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-gray-800 mb-1">2️⃣ Teste do Arrependimento</h4>
          <p className="text-sm text-gray-600">"Com qual escolha me arrependeria menos em 5 anos?"</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-gray-800 mb-1">3️⃣ Conselho para um Amigo</h4>
          <p className="text-sm text-gray-600">"O que aconselharia se fosse com outra pessoa?"</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-gray-800 mb-1">4️⃣ Análise de Cenários</h4>
          <p className="text-sm text-gray-600">Melhor caso, pior caso e cenário mais provável</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-red-400">
          <h4 className="font-semibold text-gray-800 mb-1">5️⃣ Alinhamento de Valores</h4>
          <p className="text-sm text-gray-600">Qual opção está mais alinhada com seus princípios?</p>
        </div>
      </div>
    </div>
  );
};

// Seção 3: Armadilhas Mentais Comuns (antes do "Call to Action")
export const Roteiro32Section3 = ({ contentCard }: Roteiro32SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 32) return null;

  return (
    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-500">
      <h4 className="text-yellow-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">🧠</span>
        Armadilhas Mentais a Evitar
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border-l-4 border-red-400">
          <h4 className="font-semibold text-red-600 mb-2">🔄 Paralisia por Análise</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Analisar demais sem decidir</li>
            <li>• Buscar a "opção perfeita"</li>
            <li>• Adiar indefinidamente</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-600 mb-2">💸 Falácia do Custo Perdido</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Já investi muito para desistir"</li>
            <li>• Ignorar realidade atual</li>
            <li>• Decisão baseada no passado</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-600 mb-2">👥 Pressão Social</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• "Todo mundo está fazendo"</li>
            <li>• Opinião de terceiros demais peso</li>
            <li>• Medo do julgamento alheio</li>
          </ul>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-600 mb-2">⚡ Decisão Impulsiva</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Decidir no calor da emoção</li>
            <li>• Não considerar consequências</li>
            <li>• FOMO (medo de perder oportunidade)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Seção 4: Sinais de que É Hora de Decidir
export const Roteiro32Section4 = ({ contentCard }: Roteiro32SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 32) return null;

  return (
    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-l-purple-500">
      <h4 className="text-purple-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">🚨</span>
        Sinais de que É Hora de Decidir
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-start space-x-2">
          <span className="text-green-600 font-bold text-lg">✅</span>
          <div>
            <strong className="text-gray-800">Informação Suficiente:</strong>
            <span className="text-gray-600 text-sm"> Você tem 80% dos dados necessários</span>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-blue-600 font-bold text-lg">⏰</span>
          <div>
            <strong className="text-gray-800">Prazo Limite:</strong>
            <span className="text-gray-600 text-sm"> Janela de oportunidade se fechando</span>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-orange-600 font-bold text-lg">💡</span>
          <div>
            <strong className="text-gray-800">Intuição Clara:</strong>
            <span className="text-gray-600 text-sm"> Gut feeling consistente por dias</span>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <span className="text-red-600 font-bold text-lg">🔥</span>
          <div>
            <strong className="text-gray-800">Custo da Indecisão:</strong>
            <span className="text-gray-600 text-sm"> Não decidir está custando mais que errar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
