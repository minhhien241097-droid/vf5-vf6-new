import React, { useState } from 'react';
import { Filter, ArrowUpRight, FileSpreadsheet } from 'lucide-react';
import {
  VF5_DETAILED_SPECS,
  VF6_DETAILED_SPECS,
  FOUR_TRIM_COMPARISON_ROWS,
  DealerConfiguration,
  VEHICLES_DATA,
} from '../data/vehiclesData';
import { ResilientImage } from './ResilientImage';

interface SpecComparisonSectionProps {
  dealerConfig: DealerConfiguration;
  onOpenBooking: (model: 'vf5' | 'vf6', colorName?: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string) => void;
}

export const SpecComparisonSection: React.FC<SpecComparisonSectionProps> = ({
  onOpenBooking,
  onOpenLightbox,
}) => {
  const [activeSpecTab, setActiveSpecTab] = useState<'vf5-detail' | 'vf6-detail' | 'compare-all'>('vf5-detail');
  const [onlyDifferences, setOnlyDifferences] = useState<boolean>(false);

  const currentDetailedGroups =
    activeSpecTab === 'vf5-detail' ? VF5_DETAILED_SPECS : VF6_DETAILED_SPECS;

  const filteredFourTrimRows = FOUR_TRIM_COMPARISON_ROWS.filter((row) => {
    if (!onlyDifferences) return true;
    const allSame =
      row.vf5Green === row.vf5Premium &&
      row.vf5Premium === row.vf6Comfort &&
      row.vf6Comfort === row.vf6Premium;
    return !allSame;
  });

  return (
    <section
      id="spec-comparison"
      className="hidden md:block py-20 lg:py-28 bg-[#F8FAFC] border-t border-slate-200"
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        {/* Header & Interactive Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2.5">
              <span>03. Bảng Thông Số Kỹ Thuật & Giá Bán Chính Thức</span>
              <span aria-hidden="true">·</span>
              <span>VF 5 (Green / Premium) & VF 6 (Comfort / Premium)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
              Thông Số Kỹ Thuật Chi Tiết Từng Phiên Bản
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {activeSpecTab !== 'compare-all' && (
              <button
                type="button"
                onClick={() =>
                  onOpenLightbox(
                    activeSpecTab === 'vf5-detail'
                      ? VEHICLES_DATA.vf5.specSheetImageUrl
                      : VEHICLES_DATA.vf6.specSheetImageUrl,
                    activeSpecTab === 'vf5-detail'
                      ? 'Bảng Thông Số Kỹ Thuật Gốc VinFast VF 5 Thế Hệ Mới (Green & Premium)'
                      : 'Bảng Thông Số Kỹ Thuật Gốc VinFast VF 6 Thế Hệ Mới (Comfort & Premium)'
                  )
                }
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                <span>Xem Bản Ảnh TSKT Gốc</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setOnlyDifferences((prev) => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap shrink-0 shadow-sm ${
                onlyDifferences
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Chỉ hiện điểm khác biệt</span>
            </button>
          </div>
        </div>

        {/* Main 3-Tab Switcher Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl mb-8 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveSpecTab('vf5-detail')}
            className={`flex-1 min-w-[220px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSpecTab === 'vf5-detail'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            TSKT VinFast VF 5 Mới (Green vs Premium)
          </button>
          <button
            type="button"
            onClick={() => setActiveSpecTab('vf6-detail')}
            className={`flex-1 min-w-[220px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSpecTab === 'vf6-detail'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            TSKT VinFast VF 6 Mới (Comfort vs Premium)
          </button>
          <button
            type="button"
            onClick={() => setActiveSpecTab('compare-all')}
            className={`flex-1 min-w-[220px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeSpecTab === 'compare-all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            So Sánh Tổng Hợp Cả 4 Phiên Bản
          </button>
        </div>

        {/* Top 4 Version Pricing Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* VF 5 Green */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="h-24 flex items-center justify-center mb-2">
                <ResilientImage
                  src="/drive-assets/xe-dien-vinfast-vf5-np-mau-hang2-6-desktop-v2.webp"
                  alt="VF 5 Green"
                  className="max-h-20 object-contain"
                />
              </div>
              <div className="text-xs font-medium text-slate-500">VF 5 Thế Hệ Mới</div>
              <h3 className="text-lg font-bold text-slate-900">VF 5 Green</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500">Từ</span>
                <span className="text-2xl font-extrabold text-blue-600 font-mono-tabular">
                  460
                </span>
                <span className="text-xs font-bold text-blue-700">Triệu đồng</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1 font-mono-tabular">
                Ưu đãi cọc Tiên phong: Giảm 10 Triệu
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pin 37,23 kWh · 320 km · Mức cọc 10tr
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('vf5', 'VF 5 Green')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Đặt Cọc VF 5 Green</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* VF 5 Premium */}
          <div className="rounded-2xl bg-white border border-blue-200 p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="h-24 flex items-center justify-center mb-2">
                <ResilientImage
                  src="/drive-assets/xe-dien-vinfast-vf5-np-phien-ban-premium-desktop.webp"
                  alt="VF 5 Premium"
                  className="max-h-20 object-contain"
                />
              </div>
              <div className="text-xs font-medium text-blue-600">VF 5 Thế Hệ Mới</div>
              <h3 className="text-lg font-bold text-slate-900">VF 5 Premium</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500">Từ</span>
                <span className="text-2xl font-extrabold text-blue-600 font-mono-tabular">
                  515
                </span>
                <span className="text-xs font-bold text-blue-700">Triệu đồng</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1 font-mono-tabular">
                Ưu đãi cọc Tiên phong: Giảm 10 Triệu
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pin 43 kWh · 370 km · Mâm 17" · Cam 360
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('vf5', 'VF 5 Premium')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Đặt Cọc VF 5 Premium</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* VF 6 Comfort */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="h-24 flex items-center justify-center mb-2">
                <ResilientImage
                  src="/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-trang-desktop.webp"
                  alt="VF 6 Comfort"
                  className="max-h-20 object-contain"
                />
              </div>
              <div className="text-xs font-medium text-slate-500">VF 6 Thế Hệ Mới</div>
              <h3 className="text-lg font-bold text-slate-900">VF 6 Comfort</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500">Từ</span>
                <span className="text-2xl font-extrabold text-blue-600 font-mono-tabular">
                  646
                </span>
                <span className="text-xs font-bold text-blue-700">Triệu đồng</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1 font-mono-tabular">
                Ưu đãi cọc Tiên phong: Giảm 15 Triệu
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pin 60 kWh · 510 km · Mức cọc 15tr
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('vf6', 'VF 6 Comfort')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Đặt Cọc VF 6 Comfort</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* VF 6 Premium */}
          <div className="rounded-2xl bg-white border border-blue-200 p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="h-24 flex items-center justify-center mb-2">
                <ResilientImage
                  src="/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-do-desktop.webp"
                  alt="VF 6 Premium"
                  className="max-h-20 object-contain"
                />
              </div>
              <div className="text-xs font-medium text-blue-600">VF 6 Thế Hệ Mới</div>
              <h3 className="text-lg font-bold text-slate-900">VF 6 Premium</h3>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-500">Từ</span>
                <span className="text-2xl font-extrabold text-blue-600 font-mono-tabular">
                  715
                </span>
                <span className="text-xs font-bold text-blue-700">Triệu đồng</span>
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-1 font-mono-tabular">
                Ưu đãi cọc Tiên phong: Giảm 15 Triệu
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Pin 60 kWh · 480 km · Màn 12,9" · ADAS
              </div>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('vf6', 'VF 6 Premium')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Đặt Cọc VF 6 Premium</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Detailed Spec Table Content */}
        {activeSpecTab !== 'compare-all' ? (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm font-bold">
                    <th className="py-4 px-6 w-2/5">THÔNG SỐ KỸ THUẬT</th>
                    <th className="py-4 px-6 w-[30%] text-center border-l border-white/15">
                      {activeSpecTab === 'vf5-detail' ? 'VF 5 GREEN' : 'VF 6 COMFORT'}
                    </th>
                    <th className="py-4 px-6 w-[30%] text-center border-l border-white/15 bg-blue-700">
                      {activeSpecTab === 'vf5-detail' ? 'VF 5 PREMIUM' : 'VF 6 PREMIUM'}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentDetailedGroups.map((group) => {
                    const visibleRows = group.rows.filter((r) =>
                      onlyDifferences ? r.trim1 !== r.trim2 : true
                    );
                    if (visibleRows.length === 0) return null;

                    return (
                      <React.Fragment key={group.groupTitle}>
                        <tr className="bg-blue-600 text-white text-xs font-bold tracking-wide">
                          <td colSpan={3} className="py-2.5 px-6">
                            {group.groupTitle}
                          </td>
                        </tr>
                        {visibleRows.map((row, idx) => (
                          <tr
                            key={row.label}
                            className={`border-b border-slate-200 hover:bg-blue-50/40 transition-colors ${
                              idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'
                            }`}
                          >
                            <td className="py-3.5 px-6 font-medium text-slate-800">
                              {row.label}
                            </td>
                            <td className="py-3.5 px-6 text-center text-slate-700 font-mono-tabular border-l border-slate-200">
                              {row.trim1}
                            </td>
                            <td className="py-3.5 px-6 text-center font-semibold text-slate-900 font-mono-tabular border-l border-slate-200 bg-blue-50/25">
                              {row.trim2}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              *Các tính năng thông minh thuộc các gói Cơ bản (Miễn phí) và Nâng cao (Tính phí). Một số tính năng sẽ được cập nhật từ xa qua kết nối không dây (FOTA) hoặc tại xưởng dịch vụ VinFast. Quãng đường di chuyển được tính toán dựa trên kết quả kiểm định theo quy chuẩn toàn cầu (NEDC).
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[880px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-900 text-xs font-bold text-white">
                    <th className="py-4 px-5 w-1/4">Hạng mục thông số</th>
                    <th className="py-4 px-5 w-[18.75%] border-l border-white/15">
                      VF 5 Green (460 Tr)
                    </th>
                    <th className="py-4 px-5 w-[18.75%] border-l border-white/15 bg-blue-900">
                      VF 5 Premium (515 Tr)
                    </th>
                    <th className="py-4 px-5 w-[18.75%] border-l border-white/15">
                      VF 6 Comfort (646 Tr)
                    </th>
                    <th className="py-4 px-5 w-[18.75%] border-l border-white/15 bg-blue-700">
                      VF 6 Premium (715 Tr)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {filteredFourTrimRows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-blue-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <div className="text-[11px] text-blue-600 font-semibold mb-0.5">
                          {row.categoryLabel}
                        </div>
                        <div className="font-bold text-slate-800">{row.label}</div>
                      </td>
                      <td className="py-3.5 px-5 text-slate-700 font-mono-tabular border-l border-slate-200">
                        {row.vf5Green}
                      </td>
                      <td className="py-3.5 px-5 text-slate-900 font-semibold font-mono-tabular border-l border-slate-200 bg-slate-50/70">
                        {row.vf5Premium}
                      </td>
                      <td className="py-3.5 px-5 text-slate-700 font-mono-tabular border-l border-slate-200">
                        {row.vf6Comfort}
                      </td>
                      <td className="py-3.5 px-5 text-blue-950 font-semibold font-mono-tabular border-l border-slate-200 bg-blue-50/30">
                        {row.vf6Premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
