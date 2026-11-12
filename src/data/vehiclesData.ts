export const VINFAST_LOGO_URL =
  '/assets/aistudio/Thi_t_k__ch_a_c__t_n-removebg-preview_5b4eb1ca.png';

export const PROVINCE_OPTIONS = [
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Bình Phước',
  'Đồng Nai',
  'Bình Dương',
  'Khác',
] as const;

export interface ExteriorColorOption {
  id: string;
  name: string;
  englishName: string;
  hexPrimary: string;
  hexSecondary?: string;
  studioImage: string;
  lifestyleImage: string;
  accentGlow: string;
  description: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  subtitle: string;
  swatchHex: string;
  cockpitImage: string;
  rearSeatImage: string;
  detailImages: { url: string; caption: string }[];
}

export interface VehicleTrimVersion {
  id: string;
  name: string;
  listedPriceVnd: number;
  pioneerDiscountVnd: number;
  netPioneerPriceVnd: number;
  depositAmountVnd: number;
  batteryCapacity: string;
  rangeNedc: string;
  wheels: string;
  screenAndAudio: string;
  airbagsAndCamera: string;
}

export interface VehicleShowcaseData {
  id: 'vf5' | 'vf6';
  name: string;
  shortName: string;
  generationTag: string;
  segment: string;
  slogan: string;
  tagline: string;
  subTagline: string;
  pioneerDiscountVnd: number;
  depositAmountVnd: number;
  pioneerPeriod: string;
  trims: VehicleTrimVersion[];
  specSheetImageUrl: string;
  pricingCardImageUrl: string;
  heroDesktopImage: string;
  promoBannerImage: string;
  secondaryHeroImage: string;
  closingBannerImage: string;
  exteriorColors: ExteriorColorOption[];
  interiorOptions: InteriorOption[];
}

export interface ModelSpecGroup {
  groupTitle: string;
  rows: {
    label: string;
    trim1: string;
    trim2: string;
    isDifferent?: boolean;
  }[];
}

export interface FourTrimSpecRow {
  id: string;
  category: 'price' | 'dimension' | 'powertrain' | 'chassis' | 'exterior' | 'interior' | 'safety' | 'smart';
  categoryLabel: string;
  label: string;
  vf5Green: string;
  vf5Premium: string;
  vf6Comfort: string;
  vf6Premium: string;
}

export interface DealerConfiguration {
  dealerName: string;
  address: string;
  pioneerStartDate: string;
  pioneerEndDate: string;
  vf5GreenPriceVnd: number;
  vf5PremiumPriceVnd: number;
  vf5PioneerDiscountVnd: number;
  vf5DepositVnd: number;
  vf6ComfortPriceVnd: number;
  vf6PremiumPriceVnd: number;
  vf6PioneerDiscountVnd: number;
  vf6DepositVnd: number;
  extraDealerGiftNote: string;
}

export type ImageOverridesMap = Record<string, string>;

export interface CustomerLead {
  id: string;
  createdAt: string;
  source: 'deposit-popup' | 'ai-chat';
  customerName: string;
  phone: string;
  province: string;
  vehicleLine: string;
  vehicleColor: string;
  questionNote?: string;
}

export const DEFAULT_DEALER_CONFIG: DealerConfiguration = {
  dealerName: 'Showroom VinFast Chính Hãng',
  address: 'Hệ thống Showroom & Đại lý Phân phối VinFast Toàn Quốc',
  pioneerStartDate: '12/11/2026',
  pioneerEndDate: '18/11/2026',
  vf5GreenPriceVnd: 460000000,
  vf5PremiumPriceVnd: 515000000,
  vf5PioneerDiscountVnd: 10000000,
  vf5DepositVnd: 10000000,
  vf6ComfortPriceVnd: 646000000,
  vf6PremiumPriceVnd: 715000000,
  vf6PioneerDiscountVnd: 15000000,
  vf6DepositVnd: 15000000,
  extraDealerGiftNote:
    'Ưu đãi đặt cọc Tiên phong trừ trực tiếp vào giá xe · Miễn 100% lệ phí trước bạ xe điện',
};

