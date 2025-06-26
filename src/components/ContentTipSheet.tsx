
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

interface ContentTipSheetProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;
}

interface DailyContent {
  id: string;
  day: number;
  content_type: string;
  title: string;
  strategic_analysis?: string;
  scenes?: any[];
  slides?: any[];
  video_structure?: any;
  audio_suggestion?: string;
  caption_description?: string;
  cta_text?: string;
  hashtags?: string;
}

const ContentTipSheet = ({ isOpen, onClose, day }: ContentTipSheetProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchDailyContent();
    }
  }, [isOpen, user, day]);

  const fetchDailyContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from user_daily_content table
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
        setContent(data as DailyContent);
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
        return 'YouTube';
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
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlatformIcons = (contentType: string) => {
    const isReels = contentType.toLowerCase() === 'reels';
    const isCarousel = contentType.toLowerCase() === 'carousel';

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
    }
    return [];
  };

  const renderScenes = (scenes: any[]) => {
    if (!scenes || scenes.length === 0) {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Roteiro de Cenas</h4>
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <p className="text-gray-300 italic">Nenhuma cena configurada ainda</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Roteiro de Cenas</h4>
        {scenes.map((scene, index) => (
          <Card key={index} className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">
                Cena {scene.scene || index + 1} ({scene.duration || 'Duração não definida'})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-blue-300 font-medium">Ação/Visual:</span>
                <p className="text-gray-300 text-sm mt-1">{scene.action || 'Não definido'}</p>
              </div>
              <div>
                <span className="text-green-300 font-medium">Narração:</span>
                <p className="text-gray-300 text-sm mt-1">{scene.audio || 'Não definido'}</p>
              </div>
              <div>
                <span className="text-yellow-300 font-medium">Texto na Tela:</span>
                <p className="text-gray-300 text-sm mt-1">{scene.text_overlay || 'Não definido'}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderSlides = (slides: any[]) => {
    if (!slides || slides.length === 0) {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Lâminas do Carrossel</h4>
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <p className="text-gray-300 italic">Nenhuma lâmina configurada ainda</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Lâminas do Carrossel</h4>
        {slides.map((slide, index) => (
          <Card key={index} className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">
                Lâmina {slide.slide || index + 1} - {slide.type || 'Tipo não definido'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-blue-300 font-medium">Visual:</span>
                <p className="text-gray-300 text-sm mt-1">{slide.visual || 'Não definido'}</p>
              </div>
              {slide.title && (
                <div>
                  <span className="text-green-300 font-medium">Título:</span>
                  <p className="text-gray-300 text-sm mt-1">{slide.title}</p>
                </div>
              )}
              {slide.subtitle && (
                <div>
                  <span className="text-yellow-300 font-medium">Subtítulo:</span>
                  <p className="text-gray-300 text-sm mt-1">{slide.subtitle}</p>
                </div>
              )}
              {slide.content && (
                <div>
                  <span className="text-purple-300 font-medium">Conteúdo:</span>
                  <p className="text-gray-300 text-sm mt-1 whitespace-pre-line">{slide.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderVideoStructure = (videoStructure: any) => {
    if (!videoStructure || !videoStructure.sections) return null;

    return (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">
          Estrutura do Vídeo ({videoStructure.duration})
        </h4>
        {videoStructure.sections.map((section: any, index: number) => (
          <Card key={index} className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">
                {section.title} ({section.duration})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-blue-300 font-medium">Visual:</span>
                <p className="text-gray-300 text-sm mt-1">{section.visual}</p>
              </div>
              <div>
                <span className="text-green-300 font-medium">Narração:</span>
                <p className="text-gray-300 text-sm mt-1">{section.narration}</p>
              </div>
            </CardContent>
          </Card>
        ))}
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
            <SheetTitle className="text-white">{content.title}</SheetTitle>
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
        
        <div className="mt-6 space-y-6">
          {/* Strategic Analysis */}
          {content.strategic_analysis && (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Análise Estratégica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{content.strategic_analysis}</p>
              </CardContent>
            </Card>
          )}

          {/* Content Structure */}
          {content.content_type.toLowerCase() === 'reels' && renderScenes(content.scenes)}
          {content.content_type.toLowerCase() === 'carousel' && renderSlides(content.slides)}
          {content.video_structure && renderVideoStructure(content.video_structure)}

          {/* Audio Suggestion */}
          {content.audio_suggestion && (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">🎵 Áudio Sugerido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{content.audio_suggestion}</p>
              </CardContent>
            </Card>
          )}

          {/* Caption Description */}
          {content.caption_description && (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Descrição para Legenda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{content.caption_description}</p>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          {content.cta_text && (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Call to Action</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{content.cta_text}</p>
              </CardContent>
            </Card>
          )}

          {/* Hashtags */}
          {content.hashtags && (
            <Card className="bg-gray-700 border-gray-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-300">{content.hashtags}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContentTipSheet;
