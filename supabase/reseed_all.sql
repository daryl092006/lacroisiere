-- =============================================================================
-- NETTOYAGE COMPLET DE LA BASE AVANT LE SEED
-- =============================================================================
TRUNCATE 
  contact_settings, 
  site_settings, 
  apartment_collections, 
  apartment_types, 
  amenities, 
  concierge_categories, 
  external_platforms, 
  review_sources, 
  payment_methods, 
  roles, 
  permissions, 
  role_permissions, 
  email_templates, 
  pages, 
  apartments, 
  apartment_images, 
  apartment_advantages, 
  apartment_composition, 
  apartment_amenities, 
  media_assets, 
  page_sections 
CASCADE;

-- =============================================================================
-- RÉSIDENCE LA CROISIÈRE — SEED (données initiales)
-- À exécuter APRÈS schema.sql
-- =============================================================================

-- =============================================================================
-- DONNÉES DE BASE : PARAMÈTRES DU SITE
-- =============================================================================

INSERT INTO contact_settings (
  phone_main, phone_concierge, phone_whatsapp,
  email_main, email_booking, email_corporate,
  address_line1, city, country,
  check_in_time, check_out_time
) VALUES (
  '+229 00 00 00 00',           -- À REMPLIR
  '+229 00 00 00 00',           -- À REMPLIR
  '+229 00 00 00 00',           -- À REMPLIR
  'contact@lacroisiere.bj',     -- À REMPLIR
  'reservations@lacroisiere.bj',-- À REMPLIR
  'corporate@lacroisiere.bj',   -- À REMPLIR
  'Cotonou, Bénin',             -- À REMPLIR avec adresse exacte
  'Cotonou',
  'Bénin',
  '14:00:00',
  '11:00:00'
);

INSERT INTO site_settings (key, value, value_type, label, category, is_public) VALUES
  ('site_name',      'Résidence La Croisière',              'string', 'Nom du site',          'general', true),
  ('site_slogan_fr', 'L''Excellence au cœur de Cotonou',    'string', 'Slogan FR',            'general', true),
  ('site_slogan_en', 'Excellence at the heart of Cotonou',  'string', 'Slogan EN',            'general', true),
  ('currency',       'XOF',                                  'string', 'Devise principale',    'general', true),
  ('currency_label', 'FCFA',                                 'string', 'Libellé devise',       'general', true),
  ('min_nights',     '1',                                    'number', 'Minimum de nuits',     'booking', true),
  ('deposit_percent','30',                                   'number', 'Acompte (%)',          'booking', false),
  ('late_checkout_hour','12',                               'number', 'Heure checkout tardif', 'booking', true);

-- =============================================================================
-- DONNÉES DE BASE : COLLECTIONS D'APPARTEMENTS
-- =============================================================================

INSERT INTO apartment_collections (slug, name_fr, name_en, description_fr, sort_order) VALUES
  ('crown-jewels',    'The Crown Jewels',    'The Crown Jewels',    'Chambres premium d''excellence — le summum du confort individuel.',           1),
  ('modern-classics', 'The Modern Classics', 'The Modern Classics', 'Appartements avec salon — l''élégance au quotidien.',                         2),
  ('grand-suites',    'The Grand Suites',    'The Grand Suites',    'Suites deux chambres — l''espace et le luxe pour les séjours en groupe.',      3),
  ('executive-space', 'Executive Space',     'Executive Space',     'Espaces de travail et de réunion d''exception pour les professionnels.',       4);

-- =============================================================================
-- DONNÉES DE BASE : TYPES D'APPARTEMENTS
-- =============================================================================

INSERT INTO apartment_types (code, label_fr, label_en, bedrooms, has_salon, sort_order) VALUES
  ('F1',      'Chambre Premium',             'Premium Room',        1, false, 1),
  ('F2',      'Appartement 1 chambre',       '1-Bedroom Apartment', 1, true,  2),
  ('F3',      'Appartement 2 chambres',      '2-Bedroom Apartment', 2, true,  3),
  ('MEETING', 'Salle de réunion',            'Meeting Room',        0, false, 4);

-- =============================================================================
-- DONNÉES DE BASE : ÉQUIPEMENTS
-- =============================================================================

INSERT INTO amenities (slug, label_fr, label_en, icon, category, sort_order) VALUES
  ('wifi',      'Wifi Fibre 6 ultra-rapide',     'Ultra-fast Fiber 6 Wifi',  'Wifi',        'tech',    1),
  ('tv',        'Smart TV 4K',                   '4K Smart TV',              'Tv',          'tech',    2),
  ('ac',        'Climatisation intelligente',    'Smart Air Conditioning',   'Wind',        'comfort', 3),
  ('coffee',    'Machine à café',                'Coffee Machine',           'Coffee',      'kitchen', 4),
  ('safe',      'Coffre-fort numérique',         'Digital Safe',             'Shield',      'security',5),
  ('parking',   'Parking privé sécurisé',        'Private Secure Parking',   'Car',         'security',6),
  ('minibar',   'Minibar',                       'Minibar',                  'Minus',       'kitchen', 7),
  ('bath_rain', 'Douche effet pluie',            'Rain Shower',              'Droplets',    'wellness',8),
  ('blackout',  'Occultants automatiques',       'Automatic Blackout',       'MoonStar',    'comfort', 9),
  ('workspace', 'Espace de travail intégré',     'Integrated Workspace',     'Monitor',     'tech',    10),
  ('kitchen',   'Kitchenette équipée',           'Equipped Kitchenette',     'Utensils',    'kitchen', 11),
  ('pool',      'Piscine',                       'Swimming Pool',            'Waves',       'leisure', 12),
  ('rooftop',   'Accès rooftop',                 'Rooftop Access',           'Building2',   'leisure', 13),
  ('concierge', 'Conciergerie 24h/24',           '24/7 Concierge',           'Bell',        'service', 14);

