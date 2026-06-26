// ════════════════════════════════════════════════════════════════════════════
//  Catalogue Produits 1688 — Marché Congolais
//  Prix AVANT majoration 30% (le bot applique +30% automatiquement)
// ════════════════════════════════════════════════════════════════════════════

const PRODUCTS = [

  // ── 1. TAPIS ──────────────────────────────────────────────────────────────
  {
    id: 1,
    emoji: "🏡",
    name: "Tapis de Salon Persan",
    category: "Décoration Intérieure",
    description: "Tapis de haute qualité, motifs orientaux élégants, doux et résistant",
    sizes: [
      { label: "160×230 cm", basePrice: 73.08 },
      { label: "200×290 cm", basePrice: 111.54 },
      { label: "240×330 cm", basePrice: 151.54 },
      { label: "300×400 cm", basePrice: 223.08 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i4/2206686532409/O1CN01Zq1Ixy1WQU9x1Bpph_!!2206686532409.jpg",
      "https://img.alicdn.com/imgextra/i1/2206686532409/O1CN01Mx9Djz1WQU9tQGKmD_!!2206686532409.jpg",
    ],
    localImages: [],
  },

  // ── 2. PAGNES / TISSUS ────────────────────────────────────────────────────
  {
    id: 2,
    emoji: "👗",
    name: "Pagne Africain Ankara (6 yards)",
    category: "Tissus & Mode",
    description: "Tissu wax 100% coton, couleurs vives, motifs variés, qualité supérieure",
    sizes: [
      { label: "6 yards (lot de 1 pièce)", basePrice: 7.69 },
      { label: "6 yards (lot de 5 pièces)", basePrice: 35.38 },
      { label: "6 yards (lot de 10 pièces)", basePrice: 61.54 },
      { label: "6 yards (lot de 50 pièces)", basePrice: 269.23 },
    ],
    moq: "1 pièce ou plus",
    unit: "pièce",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i3/TB1_dXJXBr0gK0jSZFnXXbRRXXa/SL1000_.jpg",
      "https://img.alicdn.com/imgextra/i2/TB1w0pHXoY1gK0jSZFMXXaWcVXa/SL1000_.jpg",
    ],
    localImages: [],
  },

  // ── 3. COUVERTURES / DRAP DE LIT ─────────────────────────────────────────
  {
    id: 3,
    emoji: "🛏️",
    name: "Couverture Polaire Douce",
    category: "Literie & Maison",
    description: "Couverture ultra-douce en flanelle, chaude et légère, motifs modernes",
    sizes: [
      { label: "150×200 cm (1 place)", basePrice: 11.54 },
      { label: "200×230 cm (2 places)", basePrice: 17.69 },
      { label: "220×240 cm (King Size)", basePrice: 23.08 },
    ],
    moq: "2 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i2/2200752813452/O1CN01rYmNKF1MhANfbNWMm_!!2200752813452.jpg",
    ],
    localImages: [],
  },

  // ── 4. CHAUSSURES HOMME ───────────────────────────────────────────────────
  {
    id: 4,
    emoji: "👞",
    name: "Chaussures de Ville Homme (Cuir PU)",
    category: "Chaussures & Mode",
    description: "Chaussures élégantes pour homme, semelle antidérapante, finition cuir PU premium",
    sizes: [
      { label: "Pointure 39", basePrice: 15.38 },
      { label: "Pointure 40", basePrice: 15.38 },
      { label: "Pointure 41", basePrice: 15.38 },
      { label: "Pointure 42", basePrice: 15.38 },
      { label: "Pointure 43", basePrice: 15.38 },
      { label: "Pointure 44", basePrice: 16.15 },
      { label: "Pointure 45", basePrice: 16.15 },
    ],
    moq: "1 paire ou plus",
    unit: "paire",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i1/2214218890171/O1CN01vPKFm51jY5DPcFXOH_!!2214218890171.jpg",
    ],
    localImages: [],
  },

  // ── 5. PERRUQUES ──────────────────────────────────────────────────────────
  {
    id: 5,
    emoji: "💆‍♀️",
    name: "Perruque Cheveux Naturels (HD Lace)",
    category: "Beauté & Coiffure",
    description: "Perruque 100% cheveux naturels, lace frontale HD invisible, densité 150%",
    sizes: [
      { label: "10 pouces / Lisse", basePrice: 53.85 },
      { label: "14 pouces / Lisse", basePrice: 69.23 },
      { label: "18 pouces / Lisse", basePrice: 92.31 },
      { label: "22 pouces / Lisse", basePrice: 115.38 },
      { label: "14 pouces / Bouclé", basePrice: 76.92 },
      { label: "18 pouces / Bouclé", basePrice: 100.00 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i3/2213461934734/O1CN01Xf2AoD1Y1Bq2lbv2f_!!2213461934734.jpg",
    ],
    localImages: [],
  },

  // ── 6. VÊTEMENTS ENFANTS ──────────────────────────────────────────────────
  {
    id: 6,
    emoji: "👶",
    name: "Ensemble Vêtements Enfant (3 pièces)",
    category: "Mode Enfants",
    description: "Set complet haut + pantalon + veste, tissu coton respirant, motifs colorés",
    sizes: [
      { label: "Taille 80 (6-12 mois)", basePrice: 9.23 },
      { label: "Taille 90 (12-18 mois)", basePrice: 9.23 },
      { label: "Taille 100 (2-3 ans)", basePrice: 9.23 },
      { label: "Taille 110 (3-4 ans)", basePrice: 9.23 },
      { label: "Taille 120 (4-5 ans)", basePrice: 10.00 },
      { label: "Taille 130 (5-6 ans)", basePrice: 10.00 },
    ],
    moq: "2 ensembles ou plus",
    unit: "ensemble",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i4/2213004751965/O1CN01JZmNtR1mCB2e24tC2_!!2213004751965.jpg",
    ],
    localImages: [],
  },

  // ── 7. MARMITES & CASSEROLES ──────────────────────────────────────────────
  {
    id: 7,
    emoji: "🍲",
    name: "Set de Casseroles Inox (5 pièces)",
    category: "Cuisine & Maison",
    description: "Ensemble complet de casseroles en acier inoxydable 304, fond épais anti-adhésif",
    sizes: [
      { label: "Set 5 pièces (12-16-18-20-22 cm)", basePrice: 30.77 },
      { label: "Set 7 pièces (12-14-16-18-20-22-24 cm)", basePrice: 46.15 },
    ],
    moq: "1 set ou plus",
    unit: "set",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i1/2200734175450/O1CN01xfPv1r1RsPYhc4f3r_!!2200734175450.jpg",
    ],
    localImages: [],
  },

  // ── 8. SACS À MAIN FEMME ──────────────────────────────────────────────────
  {
    id: 8,
    emoji: "👜",
    name: "Sac à Main Femme (Design Luxe)",
    category: "Accessoires Mode",
    description: "Sac à main tendance, cuir PU qualité supérieure, grande capacité avec compartiments",
    sizes: [
      { label: "Taille S (25×15 cm)", basePrice: 15.38 },
      { label: "Taille M (30×20 cm)", basePrice: 19.23 },
      { label: "Taille L (35×25 cm)", basePrice: 23.08 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i1/2213569493284/O1CN01WqeUaY1Kj2OC7pMDd_!!2213569493284.jpg",
    ],
    localImages: [],
  },

  // ── 9. TÉLÉPHONE ACCESSOIRES ──────────────────────────────────────────────
  {
    id: 9,
    emoji: "📱",
    name: "Écouteurs Bluetooth Sans Fil TWS",
    category: "Électronique",
    description: "Écouteurs intra-auriculaires Bluetooth 5.0, autonomie 6h, boîtier de charge 24h, waterproof",
    sizes: [
      { label: "1 paire (Blanc)", basePrice: 11.54 },
      { label: "1 paire (Noir)", basePrice: 11.54 },
      { label: "Lot de 5 paires", basePrice: 50.00 },
      { label: "Lot de 10 paires", basePrice: 92.31 },
    ],
    moq: "1 paire ou plus",
    unit: "paire",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i3/2206776369444/O1CN01PJiDwN1kDFJbSnFpI_!!2206776369444.jpg",
    ],
    localImages: [],
  },

  // ── 10. VENTILATEUR ───────────────────────────────────────────────────────
  {
    id: 10,
    emoji: "🌀",
    name: "Ventilateur de Table Rechargeable USB",
    category: "Électroménager",
    description: "Ventilateur portable rechargeable, 3 vitesses, batterie 4000mAh, silencieux, idéal pour coupures de courant",
    sizes: [
      { label: "Mini (4 pouces) — 4000mAh", basePrice: 11.54 },
      { label: "Moyen (8 pouces) — 6000mAh", basePrice: 19.23 },
      { label: "Grand (12 pouces) — 10000mAh", basePrice: 30.77 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i3/2213527491474/O1CN01hkKrSI1T9zz0YmF8k_!!2213527491474.jpg",
    ],
    localImages: [],
  },

  // ── 11. MONTRES ───────────────────────────────────────────────────────────
  {
    id: 11,
    emoji: "⌚",
    name: "Montre Homme Bracelet Cuir",
    category: "Accessoires & Mode",
    description: "Montre élégante pour homme, mouvement à quartz japonais, boîtier en acier inoxydable, résistante à l'eau 30m",
    sizes: [
      { label: "Cadran 40mm — Bracelet Cuir Noir", basePrice: 19.23 },
      { label: "Cadran 40mm — Bracelet Cuir Marron", basePrice: 19.23 },
      { label: "Cadran 44mm — Bracelet Acier", basePrice: 23.08 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i4/2200808819710/O1CN01yOkBrn1QCPuoI39VJ_!!2200808819710.jpg",
    ],
    localImages: [],
  },

  // ── 12. PANNEAUX SOLAIRES MINI ────────────────────────────────────────────
  {
    id: 12,
    emoji: "☀️",
    name: "Kit Panneau Solaire Portable (Lampes LED)",
    category: "Énergie Solaire",
    description: "Kit solaire complet avec panneau 10W + 3 ampoules LED + chargeur USB, parfait pour zones sans électricité",
    sizes: [
      { label: "Kit Basique (10W + 3 lampes + USB)", basePrice: 23.08 },
      { label: "Kit Intermédiaire (20W + 4 lampes + 2 USB)", basePrice: 38.46 },
      { label: "Kit Complet (30W + 5 lampes + TV 12V)", basePrice: 69.23 },
    ],
    moq: "1 kit ou plus",
    unit: "kit",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i2/2213527491474/O1CN01g4TyUV1T9zz1wBeFR_!!2213527491474.jpg",
    ],
    localImages: [],
  },

  // ── 13. CHAUSSURES FEMME ──────────────────────────────────────────────────
  {
    id: 13,
    emoji: "👠",
    name: "Escarpins Femme Talon Haut",
    category: "Chaussures Femme",
    description: "Escarpins élégants pour femme, talon 7cm, semelle confortable, parfaits pour cérémonie",
    sizes: [
      { label: "Pointure 36", basePrice: 13.08 },
      { label: "Pointure 37", basePrice: 13.08 },
      { label: "Pointure 38", basePrice: 13.08 },
      { label: "Pointure 39", basePrice: 13.08 },
      { label: "Pointure 40", basePrice: 13.08 },
      { label: "Pointure 41", basePrice: 13.85 },
    ],
    moq: "1 paire ou plus",
    unit: "paire",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i4/2213730518571/O1CN01fJA1MU1dS2hAhWPCM_!!2213730518571.jpg",
    ],
    localImages: [],
  },

  // ── 14. MATELAS ───────────────────────────────────────────────────────────
  {
    id: 14,
    emoji: "🛏️",
    name: "Matelas Mousse Haute Densité",
    category: "Literie",
    description: "Matelas confortable en mousse HD, tissu respirant, résistant et durable",
    sizes: [
      { label: "90×190 cm, Ép. 10cm (1 place)", basePrice: 46.15 },
      { label: "120×190 cm, Ép. 10cm (2 places)", basePrice: 61.54 },
      { label: "140×190 cm, Ép. 15cm (2 places)", basePrice: 84.62 },
      { label: "160×200 cm, Ép. 15cm (Grand)", basePrice: 100.00 },
      { label: "180×200 cm, Ép. 20cm (King)", basePrice: 130.77 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i1/2206234826584/O1CN01tEfbqB1BrUcAI2JoQ_!!2206234826584.jpg",
    ],
    localImages: [],
  },

  // ── 15. GENERATEUR / BATTERIE EXTERNE ────────────────────────────────────
  {
    id: 15,
    emoji: "🔋",
    name: "Power Bank Grande Capacité",
    category: "Électronique",
    description: "Batterie externe 50000mAh, charge rapide 22.5W, 4 sorties USB + USB-C, idéal pour délestage",
    sizes: [
      { label: "20000mAh (charge rapide 22.5W)", basePrice: 19.23 },
      { label: "30000mAh (charge rapide 22.5W)", basePrice: 26.92 },
      { label: "50000mAh (charge rapide 22.5W)", basePrice: 38.46 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i3/2213002568091/O1CN01sYqP7V1mH2EJxHLJX_!!2213002568091.jpg",
    ],
    localImages: [],
  },

  // ── 16. VALISES ───────────────────────────────────────────────────────────
  {
    id: 16,
    emoji: "🧳",
    name: "Valise Voyage Rigide (ABS)",
    category: "Voyage & Bagages",
    description: "Valise rigide ABS légère, roues 360°, serrure TSA intégrée, revêtement anti-rayures",
    sizes: [
      { label: "18 pouces (cabine)", basePrice: 34.62 },
      { label: "20 pouces (cabine/soute)", basePrice: 42.31 },
      { label: "24 pouces (soute)", basePrice: 53.85 },
      { label: "28 pouces (grande soute)", basePrice: 65.38 },
      { label: "Set 3 valises (20+24+28 po)", basePrice: 138.46 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i4/2214049490988/O1CN01wFkCKZ1TdFq0e9Wyx_!!2214049490988.jpg",
    ],
    localImages: [],
  },

  // ── 17. MACHINE À COUDRE ─────────────────────────────────────────────────
  {
    id: 17,
    emoji: "🧵",
    name: "Machine à Coudre Électrique Portable",
    category: "Couture & Artisanat",
    description: "Machine à coudre compacte, 12 points de couture, pédale incluse, idéale pour pagnes et vêtements",
    sizes: [
      { label: "Mini portable (12 points)", basePrice: 34.62 },
      { label: "Standard (20 points + table)", basePrice: 61.54 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i4/2200734175450/O1CN01xfPv1r1RsPYhc4f3r_!!2200734175450.jpg",
    ],
    localImages: [],
  },

  // ── 18. SAVON / COSMÉTIQUES ───────────────────────────────────────────────
  {
    id: 18,
    emoji: "🧴",
    name: "Savon Éclaircissant Papaye (Lot de 12)",
    category: "Beauté & Soins",
    description: "Savon naturel à la papaye, éclaircit et unifie le teint, sans mercure, fabriqué en Chine pour export Afrique",
    sizes: [
      { label: "Lot de 12 savons (200g/savon)", basePrice: 23.08 },
      { label: "Lot de 24 savons (200g/savon)", basePrice: 42.31 },
      { label: "Lot de 48 savons (200g/savon)", basePrice: 76.92 },
    ],
    moq: "12 pcs (1 carton) ou plus",
    unit: "lot",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i1/2213569493284/O1CN01WqeUaY1Kj2OC7pMDd_!!2213569493284.jpg",
    ],
    localImages: [],
  },

  // ── 19. JOUETS ────────────────────────────────────────────────────────────
  {
    id: 19,
    emoji: "🧸",
    name: "Voiture Télécommandée RC (4x4 Tout-Terrain)",
    category: "Jouets & Loisirs",
    description: "Voiture télécommandée 1:16, 4WD tout-terrain, vitesse max 25 km/h, autonomie 30 min",
    sizes: [
      { label: "Scale 1:16 — Rouge", basePrice: 23.08 },
      { label: "Scale 1:16 — Bleu", basePrice: 23.08 },
      { label: "Scale 1:12 (Grande) — Rouge", basePrice: 38.46 },
      { label: "Scale 1:12 (Grande) — Noir", basePrice: 38.46 },
    ],
    moq: "1 pcs ou plus",
    unit: "pcs",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i3/TB1_dXJXBr0gK0jSZFnXXbRRXXa/SL1000_.jpg",
    ],
    localImages: [],
  },

  // ── 20. RIDEAUX ───────────────────────────────────────────────────────────
  {
    id: 20,
    emoji: "🪟",
    name: "Rideaux Occultants Épais",
    category: "Décoration Intérieure",
    description: "Rideaux occultants 100% blackout, isolation thermique et phonique, finition velours",
    sizes: [
      { label: "100×200 cm (1 panneau)", basePrice: 11.54 },
      { label: "150×200 cm (1 panneau)", basePrice: 15.38 },
      { label: "200×200 cm (1 panneau)", basePrice: 19.23 },
      { label: "100×270 cm (1 panneau)", basePrice: 15.38 },
      { label: "150×270 cm (1 panneau)", basePrice: 19.23 },
    ],
    moq: "2 panneaux ou plus",
    unit: "panneau",
    imageUrls: [
      "https://img.alicdn.com/imgextra/i2/2200752813452/O1CN01rYmNKF1MhANfbNWMm_!!2200752813452.jpg",
    ],
    localImages: [],
  },

];

module.exports = PRODUCTS;
