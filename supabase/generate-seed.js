const fs = require('fs');
const path = require('path');

// Load apartments data from compiled temp/apartments.js
const { APARTMENTS } = require('../temp/apartments.js');

// Base seed header part (from index 0 up to before apartments insert)
const seedFilePath = path.join(__dirname, 'seed.sql');
const currentSeedContent = fs.readFileSync(seedFilePath, 'utf8');

// Find the line where the apartment section starts
const marker = '-- DONNÉES DE BASE : APPARTEMENTS (migration depuis apartments.ts)';
const markerIndex = currentSeedContent.indexOf(marker);

if (markerIndex === -1) {
  console.error("Could not find the apartment marker in seed.sql");
  process.exit(1);
}

const baseSeedContent = currentSeedContent.substring(0, markerIndex);

let sql = baseSeedContent;
sql += `${marker}\n-- Les prix sont à 0 - À REMPLIR avec les vrais tarifs\n-- =============================================================================\n\n`;

// Helper to escape SQL single quotes
function escapeSql(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

// Generate apartments
APARTMENTS.forEach((apt, idx) => {
  const slug = apt.id;
  const name = apt.name;
  const floor = apt.floor;
  let floorNumber = 0;
  if (floor === '1er étage') floorNumber = 1;
  else if (floor === '2ème étage') floorNumber = 2;
  else if (floor === '3ème étage') floorNumber = 3;
  else if (floor === 'Rooftop') floorNumber = 4;

  const bedrooms = apt.bedrooms;
  const hasSalon = apt.hasSalon;
  const totalRooms = apt.totalRooms;
  const sqm = apt.sqm;
  const capacity = apt.capacity;
  const price = apt.price || 0;
  const desc = apt.desc;
  const history = apt.history;
  const story = apt.story;
  const image = apt.image;

  sql += `-- Apartment: ${name} (${slug})\n`;
  sql += `INSERT INTO apartments (\n`;
  sql += `  slug, name, floor, floor_number, bedrooms, has_salon, total_rooms, sqm, capacity_adults,\n`;
  sql += `  base_price, description_short_fr, history_fr, story_fr, collection_id, type_id, sort_order\n`;
  sql += `) VALUES (\n`;
  sql += `  '${slug}',\n`;
  sql += `  '${escapeSql(name)}',\n`;
  sql += `  '${escapeSql(floor)}',\n`;
  sql += `  ${floorNumber},\n`;
  sql += `  ${bedrooms},\n`;
  sql += `  ${hasSalon},\n`;
  sql += `  ${totalRooms},\n`;
  sql += `  ${sqm},\n`;
  sql += `  ${capacity},\n`;
  sql += `  ${price},\n`;
  sql += `  '${escapeSql(desc)}',\n`;
  sql += `  '${escapeSql(history)}',\n`;
  sql += `  '${escapeSql(story)}',\n`;
  sql += `  (SELECT id FROM apartment_collections WHERE name_fr = '${escapeSql(apt.collection)}' LIMIT 1),\n`;
  sql += `  (SELECT id FROM apartment_types WHERE code = '${escapeSql(apt.type === 'Salle de réunion' ? 'MEETING' : apt.type)}' LIMIT 1),\n`;
  sql += `  ${idx + 1}\n`;
  sql += `);\n\n`;

  // Cover image
  if (image) {
    sql += `INSERT INTO apartment_images (apartment_id, url, alt_text_fr, is_cover, sort_order)\n`;
    sql += `VALUES ((SELECT id FROM apartments WHERE slug = '${slug}'), '${escapeSql(image)}', 'Photo de l''appartement ${escapeSql(name)}', true, 1);\n\n`;
  }

  // Advantages
  if (apt.advantages && apt.advantages.length > 0) {
    apt.advantages.forEach((adv, advIdx) => {
      sql += `INSERT INTO apartment_advantages (apartment_id, text_fr, sort_order)\n`;
      sql += `VALUES ((SELECT id FROM apartments WHERE slug = '${slug}'), '${escapeSql(adv)}', ${advIdx + 1});\n`;
    });
    sql += `\n`;
  }

  // Composition
  if (apt.composition) {
    const zones = ['sleeping', 'wellness', 'living', 'tech'];
    zones.forEach((zone) => {
      const items = apt.composition[zone];
      if (items && items.length > 0) {
        items.forEach((item, itemIdx) => {
          sql += `INSERT INTO apartment_composition (apartment_id, zone, item_fr, sort_order)\n`;
          sql += `VALUES ((SELECT id FROM apartments WHERE slug = '${slug}'), '${zone}', '${escapeSql(item)}', ${itemIdx + 1});\n`;
        });
      }
    });
    sql += `\n`;
  }

  // Amenities / Features
  if (apt.features && apt.features.length > 0) {
    apt.features.forEach((feature) => {
      sql += `INSERT INTO apartment_amenities (apartment_id, amenity_id)\n`;
      sql += `VALUES ((SELECT id FROM apartments WHERE slug = '${slug}'), (SELECT id FROM amenities WHERE slug = '${escapeSql(feature)}'));\n`;
    });
    sql += `\n`;
  }

  sql += `-- -----------------------------------------------------------------------------\n\n`;
});

sql += `-- =============================================================================\n`;
sql += `-- FIN DU SEED\n`;
sql += `-- =============================================================================\n`;

fs.writeFileSync(seedFilePath, sql, 'utf8');
console.log('Successfully generated seed.sql with exact apartments from src/data/apartments.ts');