-- =============================================================================
-- DONNÉES DE BASE : CATÉGORIES CONCIERGERIE
-- =============================================================================

INSERT INTO concierge_categories (slug, label_fr, label_en, icon, sort_order) VALUES
  ('transport',  'Transport & Chauffeur',   'Transport & Driver',   'Car',          1),
  ('restaurant', 'Restaurant & Gastronomie','Restaurant & Dining',  'Utensils',     2),
  ('wellness',   'Spa & Bien-être',         'Spa & Wellness',       'Heart',        3),
  ('shopping',   'Courses & Shopping',      'Shopping & Errands',   'ShoppingBag',  4),
  ('cleaning',   'Ménage & Pressing',       'Cleaning & Laundry',   'Shirt',        5),
  ('event',      'Événement & Privatisation','Event & Privatization','CalendarDays', 6),
  ('guide',      'Guide & Visites',         'Guide & Tours',        'Map',          7),
  ('emergency',  'Urgence',                 'Emergency',            'AlertTriangle', 8);

-- =============================================================================
-- DONNÉES DE BASE : PLATEFORMES EXTERNES
-- =============================================================================

INSERT INTO external_platforms (type, name, base_url) VALUES
  ('booking_com', 'Booking.com',  'https://www.booking.com'),
  ('airbnb',      'Airbnb',       'https://www.airbnb.com'),
  ('expedia',     'Expedia',      'https://www.expedia.com'),
  ('agoda',       'Agoda',        'https://www.agoda.com'),
  ('hotels_com',  'Hotels.com',   'https://www.hotels.com');

-- =============================================================================
-- DONNÉES DE BASE : SOURCES D'AVIS
-- =============================================================================

INSERT INTO review_sources (slug, label) VALUES
  ('internal',    'Avis direct La Croisière'),
  ('booking_com', 'Booking.com'),
  ('google',      'Google'),
  ('airbnb',      'Airbnb'),
  ('tripadvisor', 'TripAdvisor');

-- =============================================================================
-- DONNÉES DE BASE : MÉTHODES DE PAIEMENT
-- =============================================================================

INSERT INTO payment_methods (slug, label_fr, label_en, sort_order) VALUES
  ('cash',         'Espèces sur place',        'Cash on site',      1),
  ('stripe',       'Carte bancaire (Stripe)',  'Credit card',       2),
  ('orange_money', 'Orange Money',             'Orange Money',      3),
  ('mtn_momo',     'MTN MoMo',                'MTN MoMo',          4),
  ('cinetpay',     'CinetPay',                'CinetPay',          5),
  ('bank_transfer','Virement bancaire',        'Bank transfer',     6),
  ('staff_manual', 'Paiement enregistré manuellement', 'Manual payment', 7);

-- =============================================================================
-- DONNÉES DE BASE : RÔLES STAFF
-- =============================================================================

INSERT INTO roles (slug, label_fr, label_en, description) VALUES
  ('super_admin',    'Super Administrateur',  'Super Admin',         'Accès complet à tout le système'),
  ('manager',        'Directeur',             'Manager',             'Gestion complète sauf paramètres système'),
  ('receptionist',   'Réceptionniste',        'Receptionist',        'Gestion des réservations et clients'),
  ('concierge',      'Concierge',             'Concierge',           'Gestion des demandes conciergerie'),
  ('housekeeping',   'Housekeeping',          'Housekeeping',        'Calendrier ménage et maintenance'),
  ('accountant',     'Comptable',             'Accountant',          'Accès aux paiements et factures'),
  ('marketing',      'Marketing',             'Marketing',           'Gestion des avis, offres et contenus'),
  ('support',        'Support Client',        'Customer Support',    'Messagerie et demandes clients'),
  ('readonly',       'Lecture seule',         'Read Only',           'Consultation uniquement, aucune modification');

-- =============================================================================
-- DONNÉES DE BASE : PERMISSIONS
-- =============================================================================

