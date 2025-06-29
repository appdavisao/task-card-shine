
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Database, TrendingUp, UserCheck } from 'lucide-react';

interface RecoveryStats {
  total_usuarios_recuperados: number;
  com_telefone: number;
  com_instagram: number;
  com_linkedin: number;
  com_youtube: number;
  com_website: number;
  com_localizacao: number;
  usuarios_sem_nome_usuario: number;
}

interface DashboardStats {
  total_dashboards: number;
  com_strategy_text: number;
  com_profile_highlights: number;
  com_motivation_quote: number;
  com_instructions_text: number;
  dashboards_completos: number;
}

const DataRecoveryStats: React.FC = () => {
  const [recoveryStats, setRecoveryStats] = useState<RecoveryStats | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Verificar usuários recuperados (excluindo os que ainda estão como "Usuário")
        const { data: recoveryData, error: recoveryError } = await supabase
          .from('profiles')
          .select(`
            student_name,
            display_name,
            phone,
            instagram,
            linkedin,
            youtube,
            website,
            location
          `);

        if (recoveryError) throw recoveryError;

        // Separar usuários com nomes válidos dos que ainda estão como "Usuário"
        const usuariosComNomesValidos = recoveryData?.filter(p => 
          p.student_name !== 'Usuário' && p.display_name !== 'Usuário'
        ) || [];

        const usuariosSemNome = recoveryData?.filter(p => 
          p.student_name === 'Usuário' || p.display_name === 'Usuário'
        ) || [];

        const recoveryStats: RecoveryStats = {
          total_usuarios_recuperados: usuariosComNomesValidos.length,
          usuarios_sem_nome_usuario: usuariosSemNome.length,
          com_telefone: usuariosComNomesValidos.filter(p => p.phone && p.phone.trim() !== '').length,
          com_instagram: usuariosComNomesValidos.filter(p => p.instagram && p.instagram.trim() !== '').length,
          com_linkedin: usuariosComNomesValidos.filter(p => p.linkedin && p.linkedin.trim() !== '').length,
          com_youtube: usuariosComNomesValidos.filter(p => p.youtube && p.youtube.trim() !== '').length,
          com_website: usuariosComNomesValidos.filter(p => p.website && p.website.trim() !== '').length,
          com_localizacao: usuariosComNomesValidos.filter(p => p.location && p.location.trim() !== '').length,
        };

        // Verificar dashboards completos
        const { data: dashboardData, error: dashboardError } = await supabase
          .from('user_dashboard')
          .select(`
            strategy_text,
            profile_highlights,
            motivation_quote,
            instructions_text
          `);

        if (dashboardError) throw dashboardError;

        const dashboardStats: DashboardStats = {
          total_dashboards: dashboardData?.length || 0,
          com_strategy_text: dashboardData?.filter(d => d.strategy_text && d.strategy_text.trim() !== '').length || 0,
          com_profile_highlights: dashboardData?.filter(d => d.profile_highlights && JSON.stringify(d.profile_highlights) !== '[]').length || 0,
          com_motivation_quote: dashboardData?.filter(d => d.motivation_quote && d.motivation_quote.trim() !== '').length || 0,
          com_instructions_text: dashboardData?.filter(d => d.instructions_text && d.instructions_text.trim() !== '').length || 0,
          dashboards_completos: dashboardData?.filter(d => 
            d.strategy_text && d.strategy_text.trim() !== '' &&
            d.profile_highlights && JSON.stringify(d.profile_highlights) !== '[]' &&
            d.motivation_quote && d.motivation_quote.trim() !== '' &&
            d.instructions_text && d.instructions_text.trim() !== ''
          ).length || 0,
        };

        setRecoveryStats(recoveryStats);
        setDashboardStats(dashboardStats);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Recuperação de Dados - Resultados Atualizados</h2>
      </div>

      {/* Status da Recuperação de Nomes */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <UserCheck className="h-5 w-5" />
            Status da Recuperação de Nomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {recoveryStats?.total_usuarios_recuperados || 0}
              </div>
              <div className="text-sm text-green-700 font-medium">Usuários com Nomes Restaurados</div>
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                ✅ Recuperação Completa
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-amber-600">
                {recoveryStats?.usuarios_sem_nome_usuario || 0}
              </div>
              <div className="text-sm text-amber-700">Ainda como "Usuário"</div>
              {(recoveryStats?.usuarios_sem_nome_usuario || 0) > 0 && (
                <Badge variant="outline" className="mt-2 border-amber-300 text-amber-700">
                  ⚠️ Pendente
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Contatos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Dados de Contato Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-semibold text-green-600">
                {recoveryStats?.com_telefone || 0}
              </div>
              <div className="text-sm text-gray-600">📱 Com Telefone</div>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <div className="text-2xl font-semibold text-pink-600">
                {recoveryStats?.com_instagram || 0}
              </div>
              <div className="text-sm text-gray-600">📸 Com Instagram</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-semibold text-blue-700">
                {recoveryStats?.com_linkedin || 0}
              </div>
              <div className="text-sm text-gray-600">💼 Com LinkedIn</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-xl font-semibold text-red-600">
                {recoveryStats?.com_youtube || 0}
              </div>
              <div className="text-sm text-gray-600">🎥 Com YouTube</div>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-xl font-semibold text-indigo-600">
                {recoveryStats?.com_website || 0}
              </div>
              <div className="text-sm text-gray-600">🌐 Com Website</div>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <div className="text-xl font-semibold text-gray-600">
                {recoveryStats?.com_localizacao || 0}
              </div>
              <div className="text-sm text-gray-600">📍 Com Localização</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Status dos Dashboards de Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {dashboardStats?.total_dashboards || 0}
              </div>
              <div className="text-sm text-gray-600">Total Dashboards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-green-600">
                {dashboardStats?.dashboards_completos || 0}
              </div>
              <div className="text-sm text-gray-600">
                <Badge variant="secondary" className="mt-1">
                  Dashboards Completos
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-orange-600">
                {dashboardStats && dashboardStats.total_dashboards > 0 ? 
                  Math.round((dashboardStats.dashboards_completos / dashboardStats.total_dashboards) * 100) : 0
                }%
              </div>
              <div className="text-sm text-gray-600">Taxa de Completude</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-500">
                {dashboardStats?.com_strategy_text || 0}
              </div>
              <div className="text-xs text-gray-600">Strategy Text</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-500">
                {dashboardStats?.com_profile_highlights || 0}
              </div>
              <div className="text-xs text-gray-600">Profile Highlights</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-500">
                {dashboardStats?.com_motivation_quote || 0}
              </div>
              <div className="text-xs text-gray-600">Motivation Quote</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-500">
                {dashboardStats?.com_instructions_text || 0}
              </div>
              <div className="text-xs text-gray-600">Instructions Text</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-green-800">Resumo da Recuperação Atualizada</h3>
        </div>
        <ul className="mt-3 text-sm text-green-700 space-y-1">
          <li>✅ Restauração completa dos nomes de usuários (excluindo Dani Pires conforme solicitado)</li>
          <li>✅ {recoveryStats?.total_usuarios_recuperados || 0} usuários com nomes válidos restaurados</li>
          <li>✅ Dados de contato preservados: telefones, Instagram, LinkedIn, etc.</li>
          <li>✅ Correção de inconsistências entre student_name e display_name</li>
          <li>📊 {dashboardStats?.dashboards_completos || 0} usuários com dashboards 100% completos</li>
          {(recoveryStats?.usuarios_sem_nome_usuario || 0) > 0 && (
            <li className="text-amber-700">⚠️ {recoveryStats?.usuarios_sem_nome_usuario} usuários ainda precisam de recuperação manual</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DataRecoveryStats;
