
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Users, TestTube, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ProfileReport {
  user_id: string;
  display_name: string;
  archetype: string;
  profile_data: {
    current_work: string;
    segment: string;
    legacy: string;
  };
  day1_content: {
    has_content: boolean;
    title: string;
    content_card_keys: string[];
  };
  personalizations: {
    total_generations: number;
    active_generation: {
      level: number;
      created_at: string;
    } | null;
    all_levels: Array<{
      level: number;
      is_active: boolean;
      created_at: string;
    }>;
  };
}

interface TestResult {
  success: boolean;
  summary: {
    total_profiles_checked: number;
    complete_profiles_found: number;
    profiles_with_day1_content: number;
    total_personalizations: number;
  };
  complete_profiles: Array<{
    user_id: string;
    display_name: string;
    archetype: string;
    current_work: string;
    segment: string;
    legacy: string;
  }>;
  detailed_report: ProfileReport[];
  recommendations: {
    ready_for_personalization: ProfileReport[];
    already_personalized: ProfileReport[];
    missing_content: ProfileReport[];
  };
}

const TestCompleteProfilesButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    
    try {
      console.log('Running complete profiles test...');
      
      const { data, error } = await supabase.functions.invoke('test-complete-profiles');

      if (error) {
        console.error('Test error:', error);
        throw error;
      }

      console.log('Test result:', data);
      setTestResult(data);
      setIsExpanded(true);

      toast({
        title: "Teste Concluído!",
        description: `Encontrados ${data.summary.complete_profiles_found} perfis completos de ${data.summary.total_profiles_checked} verificados`,
      });

    } catch (error) {
      console.error('Error running test:', error);
      toast({
        title: "Erro no teste",
        description: "Não foi possível executar o teste. Verifique os logs.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <TestTube className="h-5 w-5" />
            Teste de Perfis Completos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-blue-700 text-sm">
              Testa a personalização apenas nos alunos com dados completos de perfil
            </p>
            <Button
              onClick={runTest}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testando...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Executar Teste
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {testResult && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Resultado do Teste</h3>
                      <p className="text-sm text-green-700">
                        {testResult.summary.complete_profiles_found} perfis completos encontrados
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="space-y-4 mt-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {testResult.summary.total_profiles_checked}
                    </div>
                    <div className="text-sm text-gray-600">Perfis Verificados</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {testResult.summary.complete_profiles_found}
                    </div>
                    <div className="text-sm text-gray-600">Perfis Completos</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {testResult.summary.profiles_with_day1_content}
                    </div>
                    <div className="text-sm text-gray-600">Com Conteúdo Dia 1</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {testResult.summary.total_personalizations}
                    </div>
                    <div className="text-sm text-gray-600">Personalizações</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-800 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Prontos para Personalização
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {testResult.recommendations.ready_for_personalization.length}
                    </div>
                    <div className="space-y-1">
                      {testResult.recommendations.ready_for_personalization.slice(0, 3).map((profile) => (
                        <div key={profile.user_id} className="text-xs text-green-700 truncate">
                          {profile.display_name}
                        </div>
                      ))}
                      {testResult.recommendations.ready_for_personalization.length > 3 && (
                        <div className="text-xs text-green-600">
                          +{testResult.recommendations.ready_for_personalization.length - 3} mais
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-blue-800 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Já Personalizados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {testResult.recommendations.already_personalized.length}
                    </div>
                    <div className="space-y-1">
                      {testResult.recommendations.already_personalized.slice(0, 3).map((profile) => (
                        <div key={profile.user_id} className="text-xs text-blue-700 flex items-center justify-between">
                          <span className="truncate">{profile.display_name}</span>
                          <Badge className="bg-blue-200 text-blue-800 text-xs">
                            Nv.{profile.personalizations.active_generation?.level || 'N/A'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-orange-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Sem Conteúdo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {testResult.recommendations.missing_content.length}
                    </div>
                    <div className="space-y-1">
                      {testResult.recommendations.missing_content.slice(0, 3).map((profile) => (
                        <div key={profile.user_id} className="text-xs text-orange-700 truncate">
                          {profile.display_name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Profiles List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Perfis Completos Detalhados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {testResult.complete_profiles.map((profile) => {
                      const detailedProfile = testResult.detailed_report.find(p => p.user_id === profile.user_id);
                      return (
                        <div key={profile.user_id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-medium">{profile.display_name}</h4>
                              <Badge className="bg-purple-100 text-purple-800">
                                {profile.archetype}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              {detailedProfile?.day1_content.has_content && (
                                <Badge className="bg-green-100 text-green-800">
                                  Conteúdo OK
                                </Badge>
                              )}
                              {detailedProfile?.personalizations.total_generations > 0 && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  {detailedProfile.personalizations.total_generations} Gens
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Trabalho Atual:</div>
                              <div className="font-medium truncate">{profile.current_work}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Segmento:</div>
                              <div className="font-medium">{profile.segment}</div>
                            </div>
                          </div>
                          {profile.legacy !== 'N/A' && (
                            <div className="mt-2 text-sm">
                              <div className="text-gray-600">Legado:</div>
                              <div className="font-medium text-xs">{profile.legacy}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default TestCompleteProfilesButton;