INSERT INTO permissions (slug, label_fr, category) VALUES
  -- Dashboard
  ('read:dashboard',         'Voir le tableau de bord',              'dashboard'),
  -- Appartements
  ('read:apartments',        'Voir les appartements',                'apartments'),
  ('write:apartments',       'Modifier les appartements',            'apartments'),
  ('delete:apartments',      'Supprimer un appartement',             'apartments'),
  -- Prix
  ('read:rates',             'Voir les tarifs',                      'rates'),
  ('write:rates',            'Modifier les tarifs',                  'rates'),
  -- Réservations
  ('read:bookings',          'Voir les réservations',                'bookings'),
  ('write:bookings',         'Créer/modifier une réservation',       'bookings'),
  ('confirm:bookings',       'Confirmer une réservation',            'bookings'),
  ('cancel:bookings',        'Annuler une réservation',              'bookings'),
  -- Clients
  ('read:customers',         'Voir les clients',                     'customers'),
  ('write:customers',        'Modifier les clients',                 'customers'),
  -- Paiements
  ('read:payments',          'Voir les paiements',                   'payments'),
  ('write:payments',         'Enregistrer un paiement',              'payments'),
  ('refund:payments',        'Effectuer un remboursement',           'payments'),
  -- Avis
  ('read:reviews',           'Voir les avis',                        'reviews'),
  ('moderate:reviews',       'Modérer les avis',                     'reviews'),
  -- Conciergerie
  ('read:concierge',         'Voir les demandes conciergerie',       'concierge'),
  ('write:concierge',        'Gérer les demandes conciergerie',      'concierge'),
  -- Promotions
  ('read:promotions',        'Voir les promotions',                  'promotions'),
  ('write:promotions',       'Gérer les promotions',                 'promotions'),
  -- Corporate
  ('read:corporate',         'Voir les demandes corporate',          'corporate'),
  ('write:corporate',        'Gérer les demandes corporate',         'corporate'),
  -- Plateformes externes
  ('read:platforms',         'Voir les plateformes externes',        'platforms'),
  ('write:platforms',        'Gérer les plateformes externes',       'platforms'),
  -- Staff
  ('read:staff',             'Voir les membres du staff',            'staff'),
  ('write:staff',            'Gérer les membres du staff',           'staff'),
  -- Logs
  ('read:logs',              'Voir les logs d''activité',            'logs'),
  -- Export
  ('export:data',            'Exporter les données',                 'settings'),
  -- Paramètres
  ('read:settings',          'Voir les paramètres',                  'settings'),
  ('write:settings',         'Modifier les paramètres du site',      'settings');

-- Attribution des permissions au rôle super_admin (tout)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'super_admin';

-- Attribution des permissions au rôle manager (tout sauf gestion staff et paramètres système)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'manager'
  AND p.slug NOT IN ('delete:apartments', 'write:staff', 'write:settings');

-- Attribution des permissions au rôle receptionist
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'receptionist'
  AND p.slug IN ('read:dashboard', 'read:apartments', 'read:bookings', 'write:bookings',
                 'confirm:bookings', 'read:customers', 'write:customers',
                 'read:payments', 'write:payments', 'read:concierge');

-- Attribution des permissions au rôle concierge
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'concierge'
  AND p.slug IN ('read:dashboard', 'read:bookings', 'read:customers',
                 'read:concierge', 'write:concierge');

-- Attribution des permissions au rôle accountant
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'accountant'
  AND p.slug IN ('read:dashboard', 'read:bookings', 'read:payments',
                 'write:payments', 'refund:payments', 'read:customers', 'export:data');

-- Attribution des permissions au rôle marketing
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'marketing'
  AND p.slug IN ('read:dashboard', 'read:reviews', 'moderate:reviews',
                 'read:promotions', 'write:promotions', 'read:corporate', 'write:corporate');

-- Attribution des permissions au rôle readonly
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.slug = 'readonly'
  AND p.slug IN ('read:dashboard', 'read:apartments', 'read:bookings',
                 'read:customers', 'read:payments', 'read:reviews', 'read:settings');

-- =============================================================================
-- DONNÉES DE BASE : TEMPLATES D'EMAILS
-- =============================================================================

INSERT INTO email_templates (slug, subject_fr, subject_en, variables) VALUES
  ('booking_confirmed_client',
   'Votre réservation est confirmée — Résidence La Croisière',
   'Your booking is confirmed — Résidence La Croisière',
   ARRAY['client_name', 'apartment_name', 'check_in_date', 'check_out_date', 'booking_reference', 'total_amount']
  ),
  ('booking_pending_client',
   'Demande de réservation reçue — Résidence La Croisière',
   'Booking request received — Résidence La Croisière',
   ARRAY['client_name', 'apartment_name', 'check_in_date', 'check_out_date', 'booking_reference']
  ),
  ('new_booking_staff',
   'Nouvelle réservation — {{booking_reference}}',
   'New booking — {{booking_reference}}',
   ARRAY['client_name', 'apartment_name', 'check_in_date', 'check_out_date', 'booking_reference', 'total_amount', 'source']
  ),
  ('booking_cancelled_client',
   'Annulation de votre réservation — Résidence La Croisière',
   'Your booking has been cancelled — Résidence La Croisière',
   ARRAY['client_name', 'apartment_name', 'booking_reference', 'cancellation_reason']
  ),
  ('check_in_reminder_client',
   'Votre séjour commence demain — Résidence La Croisière',
   'Your stay starts tomorrow — Résidence La Croisière',
   ARRAY['client_name', 'apartment_name', 'check_in_date', 'check_in_time', 'address']
  ),
  ('corporate_request_received',
   'Demande corporate reçue — Résidence La Croisière',
   'Corporate request received — Résidence La Croisière',
   ARRAY['company_name', 'contact_name']
  ),
  ('contact_message_received',
   'Votre message a bien été reçu — Résidence La Croisière',
   'Your message has been received — Résidence La Croisière',
   ARRAY['name']
  );

