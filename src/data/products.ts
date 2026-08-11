import { DressProduct } from '../types';

import imgArt1 from '../assets/images/article_1_maroon_1786450472291.jpg';
import imgArt2 from '../assets/images/article_2_floral_1786450493069.jpg';
import imgArt3 from '../assets/images/article_3_lavender_1786450506443.jpg';
import imgArt4 from '../assets/images/article_4_burgundy_1786450519984.jpg';
import imgArt5 from '../assets/images/article_5_tie_skirt_1786450539149.jpg';
import imgArt6 from '../assets/images/article_6_pink_wrap_1786450552217.jpg';
import imgArt7 from '../assets/images/article_7_pink_peplum_1786450564365.jpg';
import imgArt8 from '../assets/images/article_8_grey_plaid_1786450576088.jpg';
import imgArt9 from '../assets/images/article_9_brown_suit_1786450594421.jpg';
import imgArt10 from '../assets/images/article_10_rust_heart_1786450608201.jpg';
import imgArt11 from '../assets/images/article_11_sage_lavender_1786450619358.jpg';
import imgArt12 from '../assets/images/article_12_black_leopard_1786450630970.jpg';
import imgArt13 from '../assets/images/article_13_yellow_pastel_1786450647218.jpg';
import imgArt14 from '../assets/images/article_14_black_bow_1786450658038.jpg';
import imgArt15 from '../assets/images/article_15_olive_shirt_1786450669997.jpg';
import imgArt16 from '../assets/images/article_16_burgundy_skirt_1786450682860.jpg';

export const HERO_IMAGE = imgArt1;

