import { supabase } from './supabase';
import { Apartment, ApartmentType, FloorLevel } from '@/data/apartments';

// Helper to map DB record to Apartment TS Interface
function mapApartmentRow(row: any): Apartment {
  // Map MEETING back to 'Salle de réunion'
  let type: ApartmentType = 'F1';
  if (row.apartment_types?.code === 'MEETING') {
    type = 'Salle de réunion';
  } else if (row.apartment_types?.code) {
    type = row.apartment_types.code as ApartmentType;
  }

  // Get cover image or first image url
  let image = '/hero.png';
  if (row.apartment_images && row.apartment_images.length > 0) {
    const cover = row.apartment_images.find((img: any) => img.is_cover);
    image = cover ? cover.url : row.apartment_images[0].url;
  }

  // Map advantages
  const advantages = row.apartment_advantages 
    ? row.apartment_advantages.map((adv: any) => adv.text_fr) 
    : [];

  // Map composition
  const composition = {
    sleeping: [] as string[],
    wellness: [] as string[],
    living: [] as string[],
    tech: [] as string[],
  };

  if (row.apartment_composition) {
    row.apartment_composition.forEach((comp: any) => {
      const zone = comp.zone as 'sleeping' | 'wellness' | 'living' | 'tech';
      if (composition[zone]) {
        // Fallback translation if item_en is empty
        composition[zone].push(comp.item_fr || '');
      }
    });
  }

  // Map features (amenities slugs)
  const features = row.apartment_amenities 
    ? row.apartment_amenities.map((am: any) => am.amenities?.slug).filter(Boolean)
    : [];

  return {
    id: row.slug,
    name: row.name,
    floor: row.floor as FloorLevel,
    type,
    collection: row.apartment_collections?.name_fr || 'The Modern Classics',
    bedrooms: row.bedrooms,
    hasSalon: row.has_salon,
    totalRooms: row.total_rooms,
    price: Number(row.base_price) || 0,
    sqm: Number(row.sqm) || 0,
    capacity: row.capacity_adults || 2,
    image,
    features,
    desc: row.description_short_fr || '',
    history: row.history_fr || '',
    story: row.story_fr || '',
    advantages,
    composition,
    // Add raw DB translatable fields for language selector helper in page component
    description_short_fr: row.description_short_fr || '',
    description_short_en: row.description_short_en || '',
    description_long_fr: row.description_long_fr || '',
    description_long_en: row.description_long_en || '',
    story_fr: row.story_fr || '',
    story_en: row.story_en || '',
  };
}

export async function fetchApartments(): Promise<Apartment[]> {
  const { data, error } = await supabase
    .from('apartments')
    .select(`
      *,
      apartment_collections(name_fr),
      apartment_types(code),
      apartment_images(url, is_cover),
      apartment_advantages(text_fr),
      apartment_composition(zone, item_fr),
      apartment_amenities(amenities(slug))
    `)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });

  if (error) {
    if (error.message?.includes('Failed to fetch') || (typeof window !== 'undefined' && !window.navigator.onLine)) {
      console.warn('Network offline: Using local mock fallback for apartments.');
    } else {
      console.error('Error fetching apartments from Supabase:', error);
    }
    throw error;
  }

  return (data || []).map(mapApartmentRow);
}

export async function fetchApartmentBySlug(slug: string): Promise<Apartment | null> {
  const { data, error } = await supabase
    .from('apartments')
    .select(`
      *,
      apartment_collections(name_fr),
      apartment_types(code),
      apartment_images(url, is_cover),
      apartment_advantages(text_fr),
      apartment_composition(zone, item_fr),
      apartment_amenities(amenities(slug))
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching apartment with slug ${slug}:`, error);
    return null;
  }

  return mapApartmentRow(data);
}
