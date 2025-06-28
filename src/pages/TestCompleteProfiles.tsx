
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import TestCompleteProfilesButton from '@/components/TestCompleteProfilesButton';

const TestCompleteProfiles = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Teste de Perfis Completos
                </h1>
                <p className="text-gray-600">
                  Análise detalhada dos alunos com dados completos para personalização
                </p>
              </div>
            </div>
          </div>
        </div>

        <TestCompleteProfilesButton />
      </div>
    </div>
  );
};

export default TestCompleteProfiles;
