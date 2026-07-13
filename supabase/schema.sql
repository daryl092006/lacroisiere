-- =============================================================================
-- RÉSIDENCE LA CROISIÈRE — SCHÉMA SUPABASE COMPLET
-- PostgreSQL / Supabase compatible
-- =============================================================================

-- =============================================================================
-- EXTENSIONS
-- =============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- recherche textuelle

-- =============================================================================
-- ENUMS
-- =============================================================================

-- Statut d'une réservation
CREATE TYPE booking_status AS ENUM (
  'draft',        -- brouillon, non soumis
  'pending',      -- soumis, en attente de confirmation
  'confirmed',    -- confirmé par le staff
  'cancelled',    -- annulé
  'checked_in',   -- client arrivé
  'checked_out',  -- client parti
  'no_show'       -- client ne s'est pas présenté
);

-- Statut d'un paiement
CREATE TYPE payment_status AS ENUM (
  'unpaid',
  'pending',
  'paid',
  'failed',
  'refunded',
  'partially_refunded'
);

-- Source d'une réservation
CREATE TYPE booking_source AS ENUM (
  'direct_web',   -- site public
  'direct_phone', -- par téléphone
  'direct_walkin',-- sans réservation
  'booking_com',
  'airbnb',
  'expedia',
  'agoda',
  'hotels_com',
  'staff_manual', -- créée par le staff depuis l'admin
  'other'
);

-- Statut d'un appartement
CREATE TYPE apartment_status AS ENUM (
  'active',       -- disponible à la location
  'maintenance',  -- en maintenance
  'renovation',   -- en rénovation
  'inactive'      -- désactivé
);

-- Statut d'un avis client
CREATE TYPE review_status AS ENUM (
  'pending',   -- en attente de modération
  'approved',  -- publié sur le site
  'rejected',  -- refusé
  'hidden'     -- caché temporairement
);

-- Statut d'une demande conciergerie
CREATE TYPE concierge_status AS ENUM (
  'new',
  'in_progress',
  'waiting_customer',
  'completed',
  'cancelled'
);

-- Rôle staff
CREATE TYPE staff_role AS ENUM (
  'super_admin',
  'manager',
  'receptionist',
  'concierge',
  'housekeeping',
  'accountant',
  'marketing',
  'support',
  'readonly'
);

-- Type de plateforme externe
CREATE TYPE platform_type AS ENUM (
  'booking_com',
  'airbnb',
  'expedia',
  'agoda',
  'hotels_com',
  'other'
);

-- Statut de synchronisation iCal
CREATE TYPE sync_status AS ENUM (
  'success',
  'failed',
  'partial',
  'pending'
);

-- Niveau fidélité client
CREATE TYPE loyalty_tier AS ENUM (
  'bronze',
  'silver',
  'gold',
  'diamond'
);

-- Type de bloc de disponibilité
CREATE TYPE block_type AS ENUM (
  'booking',          -- réservation confirmée
  'external_booking', -- réservation importée depuis plateforme externe
  'maintenance',      -- maintenance planifiée
  'owner_block',      -- bloqué par le propriétaire
  'manual'            -- bloc manuel du staff
);

-- Type de notification
CREATE TYPE notification_type AS ENUM (
  'new_booking',
  'booking_confirmed',
  'booking_cancelled',
  'payment_received',
  'check_in_reminder',
  'check_out_reminder',
  'concierge_request',
  'corporate_request',
  'review_new',
  'ical_sync_error',
  'system'
);

-- Statut lead corporate/partenaire
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'in_negotiation',
  'won',
  'lost',
  'on_hold'
);

-- =============================================================================
-- DOMAINE 1 — CONFIGURATION GÉNÉRALE DU SITE
-- =============================================================================

-- Paramètres généraux de la résidence (une seule ligne)
CREATE TABLE site_settings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key             TEXT NOT NULL UNIQUE,   -- ex: 'site_name', 'check_in_time'
  value           TEXT,                   -- valeur sous forme de texte
  value_type      TEXT DEFAULT 'string',  -- 'string', 'number', 'boolean', 'json'
  label           TEXT,                   -- libellé lisible pour l'admin
  category        TEXT,                   -- 'general', 'contact', 'booking', 'display'
  is_public       BOOLEAN DEFAULT TRUE,   -- visible par le frontend ?
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_by      UUID REFERENCES auth.users(id)
);

-- Paramètres de contact
CREATE TABLE contact_settings (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_main            TEXT,
  phone_concierge       TEXT,
  phone_whatsapp        TEXT,
  email_main            TEXT,
  email_booking         TEXT,
  email_corporate       TEXT,
  address_line1         TEXT,
  address_line2         TEXT,
  city                  TEXT DEFAULT 'Cotonou',
  country               TEXT DEFAULT 'Bénin',
  postal_code           TEXT,
  latitude              DECIMAL(10, 8),
  longitude             DECIMAL(11, 8),
  google_maps_url       TEXT,
  google_place_id       TEXT,
  check_in_time         TIME DEFAULT '14:00:00',
  check_out_time        TIME DEFAULT '11:00:00',
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_by            UUID REFERENCES auth.users(id)
);

