import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Maximize2, CheckCircle2, X, Car } from 'lucide-react';
import {
  VehicleShowcaseData,
  DealerConfiguration,
  formatMillionsVnd,
} from '../data/vehiclesData';
import { ResilientImage } from './ResilientImage';

interface ModelDeepDiveProps {
  selectedDetailModel: 'vf5' | 'vf6' | null;
  onChangeDetailModel: (model: 'vf5' | 'vf6' | null) => void;
  vehiclesData: Record<'vf5' | 'vf6', VehicleShowcaseData>;
  dealerConfig: DealerConfiguration;
  onSelectForStudio: (model: 'vf5' | 'vf6') => void;
  onOpenBooking: (model: 'vf5' | 'vf6', colorName?: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string) => void;
}

const VF6_LIFESTYLE_GALLERY = [
  {
    url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-1-desktop.jpg',
    title: 'Đô Thị Hiện Đại',
    caption: 'Đèn cánh chim đặc trưng & LED thấu kính sắc sảo trong đêm phố thị',
  },
  {
    url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-2-desktop.jpg',
    title: 'Hành Trình Gia Đình',
    caption: 'Khoảng sáng gầm 190 mm tối ưu và mâm 19 inch khí động học vững chãi',
  },
  {
    url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-3-desktop.jpg',
    title: 'Cung Đường Biển Xanh',
    caption: 'Tay nắm cửa bán ẩn & tỷ lệ thân xe cân đối chuẩn SUV châu Âu',
  },
  {
    url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-4-desktop.jpg',
    title: 'Phong Thái Năng Động',
    caption: 'Sắc Đỏ Ruby nổi bật với các đường gân dập nổi mạnh mẽ',
  },
  {
    url: '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-slider-5-desktop.jpg',
    title: 'Chinh Phục Thiên Nhiên',
    caption: 'Hỗ trợ lái nâng cao ADAS & hệ thống treo êm ái trên mọi địa hình',
  },
];