-- =============================================================================
-- DONNÉES DE BASE : PAGES DU SITE
-- =============================================================================

INSERT INTO pages (slug, title_fr, title_en, sort_order) VALUES
  ('home',        'Accueil',              'Home',           1),
  ('apartments',  'Nos Appartements',     'Our Apartments', 2),
  ('gallery',     'Galerie',              'Gallery',        3),
  ('experience',  'L''Expérience',        'The Experience', 4),
  ('location',    'Localisation',         'Location',       5),
  ('offers',      'Offres Spéciales',     'Special Offers', 6),
  ('reviews',     'Avis Clients',         'Guest Reviews',  7),
  ('corporate',   'Espace Entreprises',   'Corporate',      8),
  ('contact',     'Contact',             'Contact',         9);

-- =============================================================================
-- DONNÉES DE BASE : APPARTEMENTS (migration depuis apartments.ts)
-- Les prix sont à 0 - À REMPLIR avec les vrais tarifs
-- =============================================================================

-- Apartment: Cotonou (cotonou)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'cotonou',
  'Cotonou',
  'RDC',
  0,
  1,
  false,
  1,
  30,
  2,
  0,
  'Chambre premium au cœur de la résidence.',
  'Le point de départ élégant de votre séjour à La Croisière.',
  'Baptisée en hommage à la capitale économique du Bénin, Cotonou incarne l''âme profonde de La Croisière. Chambre premium au rez-de-chaussée, elle conjugue sobriété raffinée et confort hôtelier de haut niveau — une invitation au repos immédiat dès votre arrivée.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Crown Jewels' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F1' LIMIT 1),
  1
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), '/R+3 Int (2).pdf_52.jpg', 'Photo de l''appartement Cotonou', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'Chambre premium avec literie haut de gamme', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'Accès direct depuis le hall d''entrée', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'Ambiance cosy et intimiste', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'Idéale pour les courts séjours d''affaires', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'sleeping', 'Lit King Size Premium', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'sleeping', 'Linge de lit en coton d''Égypte', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'sleeping', 'Blackout total', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'wellness', 'Douche effet pluie', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'wellness', 'Produits d''accueil organiques', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'living', 'Espace de travail intégré', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'living', 'Mini-réfrigérateur', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'tech', 'Wifi 6 ultra-rapide', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'tech', 'Smart TV 4K', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), 'tech', 'Climatisation intelligente', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cotonou'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Marrakech (marrakech)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'marrakech',
  'Marrakech',
  'RDC',
  0,
  1,
  true,
  2,
  42,
  2,
  0,
  'Une chambre et un salon inspirés de la Médina.',
  'Les couleurs chaudes du Maroc au cœur de Cotonou.',
  'Marrakech évoque les ruelles parfumées de la Médina et la chaleur dorée du désert. Avec son salon généreux et sa chambre lumineuse, cet appartement du rez-de-chaussée transporte ses hôtes dans une atmosphère orientale de raffinement.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  2
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), '/R+3 Int (2).pdf_37.jpg', 'Photo de l''appartement Marrakech', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'Salon privé pour recevoir ou se détendre', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'Décoration inspirée de l''art marocain', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'Chambre isolée du salon pour un sommeil serein', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'Parfait pour les séjours prolongés', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'sleeping', 'Lit King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'sleeping', 'Linge de lit haut de gamme', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'wellness', 'Douche à l''italienne', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'wellness', 'Salle de bain carrelée', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'living', 'Salon avec canapé design', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'living', 'Coin repas', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'living', 'Kitchenette équipée', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'tech', 'Wifi 6', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'tech', 'Smart TV 4K', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), 'tech', 'Climatisation multi-zones', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'marrakech'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Zanzibar (zanzibar)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'zanzibar',
  'Zanzibar',
  'RDC',
  0,
  2,
  true,
  3,
  58,
  4,
  0,
  'Deux chambres et un salon aux accents insulaires.',
  'L''île aux épices s''invite à La Croisière.',
  'Zanzibar porte en elle l''essence des îles de l''Océan Indien — leurs couleurs turquoise, leurs épices envoûtantes et leur art de vivre. Le plus grand appartement du rez-de-chaussée avec deux chambres séparées et un vaste salon, idéal pour les familles ou les voyageurs exigeants.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Grand Suites' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F3' LIMIT 1),
  3
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), '/R+3 Int (2).pdf_27.jpg', 'Photo de l''appartement Zanzibar', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'Deux chambres indépendantes avec fermeture séparée', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'Grand salon de réception', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'Capacité 4 personnes en tout confort', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'Idéal pour familles ou collègues en déplacement', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'sleeping', '2 Chambres King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'sleeping', 'Literie premium dans chaque chambre', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'wellness', 'Douche sensorielle', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'wellness', 'Double vasque', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'living', 'Salon de réception 4 places', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'living', 'Salle à manger', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'living', 'Kitchenette complète', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'tech', 'Wifi 6 Fibre', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'tech', '2 Smart TV 4K', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), 'tech', 'Climatisation multi-zones', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'zanzibar'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Abidjan (abidjan)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'abidjan',
  'Abidjan',
  '1er étage',
  1,
  1,
  false,
  1,
  30,
  2,
  0,
  'Chambre premium avec vue sur la résidence.',
  'L''énergie de la capitale ivoirienne en plein cœur de Cotonou.',
  'Abidjan incarne le dynamisme et la modernité de la métropole ivoirienne. Au premier étage, cette chambre premium offre une élévation qui filtre le bruit extérieur, pour un confort absolu dans un cadre soigné.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Crown Jewels' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F1' LIMIT 1),
  4
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), '/R+3 Int (2).pdf_54 (1).jpg', 'Photo de l''appartement Abidjan', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'Hauteur parfaite pour la quiétude et la lumière', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'Chambre premium avec finitions soignées', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'Idéale pour voyageur solo ou couple', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'Rapport qualité-confort exceptionnel', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'sleeping', 'Lit King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'sleeping', 'Oreiller à mémoire de forme', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'sleeping', 'Blackout automatisé', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'wellness', 'Douche design', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'wellness', 'Produits d''accueil haut de gamme', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'living', 'Espace bureau', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'living', 'Minibar', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'tech', 'Wifi 6', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'tech', 'Smart TV', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), 'tech', 'Climatisation', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'abidjan'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Dubaï (dubai)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'dubai',
  'Dubaï',
  '1er étage',
  1,
  2,
  true,
  3,
  60,
  4,
  0,
  'Grandeur dubaïote — deux chambres et grand salon.',
  'L''opulence du Golfe Persique à Cotonou.',
  'Dubaï, la cité des records et du faste. Cet appartement 3 pièces du premier étage honore cette réputation : deux chambres somptueuses et un salon de réception qui impressionne. Pour ceux qui refusent les compromis.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Grand Suites' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F3' LIMIT 1),
  5
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), '/R+3 Int (2).pdf_57.jpg', 'Photo de l''appartement Dubaï', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'Le plus grand F3 du 1er étage', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'Salon de réception digne d''un penthouse', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'Deux chambres entièrement indépendantes', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'Finitions ultra-premium', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'sleeping', '2 Suites parentales King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'sleeping', 'Literie cinq étoiles', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'wellness', '2 Salles de bain complètes', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'wellness', 'Baignoire balnéo', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'living', 'Grand salon 6 places', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'living', 'Salle à manger de prestige', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'living', 'Cuisine équipée', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'tech', 'Wifi 6 Fibre dédiée', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'tech', '2 Smart TV 4K', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), 'tech', 'iPad domotique', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), (SELECT id FROM amenities WHERE slug = 'safe'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dubai'), (SELECT id FROM amenities WHERE slug = 'parking'));