-- Réseaux sociaux
CREATE TABLE social_links (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform    TEXT NOT NULL,   -- 'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'
  url         TEXT NOT NULL,
  label       TEXT,
  icon        TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Paramètres SEO par page
CREATE TABLE seo_settings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_key          TEXT NOT NULL UNIQUE, -- 'home', 'apartments', 'gallery', etc.
  title_fr          TEXT,
  title_en          TEXT,
  description_fr    TEXT,
  description_en    TEXT,
  og_image_url      TEXT,
  canonical_url     TEXT,
  no_index          BOOLEAN DEFAULT FALSE,
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_by        UUID REFERENCES auth.users(id)
);

-- Médiathèque générale (logos, images de fond, favicon, etc.)
CREATE TABLE media_assets (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename      TEXT NOT NULL,
  original_name TEXT,
  url           TEXT NOT NULL,          -- URL Supabase Storage
  mime_type     TEXT,
  size_bytes    INTEGER,
  width         INTEGER,
  height        INTEGER,
  alt_text_fr   TEXT,
  alt_text_en   TEXT,
  category      TEXT,                   -- 'logo', 'hero', 'apartment', 'gallery', 'partner'
  tags          TEXT[],
  is_active     BOOLEAN DEFAULT TRUE,
  uploaded_by   UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 2 — APPARTEMENTS ET COLLECTIONS
-- =============================================================================

-- Collections d'appartements (Crown Jewels, Modern Classics, etc.)
CREATE TABLE apartment_collections (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT NOT NULL UNIQUE,
  name_fr       TEXT NOT NULL,
  name_en       TEXT,
  description_fr TEXT,
  description_en TEXT,
  color_hex     TEXT,           -- couleur brand de la collection
  sort_order    INTEGER DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Types d'appartements (F1, F2, F3, Salle de réunion)
CREATE TABLE apartment_types (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code          TEXT NOT NULL UNIQUE, -- 'F1', 'F2', 'F3', 'MEETING'
  label_fr      TEXT NOT NULL,
  label_en      TEXT,
  description_fr TEXT,
  description_en TEXT,
  bedrooms      INTEGER DEFAULT 1,
  has_salon     BOOLEAN DEFAULT FALSE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Appartements physiques (table principale)
CREATE TABLE apartments (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT NOT NULL UNIQUE,   -- ex: 'cotonou', 'dubai'
  name                TEXT NOT NULL,
  collection_id       UUID REFERENCES apartment_collections(id),
  type_id             UUID REFERENCES apartment_types(id),
  floor               TEXT,                   -- 'RDC', '1er étage', etc.
  floor_number        INTEGER DEFAULT 0,      -- 0=RDC, 1, 2, 3...
  bedrooms            INTEGER DEFAULT 1,
  bathrooms           INTEGER DEFAULT 1,
  has_salon           BOOLEAN DEFAULT FALSE,
  total_rooms         INTEGER DEFAULT 1,
  sqm                 DECIMAL(6, 2),
  capacity_adults     INTEGER DEFAULT 2,
  capacity_children   INTEGER DEFAULT 0,
  capacity_babies     INTEGER DEFAULT 0,
  base_price          DECIMAL(12, 2) DEFAULT 0, -- prix de base en FCFA
  currency            TEXT DEFAULT 'XOF',       -- FCFA
  security_deposit    DECIMAL(12, 2) DEFAULT 0, -- caution
  min_nights          INTEGER DEFAULT 1,
  max_nights          INTEGER,
  description_short_fr TEXT,
  description_short_en TEXT,
  description_long_fr TEXT,
  description_long_en TEXT,
  history_fr          TEXT,
  history_en          TEXT,
  story_fr            TEXT,
  story_en            TEXT,
  status              apartment_status DEFAULT 'active',
  is_featured         BOOLEAN DEFAULT FALSE,  -- mis en avant sur le site
  is_visible          BOOLEAN DEFAULT TRUE,   -- visible sur le site
  sort_order          INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  created_by          UUID REFERENCES auth.users(id),
  updated_by          UUID REFERENCES auth.users(id)
);

-- Images des appartements
CREATE TABLE apartment_images (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id    UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  url             TEXT NOT NULL,
  alt_text_fr     TEXT,
  alt_text_en     TEXT,
  is_cover        BOOLEAN DEFAULT FALSE,  -- image principale
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Catalogue des équipements possibles
CREATE TABLE amenities (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE, -- 'wifi', 'tv', 'ac', 'parking'...
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  icon        TEXT,                 -- nom de l'icône Lucide
  category    TEXT,                 -- 'tech', 'comfort', 'security', 'kitchen'
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Relation appartements ↔ équipements (many-to-many)
CREATE TABLE apartment_amenities (
  apartment_id  UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  amenity_id    UUID NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (apartment_id, amenity_id)
);

-- Points forts d'un appartement
CREATE TABLE apartment_advantages (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id  UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  text_fr       TEXT NOT NULL,
  text_en       TEXT,
  sort_order    INTEGER DEFAULT 0
);

-- Composition détaillée d'un appartement (espace nuit, tech, salle de bain...)
CREATE TABLE apartment_composition (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id  UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  zone          TEXT NOT NULL,   -- 'sleeping', 'wellness', 'living', 'tech'
  item_fr       TEXT NOT NULL,
  item_en       TEXT,
  sort_order    INTEGER DEFAULT 0
);

-- Historique des changements de statut d'un appartement
CREATE TABLE apartment_status_history (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id    UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  old_status      apartment_status,
  new_status      apartment_status NOT NULL,
  reason          TEXT,
  changed_by      UUID REFERENCES auth.users(id),
  changed_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Blocages de maintenance planifiés
CREATE TABLE apartment_maintenance_blocks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id    UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  start_date      DATE NOT NULL,
  end_date        DATE NOT NULL,
  reason          TEXT,
  notes           TEXT,
  created_by      UUID REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT maintenance_dates_valid CHECK (end_date >= start_date)
);

-- =============================================================================
-- DOMAINE 3 — TARIFS, SAISONS ET PROMOTIONS
-- =============================================================================

-- Plans tarifaires généraux
CREATE TABLE rate_plans (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_fr         TEXT NOT NULL,      -- 'Tarif Standard', 'Week-end', 'Long séjour'
  name_en         TEXT,
  description_fr  TEXT,
  description_en  TEXT,
  is_default      BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  priority        INTEGER DEFAULT 0,  -- plus le chiffre est élevé, plus la règle est prioritaire
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tarifs saisonniers (par appartement ou par type)
CREATE TABLE seasonal_rates (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rate_plan_id    UUID REFERENCES rate_plans(id) ON DELETE CASCADE,
  apartment_id    UUID REFERENCES apartments(id) ON DELETE CASCADE,   -- null = s'applique à tous
  type_id         UUID REFERENCES apartment_types(id) ON DELETE CASCADE, -- null = tous types
  name_fr         TEXT,
  start_date      DATE,           -- null = s'applique toujours
  end_date        DATE,           -- null = s'applique toujours
  day_of_week     INTEGER[],      -- [1,2,3,4,5] = lundi à vendredi, null = tous les jours
  price_per_night DECIMAL(12, 2) NOT NULL,
  currency        TEXT DEFAULT 'XOF',
  min_nights      INTEGER DEFAULT 1,
  max_nights      INTEGER,
  is_active       BOOLEAN DEFAULT TRUE,
  priority        INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT seasonal_dates_valid CHECK (end_date IS NULL OR end_date >= start_date)
);

-- Promotions (offres spéciales)
CREATE TABLE promotions (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_fr               TEXT NOT NULL,
  name_en               TEXT,
  description_fr        TEXT,
  description_en        TEXT,
  discount_type         TEXT NOT NULL,    -- 'percent', 'fixed'
  discount_value        DECIMAL(10, 2) NOT NULL,
  min_nights            INTEGER DEFAULT 1,
  max_nights            INTEGER,
  valid_from            DATE,
  valid_until           DATE,
  booking_deadline      DATE,             -- réserver avant cette date
  applies_to_all        BOOLEAN DEFAULT TRUE, -- s'applique à tous les appartements
  is_active             BOOLEAN DEFAULT TRUE,
  is_visible_on_site    BOOLEAN DEFAULT TRUE,
  sort_order            INTEGER DEFAULT 0,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  created_by            UUID REFERENCES auth.users(id)
);

-- Relation promotions ↔ appartements spécifiques
CREATE TABLE promotion_apartments (
  promotion_id  UUID NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
  apartment_id  UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  PRIMARY KEY (promotion_id, apartment_id)
);

-- Codes promotionnels
CREATE TABLE promo_codes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT NOT NULL UNIQUE,
  promotion_id    UUID REFERENCES promotions(id),
  discount_type   TEXT NOT NULL,    -- 'percent', 'fixed'
  discount_value  DECIMAL(10, 2) NOT NULL,
  max_uses        INTEGER,          -- null = illimité
  used_count      INTEGER DEFAULT 0,
  valid_from      DATE,
  valid_until     DATE,
  min_nights      INTEGER DEFAULT 1,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  created_by      UUID REFERENCES auth.users(id)
);

-- Tarifs corporate par entreprise
CREATE TABLE corporate_rates (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name    TEXT NOT NULL,
  discount_type   TEXT NOT NULL,    -- 'percent', 'fixed'
  discount_value  DECIMAL(10, 2) NOT NULL,
  valid_from      DATE,
  valid_until     DATE,
  notes           TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  created_by      UUID REFERENCES auth.users(id)
);

-- =============================================================================
-- DOMAINE 5 — CLIENTS (avant réservations pour les clés étrangères)
-- =============================================================================

-- Profil client (lié à Supabase Auth ou non)
CREATE TABLE customers (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id      UUID UNIQUE REFERENCES auth.users(id), -- null si client sans compte
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  phone_whatsapp    TEXT,
  nationality       TEXT,
  preferred_language TEXT DEFAULT 'fr',
  company_name      TEXT,          -- si client professionnel
  is_corporate      BOOLEAN DEFAULT FALSE,
  marketing_consent BOOLEAN DEFAULT FALSE,
  notes             TEXT,          -- notes internes staff
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  created_by        UUID REFERENCES auth.users(id)  -- null si auto-enregistré
);

-- Préférences client
CREATE TABLE customer_preferences (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id       UUID NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
  preferred_floor   TEXT,
  preferred_type    UUID REFERENCES apartment_types(id),
  dietary_notes     TEXT,
  allergies         TEXT,
  special_requests  TEXT,
  pillow_preference TEXT,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Programme de fidélité
CREATE TABLE customer_loyalty (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id       UUID NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
  tier              loyalty_tier DEFAULT 'bronze',
  points_balance    INTEGER DEFAULT 0,
  points_lifetime   INTEGER DEFAULT 0, -- total historique
  member_since      DATE DEFAULT CURRENT_DATE,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Historique des points de fidélité
CREATE TABLE loyalty_transactions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  booking_id      UUID,                     -- référence optionnelle (défini après)
  points          INTEGER NOT NULL,         -- positif = gain, négatif = utilisation
  description_fr  TEXT,
  description_en  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 4 — RÉSERVATIONS
-- =============================================================================

-- Réservations
CREATE TABLE bookings (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference             TEXT NOT NULL UNIQUE, -- ex: 'RES-2026-001' (généré automatiquement)
  apartment_id          UUID NOT NULL REFERENCES apartments(id),
  customer_id           UUID REFERENCES customers(id),
  source                booking_source DEFAULT 'direct_web',
  external_id           TEXT,               -- ID chez Booking/Airbnb si importé
  check_in_date         DATE NOT NULL,
  check_out_date        DATE NOT NULL,
  check_in_time         TIME DEFAULT '14:00:00',
  check_out_time        TIME DEFAULT '11:00:00',
  adults                INTEGER DEFAULT 2,
  children              INTEGER DEFAULT 0,
  babies                INTEGER DEFAULT 0,
  base_price_per_night  DECIMAL(12, 2) NOT NULL,
  total_nights          INTEGER NOT NULL,
  subtotal              DECIMAL(12, 2) NOT NULL,
  discount_amount       DECIMAL(12, 2) DEFAULT 0,
  promo_code_id         UUID REFERENCES promo_codes(id),
  promotion_id          UUID REFERENCES promotions(id),
  total_amount          DECIMAL(12, 2) NOT NULL,
  deposit_amount        DECIMAL(12, 2) DEFAULT 0,
  currency              TEXT DEFAULT 'XOF',
  status                booking_status DEFAULT 'pending',
  payment_status        payment_status DEFAULT 'unpaid',
  special_requests      TEXT,
  internal_notes        TEXT,
  cancelled_at          TIMESTAMPTZ,
  cancelled_by          UUID REFERENCES auth.users(id),
  cancellation_reason   TEXT,
  checked_in_at         TIMESTAMPTZ,
  checked_out_at        TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  created_by            UUID REFERENCES auth.users(id), -- null si depuis le site public
  CONSTRAINT booking_dates_valid CHECK (check_out_date > check_in_date),
  CONSTRAINT booking_guests_valid CHECK (adults > 0)
);

-- Clé étrangère différée pour loyalty_transactions → bookings
ALTER TABLE loyalty_transactions
  ADD CONSTRAINT fk_loyalty_booking
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL;

-- Historique des changements de statut de réservation
CREATE TABLE booking_status_history (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id    UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_status    booking_status,
  new_status    booking_status NOT NULL,
  changed_by    UUID REFERENCES auth.users(id),
  reason        TEXT,
  changed_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Notes sur une réservation (staff ou client)
CREATE TABLE booking_notes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id    UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  content       TEXT NOT NULL,
  is_internal   BOOLEAN DEFAULT TRUE,  -- note interne staff ou visible client
  created_by    UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Détail du calcul de prix (pour transparence et audit)
CREATE TABLE booking_price_breakdown (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id    UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  label_fr      TEXT NOT NULL,        -- 'Nuitées (7 × 45 000 FCFA)', 'Remise code promo', etc.
  label_en      TEXT,
  amount        DECIMAL(12, 2) NOT NULL,
  is_discount   BOOLEAN DEFAULT FALSE,
  sort_order    INTEGER DEFAULT 0
);

-- =============================================================================
-- DOMAINE 6 — PAIEMENTS
-- =============================================================================

-- Méthodes de paiement disponibles
CREATE TABLE payment_methods (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE,  -- 'cash', 'stripe', 'orange_money', 'cinetpay'
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0
);

-- Transactions de paiement
CREATE TABLE payments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id        UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  payment_method_id UUID REFERENCES payment_methods(id),
  amount            DECIMAL(12, 2) NOT NULL,
  currency          TEXT DEFAULT 'XOF',
  status            payment_status DEFAULT 'pending',
  external_id       TEXT,           -- ID Stripe, CinetPay, etc.
  gateway_response  JSONB,          -- réponse brute de la passerelle
  is_deposit        BOOLEAN DEFAULT FALSE,
  notes             TEXT,
  paid_at           TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  created_by        UUID REFERENCES auth.users(id)
);

-- Remboursements
CREATE TABLE refunds (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payment_id      UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  amount          DECIMAL(12, 2) NOT NULL,
  reason          TEXT,
  external_id     TEXT,             -- ID Stripe du remboursement
  status          TEXT DEFAULT 'pending',
  processed_at    TIMESTAMPTZ,
  created_by      UUID REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Factures
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  invoice_number  TEXT NOT NULL UNIQUE,  -- ex: 'FAC-2026-001'
  issued_at       DATE DEFAULT CURRENT_DATE,
  due_date        DATE,
  total_amount    DECIMAL(12, 2) NOT NULL,
  currency        TEXT DEFAULT 'XOF',
  pdf_url         TEXT,            -- URL du PDF généré dans Storage
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  created_by      UUID REFERENCES auth.users(id)
);

-- =============================================================================
-- DOMAINE 7 — CONCIERGERIE
-- =============================================================================

-- Catégories de services conciergerie
CREATE TABLE concierge_categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE,
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  icon        TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE
);

-- Catalogue de services conciergerie disponibles
CREATE TABLE concierge_services (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id       UUID REFERENCES concierge_categories(id),
  name_fr           TEXT NOT NULL,
  name_en           TEXT,
  description_fr    TEXT,
  description_en    TEXT,
  base_price        DECIMAL(12, 2),     -- 0 = gratuit / inclus
  price_on_request  BOOLEAN DEFAULT FALSE,
  icon              TEXT,
  sort_order        INTEGER DEFAULT 0,
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Demandes de conciergerie
CREATE TABLE concierge_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id      UUID REFERENCES bookings(id),
  customer_id     UUID REFERENCES customers(id),
  service_id      UUID REFERENCES concierge_services(id),
  status          concierge_status DEFAULT 'new',
  request_date    DATE,
  request_time    TIME,
  details         TEXT,
  internal_notes  TEXT,
  assigned_to     UUID REFERENCES auth.users(id),
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Historique des changements de statut conciergerie
CREATE TABLE concierge_status_history (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id      UUID NOT NULL REFERENCES concierge_requests(id) ON DELETE CASCADE,
  old_status      concierge_status,
  new_status      concierge_status NOT NULL,
  changed_by      UUID REFERENCES auth.users(id),
  note            TEXT,
  changed_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 8 — ACTIVITÉS ET EXPÉRIENCES
-- =============================================================================

-- Catégories d'activités
CREATE TABLE activity_categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE,
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  sort_order  INTEGER DEFAULT 0
);

-- Activités disponibles
CREATE TABLE activities (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id       UUID REFERENCES activity_categories(id),
  name_fr           TEXT NOT NULL,
  name_en           TEXT,
  description_fr    TEXT,
  description_en    TEXT,
  price             DECIMAL(12, 2),
  price_on_request  BOOLEAN DEFAULT FALSE,
  duration_minutes  INTEGER,
  max_persons       INTEGER,
  is_active         BOOLEAN DEFAULT TRUE,
  sort_order        INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Images des activités
CREATE TABLE activity_images (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id   UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  alt_text_fr   TEXT,
  is_cover      BOOLEAN DEFAULT FALSE,
  sort_order    INTEGER DEFAULT 0
);

-- Réservations d'activités
CREATE TABLE activity_bookings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id     UUID NOT NULL REFERENCES activities(id),
  booking_id      UUID REFERENCES bookings(id),
  customer_id     UUID REFERENCES customers(id),
  activity_date   DATE NOT NULL,
  activity_time   TIME,
  persons         INTEGER DEFAULT 1,
  total_price     DECIMAL(12, 2),
  status          TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 9 — AVIS CLIENTS
-- =============================================================================

-- Sources des avis
CREATE TABLE review_sources (
  id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug    TEXT NOT NULL UNIQUE,  -- 'internal', 'booking_com', 'google', 'airbnb'
  label   TEXT NOT NULL
);

-- Avis clients
CREATE TABLE reviews (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id    UUID REFERENCES apartments(id),
  booking_id      UUID REFERENCES bookings(id),
  customer_id     UUID REFERENCES customers(id),
  source_id       UUID REFERENCES review_sources(id),
  external_id     TEXT,               -- ID de l'avis sur la plateforme externe
  reviewer_name   TEXT,               -- nom affiché (peut différer de customer)
  reviewer_country TEXT,
  rating          DECIMAL(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title_fr        TEXT,
  title_en        TEXT,
  content_fr      TEXT,
  content_en      TEXT,
  status          review_status DEFAULT 'pending',
  sort_order      INTEGER DEFAULT 0,
  is_featured     BOOLEAN DEFAULT FALSE,  -- mis en avant sur le site
  published_at    DATE,
  moderated_by    UUID REFERENCES auth.users(id),
  moderated_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Réponses aux avis
CREATE TABLE review_responses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id     UUID NOT NULL UNIQUE REFERENCES reviews(id) ON DELETE CASCADE,
  content_fr    TEXT NOT NULL,
  content_en    TEXT,
  author_name   TEXT DEFAULT 'La Direction',
  created_by    UUID REFERENCES auth.users(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 10 — DEMANDES CORPORATE ET PARTENAIRES
-- =============================================================================

-- Demandes corporate (formulaire /corporate)
CREATE TABLE corporate_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name    TEXT NOT NULL,
  sector          TEXT,
  contact_name    TEXT NOT NULL,
  contact_role    TEXT,
  email           TEXT NOT NULL,
  phone           TEXT,
  needs           TEXT,
  estimated_persons INTEGER,
  start_date      DATE,
  end_date        DATE,
  budget          TEXT,
  status          lead_status DEFAULT 'new',
  assigned_to     UUID REFERENCES auth.users(id),
  internal_notes  TEXT,
  source_page     TEXT DEFAULT 'corporate',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Historique des statuts de leads
CREATE TABLE lead_status_history (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  corporate_request_id UUID REFERENCES corporate_requests(id),
  old_status        lead_status,
  new_status        lead_status NOT NULL,
  changed_by        UUID REFERENCES auth.users(id),
  note              TEXT,
  changed_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Demandes partenaires
CREATE TABLE partner_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name    TEXT NOT NULL,
  contact_name    TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  partnership_type TEXT,  -- 'agence', 'entreprise', 'plateforme', 'autre'
  message         TEXT,
  status          lead_status DEFAULT 'new',
  assigned_to     UUID REFERENCES auth.users(id),
  internal_notes  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Messages de contact généraux
CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  read_by     UUID REFERENCES auth.users(id),
  read_at     TIMESTAMPTZ,
  replied_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 11 — CONTENUS MODIFIABLES DU SITE
-- =============================================================================

-- Pages du site
CREATE TABLE pages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE, -- 'home', 'apartments', 'gallery'
  title_fr    TEXT NOT NULL,
  title_en    TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Sections d'une page
CREATE TABLE page_sections (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id       UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  slug          TEXT NOT NULL,       -- 'hero', 'about', 'features'
  title_fr      TEXT,
  title_en      TEXT,
  subtitle_fr   TEXT,
  subtitle_en   TEXT,
  body_fr       TEXT,
  body_en       TEXT,
  image_url     TEXT,
  cta_label_fr  TEXT,
  cta_label_en  TEXT,
  cta_url       TEXT,
  is_visible    BOOLEAN DEFAULT TRUE,
  sort_order    INTEGER DEFAULT 0,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_by    UUID REFERENCES auth.users(id),
  UNIQUE (page_id, slug)
);

-- Liens de navigation
CREATE TABLE navigation_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  url         TEXT NOT NULL,
  parent_id   UUID REFERENCES navigation_items(id),
  is_external BOOLEAN DEFAULT FALSE,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  location    TEXT DEFAULT 'main'  -- 'main', 'footer', 'mobile'
);

-- =============================================================================
-- DOMAINE 12 — PLATEFORMES EXTERNES ET iCAL
-- =============================================================================

-- Plateformes externes (Booking, Airbnb, Expedia…)
CREATE TABLE external_platforms (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type        platform_type NOT NULL,
  name        TEXT NOT NULL,
  base_url    TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Annonces sur les plateformes externes (mapping avec nos appartements)
CREATE TABLE external_listings (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id      UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  platform_id       UUID NOT NULL REFERENCES external_platforms(id),
  external_listing_id TEXT NOT NULL,   -- ID de l'annonce sur la plateforme
  external_url      TEXT,
  ical_import_url   TEXT,              -- URL du calendrier iCal à importer
  ical_export_url   TEXT,              -- URL de notre calendrier exporté
  is_active         BOOLEAN DEFAULT TRUE,
  last_synced_at    TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (platform_id, external_listing_id)
);

-- Événements importés depuis les calendriers iCal externes
CREATE TABLE external_calendar_events (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id        UUID NOT NULL REFERENCES external_listings(id) ON DELETE CASCADE,
  external_uid      TEXT,                   -- UID dans le fichier iCal
  start_date        DATE NOT NULL,
  end_date          DATE NOT NULL,
  summary           TEXT,
  raw_data          JSONB,                  -- données brutes de l'événement iCal
  imported_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (listing_id, external_uid)
);

-- Logs de synchronisation iCal
CREATE TABLE calendar_sync_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id    UUID REFERENCES external_listings(id),
  direction     TEXT NOT NULL,    -- 'import' ou 'export'
  status        sync_status NOT NULL,
  events_count  INTEGER DEFAULT 0,
  error_message TEXT,
  synced_at     TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 13 — DISPONIBILITÉS ET CALENDRIER
-- =============================================================================

-- Blocs de disponibilité (source unique de vérité pour les disponibilités)
-- Un appartement est DISPONIBLE si aucun bloc actif ne couvre la période
CREATE TABLE availability_blocks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  apartment_id    UUID NOT NULL REFERENCES apartments(id) ON DELETE CASCADE,
  block_type      block_type NOT NULL,
  start_date      DATE NOT NULL,
  end_date        DATE NOT NULL,
  booking_id      UUID REFERENCES bookings(id),
  external_event_id UUID REFERENCES external_calendar_events(id),
  maintenance_id  UUID REFERENCES apartment_maintenance_blocks(id),
  notes           TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  created_by      UUID REFERENCES auth.users(id),
  CONSTRAINT block_dates_valid CHECK (end_date >= start_date)
);

-- Index pour les requêtes de disponibilité (très fréquentes)
CREATE INDEX idx_availability_blocks_apartment_dates
  ON availability_blocks (apartment_id, start_date, end_date)
  WHERE is_active = TRUE;

-- Fonction pour vérifier la disponibilité d'un appartement sur une période
-- Retourne TRUE si l'appartement est disponible (aucun bloc actif)
CREATE OR REPLACE FUNCTION check_availability(
  p_apartment_id UUID,
  p_start_date DATE,
  p_end_date DATE
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1
    FROM availability_blocks ab
    WHERE ab.apartment_id = p_apartment_id
      AND ab.is_active = TRUE
      AND ab.start_date < p_end_date
      AND ab.end_date > p_start_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- DOMAINE 14 — STAFF, RÔLES ET PERMISSIONS
-- =============================================================================

-- Profils staff (liés à Supabase Auth)
CREATE TABLE staff_profiles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id  UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  display_name  TEXT,
  phone         TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Rôles disponibles dans le système
CREATE TABLE roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        staff_role NOT NULL UNIQUE,
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions atomiques
CREATE TABLE permissions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug        TEXT NOT NULL UNIQUE, -- 'read:bookings', 'write:apartments', etc.
  label_fr    TEXT NOT NULL,
  label_en    TEXT,
  category    TEXT,               -- 'bookings', 'apartments', 'staff', 'settings'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Relation rôles ↔ permissions (many-to-many)
CREATE TABLE role_permissions (
  role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Assignation de rôles aux membres du staff
CREATE TABLE staff_role_assignments (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id      UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  role_id       UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by   UUID REFERENCES auth.users(id),
  assigned_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (staff_id, role_id)
);

-- =============================================================================
-- DOMAINE 15 — LOGS, AUDIT ET SÉCURITÉ
-- =============================================================================

-- Journal d'activité général (audit trail)
CREATE TABLE activity_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES auth.users(id),
  action          TEXT NOT NULL,          -- 'booking.created', 'apartment.updated', etc.
  entity_type     TEXT,                   -- 'booking', 'apartment', 'payment'...
  entity_id       UUID,
  old_values      JSONB,                  -- état avant modification
  new_values      JSONB,                  -- état après modification
  ip_address      TEXT,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour requêtes d'audit
CREATE INDEX idx_activity_logs_entity ON activity_logs (entity_type, entity_id);
CREATE INDEX idx_activity_logs_user ON activity_logs (user_id, created_at DESC);

-- Logs de sécurité (tentatives de connexion, etc.)
CREATE TABLE security_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id),
  email       TEXT,
  action      TEXT NOT NULL,    -- 'login_success', 'login_failed', 'password_reset'
  ip_address  TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- DOMAINE 16 — NOTIFICATIONS ET EMAILS
-- =============================================================================

-- Templates d'emails
CREATE TABLE email_templates (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT NOT NULL UNIQUE,   -- 'booking_confirmed_client', 'new_booking_staff'
  subject_fr    TEXT NOT NULL,
  subject_en    TEXT,
  body_html_fr  TEXT,
  body_html_en  TEXT,
  variables     TEXT[],                 -- liste des variables utilisées dans le template
  is_active     BOOLEAN DEFAULT TRUE,
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_by    UUID REFERENCES auth.users(id)
);

-- Logs des emails envoyés
CREATE TABLE email_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id     UUID REFERENCES email_templates(id),
  to_email        TEXT NOT NULL,
  to_name         TEXT,
  subject         TEXT NOT NULL,
  booking_id      UUID REFERENCES bookings(id),
  customer_id     UUID REFERENCES customers(id),
  status          TEXT DEFAULT 'sent',  -- 'sent', 'failed', 'bounced'
  external_id     TEXT,                 -- ID Resend
  error_message   TEXT,
  sent_at         TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications internes (pour l'admin desktop)
CREATE TABLE notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type            notification_type NOT NULL,
  title_fr        TEXT NOT NULL,
  title_en        TEXT,
  body_fr         TEXT,
  body_en         TEXT,
  entity_type     TEXT,
  entity_id       UUID,
  url             TEXT,                 -- lien direct vers la ressource dans l'admin
  is_read         BOOLEAN DEFAULT FALSE,
  read_by         UUID REFERENCES auth.users(id),
  read_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEX SUPPLÉMENTAIRES
-- =============================================================================

CREATE INDEX idx_bookings_apartment ON bookings (apartment_id, check_in_date, check_out_date);
CREATE INDEX idx_bookings_customer ON bookings (customer_id);
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_reference ON bookings (reference);
CREATE INDEX idx_apartments_slug ON apartments (slug);
CREATE INDEX idx_apartments_status ON apartments (status, is_visible);
CREATE INDEX idx_customers_email ON customers (email);
CREATE INDEX idx_payments_booking ON payments (booking_id);
CREATE INDEX idx_reviews_apartment ON reviews (apartment_id, status);
CREATE INDEX idx_concierge_requests_booking ON concierge_requests (booking_id);
CREATE INDEX idx_concierge_requests_status ON concierge_requests (status);

-- =============================================================================
-- FONCTIONS UTILITAIRES
-- =============================================================================

-- Génération automatique de référence de réservation
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
  year TEXT;
  seq  INTEGER;
  ref  TEXT;
BEGIN
  year := EXTRACT(YEAR FROM NOW())::TEXT;
  SELECT COUNT(*) + 1 INTO seq
  FROM bookings
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  ref := 'RES-' || year || '-' || LPAD(seq::TEXT, 4, '0');
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

-- Génération automatique de numéro de facture
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  year TEXT;
  seq  INTEGER;
BEGIN
  year := EXTRACT(YEAR FROM NOW())::TEXT;
  SELECT COUNT(*) + 1 INTO seq
  FROM invoices
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  RETURN 'FAC-' || year || '-' || LPAD(seq::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Trigger : mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger sur toutes les tables avec updated_at
CREATE TRIGGER trg_apartments_updated_at
  BEFORE UPDATE ON apartments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_concierge_requests_updated_at
  BEFORE UPDATE ON concierge_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_corporate_requests_updated_at
  BEFORE UPDATE ON corporate_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Activation RLS sur toutes les tables sensibles
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE concierge_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_loyalty ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_listings ENABLE ROW LEVEL SECURITY;

-- POLICIES — Appartements (lecture publique, écriture staff seulement)
CREATE POLICY "Appartements visibles publiquement"
  ON apartments FOR SELECT
  USING (is_visible = TRUE AND status = 'active');

CREATE POLICY "Staff peut tout voir sur les appartements"
  ON apartments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

CREATE POLICY "Staff peut modifier les appartements"
  ON apartments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Réservations
CREATE POLICY "Client voit ses propres réservations"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Staff voit toutes les réservations"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

CREATE POLICY "Staff peut modifier les réservations"
  ON bookings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Clients
CREATE POLICY "Client voit son propre profil"
  ON customers FOR SELECT
  TO authenticated
  USING (auth_user_id = auth.uid());

CREATE POLICY "Client peut modifier son propre profil"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth_user_id = auth.uid());

CREATE POLICY "Staff voit tous les clients"
  ON customers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Avis (lecture publique des avis approuvés)
CREATE POLICY "Avis approuvés visibles publiquement"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Staff peut modérer les avis"
  ON reviews FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Paramètres du site (lecture publique, écriture staff)
CREATE POLICY "Paramètres publics visibles par tous"
  ON site_settings FOR SELECT
  USING (is_public = TRUE);

CREATE POLICY "Staff peut modifier les paramètres"
  ON site_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Logs (staff seulement)
CREATE POLICY "Staff voit les logs"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Paiements
CREATE POLICY "Client voit ses paiements"
  ON payments FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT b.id FROM bookings b
      JOIN customers c ON b.customer_id = c.id
      WHERE c.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Staff voit tous les paiements"
  ON payments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Demandes corporate (écriture publique, lecture staff)
CREATE POLICY "Tout le monde peut soumettre une demande corporate"
  ON corporate_requests FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Staff voit les demandes corporate"
  ON corporate_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Messages de contact (écriture publique, lecture staff)
CREATE POLICY "Tout le monde peut envoyer un message"
  ON contact_messages FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Staff voit les messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- POLICIES — Fidélité client
CREATE POLICY "Client voit sa propre fidélité"
  ON customer_loyalty FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers WHERE auth_user_id = auth.uid()
    )
  );

-- POLICIES — Notifications (staff seulement)
CREATE POLICY "Staff voit les notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM staff_profiles sp
      WHERE sp.auth_user_id = auth.uid() AND sp.is_active = TRUE
    )
  );

-- =============================================================================
-- FIN DU SCHÉMA
-- =============================================================================
