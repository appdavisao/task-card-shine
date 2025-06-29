
import React from 'react';
import { 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Globe, 
  MapPin,
  Facebook
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ContactIconsProps {
  email?: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  tiktok?: string;
  facebook?: string;
  location?: string;
}

const ContactIcons: React.FC<ContactIconsProps> = ({
  email,
  phone,
  instagram,
  linkedin,
  youtube,
  website,
  tiktok,
  facebook,
  location
}) => {
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado!",
        description: `${type} copiado para a área de transferência`,
        duration: 2000,
      });
    } catch (err) {
      console.error('Erro ao copiar:', err);
      toast({
        title: "Erro",
        description: "Não foi possível copiar",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const openLink = (url: string) => {
    let finalUrl = url;
    
    // Adicionar https:// se não tiver protocolo
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = `https://${url}`;
    }
    
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const formatInstagramUrl = (handle: string) => {
    const cleanHandle = handle.replace('@', '').replace('https://www.instagram.com/', '').replace('/', '');
    return `https://www.instagram.com/${cleanHandle}`;
  };

  const formatTikTokUrl = (handle: string) => {
    const cleanHandle = handle.replace('@', '').replace('https://www.tiktok.com/@', '').replace('/', '');
    return `https://www.tiktok.com/@${cleanHandle}`;
  };

  const showUnavailableToast = (type: string) => {
    toast({
      title: "Não disponível",
      description: `${type} não informado para este usuário`,
      duration: 2000,
    });
  };

  // Sempre mostrar todos os ícones, mas com estados diferentes
  const contactItems = [
    {
      icon: <Mail size={14} />,
      onClick: email ? () => copyToClipboard(email, 'Email') : () => showUnavailableToast('Email'),
      title: email ? `Email: ${email}` : 'Email não disponível',
      color: 'hover:text-blue-600',
      hasData: !!email
    },
    {
      icon: <Phone size={14} />,
      onClick: phone ? () => copyToClipboard(phone, 'Telefone') : () => showUnavailableToast('Telefone'),
      title: phone ? `Telefone: ${phone}` : 'Telefone não disponível',
      color: 'hover:text-green-600',
      hasData: !!phone
    },
    {
      icon: <Instagram size={14} />,
      onClick: instagram ? () => openLink(formatInstagramUrl(instagram)) : () => showUnavailableToast('Instagram'),
      title: instagram ? `Instagram: ${instagram}` : 'Instagram não disponível',
      color: 'hover:text-pink-600',
      hasData: !!instagram
    },
    {
      icon: <Linkedin size={14} />,
      onClick: linkedin ? () => openLink(linkedin) : () => showUnavailableToast('LinkedIn'),
      title: linkedin ? `LinkedIn: ${linkedin}` : 'LinkedIn não disponível',
      color: 'hover:text-blue-700',
      hasData: !!linkedin
    },
    {
      icon: <Youtube size={14} />,
      onClick: youtube ? () => openLink(youtube) : () => showUnavailableToast('YouTube'),
      title: youtube ? `YouTube: ${youtube}` : 'YouTube não disponível',
      color: 'hover:text-red-600',
      hasData: !!youtube
    },
    {
      icon: <Globe size={14} />,
      onClick: website ? () => openLink(website) : () => showUnavailableToast('Website'),
      title: website ? `Website: ${website}` : 'Website não disponível',
      color: 'hover:text-indigo-600',
      hasData: !!website
    },
    {
      icon: <span className="text-xs font-bold">🎵</span>,
      onClick: tiktok ? () => openLink(formatTikTokUrl(tiktok)) : () => showUnavailableToast('TikTok'),
      title: tiktok ? `TikTok: ${tiktok}` : 'TikTok não disponível',
      color: 'hover:text-purple-600',
      hasData: !!tiktok
    },
    {
      icon: <Facebook size={14} />,
      onClick: facebook ? () => openLink(facebook) : () => showUnavailableToast('Facebook'),
      title: facebook ? `Facebook: ${facebook}` : 'Facebook não disponível',
      color: 'hover:text-blue-800',
      hasData: !!facebook
    },
    {
      icon: <MapPin size={14} />,
      onClick: location ? () => {} : () => showUnavailableToast('Localização'),
      title: location ? `Localização: ${location}` : 'Localização não disponível',
      color: 'hover:text-gray-600',
      hasData: !!location
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {contactItems.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          disabled={!item.hasData && item.title.includes('Localização')}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${item.hasData 
              ? `bg-slate-50 text-slate-600 cursor-pointer ${item.color} hover:bg-slate-100 hover:shadow-sm active:scale-95` 
              : 'bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200'
            }
            ${item.title.includes('Localização') && !item.hasData ? 'cursor-not-allowed opacity-50' : ''}
          `}
          title={item.title}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default ContactIcons;
