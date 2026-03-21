export type Client = {
  id: string;
  slug: string;
  business_name: string;
  category: 'restaurant' | 'escola' | 'gimnas';
  headline: string;
  subheadline: string;
  offer_text: string;
  primary_color: string;
  phone: string | null;
  whatsapp: string | null;
  created_at: string;
};

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export type Lead = {
  id: string;
  client_id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  source: string;
  status: LeadStatus;
  created_at: string;
};
