export type Currency = 'PKR' | 'USD';

export type DressCategory = 'all' | 'bridal' | 'formal' | 'festive' | 'velvet' | 'ready-to-wear';

export interface DressProduct {
  id: string;
  title: string;
  articleCode?: string;
  category: Exclude<DressCategory, 'all'>;
  pricePKR?: number;
  priceUSD?: number;
  comingSoon: true;
  image: string;
  galleryImages: string[];
  description: string;
  fabric: string;
  colors: { name: string; hex: string }[];
  availableSizes: string[];
  embroideryType: string;
  sleeveOptions: string[];
  customisable: boolean;
  rating: number;
  reviewsCount: number;
  tag?: 'Bestseller' | 'New Arrival' | 'Masterpiece' | 'Limited Edition' | 'Coming Soon';
  deliveryDays: string;
}

export type SilhouetteType = 
  | 'maxi_gown' 
  | 'bridal_lehenga' 
  | 'anarkali' 
  | 'fusion_set' 
  | 'raw_silk_suit' 
  | 'draped_saree';

export type FabricType = 
  | 'raw_silk' 
  | 'pure_chiffon' 
  | 'organza' 
  | 'royal_velvet' 
  | 'brocade_jacquard' 
  | 'crepe_de_chine';

export type NecklineType = 
  | 'sweetheart' 
  | 'high_neck_mandarin' 
  | 'v_neck_embellished' 
  | 'boat_neck' 
  | 'square_cut' 
  | 'off_shoulder';

export type SleeveStyle = 
  | 'full_fitted' 
  | 'bell_organza' 
  | 'cape_sleeves' 
  | 'sleeveless' 
  | 'three_quarter';

export type EmbroideryStyle = 
  | 'heavy_zardozi' 
  | 'subtle_gotapatti' 
  | 'crystal_sequins' 
  | 'thread_motif' 
  | 'minimalist_piping';

export type DupattaOption = 
  | 'matching_heavy' 
  | 'sheer_contrast' 
  | 'scalloped_border' 
  | 'none';

export type BottomStyle = 
  | 'flared_lehenga' 
  | 'straight_trousers' 
  | 'sharara' 
  | 'tulip_pants';

export interface CustomMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  dressLength?: number;
  armLength?: number;
  unit: 'inches' | 'cm';
}

export interface CustomOutfitConfig {
  silhouette: SilhouetteType;
  fabric: FabricType;
  colorName: string;
  colorHex: string;
  neckline: NecklineType;
  sleeveStyle: SleeveStyle;
  embroideryStyle: EmbroideryStyle;
  dupattaOption: DupattaOption;
  bottomStyle: BottomStyle;
  sizeType: 'standard' | 'custom_measurements';
  standardSize: string;
  measurements: CustomMeasurements;
  specialNotes: string;
  eventDate: string;
  estimatedPricePKR: number;
  estimatedPriceUSD: number;
  designCode?: string;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  consultationType: 'virtual_video' | 'in_person_atelier';
  dressInterest: string;
  estimatedBudget: string;
  notes?: string;
  createdAt: string;
}

export interface OrderTrackerItem {
  orderId: string;
  customerName: string;
  dressTitle: string;
  totalPricePKR: number;
  totalPriceUSD: number;
  orderDate: string;
  estimatedDeliveryDate: string;
  status: 'Order Placed' | 'Fabric Sourcing' | 'Master Cutting' | 'Hand Embroidery' | 'Stitching & Trial' | 'Quality Control' | 'Ready for Dispatch' | 'Delivered';
  progressPercentage: number;
  milestones: { step: string; date: string; completed: boolean }[];
}

export interface CartItem {
  id: string;
  product?: DressProduct;
  customConfig?: CustomOutfitConfig;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  isCustom: boolean;
  unitPricePKR: number;
  unitPriceUSD: number;
}