export const ModelDeepDive: React.FC<ModelDeepDiveProps> = ({
  selectedDetailModel,
  onChangeDetailModel,
  vehiclesData,
  dealerConfig,
  onSelectForStudio,
  onOpenBooking,
  onOpenLightbox,
}) => {
  const vf5 = vehiclesData.vf5;
  const vf6 = vehiclesData.vf6;
  const [activeVf6Slide, setActiveVf6Slide] = useState(0);

  if (!selectedDetailModel) {
    return null;
  }

  return (
    <div id="model-detail-section" className="bg-[#F8FAFC] scroll-mt-20">
      {/* Top Switcher Bar when a vehicle detail section is active */}
      <div className="bg-blue-50/80 border-t border-b border-blue-200 py-3 px-6 lg:px-10">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <Car className="w-4 h-4 text-blue-600" />
            <span>
              Đang hiển thị thông tin chi tiết:{' '}
              <strong className="text-blue-600">
                {selectedDetailModel === 'vf5'
                  ? 'VinFast VF 5 Thế Hệ Mới'
                  : 'VinFast VF 6 Thế Hệ Mới'}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onChangeDetailModel(selectedDetailModel === 'vf5' ? 'vf6' : 'vf5')
              }
              className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200 text-xs font-bold transition-colors shadow-2xs"
            >
              {selectedDetailModel === 'vf5'
                ? 'Chuyển sang xem VF 6 Thế Hệ Mới →'
                : '← Chuyển sang xem VF 5 Thế Hệ Mới'}
            </button>
            <button
              type="button"
              onClick={() => onChangeDetailModel(null)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition-colors"
              title="Ẩn phần chi tiết dòng xe"
            >
              <X className="w-3.5 h-3.5" />
              <span>Thu gọn</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER A: VINFAST VF 5 THẾ HỆ MỚI (ONLY SHOWN WHEN selectedDetailModel === 'vf5')
      ===================================================================== */}
      {selectedDetailModel === 'vf5' && (
        <motion.section
          key="vf5-detail-view"
          id="vf5-showcase"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="py-16 lg:py-24 relative overflow-hidden bg-white"
        >
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            {/* Editorial Chapter Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-600 mb-2.5">
                  <span>Điểm Nhấn Dòng Xe</span>
                  <span aria-hidden="true">·</span>
                  <span>{vf5.slogan}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] [text-wrap:balance]">
                  {vf5.name}: Dáng Vuông Vức Thể Thao, Rộng Rãi Cho Gia Đình
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {vf5.subTagline}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onSelectForStudio('vf5');
                    document
                      .getElementById('studio-configurator')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors text-center whitespace-nowrap"
                >
                  Phối Màu VF 5 Mới
                </button>
                <button
                  type="button"
                  onClick={() => onOpenBooking('vf5')}
                  className="px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 whitespace-nowrap"
                >
                  <span className="sm:hidden">Đặt Cọc (-10Tr)</span>
                  <span className="hidden sm:inline">
                    Đặt Cọc VF 5 Mới · Ưu Đãi{' '}
                    {formatMillionsVnd(dealerConfig.vf5PioneerDiscountVnd)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </button>
              </div>
            </div>

            {/* Official VF 5 Pricing & Pioneer Banner Strip */}
            <div className="rounded-2xl bg-[#F4F7FB] border border-blue-100 p-6 sm:p-8 mb-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* VF 5 Green Card */}
                  <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">VF 5 Green</div>
                      <div className="text-xs text-slate-500 mt-1">TỪ</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-blue-600 font-mono-tabular">
                          460
                        </span>
                        <span className="text-sm font-bold text-blue-700">
                          Triệu đồng
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-emerald-700 font-semibold">
                        Cọc Tiên phong còn: 450 Triệu đồng
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <div>Pin 37,23 kWh · Quãng đường 320 km (NEDC)</div>
                      <div>Màn hình 10 inch · Phanh đỗ điện tử & Auto Hold</div>
                    </div>
                  </div>

                  {/* VF 5 Premium Card */}
                  <div className="rounded-xl bg-white border border-blue-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">VF 5 Premium</div>
                      <div className="text-xs text-slate-500 mt-1">TỪ</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-blue-600 font-mono-tabular">
                          540
                        </span>
                        <span className="text-sm font-bold text-blue-700">
                          Triệu đồng
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-emerald-700 font-semibold">
                        Cọc Tiên phong còn: 530 Triệu đồng
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                      <div>Pin 43 kWh · Quãng đường 370 km (NEDC) · Mâm 17"</div>
                      <div>Ghế Da · 6 túi khí · Camera 360 · Sạc không dây</div>
                    </div>
                  </div>
                </div>

                {/* Right Official Blue Pioneer Deposit Banner */}
                <div className="lg:col-span-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-md flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-semibold text-blue-100">
                      ƯU ĐÃI ĐẶT CỌC TIÊN PHONG VF 5 THẾ HỆ MỚI
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold mt-1">
                      GIẢM 10 TRIỆU ĐỒNG
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/20 text-xs">
                    <div>
                      <div className="text-blue-100">MỨC CỌC</div>
                      <div className="text-base font-bold font-mono-tabular mt-0.5">
                        10 triệu đồng/xe
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-100">THỜI GIAN NHẬN CỌC</div>
                      <div className="text-base font-bold font-mono-tabular mt-0.5">
                        12/11 – 18/11/2026
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-bleed 16:9 Architectural Hero Banner for VF 5 */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-10 group shadow-md">
              <ResilientImage
                src={vf5.heroDesktopImage}
                alt={vf5.name}
                className="w-full h-[360px] sm:h-[480px] lg:h-[540px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <button
                type="button"
                onClick={() =>
                  onOpenLightbox(
                    vf5.heroDesktopImage,
                    'VinFast VF 5 Thế hệ mới - Dáng xe vuông vức, hình khối cứng cáp'
                  )
                }
                className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 border border-slate-200 backdrop-blur-md transition-colors shadow-sm"
                title="Xem ảnh kích thước lớn"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10 text-white">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/25">
                  <div>
                    <div className="text-xs text-slate-200">Kích thước tổng thể</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono-tabular mt-1">
                      3.987 x 1.772 x 1.595
                    </div>
                    <div className="text-xs text-sky-300 mt-0.5">
                      Chiều dài cơ sở 2.513 mm · Gầm 178 mm
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-200">
                      Dung lượng Pin & Quãng đường
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono-tabular mt-1">
                      43 kWh · 370 km
                    </div>
                    <div className="text-xs text-slate-200 mt-0.5">
                      Bản Green: 37,23 kWh · 320 km (NEDC)
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-200">
                      Động cơ & Sạc nhanh DC
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono-tabular mt-1">
                      72 kW / 180 Nm
                    </div>
                    <div className="text-xs text-slate-200 mt-0.5">
                      Sạc 10%–70% dưới 25–28 phút (60 kW)
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-200">
                      An toàn & Tiện nghi thông minh
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono-tabular mt-1">
                      6 Túi Khí · Cam 360
                    </div>
                    <div className="text-xs text-slate-200 mt-0.5">
                      Phanh đỗ điện tử Auto Hold · Digital Key
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VF 5 Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Card 1: Exterior Boxy Design & LED Projector (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-[#F8FAFC] border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-64 sm:h-80 overflow-hidden group">
                  <ResilientImage
                    src="/drive-assets/xe-dien-vinfast-vf5-np-dien-mao-1-desktop.jpg"
                    alt="VF 5 Thế hệ mới ngoại thất vuông vức"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        '/drive-assets/xe-dien-vinfast-vf5-np-dien-mao-1-desktop.jpg',
                        'VF 5 Thế hệ mới: Dáng xe vuông vức, đèn LED Projector sắc nét'
                      )
                    }
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/90 text-slate-900 border border-slate-200 hover:bg-white transition-colors shadow-sm"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-xs font-bold text-blue-600 mb-2">
                    01. Ngoại Thất & Không Gian Gia Đình Mới
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 [text-wrap:balance]">
                    Dáng Xe Vuông Vức Cứng Cáp & Khoang Hành Lý Mở Rộng
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Phong cách gầm cao thể thao:
                        </strong>{' '}
                        Dáng xe vuông vức, hình khối cứng cáp mang lại tư thế vững chãi và năng động trên phố.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Chiếu sáng & Khí động học:
                        </strong>{' '}
                        Trang bị cụm đèn LED Projector sắc nét kết hợp mâm đúc 17 inch (Premium) và ốp khí động học hiện đại.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Thêm không gian cho gia đình:
                        </strong>{' '}
                        Khoang hành lý rộng hơn, hàng ghế sau có cửa gió điều hòa riêng, cải thiện độ ngả lưng và khoảng để chân thoải mái.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Smart Interior 10" & Auto Hold & Safety (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#F8FAFC] border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-64 sm:h-80 overflow-hidden group">
                  <ResilientImage
                    src="/drive-assets/xe-dien-vinfast-vf5-np-noi-that-day-desktop.jpg"
                    alt="Nội thất VF 5 Thế hệ mới màn hình 10 inch"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-day-desktop.jpg',
                        'Khoang lái VF 5 Thế hệ mới: Màn hình 10 inch, sạc không dây, phanh tay điện tử & Auto Hold'
                      )
                    }
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/90 text-slate-900 border border-slate-200 hover:bg-white transition-colors shadow-sm"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-xs font-bold text-blue-600 mb-2">
                    02. Công Nghệ Khoang Lái & An Toàn Vượt Trội
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 [text-wrap:balance]">
                    Màn Hình Giải Trí, Auto Hold & Chìa Khóa Điện Thoại
                  </h3>
                  <div className="space-y-2.5 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Màn hình giải trí trung tâm & Sạc không dây:
                        </strong>{' '}
                        Hỗ trợ Apple CarPlay / Android Auto, hệ thống 6 loa và sạc không dây tiện lợi.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Phanh tay điện tử & Auto Hold:
                        </strong>{' '}
                        Giữ phanh tự động nhàn nhã khi dừng chờ đèn đỏ trên cả 2 phiên bản Green & Premium.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          Chìa khóa số (Digital Key) & Thẻ NFC:
                        </strong>{' '}
                        Tích hợp trợ lý ảo thông minh và điều khiển xe qua ứng dụng điện thoại/đồng hồ.
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>
                        <strong className="text-slate-900">
                          An toàn vượt trội:
                        </strong>{' '}
                        Camera 360° hỗ trợ quan sát góc hẹp, 6 túi khí, phanh đĩa 4 bánh và Ga tự động (Cruise Control).
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Strip of VF 5 Real Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
              {[
                {
                  url: '/drive-assets/xe-dien-vinfast-vf5-np-banner-gioi-thieu-mo-rong-desktop.jpg',
                  title: 'Không Gian Gia Đình Mở Rộng',
                  desc: 'Khoang hành lý rộng hơn cho những chuyến dã ngoại cuối tuần',
                },
                {
                  url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-3-desktop.jpg',
                  title: 'Hàng Ghế Sau Cải Thiện Độ Ngả',
                  desc: 'Tăng khoảng để chân, gập 60:40 và có cửa gió điều hòa hàng ghế 2',
                },
                {
                  url: '/drive-assets/xe-dien-vinfast-vf5-np-noi-that-5-desktop.jpg',
                  title: 'Khoang Lái Thông Minh & Phanh Điện Tử',
                  desc: 'Vô lăng bọc da đa chức năng, sạc không dây và Camera 360° sắc nét',
                },
              ].map((item) => (
                <div
                  key={item.url}
                  onClick={() => onOpenLightbox(item.url, item.title)}
                  className="group cursor-pointer rounded-xl bg-[#F8FAFC] border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:border-blue-400 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ResilientImage
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* =====================================================================
          CHAPTER B: VINFAST VF 6 THẾ HỆ MỚI (ONLY SHOWN WHEN selectedDetailModel === 'vf6')
      ===================================================================== */}
      {selectedDetailModel === 'vf6' && (
        <motion.section
          key="vf6-detail-view"
          id="vf6-showcase"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="py-16 lg:py-24 bg-[#F4F7FB] relative overflow-hidden"
        >
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            {/* Editorial Chapter Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-600 mb-2.5">
                  <span>Điểm Nhấn Dòng Xe</span>
                  <span aria-hidden="true">·</span>
                  <span>{vf6.slogan}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] [text-wrap:balance]">
                  {vf6.name}: Mạnh Mẽ, Năng Động & Lý Tưởng Cho Gia Đình
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {vf6.subTagline}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onSelectForStudio('vf6');
                    document
                      .getElementById('studio-configurator')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 transition-colors shadow-sm text-center whitespace-nowrap"
                >
                  Phối Màu VF 6 Mới
                </button>
                <button
                  type="button"
                  onClick={() => onOpenBooking('vf6')}
                  className="px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 whitespace-nowrap"
                >
                  <span className="sm:hidden">Đặt Cọc (-15Tr)</span>
                  <span className="hidden sm:inline">
                    Đặt Cọc VF 6 Mới · Ưu Đãi{' '}
                    {formatMillionsVnd(dealerConfig.vf6PioneerDiscountVnd)}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </button>
              </div>
            </div>

            {/* Official VF 6 Pricing & Pioneer Banner Strip */}
            <div className="rounded-2xl bg-white border border-blue-100 p-6 sm:p-8 mb-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* VF 6 Comfort Card */}
                  <div className="rounded-xl bg-[#F8FAFC] border border-slate-200 p-5 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">VF 6 Comfort</div>
                      <div className="text-xs text-slate-500 mt-1">TỪ</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-blue-600 font-mono-tabular">
                          646
                        </span>
                        <span className="text-sm font-bold text-blue-700">
                          triệu đồng
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-emerald-700 font-semibold">
                        Cọc Tiên phong còn: 631 triệu đồng
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                      <div>Pin 60 kWh · Quãng đường 510 km (NEDC) · 130 kW</div>
                      <div>Mâm hợp kim 17" · Màn hình 10" · 6 loa · Lọc PM 2.5</div>
                    </div>
                  </div>

                  {/* VF 6 Premium Card */}
                  <div className="rounded-xl bg-[#F8FAFC] border border-blue-200 p-5 flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">VF 6 Premium</div>
                      <div className="text-xs text-slate-500 mt-1">TỪ</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-blue-600 font-mono-tabular">
                          715
                        </span>
                        <span className="text-sm font-bold text-blue-700">
                          triệu đồng
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-emerald-700 font-semibold">
                        Cọc Tiên phong còn: 700 triệu đồng
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                      <div>Pin 60 kWh · 480 km (NEDC) · Mâm 19" · Cốp điện</div>
                      <div>Màn hình 12,9" · 8 loa · Điều hòa 2 vùng Combi 1.0 · ADAS</div>
                    </div>
                  </div>
                </div>

                {/* Right Official Blue Pioneer Deposit Banner */}
                <div className="lg:col-span-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-md flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-semibold text-blue-100">
                      ƯU ĐÃI ĐẶT CỌC TIÊN PHONG VF 6 THẾ HỆ MỚI
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold mt-1">
                      GIẢM 15 TRIỆU ĐỒNG
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/20 text-xs">
                    <div>
                      <div className="text-blue-100">MỨC CỌC</div>
                      <div className="text-base font-bold font-mono-tabular mt-0.5">
                        15 triệu đồng/xe
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-100">THỜI GIAN NHẬN CỌC</div>
                      <div className="text-base font-bold font-mono-tabular mt-0.5">
                        12/11 – 18/11/2026
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive 5-Scene Exterior Slider for VF 6 */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-10 bg-slate-900 shadow-md">
              <div className="relative h-[380px] sm:h-[500px] lg:h-[560px]">
                <ResilientImage
                  src={
                    activeVf6Slide === 0
                      ? vf6.heroDesktopImage
                      : VF6_LIFESTYLE_GALLERY[activeVf6Slide].url
                  }
                  alt={VF6_LIFESTYLE_GALLERY[activeVf6Slide].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <button
                  type="button"
                  onClick={() =>
                    onOpenLightbox(
                      activeVf6Slide === 0
                        ? vf6.heroDesktopImage
                        : VF6_LIFESTYLE_GALLERY[activeVf6Slide].url,
                      `${vf6.name} - ${VF6_LIFESTYLE_GALLERY[activeVf6Slide].caption}`
                    )
                  }
                  className="absolute top-5 right-5 p-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-900 border border-slate-200 backdrop-blur-md transition-colors shadow-sm"
                  title="Phóng to hình ảnh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
                    <div>
                      <div className="text-xs font-semibold text-sky-300 mb-1">
                        Bộ Sưu Tập Ngoại Thất VF 6 Thế Hệ Mới ({activeVf6Slide + 1}/
                        {VF6_LIFESTYLE_GALLERY.length})
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        {VF6_LIFESTYLE_GALLERY[activeVf6Slide].title}
                      </h3>
                      <p className="text-sm text-slate-200 mt-1">
                        {VF6_LIFESTYLE_GALLERY[activeVf6Slide].caption}
                      </p>
                    </div>

                    {/* Scene Switcher Buttons */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {VF6_LIFESTYLE_GALLERY.map((slide, idx) => (
                        <button
                          key={slide.url}
                          type="button"
                          onClick={() => setActiveVf6Slide(idx)}
                          className={`relative w-16 sm:w-20 h-11 sm:h-12 rounded-lg overflow-hidden border transition-all shrink-0 ${
                            activeVf6Slide === idx
                              ? 'border-sky-400 ring-2 ring-sky-400/50 scale-105'
                              : 'border-white/30 opacity-65 hover:opacity-100'
                          }`}
                        >
                          <ResilientImage
                            src={idx === 0 ? vf6.heroDesktopImage : slide.url}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/20">
                    <div>
                      <div className="text-xs text-slate-200">Kích thước & Gầm xe</div>
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular mt-1">
                        4.246 x 1.827 x 1.616
                      </div>
                      <div className="text-xs text-sky-300 mt-0.5">
                        Trục cơ sở 2.730 mm · Gầm 190 mm
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-200">
                        Dung lượng Pin & Quãng đường
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular mt-1">
                        60 kWh · 510 km
                      </div>
                      <div className="text-xs text-slate-200 mt-0.5">
                        Bản Premium: Dự kiến 480 km (NEDC)
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-200">
                        Giải trí & Điều hòa không khí
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular mt-1">
                        12,9 Inch · 8 Loa
                      </div>
                      <div className="text-xs text-slate-200 mt-0.5">
                        Điều hòa 2 vùng · Lọc Combi 1.0
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-200">
                        Hỗ trợ lái & An toàn
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white font-mono-tabular mt-1">
                        ADAS & 6 Túi Khí
                      </div>
                      <div className="text-xs text-slate-200 mt-0.5">
                        Camera 360° · Cốp điện · Digital Key
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Comprehensive Pillar Cards for VF 6 New Generation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Pillar 1: Ưu điểm & Thiết kế mới */}
              <div className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-56 overflow-hidden group">
                  <ResilientImage
                    src="/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-highlight-banner-desktop.jpg"
                    alt="Ngoại thất sắc nét VinFast VF 6 Thế hệ mới"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        '/drive-assets/hinh-anh-vinfast-vf6-all-new-exterior-highlight-banner-desktop.jpg',
                        'VF 6 Thế hệ mới: Đèn cánh chim, LED thấu kính, tay nắm cửa bán ẩn & mâm 19 inch'
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-slate-900 border border-slate-200 shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-2">
                      01. Ưu Điểm & Thiết Kế Mới
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Ngoại Thất Sắc Nét & Nội Thất Vân Kim Cương Rộng Mở
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">Ngoại thất sắc nét:</strong>{' '}
                          Đèn cánh chim đặc trưng, LED thấu kính tự động, tay nắm cửa bán ẩn, mâm 19 inch phối ốp khí động học.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">
                            Nội thất tối giản, hiện đại:
                          </strong>{' '}
                          Vô lăng 2 chấu bọc da, màn hình thông tin sau vô lăng, ghế thể thao vân kim cương chỉnh điện 6 hướng.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">Không gian rộng rãi:</strong>{' '}
                          Hàng ghế trước & sau đều mở rộng (hàng ghế 2 điều chỉnh hướng), thoải mái cho gia đình có con nhỏ hoặc người lớn tuổi.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Tính năng & Tiện nghi nổi bật */}
              <div className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-56 overflow-hidden group">
                  <ResilientImage
                    src="/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-banner-desktop.jpg"
                    alt="Tiện nghi khoang lái VinFast VF 6 Thế hệ mới"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        '/drive-assets/hinh-anh-vinfast-vf6-all-new-interior-banner-desktop.jpg',
                        'Khoang nội thất VF 6 Thế hệ mới: 8 loa cao cấp, màn hình 12,9 inch, cốp điện & lọc bụi Combi 1.0'
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-slate-900 border border-slate-200 shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-2">
                      02. Tính Năng & Tiện Nghi Nổi Bật
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Màn Hình 12,9 Inch, 8 Loa Cao Cấp & Lọc Bụi Combi 1.0
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">Hệ thống âm thanh:</strong>{' '}
                          8 loa cao cấp tinh chỉnh bởi Arkamys sống động.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">
                            Màn hình & Tương tác:
                          </strong>{' '}
                          Màn hình giải trí 12,9 inch (bản Premium), trợ lý ảo Vita/Vivi, VF App Market và cập nhật phần mềm từ xa (FOTA).
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">Tiện ích cao cấp:</strong>{' '}
                          Cốp điện đóng/mở thuận tiện, sạc không dây, cổng USB-C cho cả 2 hàng ghế, gương chống chói tự động.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">
                            Điều hòa & Không khí:
                          </strong>{' '}
                          Điều hòa tự động 2 vùng, kiểm soát chất lượng không khí, ion hóa và lọc bụi Combi 1.0.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Công nghệ hỗ trợ lái & An toàn */}
              <div className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
                <div className="relative h-56 overflow-hidden group">
                  <ResilientImage
                    src="/drive-assets/hinh-anh-vinfast-vf6-all-new-decoration-text-banner-desktop.jpg"
                    alt="Công nghệ hỗ trợ lái ADAS VinFast VF 6 Thế hệ mới"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox(
                        '/drive-assets/hinh-anh-vinfast-vf6-all-new-decoration-text-banner-desktop.jpg',
                        'VF 6 Thế hệ mới: Hệ thống hỗ trợ lái nâng cao ADAS, Camera 360° & 6 túi khí'
                      )
                    }
                    className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-slate-900 border border-slate-200 shadow-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-600 mb-2">
                      03. Công Nghệ Hỗ Trợ Lái & An Toàn
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Tự Tin Trên Mọi Hành Trình Với Gói ADAS Toàn Diện
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">
                            Hỗ trợ lái nâng cao (ADAS):
                          </strong>{' '}
                          Trợ lái trên cao tốc/khi tắc đường, ga tự động thích ứng, nhận biết biển báo, điều chỉnh tốc độ thông minh, giữ làn & phanh tự động khẩn cấp.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">
                            Cảnh báo & Quan sát 360°:
                          </strong>{' '}
                          Cảnh báo va chạm trước, phương tiện cắt ngang phía sau, cảnh báo điểm mù, cảnh báo mở cửa, Camera 360° & cảm biến trước/sau.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                        <span>
                          <strong className="text-slate-900">
                            An toàn bị động & Khung gầm:
                          </strong>{' '}
                          6 túi khí (bản Premium), giám sát áp suất lốp dTPMS, chống lật ROM, hỗ trợ xuống dốc HDC và phanh đỗ điện tử Auto Hold.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};