-- -----------------------------------------------------------------------------

-- Apartment: Paris (paris)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'paris',
  'Paris',
  '1er étage',
  1,
  1,
  true,
  2,
  44,
  2,
  0,
  'L''élégance parisienne dans chaque détail.',
  'La Ville Lumière s''installe à La Croisière.',
  'Paris n''est pas qu''une ville, c''est un art de vivre. Cet appartement du premier étage célèbre le raffinement à la française — lignes épurées, matériaux nobles, atmosphère romantique qui fait de chaque nuit un moment d''exception.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  6
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), '/R+3 Int (2).pdf_67 (1).jpg', 'Photo de l''appartement Paris', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'Décoration française chic et épurée', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'Salon cosy avec vue dégagée', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'Ambiance romantique parfaite pour les couples', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'Cuisine kitchenette tout équipée', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'sleeping', 'Lit King Size Prestige', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'sleeping', 'Linge de lit coton peigné', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'wellness', 'Douche à l''italienne', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'wellness', 'Miroir lumineux Hollywood', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'living', 'Salon design parisien', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'living', 'Coin repas intime', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'tech', 'Wifi 6', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'tech', 'Smart TV OLED', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), 'tech', 'Enceinte Bluetooth', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'paris'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Cape Town (cape-town)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'cape-town',
  'Cape Town',
  '1er étage',
  1,
  1,
  true,
  2,
  44,
  2,
  0,
  'La fraîcheur de l''Atlantique dans un cadre moderne.',
  'La perle du Cap s''invite chez vous.',
  'Inspiré par la magnificence des paysages du Cap en Afrique du Sud, Cape Town conjugue nature, modernité et raffinement. Son salon lumineux et sa chambre cocooning en font l''appartement idéal pour une escapade ressourçante.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  7
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), '/R+3 Int (2).pdf_67 (2).jpg', 'Photo de l''appartement Cape Town', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'Ambiance nature et modernité', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'Salon baigné de lumière', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'Décoration organique apaisante', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'Idéal pour séjour détente', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'sleeping', 'Lit King Size Confort', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'sleeping', 'Oreiller ergonomique', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'wellness', 'Douche effet pluie', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'wellness', 'Produits naturels', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'living', 'Salon lumineux', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'living', 'Espace détente', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'tech', 'Wifi 6', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'tech', 'Smart TV', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), 'tech', 'Climatisation', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'cape-town'), (SELECT id FROM amenities WHERE slug = 'coffee'));

