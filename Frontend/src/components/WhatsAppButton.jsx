import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = '919840012345';
  const defaultText = encodeURIComponent(
    'Hello Thirumal Housing! I am interested in exploring your DTCP approved plots and projects. Please assist me with details.'
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      title="Chat with Thirumal Housing on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