export const VEHICLES_DATA: Record<'vf5' | 'vf6', VehicleShowcaseData> = {
  vf5: {
    id: 'vf5',
    name: 'VinFast VF 5 Thế Hệ Mới',
    shortName: 'VF 5 Mới',
    generationTag: 'Thế hệ mới',
    segment: 'SUV Đô Thị Gầm Cao Cỡ A+',
    slogan: 'BẠN ĐỒNG HÀNH THÔNG MINH VÀ HIỆU QUẢ',
    tagline: 'Dáng xe vuông vức thể thao. Thêm không gian cho cả gia đình.',
    subTagline:
      'Ra mắt 2 phiên bản VF 5 Green (Pin 37,23 kWh · 320 km) và VF 5 Premium (Pin 43 kWh · 370 km) với diện mạo hình khối cứng cáp, phanh tay điện tử Auto Hold, màn hình 10 inch và an toàn vượt trội.',
    pioneerDiscountVnd: 10000000,
    depositAmountVnd: 10000000,
    pioneerPeriod: '12/11 – 18/11/2026',
    specSheetImageUrl: '/assets/aistudio/VF_5_M_i_TSKT_1111-2_e05ec505.jpg',
    pricingCardImageUrl: '/assets/aistudio/55_bb25bc95.jpg',
    heroDesktopImage: '/drive-assets/xe-dien-vinfast-vf5-np-hero-desktop.jpg',
    promoBannerImage: '/vinfast-mo-coc-banner.jpg',
    secondaryHeroImage: '/drive-assets/xe-dien-vinfast-vf5-np-banner-gioi-thieu-mo-rong-desktop.jpg',
    closingBannerImage: '/drive-assets/xe-dien-vinfast-vf5-np-banner-cuoi-desktop.jpg',
    trims: [
      {
        id: 'vf5-green',
        name: 'VF 5 Green',
        listedPriceVnd: 460000000,
        pioneerDiscountVnd: 10000000,
        netPioneerPriceVnd: 450000000,
        depositAmountVnd: 10000000,
        batteryCapacity: '37,23 kWh',
        rangeNedc: 'Dự kiến 320 km (NEDC)',
        wheels: 'Mâm thép 16 inch kèm ốp la-zăng (195/60/R16)',
        screenAndAudio: 'Màn hình 10 inch · 2 loa · Điều hòa tự động',
        airbagsAndCamera: '2 túi khí · Phanh đỗ điện tử & Auto Hold',
      },
      {
        id: 'vf5-premium',
        name: 'VF 5 Premium',
        listedPriceVnd: 515000000,
        pioneerDiscountVnd: 10000000,
        netPioneerPriceVnd: 505000000,
        depositAmountVnd: 10000000,
        batteryCapacity: '43 kWh',
        rangeNedc: 'Dự kiến 370 km (NEDC)',
        wheels: 'Mâm hợp kim 17 inch (205/55/R17)',
        screenAndAudio: 'Màn hình 10 inch · 6 loa · Sạc không dây · Ghế Da',
        airbagsAndCamera: '6 túi khí · Camera 360 · Ga tự động · Digital Key',
      },
    ],
    exteriorColors: [
      {
        id: 'vf5-champagne-black',
        name: 'Vàng Cát Nóc Đen',
        englishName: 'Champagne Sand / Jet Roof',
        hexPrimary: '#B8AC96',
        hexSecondary: '#15171E',
        studioImage: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-6-desktop-v2.webp',
        lifestyleImage: '/drive-assets/xe-dien-vinfast-vf5-np-hero-desktop.jpg',
        accentGlow: 'rgba(184, 172, 150, 0.35)',
        description: 'Sắc vàng cát thời thượng phối nóc đen thể thao, tôn lên các mảng khối vuông vức đặc trưng của VF 5 Thế hệ mới.',
      },
      {
        id: 'vf5-white-black',
        name: 'Trắng Ngọc Trai Nóc Đen',
        englishName: 'Brahminy White / Jet Roof',
        hexPrimary: '#E8ECF2',
        hexSecondary: '#15171E',
        studioImage: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-1-desktop-v2.webp',
        lifestyleImage: '/drive-assets/xe-dien-vinfast-vf5-np-dien-mao-1-desktop.jpg',
        accentGlow: 'rgba(59, 130, 246, 0.22)',
        description: 'Tương phản thanh lịch giữa thân xe trắng ngọc trai và mui xe sơn đen bóng thể thao.',
      },
      {
        id: 'vf5-red-black',
        name: 'Đỏ Đô Nóc Đen',
        englishName: 'Crimson Red / Jet Roof',
        hexPrimary: '#A31D28',
        hexSecondary: '#15171E',
        studioImage: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-4-desktop-v2.webp',
        lifestyleImage: '/drive-assets/xe-dien-vinfast-vf5-np-banner-gioi-thieu-mo-rong-desktop.jpg',
        accentGlow: 'rgba(225, 29, 72, 0.22)',
        description: 'Nổi bật trên mọi cung đường đô thị với sắc đỏ Crimson giàu năng lượng kết hợp ốp mâm khí động học.',
      },
      {
        id: 'vf5-blue-black',
        name: 'Xanh Đại Dương Nóc Đen',
        englishName: 'Deep Ocean / Jet Roof',
        hexPrimary: '#1E466E',
        hexSecondary: '#15171E',
        studioImage: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-3-desktop-v2.webp',
        lifestyleImage: '/drive-assets/xe-dien-vinfast-vf5-np-ngoai-that-nen-desktop.jpg',
        accentGlow: 'rgba(37, 99, 235, 0.25)',
        description: 'Phong thái hiện đại, chiều sâu sắc xanh đại dương kết hợp cụm đèn LED sắc sảo.',
      },
      {
        id: 'vf5-grey-black',
        name: 'Xám Titan Nóc Đen',
        englishName: 'Zenith Grey / Jet Roof',
        hexPrimary: '#737A86',
        hexSecondary: '#15171E',
        studioImage: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-5-desktop-v2.webp',
        lifestyleImage: '/drive-assets/xe-dien-vinfast-vf5-np-banner-cuoi-desktop.jpg',
        accentGlow: 'rgba(100, 116, 139, 0.25)',
        description: 'Chất thép nam tính, khỏe khoắn chuẩn phong cách SUV đô thị hình hộp hiện đại.',
      },
      {
        id: 'vf5-black-silver',
        name: 'Đen Tuyền Nóc Bạc',
        englishName: 'Jet Black / Silver Roof',
        hexPrimary: '#181A20',
        hexSecondary: '#CBD2DC',
        studioImage: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-2-desktop-v2.webp',
        lifestyleImage: '/drive-assets/xe-dien-vinfast-vf5-np-phien-ban-premium-desktop.webp',
        accentGlow: 'rgba(71, 85, 105, 0.25)',
        description: 'Sự kết hợp phá cách giữa thân xe đen bóng sang trọng và phần mui bạc nổi bật.',
      },
    ],
    interiorOptions: [
      {
        id: 'vf5-int-sport-black',
        name: 'Đen Thể Thao Phối Chỉ Vàng',
        subtitle: 'Ghế da cao cấp (Premium) · Màn hình 10 inch · Sạc không dây',
        swatchHex: '#1F232B',
        cockpitImage: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-day-desktop.jpg',
        rearSeatImage: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-3-desktop.jpg',
        detailImages: [
          {
            url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-day-desktop.jpg',
            caption: 'Khoang lái hiện đại với màn hình giải trí trung tâm 10 inch & bệ tỳ tay tích hợp sạc không dây',
          },
          {
            url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-5-desktop.jpg',
            caption: 'Vô lăng bọc da tích hợp nút bấm đa chức năng, phanh đỗ điện tử & giữ phanh tự động Auto Hold',
          },
          {
            url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-3-desktop.jpg',
            caption: 'Hàng ghế thứ 2 gập 60:40, có cửa gió điều hòa riêng, mở rộng khoảng để chân và độ ngả lưng',
          },
          {
            url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-1-desktop.jpg',
            caption: 'Ghế ngồi bọc Da (bản Premium) chỉnh cơ 6 hướng phối đường chỉ vàng tinh tế',
          },
          {
            url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-2-desktop.jpg',
            caption: 'Chi tiết hoàn thiện sắc sảo cùng hệ thống 6 túi khí bảo vệ toàn diện trên bản Premium',
          },
        ],
      },
    ],
  },
  vf6: {
    id: 'vf6',
    name: 'VinFast VF 6 Thế Hệ Mới',
    shortName: 'VF 6 Mới',
    generationTag: 'Thế hệ mới',
    segment: 'SUV Điện Gia Đình Cỡ B Cao Cấp',
    slogan: 'MẠNH MẼ. NĂNG ĐỘNG. LÝ TƯỞNG CHO GIA ĐÌNH',
    tagline: 'Mạnh mẽ, năng động. Sự lựa chọn lý tưởng của gia đình hiện đại.',
    subTagline:
      'Ra mắt 2 phiên bản VF 6 Comfort (Pin 60 kWh · 510 km NEDC) và VF 6 Premium (Pin 60 kWh · 480 km NEDC, màn hình 12,9 inch, 8 loa cao cấp, ADAS toàn diện) cùng không gian mở rộng cho cả gia đình.',
    pioneerDiscountVnd: 15000000,
    depositAmountVnd: 15000000,
    pioneerPeriod: '12/11 – 18/11/2026',
    specSheetImageUrl: '/assets/aistudio/VF_6_M_i_TSKT_1111-3_7c9b8034.jpg',
    pricingCardImageUrl: '/assets/aistudio/66_34f2f8a7.jpg',
    heroDesktopImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-hero-banner-desktop.jpg',
    promoBannerImage: '/vinfast-vf6-mo-coc-banner.jpg',
    secondaryHeroImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-highlight-banner-desktop.jpg',
    closingBannerImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-decoration-text-banner-desktop.jpg',
    trims: [
      {
        id: 'vf6-comfort',
        name: 'VF 6 Comfort',
        listedPriceVnd: 646000000,
        pioneerDiscountVnd: 15000000,
        netPioneerPriceVnd: 631000000,
        depositAmountVnd: 15000000,
        batteryCapacity: '60 kWh (130 kW / 250 Nm)',
        rangeNedc: '510 km (NEDC)',
        wheels: 'Hợp kim 17 inch (225/60/R17)',
        screenAndAudio: 'Màn hình 10 inch · 6 loa · Điều hòa tự động 1 vùng PM 2.5',
        airbagsAndCamera: '2 túi khí · Camera lùi · Cảm biến sau · Ga tự động',
      },
      {
        id: 'vf6-premium',
        name: 'VF 6 Premium',
        listedPriceVnd: 715000000,
        pioneerDiscountVnd: 15000000,
        netPioneerPriceVnd: 700000000,
        depositAmountVnd: 15000000,
        batteryCapacity: '60 kWh (130 kW / 250 Nm)',
        rangeNedc: 'Dự kiến 480 km (NEDC)',
        wheels: 'Hợp kim 19 inch (235/45/R19) · Cốp điện',
        screenAndAudio: 'Màn hình 12,9 inch & HUD sau vô lăng · 8 loa · Điều hòa 2 vùng Combi 1.0',
        airbagsAndCamera: '6 túi khí · Full ADAS · Camera 360 · Sạc không dây · Digital Key',
      },
    ],
    exteriorColors: [
      {
        id: 'vf6-white',
        name: 'Trắng Ngọc Trai',
        englishName: 'Infinity Blanc',
        hexPrimary: '#ECEFF4',
        studioImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-trang-desktop.webp',
        lifestyleImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-2-desktop.jpg',
        accentGlow: 'rgba(59, 130, 246, 0.20)',
        description: 'Tôn vinh dải đèn LED cánh chim đặc trưng, tay nắm cửa bán ẩn tinh tế và mâm 19 inch hai tông màu.',
      },
      {
        id: 'vf6-silver',
        name: 'Xám Bạc Khí Động Học',
        englishName: 'Zenith Silver',
        hexPrimary: '#7C8492',
        studioImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-bac-desktop.webp',
        lifestyleImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-1-desktop.jpg',
        accentGlow: 'rgba(100, 116, 139, 0.25)',
        description: 'Vẻ đẹp cơ khí chuẩn châu Âu dưới ánh đèn đô thị, làm nổi bật đường dập nổi dọc thân xe.',
      },
      {
        id: 'vf6-blue',
        name: 'Xanh Đại Dương',
        englishName: 'Deep Ocean Blue',
        hexPrimary: '#1D4975',
        studioImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-xanh-duong-desktop.webp',
        lifestyleImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-3-desktop.jpg',
        accentGlow: 'rgba(29, 73, 117, 0.28)',
        description: 'Phóng khoáng trên những hành trình du lịch biển cùng gia đình với sắc xanh sâu cuốn hút.',
      },
      {
        id: 'vf6-red',
        name: 'Đỏ Ruby Nhiệt Huyết',
        englishName: 'Solar Ruby',
        hexPrimary: '#9E1B24',
        studioImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-do-desktop.webp',
        lifestyleImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-4-desktop.jpg',
        accentGlow: 'rgba(225, 29, 72, 0.22)',
        description: 'Khẳng định cá tính năng động với lớp sơn đỏ đa lớp rực rỡ dưới ánh nắng tự nhiên.',
      },
      {
        id: 'vf6-black',
        name: 'Đen Huyền Bí',
        englishName: 'Jet Black',
        hexPrimary: '#15171C',
        studioImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-den-desktop.webp',
        lifestyleImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-5-desktop.jpg',
        accentGlow: 'rgba(71, 85, 105, 0.25)',
        description: 'Đẳng cấp, uy lực và sang trọng vượt thời gian với diện mạo SUV lịch lãm.',
      },
    ],
    interiorOptions: [
      {
        id: 'vf6-int-mocca',
        name: 'Nâu Moca Sang Trọng',
        subtitle: 'Vô lăng 2 chấu hiện đại · Màn hình 12,9 inch · Phối da Nâu - Đen',
        swatchHex: '#7A543E',
        cockpitImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-banner-desktop.jpg',
        rearSeatImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-4-desktop.jpg',
        detailImages: [
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-banner-desktop.jpg',
            caption: 'Khoang lái Nâu Moca tối giản với vô lăng 2 chấu vát đáy, màn hình trung tâm 12,9 inch và sạc không dây',
          },
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-1-desktop.jpg',
            caption: 'Tùy chọn nội thất Trắng Ngọc Trai thanh lịch với bảng táp-lô bọc da cao cấp',
          },
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-2-desktop.jpg',
            caption: 'Ghế thể thao vân kim cương dập logo VinFast & hàng ghế sau điều chỉnh hướng mở rộng',
          },
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-3-desktop.jpg',
            caption: 'Tùy chọn nội thất Đen Tuyền thể thao mạnh mẽ, tích hợp màn hình thông tin sau vô lăng',
          },
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-4-desktop.jpg',
            caption: 'Không gian hàng ghế trước và sau rộng rãi cho gia đình có con nhỏ hoặc người lớn tuổi',
          },
        ],
      },
      {
        id: 'vf6-int-ivory',
        name: 'Trắng Ngọc Trai Tinh Tế',
        subtitle: 'Ghế thể thao vân kim cương · Không gian mở rộng thoáng đãng',
        swatchHex: '#E2E6EC',
        cockpitImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-1-desktop.jpg',
        rearSeatImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-2-desktop.jpg',
        detailImages: [
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-1-desktop.jpg',
            caption: 'Khoang lái Trắng Ngọc Trai kết hợp màn hình trung tâm 12,9 inch & trợ lý ảo Vita/Vivi',
          },
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-2-desktop.jpg',
            caption: 'Hàng ghế thể thao vân kim cương êm ái, mở rộng khoảng để chân cho cả gia đình',
          },
        ],
      },
      {
        id: 'vf6-int-black',
        name: 'Đen Thể Thao Đẳng Cấp',
        subtitle: 'Ghế thể thao vân kim cương · Sạc không dây & Cổng USB-C 2 hàng ghế',
        swatchHex: '#1E2028',
        cockpitImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-3-desktop.jpg',
        rearSeatImage: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-4-desktop.jpg',
        detailImages: [
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-3-desktop.jpg',
            caption: 'Khoang lái Đen Tuyền sang trọng, tích hợp gương chống chói tự động và điều hòa 2 vùng Combi 1.0',
          },
          {
            url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-4-desktop.jpg',
            caption: 'Ghế thể thao vân kim cương nâng đỡ tối ưu trên các hành trình dài',
          },
        ],
      },
    ],
  },
};