-- -----------------------------------------------------------------------------

-- Apartment: Dakar (dakar)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'dakar',
  'Dakar',
  '2ème étage',
  2,
  1,
  false,
  1,
  30,
  2,
  0,
  'Chambre premium avec l''esprit teranga sénégalais.',
  'La capitale de l''hospitalité africaine.',
  'Dakar, ville du Teranga — l''hospitalité en langue wolof. Cette chambre premium au deuxième étage incarne cet esprit d''accueil chaleureux. Compacte mais parfaitement équipée, elle offre tout le nécessaire pour un séjour réussi.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Crown Jewels' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F1' LIMIT 1),
  8
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), '/R+3 Int (2).pdf_54.jpg', 'Photo de l''appartement Dakar', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'Chambre premium vue en hauteur', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'Environnement calme au 2ème étage', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'Parfait rapport confort/prix', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'Idéale pour voyageur professionnel', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'sleeping', 'Lit King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'sleeping', 'Blackout total', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'wellness', 'Salle d''eau design', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'wellness', 'Produits de toilette premium', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'living', 'Bureau compact', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'living', 'Minibar', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'tech', 'Wifi 6 Haut Débit', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'tech', 'Smart TV', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), 'tech', 'Climatisation silencieuse', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'dakar'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Istanbul (istanbul)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'istanbul',
  'Istanbul',
  '2ème étage',
  2,
  1,
  true,
  2,
  44,
  2,
  0,
  'Deux continents, un appartement d''exception.',
  'Le carrefour Orient-Occident.',
  'Istanbul, ville-pont entre Orient et Occident, inspire cet appartement au caractère unique. Son salon chaleureux et sa chambre raffinée évoquent les grands palais ottomans, avec tout le confort du XXIe siècle.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  9
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), '/R+3 Int (2).pdf_67 (3).jpg', 'Photo de l''appartement Istanbul', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'Décoration aux touches ottomanes', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'Salon avec ambiance feutrée', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'Vue depuis le 2ème étage', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'Atmosphère unique entre luxe et tradition', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'sleeping', 'Lit King Size Prestige', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'sleeping', 'Linge de lit brodé', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'wellness', 'Douche hammam sensorielle', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'wellness', 'Produits orientaux', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'living', 'Salon confort 3 places', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'living', 'Coin repas', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'tech', 'Wifi 6', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'tech', 'Smart TV', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), 'tech', 'Système domotique', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'istanbul'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: London (london)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'london',
  'London',
  '2ème étage',
  2,
  1,
  true,
  2,
  44,
  2,
  0,
  'British elegance — sobriété et raffinement.',
  'Le style londonien intemporel.',
  'London emprunte au style londonien sa sobriété élégante, ses matières nobles et son sens du détail. Au deuxième étage, cet appartement offre une atmosphère de club britannique où règnent le bon goût et le confort absolu.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  10
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), '/R+3 Int (2).pdf_67 (4).jpg', 'Photo de l''appartement London', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'Style british intemporel et sobre', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'Salon avec canapé haut de gamme', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'Chambre feutrée et silencieuse', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'Idéal pour longs séjours', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'sleeping', 'Lit King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'sleeping', 'Couette en duvet', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'wellness', 'Douche à l''italienne', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'wellness', 'Serviettes moelleuses', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'living', 'Salon british chic', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'living', 'Bureau de travail', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'tech', 'Wifi 6 Fibre', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'tech', 'Smart TV OLED', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), 'tech', 'Enceinte multiroom', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'london'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: New York (new-york)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'new-york',
  'New York',
  '2ème étage',
  2,
  2,
  true,
  3,
  65,
  4,
  0,
  'L''esprit Manhattan — grand format, grande vie.',
  'La ville qui ne dort jamais.',
  'New York, la ville où les rêves deviennent reality. Cet appartement 3 pièces au deuxième étage incarne l''ambition et l''énergie de Manhattan : deux chambres spacieuses, un salon de réception impressionnant, et des finitions qui respirent le succès.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Grand Suites' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F3' LIMIT 1),
  11
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), '/R+3 Int (2).pdf_67.jpg', 'Photo de l''appartement New York', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'Plus grand appartement du 2ème étage', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'Deux chambres séparées pour 4 personnes', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'Salon de réception style loft new-yorkais', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'Idéal pour familles ou délégations', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'sleeping', '2 Chambres King Size', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'sleeping', 'Literie premium orthopédique', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'wellness', 'Salle de bain complète', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'wellness', 'Douche à l''américaine', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'living', 'Salon loft ouvert', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'living', 'Cuisine américaine', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'living', 'Salle à manger', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'tech', 'Wifi 6 Fibre', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'tech', '2 Smart TV 4K', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), 'tech', 'Barre de son', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'new-york'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Shanghai (shanghai)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'shanghai',
  'Shanghai',
  '3ème étage',
  3,
  2,
  true,
  3,
  68,
  4,
  0,
  'Modernité asiatique au sommet de la résidence.',
  'La mégapole du futur à La Croisière.',
  'Shanghai symbolise l''Asie du XXIe siècle — high-tech, démesurée, éblouissante. Au 3ème étage, cet appartement 3 pièces offre le meilleur panorama de la résidence. Deux chambres lumineuses et un salon ultra-moderne pour une expérience d''exception.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Grand Suites' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F3' LIMIT 1),
  12
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), '/Rooftop Jour.pdf_9 (8).jpg', 'Photo de l''appartement Shanghai', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'Vue panoramique depuis le 3ème étage', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'Finitions ultra-modernes', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'Deux chambres avec vue', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'Grand salon design contemporain', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'sleeping', '2 Suites King Size panoramiques', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'sleeping', 'Blackout motorisé', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'wellness', 'Douche à effet pluie tropicale', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'wellness', 'Baignoire balnéo', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'living', 'Salon panoramique 6 places', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'living', 'Salle à manger ouverte', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'tech', 'Wifi 6 Fibre dédiée', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'tech', '2 Smart TV OLED', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'tech', 'iPad domotique', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), 'tech', 'Cinéma maison', 4);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), (SELECT id FROM amenities WHERE slug = 'safe'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'shanghai'), (SELECT id FROM amenities WHERE slug = 'parking'));

