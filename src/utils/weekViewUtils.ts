
export const getPlatformColor = (platform?: string) => {
  switch (platform?.toLowerCase()) {
    case 'instagram':
      return 'bg-pink-500 hover:bg-pink-600';
    case 'linkedin':
      return 'bg-blue-600 hover:bg-blue-700';
    case 'youtube':
      return 'bg-red-600 hover:bg-red-700';
    case 'geral':
    case 'general':
      return 'bg-gray-600 hover:bg-gray-700';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
    case 'fácil':
      return 'bg-green-500 hover:bg-green-600';
    case 'medium':
    case 'médio':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'hard':
    case 'difícil':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export const getIntentionColor = (intention: string) => {
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

export const getContentTypeDisplay = (type: string) => {
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

export const getContentTypeColor = (type: string) => {
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

export const getPlatformIcons = (contentType: string) => {
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