export function getEffectiveVehiclesData(
  overrides: ImageOverridesMap
): Record<'vf5' | 'vf6', VehicleShowcaseData> {
  const apply = (slotKey: string, defaultUrl: string) =>
    overrides[slotKey]?.trim() || defaultUrl;

  return {
    vf5: {
      ...VEHICLES_DATA.vf5,
      heroDesktopImage: apply('vf5.heroDesktopImage', VEHICLES_DATA.vf5.heroDesktopImage),
      promoBannerImage: apply('vf5.promoBannerImage', VEHICLES_DATA.vf5.promoBannerImage),
      secondaryHeroImage: apply('vf5.secondaryHeroImage', VEHICLES_DATA.vf5.secondaryHeroImage),
      closingBannerImage: apply('vf5.closingBannerImage', VEHICLES_DATA.vf5.closingBannerImage),
      exteriorColors: VEHICLES_DATA.vf5.exteriorColors.map((c) => ({
        ...c,
        studioImage: apply(`vf5.color.${c.id}`, c.studioImage),
      })),
    },
    vf6: {
      ...VEHICLES_DATA.vf6,
      heroDesktopImage: apply('vf6.heroDesktopImage', VEHICLES_DATA.vf6.heroDesktopImage),
      promoBannerImage: apply('vf6.promoBannerImage', VEHICLES_DATA.vf6.promoBannerImage),
      secondaryHeroImage: apply('vf6.secondaryHeroImage', VEHICLES_DATA.vf6.secondaryHeroImage),
      closingBannerImage: apply('vf6.closingBannerImage', VEHICLES_DATA.vf6.closingBannerImage),
      exteriorColors: VEHICLES_DATA.vf6.exteriorColors.map((c) => ({
        ...c,
        studioImage: apply(`vf6.color.${c.id}`, c.studioImage),
      })),
    },
  };
}

