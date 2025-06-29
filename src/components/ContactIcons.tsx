
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

  const contactItems = [
    {
      condition: email,
      icon: <Mail size={14} />,
      onClick: () => copyToClipboard(email!, 'Email'),
      title: `Email: ${email}`,
      color: 'hover:text-blue-600'
    },
    {
      condition: phone,
      icon: <Phone size={14} />,
      onClick: () => copyToClipboard(phone!, 'Telefone'),
      title: `Telefone: ${phone}`,
      color: 'hover:text-green-600'
    },
    {
      condition: instagram,
      icon: <Instagram size={14} />,
      onClick: () => openLink(formatInstagramUrl(instagram!)),
      title: `Instagram: ${instagram}`,
      color: 'hover:text-pink-600'
    },
    {
      condition: linkedin,
      icon: <Linkedin size={14} />,
      onClick: () => openLink(linkedin!),
      title: `LinkedIn: ${linkedin}`,
      color: 'hover:text-blue-700'
    },
    {
      condition: youtube,
      icon: <Youtube size={14} />,
      onClick: () => openLink(youtube!),
      title: `YouTube: ${youtube}`,
      color: 'hover:text-red-600'
    },
    {
      condition: website,
      icon: <Globe size={14} />,
      onClick: () => openLink(website!),
      title: `Website: ${website}`,
      color: 'hover:text-indigo-600'
    },
    {
      condition: tiktok,
      icon: <span className="text-xs font-bold">🎵</span>,
      onClick: () => openLink(formatTikTokUrl(tiktok!)),
      title: `TikTok: ${tiktok}`,
      color: 'hover:text-purple-600'
    },
    {
      condition: facebook,
      icon: <Facebook size={14} />,
      onClick: () => openLink(facebook!),
      title: `Facebook: ${facebook}`,
      color: 'hover:text-blue-800'
    },
    {
      condition: location,
      icon: <MapPin size={14} />,
      onClick: () => {},
      title: `Localização: ${location}`,
      color: 'hover:text-gray-600'
    }
  ];

  const visibleItems = contactItems.filter(item => item.condition);

  if (visibleItems.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {visibleItems.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          disabled={!item.condition || item.condition === location}
          className={`
            p-2 rounded-lg bg-slate-50 text-slate-500 transition-all duration-200
            ${item.condition && item.condition !== location 
              ? `cursor-pointer ${item.color} hover:bg-slate-100 hover:shadow-sm active:scale-95` 
              : item.condition === location 
                ? 'cursor-default text-slate-400' 
                : 'cursor-not-allowed opacity-50'
            }
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