export const FEATURED_PRODUCTS: DressProduct[] = [
  {
    id: 'art-001',
    articleCode: 'ART-01',
    title: 'Maroon Tunic & Heart Embroidered Wide Pants',
    category: 'ready-to-wear',
    comingSoon: true,
    image: imgArt1,
    galleryImages: [imgArt1, imgArt10],
    description: 'A deep maroon burgundy V-neck straight tunic shirt paired with ivory white wide-leg trousers patterned with small maroon embroidered hearts. Modern Pakistani fusion pret.',
    fabric: 'Pure Cotton Silk & Breathable Linen',
    colors: [
      { name: 'Maroon Burgundy', hex: '#6B1124' },
      { name: 'Ivory Cream', hex: '#F5F2EB' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Heart Motif Thread Embroidery',
    sleeveOptions: ['3/4 Bell Sleeves', 'Full Straight Sleeves'],
    customisable: true,
    rating: 4.95,
    reviewsCount: 38,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-002',
    articleCode: 'ART-02',
    title: 'Vintage Tapestry Floral Corset & Rose Tiered Skirt',
    category: 'formal',
    comingSoon: true,
    image: imgArt2,
    galleryImages: [imgArt2, imgArt6],
    description: 'A romantic cottagecore vintage floral tapestry corset vest layered over a crisp collared button-up blouse, styled with a high-waisted floor-length dusty pink tiered skirt.',
    fabric: 'Handwoven Tapestry & Crêpe Silk Skirt',
    colors: [
      { name: 'Dusty Rose', hex: '#D88A92' },
      { name: 'Ivory', hex: '#FAFAFA' },
      { name: 'Floral Sage', hex: '#8DA399' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Woven Jacquard Tapestry',
    sleeveOptions: ['Cuffed White Sleeves', 'Full Sleeves'],
    customisable: true,
    rating: 4.98,
    reviewsCount: 45,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-003',
    articleCode: 'ART-03',
    title: 'Soft Lilac Lavender Tiered Midi Dress',
    category: 'ready-to-wear',
    comingSoon: true,
    image: imgArt3,
    galleryImages: [imgArt3, imgArt11],
    description: 'An ethereal pastel lilac tiered empire-waist dress featuring a keyhole slit collar and 3/4 elasticated sleeves for effortless everyday chic elegance.',
    fabric: 'Breathable Soft Cotton Georgette',
    colors: [
      { name: 'Soft Lilac', hex: '#C2B6DC' },
      { name: 'Pastel Lavender', hex: '#D8CEED' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Gathers & Pleated Stitches',
    sleeveOptions: ['3/4 Elasticated Sleeves', 'Full Straight Sleeves'],
    customisable: true,
    rating: 4.90,
    reviewsCount: 29,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-004',
    articleCode: 'ART-04',
    title: 'Deep Burgundy Jacket & Tiered White Linen Ensemble',
    category: 'festive',
    comingSoon: true,
    image: imgArt4,
    galleryImages: [imgArt4, imgArt15],
    description: 'A relaxed deep burgundy linen shirt jacket worn open over a pristine white multi-tiered long dress. Effortlessly sophisticated resort and festive pret.',
    fabric: 'Pure Slub Linen & Breathable Cotton Slub',
    colors: [
      { name: 'Deep Burgundy', hex: '#5E1924' },
      { name: 'Pearl White', hex: '#FFFFFF' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Stitched Lapels & Pocket Flaps',
    sleeveOptions: ['Folded Button Cuffs', '3/4 Sleeves'],
    customisable: true,
    rating: 4.92,
    reviewsCount: 31,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-005',
    articleCode: 'ART-05',
    title: 'Crisp White Tied Shirt & Midnight Black Tiered Maxi',
    category: 'ready-to-wear',
    comingSoon: true,
    image: imgArt5,
    galleryImages: [imgArt5, imgArt12],
    description: 'A crisp white collared button-down shirt styled with a tied front knot at the waist, paired with a fluid high-waisted black tiered maxi skirt.',
    fabric: 'Egyptian Poplin Cotton & Crêpe Rayon',
    colors: [
      { name: 'Classic White', hex: '#FFFFFF' },
      { name: 'Midnight Black', hex: '#1A1A1A' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Tailored Stitches & Front Knot Tie',
    sleeveOptions: ['Full Cuffed Sleeves', '3/4 Sleeves'],
    customisable: true,
    rating: 4.88,
    reviewsCount: 22,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-006',
    articleCode: 'ART-06',
    title: 'Dusty Rose Crossover Wrap Top & Flared White Skirt',
    category: 'festive',
    comingSoon: true,
    image: imgArt6,
    galleryImages: [imgArt6, imgArt7],
    description: 'A dusty rose crossover wrap-style blouse tailored with contrast white piping trims along the rounded overlap hem, over a flared multi-tier white maxi skirt.',
    fabric: 'Pure Cotton Viscose & Sheer Linen',
    colors: [
      { name: 'Dusty Pink', hex: '#D9989F' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Contrast Piping & Side Tie Closure',
    sleeveOptions: ['Elastic Cuffed Sleeves', 'Straight Sleeves'],
    customisable: true,
    rating: 4.96,
    reviewsCount: 50,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-007',
    articleCode: 'ART-07',
    title: 'Blush Pink Peplum Top with Knot Accents & White Maxi',
    category: 'festive',
    comingSoon: true,
    image: imgArt7,
    galleryImages: [imgArt7, imgArt16],
    description: 'A romantic blush pink peplum blouse with traditional knot button closures, keyhole chest detail, puff sleeves, paired with a multi-tiered white linen maxi skirt.',
    fabric: 'Cotton Linen & Fine Slub Blend',
    colors: [
      { name: 'Blush Pink', hex: '#E5A3AD' },
      { name: 'Off-White', hex: '#FDFBF7' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Handmade Chinese Knot Ties & Keyhole Cutouts',
    sleeveOptions: ['Half Puff Sleeves', '3/4 Sleeves'],
    customisable: true,
    rating: 4.94,
    reviewsCount: 36,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-008',
    articleCode: 'ART-08',
    title: 'Plaid Monochrome Overall Dress & White Turtleneck',
    category: 'formal',
    comingSoon: true,
    image: imgArt8,
    galleryImages: [imgArt8, imgArt9],
    description: 'A tailored grey and charcoal grid-plaid Pinafore overall jumper dress with waist tie belt and front button placket, layered over a fitted white turtleneck top.',
    fabric: 'Houndstooth Plaid Wool Blend & Ribbed Knit',
    colors: [
      { name: 'Charcoal Plaid', hex: '#404040' },
      { name: 'Cream White', hex: '#F7F7F7' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Tortoiseshell Buttons & Fabric Belt Buckle',
    sleeveOptions: ['Fitted Full Sleeves Inner', 'Sleeveless Overall'],
    customisable: true,
    rating: 4.91,
    reviewsCount: 27,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-009',
    articleCode: 'ART-09',
    title: 'Dark Chocolate Brown Wrap Suit with Eyelet Ruffle Lace',
    category: 'formal',
    comingSoon: true,
    image: imgArt9,
    galleryImages: [imgArt9, imgArt1],
    description: 'A dark chocolate brown crossover wrap jacket suit boasting delicate eyelet ruffle lace trim along the notched lapels and matching wide-leg trousers cuffs.',
    fabric: 'Rich Cotton Linen & Embroidered Eyelet Lace',
    colors: [
      { name: 'Dark Chocolate', hex: '#4A2C22' },
      { name: 'Espresso', hex: '#361E17' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Hand Cutwork Lace Ruffles',
    sleeveOptions: ['Cuffed Full Sleeves', '3/4 Sleeves'],
    customisable: true,
    rating: 4.97,
    reviewsCount: 41,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-010',
    articleCode: 'ART-10',
    title: 'Terracotta Rust Kurta & Cream Heart Motif Trousers',
    category: 'ready-to-wear',
    comingSoon: true,
    image: imgArt10,
    galleryImages: [imgArt10, imgArt1],
    description: 'A rich rust terracotta straight tunic kurta with split neckline collar, styled with off-white wide-leg palazzo pants adorned with contrast terracotta heart motifs.',
    fabric: 'Pure Raw Silk & Slub Cotton',
    colors: [
      { name: 'Terracotta Rust', hex: '#8C3B2B' },
      { name: 'Warm Cream', hex: '#F5EFE6' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Embroidered Heart Motif',
    sleeveOptions: ['Wide Loose Sleeves', 'Straight Cuffed Sleeves'],
    customisable: true,
    rating: 4.89,
    reviewsCount: 33,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-011',
    articleCode: 'ART-11',
    title: 'Sage Green Silk Kurta & Lavender Dhoti Dupatta Set',
    category: 'festive',
    comingSoon: true,
    image: imgArt11,
    galleryImages: [imgArt11, imgArt3],
    description: 'A sage olive green silk tunic kurta with scalloped lace hem and chest tassel ties, paired with soft lavender draped dhoti salwar pants and matching sheer organza dupatta.',
    fabric: 'Pure Viscose Silk & Sheer Organza Dupatta',
    colors: [
      { name: 'Sage Olive', hex: '#828E73' },
      { name: 'Soft Lavender', hex: '#C3B2D6' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Scalloped Crochet Lace & Pearl Tassels',
    sleeveOptions: ['Full Lace-Trimmed Sleeves', 'Quarter Sleeves'],
    customisable: true,
    rating: 4.99,
    reviewsCount: 62,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-012',
    articleCode: 'ART-12',
    title: 'Onyx Black V-Neck Tunic & Leopard Print Wide Pants',
    category: 'ready-to-wear',
    comingSoon: true,
    image: imgArt12,
    galleryImages: [imgArt12, imgArt14],
    description: 'An oversized minimalist onyx black slit V-neck tunic paired with dramatic high-contrast black and white brushstroke leopard print wide-leg flared trousers.',
    fabric: 'Pure Crêpe Silk & Textured Jacquard',
    colors: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Off-White Leopard', hex: '#EFEFEF' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Inverted Front Pleat & Abstract Print',
    sleeveOptions: ['Wide Loose Sleeves', 'Tight Cuffed Sleeves'],
    customisable: true,
    rating: 4.87,
    reviewsCount: 19,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-013',
    articleCode: 'ART-13',
    title: 'Canary Yellow Tassel Kurta Set with Draped Dupatta',
    category: 'festive',
    comingSoon: true,
    image: imgArt13,
    galleryImages: [imgArt13, imgArt11],
    description: 'A bright pastel canary yellow 3-piece suit featuring a tunic with keyhole tassel tie neckline, pleated sleeve cuffs, straight trousers, and flowing matching dupatta.',
    fabric: 'Fine Lawn Cotton & Lightweight Organza',
    colors: [
      { name: 'Pastel Canary Yellow', hex: '#E8D166' },
      { name: 'Warm Ochre', hex: '#C29C23' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Pleated Sleeve Stitching & Tassel Drops',
    sleeveOptions: ['Full Pleated Cuffed Sleeves', 'Quarter Sleeves'],
    customisable: true,
    rating: 4.93,
    reviewsCount: 44,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-014',
    articleCode: 'ART-14',
    title: 'Black Bow Embroidered Tunic & Tulip Motif Pants',
    category: 'ready-to-wear',
    comingSoon: true,
    image: imgArt14,
    galleryImages: [imgArt14, imgArt5],
    description: 'A classic black V-neck tunic embroidered with contrast white ribbon bow motifs along the sleeves and hemline, paired with geometric black and white tulip dhoti pants.',
    fabric: 'Pure Cotton Linen',
    colors: [
      { name: 'Charcoal Black', hex: '#1C1C1C' },
      { name: 'Ivory White', hex: '#FAF9F6' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'White Ribbon Bow Motif Embroidery',
    sleeveOptions: ['Straight Embroidered Sleeves', '3/4 Sleeves'],
    customisable: true,
    rating: 4.95,
    reviewsCount: 39,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-015',
    articleCode: 'ART-15',
    title: 'White Collared Blouse & Olive Green Tiered High-Low Maxi',
    category: 'formal',
    comingSoon: true,
    image: imgArt15,
    galleryImages: [imgArt15, imgArt8],
    description: 'A chic 2-in-1 shirt dress with a white button-down collared blouse attached to a high-waisted olive green multi-tiered high-low hem maxi skirt.',
    fabric: 'Egyptian Cotton & Crisp Olive Linen',
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Olive Green', hex: '#5A6648' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    embroideryType: 'Pleated Gathers & High-Low Hemline',
    sleeveOptions: ['Full Puff Cuffed Sleeves', 'Short Sleeves'],
    customisable: true,
    rating: 4.91,
    reviewsCount: 28,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  },
  {
    id: 'art-016',
    articleCode: 'ART-16',
    title: 'Deep Burgundy Bow Blouse & Black Tiered Maxi Skirt',
    category: 'formal',
    comingSoon: true,
    image: imgArt16,
    galleryImages: [imgArt16, imgArt7],
    description: 'A deep burgundy V-neck blouse featuring triple front ribbon bow ties and peplum waist, paired with a sweeping jet black multi-tier long maxi skirt.',
    fabric: 'Soft Cotton Silk & Chiffon Skirt',
    colors: [
      { name: 'Deep Burgundy', hex: '#63192B' },
      { name: 'Onyx Black', hex: '#121212' }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Measurement'],
    embroideryType: 'Triple Front Tie Bows & Peplum Cut',
    sleeveOptions: ['3/4 Elasticated Sleeves', 'Full Straight Sleeves'],
    customisable: true,
    rating: 4.96,
    reviewsCount: 37,
    tag: 'Coming Soon',
    deliveryDays: 'Launching Soon'
  }
];

export const COLOR_PALETTES = [
  { name: 'Maroon Burgundy', hex: '#6B1124', category: 'Warm' },
  { name: 'Dusty Rose', hex: '#D88A92', category: 'Pastel' },
  { name: 'Soft Lilac', hex: '#C2B6DC', category: 'Pastel' },
  { name: 'Sage Olive', hex: '#828E73', category: 'Jewel' },
  { name: 'Pastel Canary Yellow', hex: '#E8D166', category: 'Pastel' },
  { name: 'Ivory Cream', hex: '#FDFBF7', category: 'Neutral' },
  { name: 'Jet Black', hex: '#111111', category: 'Dark' },
  { name: 'Chocolate Brown', hex: '#4A2C22', category: 'Dark' }
];

export const FABRIC_OPTIONS = [
  { id: 'raw_silk', name: 'Pure Raw Cotton Silk', priceMultiplier: 1.0, textureDesc: 'Rich subtle sheen with firm structured drape, ideal for modern pret suits.' },
  { id: 'pure_chiffon', name: 'Pure Handloom Chiffon', priceMultiplier: 1.0, textureDesc: 'Ultra-lightweight, flowing silhouette with dreamy sheer movement.' },
  { id: 'organza', name: 'Glass Organza', priceMultiplier: 1.0, textureDesc: 'Crisp structured translucent fabric for voluminous flared skirts and dupattas.' },
  { id: 'cotton_linen', name: 'Pure Slub Cotton Linen', priceMultiplier: 1.0, textureDesc: 'Breathable, luxurious natural weave perfect for all-season pret.' }
];

export const CRAFTSMANSHIP_MILESTONES = [
  { title: 'Exclusive Preview Collection', desc: 'All 16 articles are handcrafted preview pieces preparing for official launch.' },
  { title: 'Pre-Order Notification Priority', desc: 'Register interest to receive early access and launch day VIP reservation.' },
  { title: 'Bespoke Sizing & Customization', desc: 'Custom measurements tailored by master cutters upon collection release.' },
  { title: 'Worldwide Express Shipping', desc: 'Shipped in luxury signature gift box packaging upon launch.' }
];