// ============================================================================
// BẢNG THÔNG SỐ KỸ THUẬT CHI TIẾT 100% THEO ẢNH GỐC CỦA VINFAST VF 5 MỚI
// ============================================================================
export const VF5_DETAILED_SPECS: ModelSpecGroup[] = [
  {
    groupTitle: 'GIÁ BÁN & ƯU ĐÃI ĐẶT CỌC TIÊN PHONG (12/11 – 18/11/2026)',
    rows: [
      { label: 'Giá bán niêm yết công bố', trim1: '460.000.000 VNĐ', trim2: '515.000.000 VNĐ', isDifferent: true },
      { label: 'Ưu đãi đặt cọc Tiên phong', trim1: 'Giảm 10.000.000 VNĐ', trim2: 'Giảm 10.000.000 VNĐ' },
      { label: 'Giá sau ưu đãi cọc Tiên phong', trim1: '450.000.000 VNĐ', trim2: '505.000.000 VNĐ', isDifferent: true },
      { label: 'Mức đặt cọc Tiên phong', trim1: '10.000.000 VNĐ / xe', trim2: '10.000.000 VNĐ / xe' },
    ],
  },
  {
    groupTitle: 'KÍCH THƯỚC & TẢI TRỌNG',
    rows: [
      { label: 'Dài x Rộng x Cao (mm)', trim1: '3.987 x 1.772 x 1.587 (mm)', trim2: '3.987 x 1.772 x 1.595 (mm)', isDifferent: true },
      { label: 'Chiều dài cơ sở (mm)', trim1: '2.513 (mm)', trim2: '2.513 (mm)' },
      { label: 'Khoảng sáng gầm xe không tải (mm)', trim1: '170 (mm)', trim2: '178 (mm)', isDifferent: true },
    ],
  },
  {
    groupTitle: 'HỆ TRUYỀN ĐỘNG - ĐỘNG CƠ, PIN & SẠC',
    rows: [
      { label: 'Công suất tối đa (kW)', trim1: '72 (kW)', trim2: '72 (kW)' },
      { label: 'Mô men xoắn cực đại (Nm)', trim1: '180 (Nm)', trim2: '180 (Nm)' },
      { label: 'Dung lượng pin (kWh)', trim1: '37,23 (kWh)', trim2: '43 (kWh)', isDifferent: true },
      { label: 'Quãng đường chạy một lần sạc đầy (km) - NEDC', trim1: 'Dự kiến 320 (km)', trim2: 'Dự kiến 370 (km)', isDifferent: true },
      { label: 'Dây sạc di động (kW)', trim1: 'Phụ kiện chính hãng: 3,5 kW', trim2: 'Phụ kiện chính hãng: 3,5 kW' },
      { label: 'Bộ sạc tại nhà (kW)', trim1: 'Phụ kiện chính hãng: 7,4 kW', trim2: 'Phụ kiện chính hãng: 7,4 kW' },
      { label: 'Công suất sạc chậm AC tối đa (kW)', trim1: '6,6 kW', trim2: '6,6 kW' },
      { label: 'Công suất sạc nhanh DC tối đa (kW)', trim1: '60 kW', trim2: '60 kW' },
      { label: 'Thời gian nạp pin nhanh nhất (phút) từ 10% đến 70%', trim1: 'Dưới 25 phút', trim2: 'Dưới 28 phút', isDifferent: true },
      { label: 'Hệ thống phanh tái sinh', trim1: '4 chế độ (Tắt / Thấp / Trung Bình / Cao)', trim2: '4 chế độ (Tắt / Thấp / Trung Bình / Cao)' },
      { label: 'Chọn chế độ lái', trim1: 'Tiết kiệm / Thể thao', trim2: 'Tiết kiệm / Thể thao' },
      { label: 'Hệ dẫn động', trim1: 'FWD / Cầu trước', trim2: 'FWD / Cầu trước' },
    ],
  },
  {
    groupTitle: 'KHUNG GẦM',
    rows: [
      { label: 'Hệ thống treo trước / sau', trim1: 'MacPherson / Dầm xoắn', trim2: 'MacPherson / Dầm xoắn' },
      { label: 'Hệ thống phanh trước / sau', trim1: 'Đĩa thông gió / Đĩa', trim2: 'Đĩa thông gió / Đĩa' },
      { label: 'Phanh đỗ', trim1: 'Điện tử tích hợp giữ phanh tự động', trim2: 'Điện tử tích hợp giữ phanh tự động' },
      { label: 'Mâm xe', trim1: 'Mâm thép 16 inch kèm ốp la-zăng', trim2: 'Mâm hợp kim 17 inch', isDifferent: true },
      { label: 'Kích thước lốp', trim1: '195/60/R16', trim2: '205/55/R17', isDifferent: true },
    ],
  },
  {
    groupTitle: 'NGOẠI THẤT',
    rows: [
      { label: 'Đèn pha', trim1: 'LED', trim2: 'LED' },
      { label: 'Đèn chờ dẫn đường', trim1: 'Có', trim2: 'Có' },
      { label: 'Đèn chiếu sáng ban ngày', trim1: 'Có', trim2: 'Có' },
      { label: 'Đèn hậu', trim1: 'LED', trim2: 'LED' },
      { label: 'Gương chiếu hậu', trim1: 'Chỉnh điện', trim2: 'Chỉnh điện, gập điện, tích hợp đèn báo rẽ', isDifferent: true },
    ],
  },
  {
    groupTitle: 'NỘI THẤT VÀ TIỆN NGHI',
    rows: [
      { label: 'Chất liệu bọc ghế', trim1: 'Nỉ', trim2: 'Da', isDifferent: true },
      { label: 'Ghế lái', trim1: 'Chỉnh cơ 4 hướng', trim2: 'Chỉnh cơ 6 hướng', isDifferent: true },
      { label: 'Ghế phụ', trim1: 'Chỉnh cơ 4 hướng', trim2: 'Chỉnh cơ 4 hướng' },
      { label: 'Hàng ghế thứ 2', trim1: 'Có thể gập theo tỉ lệ 60:40', trim2: 'Có thể gập theo tỉ lệ 60:40' },
      { label: 'Móc cố định ghế trẻ em ISOFIX', trim1: 'Có', trim2: 'Có' },
      { label: 'Bọc vô lăng', trim1: 'Không', trim2: 'Bọc da · Tích hợp nút bấm đa chức năng', isDifferent: true },
      { label: 'Hệ thống điều hòa', trim1: 'Tự động', trim2: 'Tự động' },
      { label: 'Cửa gió điều hòa hàng ghế thứ 2', trim1: 'Có', trim2: 'Có' },
      { label: 'Màn hình giải trí trung tâm', trim1: '10 inch', trim2: '10 inch' },
      { label: 'Hệ thống âm thanh', trim1: '2 loa', trim2: '6 loa', isDifferent: true },
      { label: 'Cổng USB', trim1: '1 x Type-A & 1 x Type-C', trim2: '1 x Type-A & 1 x Type-C' },
      { label: 'Sạc không dây', trim1: 'Không', trim2: 'Có', isDifferent: true },
    ],
  },
  {
    groupTitle: 'AN TOÀN & AN NINH',
    rows: [
      { label: 'Hệ Thống Túi Khí', trim1: '2', trim2: '6', isDifferent: true },
      { label: 'Chìa khóa thẻ NFC', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Khóa cửa xe tự động khi xe di chuyển', trim1: 'Có', trim2: 'Có' },
      { label: 'Cảnh báo chống trộm & Khóa động cơ khi có trộm', trim1: 'Có', trim2: 'Có' },
      { label: 'Giám sát áp suất lốp', trim1: 'Không', trim2: 'dTPMS', isDifferent: true },
      { label: 'Hệ thống phanh ABS, EBD, BA, ESC, TCS, HSA, ESS', trim1: 'Có', trim2: 'Có' },
      { label: 'Ga tự động (Cruise Control)', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Camera lùi', trim1: 'Phụ kiện chính hãng', trim2: 'Có', isDifferent: true },
      { label: 'Camera 360', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Cảm biến đỗ xe phía sau', trim1: 'Không', trim2: 'Có', isDifferent: true },
    ],
  },
  {
    groupTitle: 'TÍNH NĂNG THÔNG MINH',
    rows: [
      { label: 'Chế độ cắm trại & Trình duyệt web', trim1: 'Có', trim2: 'Có' },
      { label: 'Android Auto / Apple Carplay', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Trợ lý ảo', trim1: 'Không', trim2: 'Có*', isDifferent: true },
      { label: 'Cập nhật phần mềm từ xa (FOTA)', trim1: 'Có', trim2: 'Có' },
      { label: 'Ứng dụng trên điện thoại & đồng hồ thông minh', trim1: 'Có*', trim2: 'Có*' },
      { label: 'Chìa khóa số (Digital Key)', trim1: 'Không', trim2: 'Có*', isDifferent: true },
    ],
  },
];

// ============================================================================
// BẢNG THÔNG SỐ KỸ THUẬT CHI TIẾT 100% THEO ẢNH GỐC CỦA VINFAST VF 6 MỚI
// ============================================================================
export const VF6_DETAILED_SPECS: ModelSpecGroup[] = [
  {
    groupTitle: 'GIÁ BÁN & ƯU ĐÃI ĐẶT CỌC TIÊN PHONG (12/11 – 18/11/2026)',
    rows: [
      { label: 'Giá bán niêm yết công bố', trim1: '646.000.000 VNĐ', trim2: '715.000.000 VNĐ', isDifferent: true },
      { label: 'Ưu đãi đặt cọc Tiên phong', trim1: 'Giảm 15.000.000 VNĐ', trim2: 'Giảm 15.000.000 VNĐ' },
      { label: 'Giá sau ưu đãi cọc Tiên phong', trim1: '631.000.000 VNĐ', trim2: '700.000.000 VNĐ', isDifferent: true },
      { label: 'Mức đặt cọc Tiên phong', trim1: '15.000.000 VNĐ / xe', trim2: '15.000.000 VNĐ / xe' },
    ],
  },
  {
    groupTitle: 'KÍCH THƯỚC & TẢI TRỌNG',
    rows: [
      { label: 'Dài x Rộng x Cao (mm)', trim1: '4.246 x 1.827 x 1.616 (mm)', trim2: '4.246 x 1.827 x 1.616 (mm)' },
      { label: 'Chiều dài cơ sở (mm)', trim1: '2.730 (mm)', trim2: '2.730 (mm)' },
      { label: 'Khoảng sáng gầm xe không tải (mm)', trim1: '190 (mm)', trim2: '190 (mm)' },
    ],
  },
  {
    groupTitle: 'HỆ TRUYỀN ĐỘNG - ĐỘNG CƠ, PIN & SẠC',
    rows: [
      { label: 'Công suất tối đa (kW)', trim1: '130 (kW)', trim2: '130 (kW)' },
      { label: 'Mô men xoắn cực đại (Nm)', trim1: '250 (Nm)', trim2: '250 (Nm)' },
      { label: 'Dung lượng pin (kWh)', trim1: '60 (kWh)', trim2: '60 (kWh)' },
      { label: 'Quãng đường chạy một lần sạc đầy (km) - NEDC', trim1: '510 km', trim2: 'Dự kiến 480 km', isDifferent: true },
      { label: 'Dây sạc di động (kW)', trim1: 'Phụ kiện chính hãng: 3.5 kW', trim2: 'Phụ kiện chính hãng: 3.5 kW' },
      { label: 'Bộ sạc tại nhà (kW)', trim1: 'Phụ kiện chính hãng: 7.4 kW', trim2: 'Phụ kiện chính hãng: 7.4 kW' },
      { label: 'Công suất sạc chậm AC tối đa (kW)', trim1: '7.2 kW', trim2: '7.2 kW' },
      { label: 'Công suất sạc nhanh DC tối đa (kW)', trim1: '100 kW', trim2: '100 kW' },
      { label: 'Thời gian nạp pin nhanh nhất (phút) từ 10% đến 70%', trim1: 'Dưới 35 phút', trim2: 'Dưới 35 phút' },
      { label: 'Hệ thống phanh tái sinh', trim1: '4 chế độ (Tắt / Thấp / Trung Bình / Cao)', trim2: '4 chế độ (Tắt / Thấp / Trung Bình / Cao)' },
      { label: 'Chọn chế độ lái', trim1: 'Tiết kiệm / Thường / Thể thao', trim2: 'Tiết kiệm / Thường / Thể thao' },
      { label: 'Hệ dẫn động', trim1: 'Cầu trước (FWD)', trim2: 'Cầu trước (FWD)' },
    ],
  },
  {
    groupTitle: 'KHUNG GẦM, VÀNH LỐP & HỖ TRỢ LÁI ADAS',
    rows: [
      { label: 'Hệ thống treo trước / sau', trim1: 'MacPherson / Trục xoắn', trim2: 'MacPherson / Trục xoắn' },
      { label: 'Hệ thống phanh trước / sau', trim1: 'Đĩa thông gió / Đĩa đặc', trim2: 'Đĩa thông gió / Đĩa đặc' },
      { label: 'Phanh đỗ', trim1: 'Điện tử tích hợp giữ phanh tự động', trim2: 'Điện tử tích hợp giữ phanh tự động' },
      { label: 'Hệ thống ABS, EBD, BA, ESC, TCS, HSA, Chống lật (ROM), HDC, ESS', trim1: 'Có', trim2: 'Có' },
      { label: 'Kích thước mâm xe', trim1: 'Hợp kim 17 inch', trim2: 'Hợp kim 19 inch', isDifferent: true },
      { label: 'Kích thước lốp', trim1: '225/60/R17', trim2: '235/45/R19', isDifferent: true },
      { label: 'Trợ lái trên cao tốc / di chuyển khi tắc đường', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Tự động dừng trong trường hợp khẩn cấp', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Ga tự động', trim1: 'Có', trim2: 'Thích ứng (ACC)', isDifferent: true },
      { label: 'Nhận biết biển báo giao thông & Điều chỉnh tốc độ thông minh', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Cảnh báo chệch làn / Hỗ trợ giữ làn / Giữ làn khẩn cấp', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Phanh tự động khẩn cấp trước (AEB)', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Cảnh báo va chạm trước / Cắt ngang phía sau / Điểm mù / Mở cửa', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Hệ thống Camera', trim1: 'Camera lùi', trim2: 'Camera 360', isDifferent: true },
      { label: 'Cảm biến đỗ xe phía trước', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Cảm biến đỗ xe phía sau', trim1: 'Có', trim2: 'Có' },
      { label: 'Đèn pha tự động', trim1: 'Không', trim2: 'Có', isDifferent: true },
    ],
  },
  {
    groupTitle: 'NGOẠI THẤT',
    rows: [
      { label: 'Đèn pha', trim1: 'LED', trim2: 'LED tự động', isDifferent: true },
      { label: 'Đèn chờ dẫn đường / Chiếu sáng ban ngày LED / Chào mừng / Đèn hậu LED', trim1: 'Có', trim2: 'Có' },
      { label: 'Đèn phanh trên cao phía sau', trim1: 'Không', trim2: 'LED', isDifferent: true },
      { label: 'Đèn nhận diện thương hiệu phía trước & sau', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Gương chiếu hậu', trim1: 'Chỉnh điện, Tích hợp báo rẽ', trim2: 'Chỉnh điện, gập điện, Tích hợp báo rẽ', isDifferent: true },
      { label: 'Cửa sổ', trim1: 'Chỉnh điện, lên/xuống một chạm cả 4 cửa', trim2: 'Chỉnh điện, lên/xuống một chạm cả 4 cửa' },
      { label: 'Điều chỉnh cốp sau', trim1: 'Chỉnh cơ', trim2: 'Chỉnh điện', isDifferent: true },
    ],
  },
  {
    groupTitle: 'NỘI THẤT & TIỆN NGHI',
    rows: [
      { label: 'Chất liệu bọc ghế', trim1: 'Bọc Da và Nỉ', trim2: 'Bọc Da', isDifferent: true },
      { label: 'Ghế lái', trim1: 'Chỉnh cơ 6 hướng', trim2: 'Chỉnh điện 6 hướng', isDifferent: true },
      { label: 'Ghế phụ', trim1: 'Chỉnh cơ 4 hướng', trim2: 'Chỉnh cơ 4 hướng' },
      { label: 'Hàng ghế thứ 2 điều chỉnh hướng & ISOFIX', trim1: 'Có', trim2: 'Có' },
      { label: 'Vô lăng', trim1: 'Chỉnh cơ 4 hướng, Tích hợp nút bấm đa chức năng', trim2: 'Bọc da, Chỉnh cơ 4 hướng, Tích hợp nút bấm đa chức năng', isDifferent: true },
      { label: 'Hệ thống điều hòa', trim1: 'Tự động, 1 vùng', trim2: 'Tự động, 2 vùng, Kiểm soát chất lượng & Ion hóa không khí', isDifferent: true },
      { label: 'Lọc không khí Cabin', trim1: 'PM 2.5', trim2: 'Combi 1.0', isDifferent: true },
      { label: 'Màn hình giải trí trung tâm', trim1: '10 inch', trim2: '12,9 inch', isDifferent: true },
      { label: 'Màn hình thông tin sau vô lăng', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Hệ thống âm thanh', trim1: '6 loa', trim2: '8 loa cao cấp', isDifferent: true },
      { label: 'Gương chiếu hậu trong xe', trim1: 'Ngày và đêm', trim2: 'Chống chói tự động', isDifferent: true },
      { label: 'Cổng USB', trim1: 'Hàng trước: 1 x Type-A & 1 x Type-C', trim2: 'Hàng trước: 1 x Type-A & 1 x Type-C / Hàng ghế 2: 2 x Type-C', isDifferent: true },
      { label: 'Sạc không dây', trim1: 'Không', trim2: 'Có', isDifferent: true },
    ],
  },
  {
    groupTitle: 'AN TOÀN, AN NINH & TÍNH NĂNG THÔNG MINH',
    rows: [
      { label: 'Hệ Thống Túi Khí', trim1: '2', trim2: '6', isDifferent: true },
      { label: 'Chìa khóa thẻ NFC', trim1: 'Không', trim2: 'Có', isDifferent: true },
      { label: 'Giám sát áp suất lốp', trim1: 'iTPMS', trim2: 'dTPMS', isDifferent: true },
      { label: 'Chế độ xe đặc biệt', trim1: 'Cơ bản (Cắm trại)', trim2: 'Nâng cao*', isDifferent: true },
      { label: 'Trình duyệt web & Android Auto / Apple Carplay', trim1: 'Có', trim2: 'Có' },
      { label: 'Trợ lý ảo', trim1: 'Vivi*', trim2: 'Vita*', isDifferent: true },
      { label: 'Bản đồ & Chợ ứng dụng (VF App Market)', trim1: 'Không', trim2: 'Có*', isDifferent: true },
      { label: 'Giải trí đa phương tiện', trim1: 'Cơ bản (Radio, USB)', trim2: 'Nâng cao*', isDifferent: true },
      { label: 'Cập nhật phần mềm từ xa (FOTA) & Ứng dụng điện thoại/đồng hồ', trim1: 'Có*', trim2: 'Có*' },
      { label: 'Chìa khóa số (Digital Key)', trim1: 'Không', trim2: 'Có*', isDifferent: true },
    ],
  },
];

// ============================================================================
// BẢNG SO SÁNH TỔNG HỢP CẢ 4 PHIÊN BẢN (VF 5 GREEN · VF 5 PREMIUM · VF 6 COMFORT · VF 6 PREMIUM)
// ============================================================================
export const FOUR_TRIM_COMPARISON_ROWS: FourTrimSpecRow[] = [
  {
    id: 'p-listed',
    category: 'price',
    categoryLabel: 'Giá bán & Đặt cọc Tiên phong',
    label: 'Giá niêm yết công bố',
    vf5Green: '460 Triệu đồng',
    vf5Premium: '515 Triệu đồng',
    vf6Comfort: '646 Triệu đồng',
    vf6Premium: '715 Triệu đồng',
  },
  {
    id: 'p-discount',
    category: 'price',
    categoryLabel: 'Giá bán & Đặt cọc Tiên phong',
    label: 'Ưu đãi đặt cọc Tiên phong (12/11 – 18/11/2026)',
    vf5Green: 'Giảm 10 Triệu đồng',
    vf5Premium: 'Giảm 10 Triệu đồng',
    vf6Comfort: 'Giảm 15 Triệu đồng',
    vf6Premium: 'Giảm 15 Triệu đồng',
  },
  {
    id: 'p-net',
    category: 'price',
    categoryLabel: 'Giá bán & Đặt cọc Tiên phong',
    label: 'Giá sau ưu đãi cọc Tiên phong',
    vf5Green: '450 Triệu đồng',
    vf5Premium: '505 Triệu đồng',
    vf6Comfort: '631 Triệu đồng',
    vf6Premium: '700 Triệu đồng',
  },
  {
    id: 'p-deposit',
    category: 'price',
    categoryLabel: 'Giá bán & Đặt cọc Tiên phong',
    label: 'Mức đặt cọc',
    vf5Green: '10 triệu đồng/xe',
    vf5Premium: '10 triệu đồng/xe',
    vf6Comfort: '15 triệu đồng/xe',
    vf6Premium: '15 triệu đồng/xe',
  },
  {
    id: 'd-size',
    category: 'dimension',
    categoryLabel: 'Kích thước & Tải trọng',
    label: 'Dài x Rộng x Cao (mm)',
    vf5Green: '3.987 x 1.772 x 1.587',
    vf5Premium: '3.987 x 1.772 x 1.595',
    vf6Comfort: '4.246 x 1.827 x 1.616',
    vf6Premium: '4.246 x 1.827 x 1.616',
  },
  {
    id: 'd-wheelbase',
    category: 'dimension',
    categoryLabel: 'Kích thước & Tải trọng',
    label: 'Chiều dài cơ sở / Khoảng sáng gầm (mm)',
    vf5Green: '2.513 / 170 mm',
    vf5Premium: '2.513 / 178 mm',
    vf6Comfort: '2.730 / 190 mm',
    vf6Premium: '2.730 / 190 mm',
  },
  {
    id: 'pw-motor',
    category: 'powertrain',
    categoryLabel: 'Động cơ, Pin & Sạc',
    label: 'Công suất tối đa / Mô men xoắn cực đại',
    vf5Green: '72 kW / 180 Nm',
    vf5Premium: '72 kW / 180 Nm',
    vf6Comfort: '130 kW / 250 Nm',
    vf6Premium: '130 kW / 250 Nm',
  },
  {
    id: 'pw-battery',
    category: 'powertrain',
    categoryLabel: 'Động cơ, Pin & Sạc',
    label: 'Dung lượng pin (kWh)',
    vf5Green: '37,23 kWh',
    vf5Premium: '43 kWh',
    vf6Comfort: '60 kWh',
    vf6Premium: '60 kWh',
  },
  {
    id: 'pw-range',
    category: 'powertrain',
    categoryLabel: 'Động cơ, Pin & Sạc',
    label: 'Quãng đường 1 lần sạc đầy (NEDC)',
    vf5Green: 'Dự kiến 320 km',
    vf5Premium: 'Dự kiến 370 km',
    vf6Comfort: '510 km',
    vf6Premium: 'Dự kiến 480 km',
  },
  {
    id: 'pw-charge',
    category: 'powertrain',
    categoryLabel: 'Động cơ, Pin & Sạc',
    label: 'Sạc nhanh DC tối đa / Thời gian nạp 10%–70%',
    vf5Green: '60 kW / Dưới 25 phút',
    vf5Premium: '60 kW / Dưới 28 phút',
    vf6Comfort: '100 kW / Dưới 35 phút',
    vf6Premium: '100 kW / Dưới 35 phút',
  },
  {
    id: 'ch-wheels',
    category: 'chassis',
    categoryLabel: 'Khung gầm & Mâm lốp',
    label: 'Kích thước mâm xe & Lốp',
    vf5Green: 'Mâm thép 16" (195/60/R16)',
    vf5Premium: 'Hợp kim 17" (205/55/R17)',
    vf6Comfort: 'Hợp kim 17" (225/60/R17)',
    vf6Premium: 'Hợp kim 19" (235/45/R19)',
  },
  {
    id: 'ch-brake',
    category: 'chassis',
    categoryLabel: 'Khung gầm & Mâm lốp',
    label: 'Phanh trước/sau & Phanh đỗ',
    vf5Green: 'Đĩa thông gió/Đĩa · Điện tử & Auto Hold',
    vf5Premium: 'Đĩa thông gió/Đĩa · Điện tử & Auto Hold',
    vf6Comfort: 'Đĩa thông gió/Đĩa đặc · Điện tử & Auto Hold',
    vf6Premium: 'Đĩa thông gió/Đĩa đặc · Điện tử & Auto Hold',
  },
  {
    id: 'ex-lights',
    category: 'exterior',
    categoryLabel: 'Ngoại thất',
    label: 'Đèn pha, Đèn nhận diện & Cốp sau',
    vf5Green: 'Đèn pha LED · Cốp cơ',
    vf5Premium: 'Đèn pha LED · Gương gập điện · Cốp cơ',
    vf6Comfort: 'Đèn pha LED · Cốp chỉnh cơ',
    vf6Premium: 'LED tự động · Đèn nhận diện trước/sau · Cốp điện',
  },
  {
    id: 'in-seats',
    category: 'interior',
    categoryLabel: 'Nội thất & Tiện nghi',
    label: 'Chất liệu ghế & Chỉnh ghế lái',
    vf5Green: 'Ghế Nỉ · Chỉnh cơ 4 hướng',
    vf5Premium: 'Ghế Da · Chỉnh cơ 6 hướng',
    vf6Comfort: 'Bọc Da và Nỉ · Chỉnh cơ 6 hướng',
    vf6Premium: 'Bọc Da · Chỉnh điện 6 hướng',
  },
  {
    id: 'in-screen',
    category: 'interior',
    categoryLabel: 'Nội thất & Tiện nghi',
    label: 'Màn hình trung tâm & Âm thanh',
    vf5Green: '10 inch · 2 loa',
    vf5Premium: '10 inch · 6 loa · Sạc không dây',
    vf6Comfort: '10 inch · 6 loa',
    vf6Premium: '12,9 inch · Màn hình sau vô lăng · 8 loa cao cấp · Sạc không dây',
  },
  {
    id: 'in-ac',
    category: 'interior',
    categoryLabel: 'Nội thất & Tiện nghi',
    label: 'Điều hòa & Lọc không khí Cabin',
    vf5Green: 'Tự động · Cửa gió hàng ghế 2',
    vf5Premium: 'Tự động · Cửa gió hàng ghế 2',
    vf6Comfort: 'Tự động 1 vùng · Lọc PM 2.5',
    vf6Premium: 'Tự động 2 vùng · Ion hóa & Lọc Combi 1.0',
  },
  {
    id: 'sf-airbags',
    category: 'safety',
    categoryLabel: 'An toàn, ADAS & Thông minh',
    label: 'Hệ thống túi khí & Áp suất lốp',
    vf5Green: '2 túi khí',
    vf5Premium: '6 túi khí · dTPMS',
    vf6Comfort: '2 túi khí · iTPMS',
    vf6Premium: '6 túi khí · dTPMS',
  },
  {
    id: 'sf-camera',
    category: 'safety',
    categoryLabel: 'An toàn, ADAS & Thông minh',
    label: 'Camera, Cảm biến & Hỗ trợ lái',
    vf5Green: 'ABS, EBD, BA, ESC, TCS, HSA',
    vf5Premium: 'Camera 360 · Cảm biến sau · Ga tự động',
    vf6Comfort: 'Camera lùi · Cảm biến sau · Ga tự động',
    vf6Premium: 'Camera 360 · Cảm biến trước/sau · Gói ADAS toàn diện (Trợ lái cao tốc, AEB, Giữ làn, ACC...)',
  },
  {
    id: 'sm-key',
    category: 'smart',
    categoryLabel: 'An toàn, ADAS & Thông minh',
    label: 'Chìa khóa thông minh, CarPlay & Trợ lý ảo',
    vf5Green: 'FOTA · Ứng dụng điện thoại*',
    vf5Premium: 'Thẻ NFC · Digital Key* · CarPlay/Android Auto · Trợ lý ảo*',
    vf6Comfort: 'CarPlay/Android Auto · Trợ lý ảo Vivi* · FOTA',
    vf6Premium: 'Thẻ NFC · Digital Key* · CarPlay/Android Auto · Trợ lý ảo Vita* · VF App Market*',
  },
];

// ============================================================================
// KHO ẢNH GỐC (DÙNG CHO QUẢN TRỊ THAY ĐỔI HÌNH ẢNH LINH HOẠT)
// ============================================================================
export const AVAILABLE_ASSET_LIBRARY: { label: string; url: string }[] = [
  { label: 'Banner Mở Cọc Chính (VF 5 & VF 6)', url: '/vinfast-mo-coc-banner.jpg' },
  { label: 'Banner Mở Cọc Phụ (VF 6 Mới)', url: '/vinfast-vf6-mo-coc-banner.jpg' },
  { label: 'VF 5 Mới - Hero Banner', url: '/drive-assets/xe-dien-vinfast-vf5-np-hero-desktop.jpg' },
  { label: 'VF 5 Mới - Diện mạo ngoại thất', url: '/drive-assets/xe-dien-vinfast-vf5-np-dien-mao-1-desktop.jpg' },
  { label: 'VF 5 Mới - Banner giới thiệu mở rộng', url: '/drive-assets/xe-dien-vinfast-vf5-np-banner-gioi-thieu-mo-rong-desktop.jpg' },
  { label: 'VF 5 Mới - Banner cuối', url: '/drive-assets/xe-dien-vinfast-vf5-np-banner-cuoi-desktop.jpg' },
  { label: 'VF 5 Mới - Phiên bản Premium', url: '/drive-assets/xe-dien-vinfast-vf5-np-phien-ban-premium-desktop.webp' },
  { label: 'VF 5 Mới - Màu Trắng Nóc Đen', url: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-1-desktop-v2.webp' },
  { label: 'VF 5 Mới - Màu Đen Nóc Bạc', url: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-2-desktop-v2.webp' },
  { label: 'VF 5 Mới - Màu Xanh Nóc Đen', url: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-3-desktop-v2.webp' },
  { label: 'VF 5 Mới - Màu Đỏ Nóc Đen', url: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-4-desktop-v2.webp' },
  { label: 'VF 5 Mới - Màu Xám Nóc Đen', url: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-5-desktop-v2.webp' },
  { label: 'VF 5 Mới - Màu Vàng Cát Nóc Đen', url: '/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-6-desktop-v2.webp' },
  { label: 'VF 5 Mới - Khoang lái trung tâm', url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-day-desktop.jpg' },
  { label: 'VF 5 Mới - Nội thất ghế da', url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-1-desktop.jpg' },
  { label: 'VF 5 Mới - Hàng ghế sau', url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-3-desktop.jpg' },
  { label: 'VF 5 Mới - Vô lăng & màn hình', url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-5-desktop.jpg' },
  { label: 'VF 6 Mới - Hero Banner', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-hero-banner-desktop.jpg' },
  { label: 'VF 6 Mới - Điểm nhấn ngoại thất', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-highlight-banner-desktop.jpg' },
  { label: 'VF 6 Mới - Banner công nghệ', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-decoration-text-banner-desktop.jpg' },
  { label: 'VF 6 Mới - Ngoại thất bối cảnh 1', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-1-desktop.jpg' },
  { label: 'VF 6 Mới - Ngoại thất bối cảnh 2', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-2-desktop.jpg' },
  { label: 'VF 6 Mới - Ngoại thất bối cảnh 3', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-3-desktop.jpg' },
  { label: 'VF 6 Mới - Ngoại thất bối cảnh 4', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-4-desktop.jpg' },
  { label: 'VF 6 Mới - Ngoại thất bối cảnh 5', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-5-desktop.jpg' },
  { label: 'VF 6 Mới - Màu Trắng Ngọc Trai', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-trang-desktop.webp' },
  { label: 'VF 6 Mới - Màu Xám Bạc', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-bac-desktop.webp' },
  { label: 'VF 6 Mới - Màu Xanh Đại Dương', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-xanh-duong-desktop.webp' },
  { label: 'VF 6 Mới - Màu Đỏ Ruby', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-do-desktop.webp' },
  { label: 'VF 6 Mới - Màu Đen Huyền Bí', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-den-desktop.webp' },
  { label: 'VF 6 Mới - Nội thất Nâu Moca', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-banner-desktop.jpg' },
  { label: 'VF 6 Mới - Nội thất Trắng Ngọc Trai', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-1-desktop.jpg' },
  { label: 'VF 6 Mới - Nội thất Đen Thể Thao', url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-detail-3-desktop.jpg' },
  { label: 'Bảng giá VF 5 Mới gốc', url: '/assets/aistudio/55_bb25bc95.jpg' },
  { label: 'Bảng giá VF 6 Mới gốc', url: '/assets/aistudio/66_34f2f8a7.jpg' },
  { label: 'Bảng TSKT VF 5 Mới gốc', url: '/assets/aistudio/VF_5_M_i_TSKT_1111-2_e05ec505.jpg' },
  { label: 'Bảng TSKT VF 6 Mới gốc', url: '/assets/aistudio/VF_6_M_i_TSKT_1111-3_7c9b8034.jpg' },
];

// ============================================================================
// KIẾN THỨC CƠ SỞ CHÍNH THỨC CHO TRỢ LÝ AI TƯ VẤN (CHỈ DÙNG NGUỒN NỘI BỘ)
// ============================================================================
export const DEFAULT_AI_KNOWLEDGE_BASE = `
THÔNG TIN CHÍNH THỨC VINFAST VF 5 THẾ HỆ MỚI & VF 6 THẾ HỆ MỚI:

1. CHƯƠNG TRÌNH ĐẶT CỌC TIÊN PHONG:
- Thời gian nhận cọc Tiên phong: Từ ngày 12/11/2026 đến hết 18/11/2026.
- Ưu đãi đặt cọc Tiên phong VF 5 Thế hệ mới: Giảm 10 triệu đồng (Mức cọc: 10 triệu đồng/xe).
- Ưu đãi đặt cọc Tiên phong VF 6 Thế hệ mới: Giảm 15 triệu đồng (Mức cọc: 15 triệu đồng/xe).

2. GIÁ BÁN CÔNG BỐ:
- VF 5 Green: Giá niêm yết 460 triệu đồng (Sau ưu đãi cọc Tiên phong 10 triệu còn 450 triệu đồng).
- VF 5 Premium: Giá niêm yết 515 triệu đồng (Sau ưu đãi cọc Tiên phong 10 triệu còn 505 triệu đồng).
- VF 6 Comfort: Giá niêm yết 646 triệu đồng (Sau ưu đãi cọc Tiên phong 15 triệu còn 631 triệu đồng).
- VF 6 Premium: Giá niêm yết 715 triệu đồng (Sau ưu đãi cọc Tiên phong 15 triệu còn 700 triệu đồng).

3. THÔNG TIN CHI TIẾT VINFAST VF 5 THẾ HỆ MỚI (BẠN ĐỒNG HÀNH THÔNG MINH VÀ HIỆU QUẢ):
- Màu ngoại thất (6 màu): Vàng Cát Nóc Đen, Trắng Ngọc Trai Nóc Đen, Đỏ Đô Nóc Đen, Xanh Đại Dương Nóc Đen, Xám Titan Nóc Đen, Đen Tuyền Nóc Bạc.
- Kích thước Dài x Rộng x Cao:
  + VF 5 Green: 3.987 x 1.772 x 1.587 mm, chiều dài cơ sở 2.513 mm, khoảng sáng gầm 170 mm.
  + VF 5 Premium: 3.987 x 1.772 x 1.595 mm, chiều dài cơ sở 2.513 mm, khoảng sáng gầm 178 mm.
- Động cơ & Pin:
  + Công suất tối đa 72 kW, Mô men xoắn cực đại 180 Nm, dẫn động cầu trước (FWD), 2 chế độ lái (Tiết kiệm / Thể thao), phanh tái sinh 4 chế độ.
  + VF 5 Green: Dung lượng pin 37,23 kWh, quãng đường 1 lần sạc đầy dự kiến 320 km (NEDC), sạc nhanh DC 60 kW (10%-70% dưới 25 phút), sạc AC 6,6 kW.
  + VF 5 Premium: Dung lượng pin 43 kWh, quãng đường 1 lần sạc đầy dự kiến 370 km (NEDC), sạc nhanh DC 60 kW (10%-70% dưới 28 phút), sạc AC 6,6 kW.
  + Phụ kiện chính hãng: Dây sạc di động 3,5 kW, Bộ sạc tại nhà 7,4 kW.
- Khung gầm & Ngoại thất:
  + Treo trước MacPherson / Treo sau Dầm xoắn. Phanh trước đĩa thông gió / Phanh sau đĩa. Phanh đỗ điện tử tích hợp giữ phanh tự động (Auto Hold) trên cả 2 bản.
  + VF 5 Green: Mâm thép 16 inch kèm ốp la-zăng (195/60/R16), đèn pha LED, gương chỉnh điện.
  + VF 5 Premium: Mâm hợp kim 17 inch (205/55/R17), đèn pha LED, gương chỉnh điện, gập điện, tích hợp đèn báo rẽ.
- Nội thất & Tiện nghi VF 5:
  + Cả 2 bản đều có màn hình giải trí trung tâm 10 inch, điều hòa tự động, cửa gió điều hòa hàng ghế thứ 2, ghế sau gập 60:40, móc ghế trẻ em ISOFIX, cổng USB Type-A & Type-C.
  + VF 5 Green: Ghế Nỉ, ghế lái chỉnh cơ 4 hướng, vô lăng thường, âm thanh 2 loa, không có sạc không dây.
  + VF 5 Premium: Ghế Da, ghế lái chỉnh cơ 6 hướng, vô lăng bọc da tích hợp nút bấm đa chức năng, âm thanh 6 loa, có sạc không dây.
- An toàn & Tính năng thông minh VF 5:
  + Cả 2 bản có ABS, EBD, BA, ESC, TCS, HSA, ESS, khóa cửa tự động, cảnh báo chống trộm, chế độ cắm trại, trình duyệt web, FOTA, ứng dụng điện thoại & đồng hồ thông minh.
  + VF 5 Green: 2 túi khí, camera lùi (phụ kiện chính hãng).
  + VF 5 Premium: 6 túi khí, chìa khóa thẻ NFC, Chìa khóa số (Digital Key), giám sát áp suất lốp dTPMS, Ga tự động (Cruise Control), Camera lùi, Camera 360, cảm biến đỗ xe phía sau, Apple CarPlay / Android Auto, Trợ lý ảo.

4. THÔNG TIN CHI TIẾT VINFAST VF 6 THẾ HỆ MỚI (MẠNH MẼ. NĂNG ĐỘNG. LÝ TƯỞNG CHO GIA ĐÌNH):
- Màu ngoại thất (5 màu): Trắng Ngọc Trai, Xám Bạc Khí Động Học, Xanh Đại Dương, Đỏ Ruby Nhiệt Huyết, Đen Huyền Bí.
- Màu nội thất (3 tùy chọn): Nâu Moca Sang Trọng, Trắng Ngọc Trai Tinh Tế, Đen Thể Thao Đẳng Cấp.
- Kích thước Dài x Rộng x Cao: 4.246 x 1.827 x 1.616 mm, chiều dài cơ sở 2.730 mm, khoảng sáng gầm 190 mm (trên cả 2 bản Comfort và Premium).
- Động cơ & Pin:
  + Công suất tối đa 130 kW, Mô men xoắn cực đại 250 Nm, dẫn động cầu trước (FWD), 3 chế độ lái (Tiết kiệm / Thường / Thể thao), phanh tái sinh 4 chế độ.
  + Dung lượng pin: 60 kWh trên cả 2 bản.
  + Quãng đường 1 lần sạc đầy (NEDC): VF 6 Comfort đạt 510 km; VF 6 Premium dự kiến 480 km.
  + Sạc nhanh DC tối đa 100 kW (10%-70% dưới 35 phút), sạc chậm AC tối đa 7,2 kW. Phụ kiện chính hãng: dây sạc di động 3,5 kW, bộ sạc tại nhà 7,4 kW.
- Khung gầm, Ngoại thất & Nội thất VF 6:
  + Treo trước MacPherson / sau Trục xoắn. Phanh đĩa thông gió trước / đĩa đặc sau. Phanh đỗ điện tử & Auto Hold. Cửa sổ chỉnh điện 1 chạm cả 4 cửa. Hàng ghế thứ 2 điều chỉnh hướng & ISOFIX.
  + VF 6 Comfort: Mâm hợp kim 17 inch (225/60/R17), đèn pha LED, cốp sau chỉnh cơ, gương chỉnh điện báo rẽ, ghế bọc Da và Nỉ, ghế lái chỉnh cơ 6 hướng, điều hòa tự động 1 vùng lọc PM 2.5, màn hình 10 inch, âm thanh 6 loa, gương chiếu hậu trong xe ngày & đêm, 2 túi khí, iTPMS, Camera lùi, cảm biến sau, Ga tự động, Trợ lý ảo Vivi.
  + VF 6 Premium: Mâm hợp kim 19 inch (235/45/R19), đèn pha LED tự động, đèn nhận diện thương hiệu trước & sau, đèn phanh trên cao LED, gương chỉnh điện gập điện báo rẽ, cốp sau chỉnh điện, ghế bọc Da vân kim cương, ghế lái chỉnh điện 6 hướng, vô lăng 2 chấu bọc da, điều hòa tự động 2 vùng kiểm soát chất lượng & ion hóa không khí lọc Combi 1.0, màn hình giải trí 12,9 inch + màn hình thông tin sau vô lăng, âm thanh 8 loa cao cấp tinh chỉnh bởi Arkamys, gương chống chói tự động, sạc không dây, cổng USB hàng trước & 2 cổng Type-C hàng ghế 2, 6 túi khí, thẻ NFC, Digital Key, dTPMS, Camera 360, cảm biến trước & sau, Trợ lý ảo Vita, Bản đồ, VF App Market, và gói hỗ trợ lái nâng cao ADAS toàn diện (Trợ lái trên cao tốc/khi tắc đường, tự động dừng khẩn cấp, Ga tự động thích ứng ACC, nhận biết biển báo, giữ làn, phanh tự động khẩn cấp trước AEB, cảnh báo điểm mù, cảnh báo mở cửa, cảnh báo phương tiện cắt ngang phía sau).
`.trim();

export function formatCurrencyVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
}

export function formatMillionsVnd(amount: number): string {
  const millions = amount / 1000000;
  return `${millions.toLocaleString('vi-VN')} Triệu đồng`;
}
