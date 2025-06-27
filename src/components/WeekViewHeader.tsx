
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface WeekViewHeaderProps {
  weekNumber: string;
}

const WeekViewHeader = ({ weekNumber }: WeekViewHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center py-3 sm:py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-gray-700 hover:bg-gray-100 mr-2 sm:mr-4 px-2 sm:px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Voltar ao Perfil</span>
            <span className="xs:hidden">Voltar</span>
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 drop-shadow-sm">
            Semana {weekNumber}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WeekViewHeader;
