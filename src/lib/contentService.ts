import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactSettings {
  phone_main: string | null;
  phone_concierge: string | null;
  phone_whatsapp: string | null;
  email_main: string | null;
  email_booking: string | null;
  email_corporate: string | null;
  address_line1: string | null;
  city: string | null;
  country: string | null;
  check_in_time: string | null;
  check_out_time: string | null;
  google_maps_url: string | null;
}

export interface PageSection {
  id: string;
  slug: string;
  title_fr: string | null;
  subtitle_fr: string | null;
  body_fr: string | null;
  image_url: string | null;
  cta_label_fr: string | null;
  cta_url: string | null;
  is_visible: boolean;
}

export interface Review {
  id: string;
  author_name: string;
  author_role: string | null;
  rating: number;
  content_fr: string;
  status: string;
  source: string | null;
}

export interface SiteSetting {
  key: string;
  value: string | null;
  label: string | null;
}

// ─── Coordonnées ─────────────────────────────────────────────────────────────

export async function fetchContactSettings(): Promise<ContactSettings | null> {
  const { data, error } = await supabase
    .from('contact_settings')
    .select('phone_main, phone_concierge, phone_whatsapp, email_main, email_booking, email_corporate, address_line1, city, country, check_in_time, check_out_time, google_maps_url')
    .limit(1)
    .maybeSingle();

  if (error) {
    if (error.message?.includes('Failed to fetch') || (typeof window !== 'undefined' && !window.navigator.onLine)) {
      console.warn('Network offline: Using static fallback for contact settings.');
    } else {
      console.error('Error fetching contact settings:', error);
    }
    return null;
  }
  return data;
}

// ─── Sections de page ─────────────────────────────────────────────────────────

export async function fetchPageSections(pageSlug: string): Promise<PageSection[]> {
  // D'abord récupérer l'ID de la page
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', pageSlug)
    .maybeSingle();

  if (pageError || !page) {
    console.error(`Page not found: ${pageSlug}`, pageError);
    return [];
  }

  const { data, error } = await supabase
    .from('page_sections')
    .select('id, slug, title_fr, subtitle_fr, body_fr, image_url, cta_label_fr, cta_url, is_visible')
    .eq('page_id', page.id)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });

  if (error) {
    if (error.message?.includes('Failed to fetch') || (typeof window !== 'undefined' && !window.navigator.onLine)) {
      console.warn(`Network offline: Using static fallback for page sections (${pageSlug}).`);
    } else {
      console.error(`Error fetching sections for page ${pageSlug}:`, error);
    }
    return [];
  }
  return data || [];
}

// Helper pour indexer les sections par slug
export function sectionsBySlug(sections: PageSection[]): Record<string, PageSection> {
  return Object.fromEntries(sections.map(s => [s.slug, s]));
}

// ─── Avis clients ─────────────────────────────────────────────────────────────

export async function fetchApprovedReviews(limit = 6): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('id, reviewer_name, rating, content_fr, status')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    if (error.message?.includes('Failed to fetch') || (typeof window !== 'undefined' && !window.navigator.onLine)) {
      console.warn('Network offline: Using static fallback for reviews.');
    } else {
      console.error('Error fetching reviews:', error);
    }
    return [];
  }
  
  return (data || []).map((r: any) => ({
    id: r.id,
    author_name: r.reviewer_name || 'Anonyme',
    author_role: null,
    rating: Number(r.rating),
    content_fr: r.content_fr || '',
    status: r.status,
    source: null
  }));
}

// ─── Paramètres globaux ───────────────────────────────────────────────────────

export async function fetchSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('is_public', true);

  if (error) {
    if (error.message?.includes('Failed to fetch') || (typeof window !== 'undefined' && !window.navigator.onLine)) {
      console.warn('Network offline: Using static fallback for site settings.');
    } else {
      console.error('Error fetching site settings:', error);
    }
    return {};
  }

  return Object.fromEntries((data || []).map(s => [s.key, s.value || '']));
}
