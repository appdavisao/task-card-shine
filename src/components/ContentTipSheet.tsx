
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Target, Lightbulb, Play, Users } from 'lucide-react';

interface ContentTipSheetProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;
}

interface ContentCard {
  title: string;
  format: string;
  cta_text?: string;
  examples?: {
    saude?: string;
    financas?: string;
    marketing?: string;
    relacionamentos?: string;
  };
  platforms?: string[];
  intentions?: string[];
  main_content?: string;
  observations?: string;
  practical_steps?: string[];
}

interface DailyContent {
  id: string;
  day: number;
  content_type: string;
  title: string;
  content_card?: ContentCard;
}

const ContentTipSheet = ({ isOpen, onClose, day }: ContentTipSheetProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedExamples, setExpandedExamples] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchDailyContent();
    }
  }, [isOpen, user, day]);

  const fetchDailyContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('user_daily_content')
        .select('*')
        .eq('user_id', user!.id)
        .eq('day', day)
        .single();

      if (fetchError) {
        console.error('Error fetching daily content:', fetchError);
        setError('Nenhum conteúdo detalhado encontrado para este dia.');
      } else {
        // Convert the data properly with type assertion for content_card
        const dailyContent: DailyContent = {
          id: data.id,
          day: data.day,
          content_type: data.content_type,
          title: data.title,
          content_card: data.content_card as ContentCard
        };
        setContent(dailyContent);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Erro ao buscar conteúdo detalhado.');
    } finally {
      setLoading(false);
    }
  };

  const getContentTypeDisplay = (type: string) => {
    switch (type.toLowerCase()) {
      case 'reels':
        return 'Reels';
      case 'carousel':
        return 'Carrossel';
      case 'youtube':
        return 'Instagram';
      default:
        return type;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'reels':
        return 'bg-pink-500';
      case 'carousel':
        return 'bg-blue-500';
      case 'youtube':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlatformIcons = (contentType: string) => {
    const isReels = contentType.toLowerCase() === 'reels';
    const isCarousel = contentType.toLowerCase() === 'carousel';
    const isYoutube = contentType.toLowerCase() === 'youtube';

    if (isReels) {
      return [
        { name: 'yt', color: 'bg-red-600', textColor: 'text-white' },
        { name: 'li', color: 'bg-blue-600', textColor: 'text-white' },
        { name: 'fb', color: 'bg-blue-800', textColor: 'text-white' },
        { name: 'ig', color: 'bg-pink-500', textColor: 'text-white' },
        { name: 'tk', color: 'bg-black', textColor: 'text-white' }
      ];
    } else if (isCarousel) {
      return [
        { name: 'ig', color: 'bg-pink-500', textColor: 'text-white' },
        { name: 'tk', color: 'bg-black', textColor: 'text-white' },
        { name: 'fb', color: 'bg-blue-600', textColor: 'text-white' }
      ];
    } else if (isYoutube) {
      return [
        { name: 'ig', color: 'bg-pink-500', textColor: 'text-white' }
      ];
    }
    return [];
  };

  const getIntentionColor = (intention: string) => {
    switch (intention.toLowerCase()) {
      case 'viralizar':
        return 'bg-red-500 text-white';
      case 'ensinar algum conhecimento':
        return 'bg-blue-500 text-white';
      case 'entreter a audiência':
        return 'bg-purple-500 text-white';
      case 'ganhar seguidor':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const renderContentCard = (contentCard: ContentCard) => {
    return (
      <div className="space-y-6">
        {/* Format Section */}
        <Card className="bg-gray-700 border-gray-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg flex items-center">
              <Play className="h-5 w-5 mr-2 text-blue-400" />
              Formato de Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
              {contentCard.format}
            </Badge>
          </CardContent>
        </Card>

        {/* Main Content Section */}
        {contentCard.main_content && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                Conteúdo Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{contentCard.main_content}</p>
            </CardContent>
          </Card>
        )}

        {/* Examples Section */}
        {contentCard.examples && Object.keys(contentCard.examples).length > 0 && (
          <Collapsible open={expandedExamples} onOpenChange={setExpandedExamples}>
            <Card className="bg-gray-700 border-gray-600">
              <CollapsibleTrigger asChild>
                <CardHeader className="pb-3 cursor-pointer hover:bg-gray-600 transition-colors">
                  <CardTitle className="text-white text-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-400" />
                      Exemplos por Categoria
                    </div>
                    {expandedExamples ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  {contentCard.examples.saude && (
                    <div>
                      <Badge className="bg-green-600 text-white mb-2">Saúde</Badge>
                      <p className="text-gray-300 text-sm">{contentCard.examples.saude}</p>
                    </div>
                  )}
                  {contentCard.examples.financas && (
                    <div>
                      <Badge className="bg-yellow-600 text-white mb-2">Finanças</Badge>
                      <p className="text-gray-300 text-sm">{contentCard.examples.financas}</p>
                    </div>
                  )}
                  {contentCard.examples.marketing && (
                    <div>
                      <Badge className="bg-purple-600 text-white mb-2">Marketing</Badge>
                      <p className="text-gray-300 text-sm">{contentCard.examples.marketing}</p>
                    </div>
                  )}
                  {contentCard.examples.relacionamentos && (
                    <div>
                      <Badge className="bg-pink-600 text-white mb-2">Relacionamentos</Badge>
                      <p className="text-gray-300 text-sm">{contentCard.examples.relacionamentos}</p>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        {/* Intentions Section */}
        {contentCard.intentions && contentCard.intentions.length > 0 && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-400" />
                Objetivos do Conteúdo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {contentCard.intentions.map((intention, index) => (
                  <Badge key={index} className={`${getIntentionColor(intention)} text-sm px-3 py-1`}>
                    {intention}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Platforms Section */}
        {contentCard.platforms && contentCard.platforms.length > 0 && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Plataformas Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {contentCard.platforms.map((platform, index) => (
                  <Badge key={index} className="bg-indigo-600 text-white text-sm px-3 py-1 mr-2">
                    {platform}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practical Steps Section */}
        {contentCard.practical_steps && contentCard.practical_steps.length > 0 && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Passos Práticos</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {contentCard.practical_steps.map((step, index) => (
                  <li key={index} className="text-gray-300 text-sm">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Observations Section */}
        {contentCard.observations && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Observações Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">{contentCard.observations}</p>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        {contentCard.cta_text && (
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Call to Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-300 font-medium">{contentCard.cta_text}</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="bg-gray-800 border-gray-700 text-white overflow-y-auto max-w-2xl">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (error) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="bg-gray-800 border-gray-700 text-white overflow-y-auto max-w-2xl">
          <SheetHeader>
            <SheetTitle className="text-white">Dica de Conteúdo - Dia {day}</SheetTitle>
            <SheetDescription className="text-gray-300">
              {error}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6 text-center">
                <p className="text-gray-300">
                  Nenhum conteúdo detalhado foi encontrado para este dia ainda.
                </p>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!content) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="bg-gray-800 border-gray-700 text-white overflow-y-auto max-w-2xl">
          <SheetHeader>
            <SheetTitle className="text-white">Dica de Conteúdo - Dia {day}</SheetTitle>
            <SheetDescription className="text-gray-300">
              Nenhum conteúdo detalhado encontrado para este dia.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-gray-800 border-gray-700 text-white overflow-y-auto max-w-4xl">
        <SheetHeader>
          <div className="flex items-center gap-3 flex-wrap">
            <SheetTitle className="text-white">
              {content.content_card?.title || content.title}
            </SheetTitle>
            <Badge className={`${getContentTypeColor(content.content_type)} text-white`}>
              {getContentTypeDisplay(content.content_type)}
            </Badge>
            <div className="flex gap-1">
              {getPlatformIcons(content.content_type).map((platform, index) => (
                <Badge 
                  key={index}
                  className={`${platform.color} ${platform.textColor} text-xs px-1.5 py-0.5`}
                >
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>
          <SheetDescription className="text-gray-300">
            Dica de Conteúdo para o Dia {day}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          {content.content_card ? renderContentCard(content.content_card) : (
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6 text-center">
                <p className="text-gray-300">
                  Nenhum conteúdo estruturado disponível para este dia.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContentTipSheet;
