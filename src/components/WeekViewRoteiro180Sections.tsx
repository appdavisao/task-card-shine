import React from 'react';

interface Roteiro180SectionsProps {
  contentCard: any;
}

// Seção 1: Por que as copias falham (após "Como Criar o Conteúdo")
export const Roteiro180Section1 = ({ contentCard }: Roteiro180SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 180) return null;

  return (
    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-l-red-500">
      <h4 className="text-red-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">❌</span>
        Por que as copias falham
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded border-l-4 border-red-400">
          <h4 className="font-semibold text-red-600 mb-1">👁️ Elementos Invisíveis</h4>
          <p className="text-sm text-gray-600">Timing, recursos não aparentes, relacionamentos</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-orange-600 mb-1">🎯 Contexto Específico</h4>
          <p className="text-sm text-gray-600">Situação única, mercado, momento</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-600 mb-1">🏗️ Preparação Anterior</h4>
          <p className="text-sm text-gray-600">Base construída ao longo do tempo</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-600 mb-1">🧠 Conhecimento Tácito</h4>
          <p className="text-sm text-gray-600">Insights não compartilhados</p>
        </div>
      </div>
    </div>
  );
};

export const Roteiro180Section2 = ({ contentCard }: Roteiro180SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 180) return null;

  return (
    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
      <h4 className="text-green-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">🔄</span>
        Como adaptar corretamente
      </h4>
      <div className="space-y-3">
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-gray-800 mb-1">1️⃣ Entenda o princípio</h4>
          <p className="text-sm text-gray-600">Vá além da superfície, compreenda o "porquê"</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-gray-800 mb-1">2️⃣ Analise o contexto</h4>
          <p className="text-sm text-gray-600">Entenda as condições específicas do sucesso</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-gray-800 mb-1">3️⃣ Adapte para sua realidade</h4>
          <p className="text-sm text-gray-600">Modifique conforme sua situação e recursos</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-orange-400">
          <h4 className="font-semibold text-gray-800 mb-1">4️⃣ Teste e ajuste</h4>
          <p className="text-sm text-gray-600">Implemente, meça resultados e refine</p>
        </div>
      </div>
    </div>
  );
};

export const Roteiro180Section3 = ({ contentCard }: Roteiro180SectionsProps) => {
  if ((contentCard as any).roteiro_number !== 180) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
      <h4 className="text-blue-700 font-semibold text-lg mb-3 flex items-center">
        <span className="text-lg mr-2">🎯</span>
        Elementos fundamentais para o sucesso
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-green-600 mb-2">🏗️ Fundamentos</h4>
          <p className="text-sm text-gray-600">Base sólida antes de implementar</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-600 mb-2">🔧 Adaptações</h4>
          <p className="text-sm text-gray-600">Modificações para seu contexto</p>
        </div>
        <div className="bg-white p-3 rounded border-l-4 border-purple-400">
          <h4 className="font-semibold text-purple-600 mb-2">⭐ Elementos Únicos</h4>
          <p className="text-sm text-gray-600">Seu diferencial pessoal</p>
        </div>
      </div>
    </div>
  );
};