-- -----------------------------------------------------------------------------

-- Apartment: Bangkok (bangkok)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'bangkok',
  'Bangkok',
  '3ème étage',
  3,
  1,
  true,
  2,
  46,
  2,
  0,
  'Exotisme thaï et confort en hauteur.',
  'La capitale des mille sourires.',
  'Bangkok allie ferveur culturelle et modernité flamboyante. Cet appartement du 3ème étage capture cet équilibre unique entre l''exotisme des temples dorés et le confort d''un appartement haut de gamme contemporain.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  13
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), '/Rooftop Jour.pdf_9.jpg', 'Photo de l''appartement Bangkok', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'Vue dégagée depuis le 3ème étage', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'Ambiance exotique et chaleureuse', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'Salon confort avec vue', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'Décoration inspirée de l''Asie du Sud-Est', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'sleeping', 'Lit King Size Prestige', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'sleeping', 'Linge de lit bambou', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'wellness', 'Douche pluie tropicale', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'wellness', 'Savons artisanaux', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'living', 'Salon avec vue dégagée', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'living', 'Espace repas', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'tech', 'Wifi 6', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'tech', 'Smart TV 4K', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), 'tech', 'Système audio Bluetooth', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'bangkok'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Milan (milan)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'milan',
  'Milan',
  '3ème étage',
  3,
  1,
  true,
  2,
  46,
  2,
  0,
  'La capitale de la mode et du design.',
  'L''esthétique italienne à son sommet.',
  'Milan, capitale mondiale du design et de la mode. Cet appartement du 3ème étage respire l''esthétique italienne dans chaque détail : mobilier designer, matériaux nobles, lignes pures. Pour ceux qui considèrent le cadre de vie comme un art de vivre.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'The Modern Classics' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'F2' LIMIT 1),
  14
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), '/Rooftop Jour.pdf_9 (1).jpg', 'Photo de l''appartement Milan', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'Design et mobilier signature', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'Matériaux et finitions haut de gamme', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'Vue depuis le 3ème étage', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'Atmosphère mode et élégante', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'sleeping', 'Lit King Size Design', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'sleeping', 'Linge de lit sateen', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'wellness', 'Douche design italienne', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'wellness', 'Produits Armani Guest', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'living', 'Salon design contemporain', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'living', 'Coin repas chic', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'tech', 'Wifi 6 Fibre', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'tech', 'Smart TV OLED', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), 'tech', 'Enceinte Sonos', 3);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), (SELECT id FROM amenities WHERE slug = 'coffee'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'milan'), (SELECT id FROM amenities WHERE slug = 'safe'));

-- -----------------------------------------------------------------------------

-- Apartment: Silicon Valley (silicon-valley)
INSERT INTO apartments (
  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,
  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order
) VALUES (
  'silicon-valley',
  'Silicon Valley',
  '3ème étage',
  3,
  0,
  false,
  1,
  35,
  10,
  0,
  'Salle de réunion high-tech au sommet de la résidence.',
  'L''innovation au cœur de La Croisière.',
  'Baptisée Silicon Valley en hommage à la capitale mondiale de l''innovation, cette salle de réunion du 3ème étage est l''espace idéal pour vos réunions d''affaires, présentations et brainstormings. Technologie de pointe et vue dégagée pour des échanges qui font avancer le monde.',
  (SELECT id FROM apartment_collections WHERE name_fr = 'Executive Space' LIMIT 1),
  (SELECT id FROM apartment_types WHERE code = 'MEETING' LIMIT 1),
  15
);

INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), '/Rooftop Jour.pdf_9 (2).jpg', 'Photo de l''appartement Silicon Valley', true, 1);

INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'Équipement audiovisuel professionnel', 1);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'Vue depuis le 3ème étage', 2);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'Connexion Wifi fibre ultra-rapide', 3);
INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'Capacité jusqu''à 10 participants', 4);

INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'living', 'Grande table de conférence 10 places', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'living', 'Espace café/accueil', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'tech', 'Écran interactif 85"', 1);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'tech', 'Wifi 6 Fibre dédiée', 2);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'tech', 'Visioconférence 4K', 3);
INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), 'tech', 'Système audio conférence', 4);

INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), (SELECT id FROM amenities WHERE slug = 'wifi'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), (SELECT id FROM amenities WHERE slug = 'tv'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), (SELECT id FROM amenities WHERE slug = 'ac'));
INSERT INTO apartment_amenities (apartment_id, amenity_id)
VALUES ((SELECT id FROM apartments WHERE slug = 'silicon-valley'), (SELECT id FROM amenities WHERE slug = 'coffee'));

-- -----------------------------------------------------------------------------

-- =============================================================================
-- SEED COMPLÉMENTAIRE (CONTENUS & MÉDIAS RÉELS)
-- =============================================================================

-- 1. INSÉRER LES MÉDIAS RÉELS DANS LA MÉDIATHÈQUE (media_assets)
INSERT INTO media_assets (filename, url, category, alt_text_fr, tags, is_active) VALUES
  ('hero-1.jpg', '/media__1780420130272.jpg', 'hero', 'Vue extérieure de la Résidence La Croisière de jour', ARRAY['exterieur', 'hero', 'façade'], true),
  ('hero-2.jpg', '/media__1780420130290.jpg', 'hero', 'Intérieur salon chic et épuré', ARRAY['salon', 'interieur', 'prestige'], true),
  ('hero-3.jpg', '/media__1780420130306.jpg', 'hero', 'Chambre double literie premium', ARRAY['chambre', 'prestige'], true),
  ('hero-4.jpg', '/media__1780420130420.jpg', 'hero', 'Détail salle de bain contemporaine', ARRAY['wellness', 'salle de bain'], true),
  ('hero-5.jpg', '/media__1780420130445.jpg', 'hero', 'Vue de la terrasse au crépuscule', ARRAY['exterieur', 'rooftop'], true);

INSERT INTO media_assets (filename, url, category, alt_text_fr, tags, is_active) VALUES
  ('rooftop-1.jpg', '/Rooftop Jour.pdf_9.jpg', 'gallery', 'Vue panoramique du Rooftop La Croisière', ARRAY['rooftop', 'exterieur', 'vue'], true),
  ('rooftop-2.jpg', '/Rooftop Jour.pdf_9 (1).jpg', 'gallery', 'Espace bar et tables du Rooftop', ARRAY['rooftop', 'restaurant', 'bar'], true),
  ('rooftop-3.jpg', '/Rooftop Jour.pdf_9 (2).jpg', 'gallery', 'Espace détente et canapés extérieurs', ARRAY['rooftop', 'lounge'], true),
  ('rooftop-4.jpg', '/Rooftop Jour.pdf_9 (3).jpg', 'gallery', 'Ambiance lounge en plein air', ARRAY['rooftop', 'bar'], true),
  ('rooftop-5.jpg', '/Rooftop Jour.pdf_9 (4).jpg', 'gallery', 'Détails éclairages de nuit sur le Rooftop', ARRAY['rooftop', 'nuit'], true),
  ('rooftop-6.jpg', '/Rooftop Jour.pdf_9 (5).jpg', 'gallery', 'Transats et space bain à remous', ARRAY['rooftop', 'lounge', 'wellness'], true),
  ('rooftop-7.jpg', '/Rooftop Jour.pdf_9 (6).jpg', 'gallery', 'Vue sur la ville de Cotonou depuis la terrasse', ARRAY['rooftop', 'vue'], true),
  ('rooftop-8.jpg', '/Rooftop Jour.pdf_9 (8).jpg', 'gallery', 'Terrasse au coucher du soleil', ARRAY['rooftop', 'soleil'], true);

-- 2. INSÉRER LES TEXTES DE SECTION POUR LA PAGE D'ACCUEIL (page_sections)
INSERT INTO page_sections (page_id, slug, title_fr, subtitle_fr, body_fr, image_url, cta_label_fr, cta_url, is_visible, sort_order)
VALUES (
  (SELECT id FROM pages WHERE slug = 'home' LIMIT 1),
  'hero',
  'L''Excellence au cœur de Cotonou',
  'Résidence de prestige',
  'Découvrez nos chambres et suites d''exception pour vos courts ou longs séjours au Bénin. Confort moderne, service hôtelier d''élite et rooftop d''exception.',
  '/media__1780420130272.jpg',
  'Réserver un séjour',
  '/apartments',
  true,
  1
);

INSERT INTO page_sections (page_id, slug, title_fr, subtitle_fr, body_fr, image_url, cta_label_fr, cta_url, is_visible, sort_order)
VALUES (
  (SELECT id FROM pages WHERE slug = 'home' LIMIT 1),
  'rooftop',
  'Le Rooftop',
  'Expérience unique · Au sommet',
  'Au dernier étage de la résidence, un espace suspendu entre ciel et ville — panorama époustouflant, bar lounge et terrasse privatisable.',
  '/Rooftop Jour.pdf_9.jpg',
  'Découvrir l''expérience',
  '/experience',
  true,
  2
);

-- =============================================================================
-- FIN DU SEED
-- =============================================================================
