import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Check, Sparkles, Eye, Layers, ArrowRight } from 'lucide-react';
import {
  VehicleShowcaseData,
  DealerConfiguration,
  formatMillionsVnd,
} from '../data/vehiclesData';
import { ResilientImage } from './ResilientImage';

interface StudioConfiguratorProps {
  activeModel: 'vf5' | 'vf6';
  onSelectModel: (model: 'vf5' | 'vf6') => void;
  vehiclesData: Record<'vf5' | 'vf6', VehicleShowcaseData>;
  dealerConfig: DealerConfiguration;
  onOpenBookingWithSelection: (model: 'vf5' | 'vf6', colorName: string) => void;
  onOpenLightbox: (imageUrl: string, caption: string) => void;
}

export const StudioConfigurator: React.FC<StudioConfiguratorProps> = ({
  activeModel,
  onSelectModel,
  vehiclesData,
  dealerConfig,
  onOpenBookingWithSelection,
  onOpenLightbox,
}) => {
  const vehicle = vehiclesData[activeModel];
  const [studioTab, setStudioTab] = useState<'exterior' | 'interior'>('exterior');
  const [viewMode, setViewMode] = useState<'studio' | 'lifestyle'>('studio');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedInteriorIndex, setSelectedInteriorIndex] = useState(0);
  const [selectedInteriorDetailIndex, setSelectedInteriorDetailIndex] = useState(0);

  useEffect(() => {
    setSelectedColorIndex(0);
    setSelectedInteriorIndex(0);
    setSelectedInteriorDetailIndex(0);
  }, [activeModel]);

  const currentColor =
    vehicle.exteriorColors[selectedColorIndex] || vehicle.exteriorColors[0];
  const currentInterior =
    vehicle.interiorOptions[selectedInteriorIndex] || vehicle.interiorOptions[0];
  const currentInteriorDetail =
    currentInterior.detailImages[selectedInteriorDetailIndex] ||
    currentInterior.detailImages[0];

  const displayedExteriorImage =
    viewMode === 'studio' ? currentColor.studioImage : currentColor.lifestyleImage;

  const trim1Price =
    activeModel === 'vf5'
      ? dealerConfig.vf5GreenPriceVnd
      : dealerConfig.vf6ComfortPriceVnd;
  const trim2Price =
    activeModel === 'vf5'
      ? dealerConfig.vf5PremiumPriceVnd
      : dealerConfig.vf6PremiumPriceVnd;
  const pioneerDiscount =
    activeModel === 'vf5'
      ? dealerConfig.vf5PioneerDiscountVnd
      : dealerConfig.vf6PioneerDiscountVnd;

  return (
    <section
      id="studio-configurator"
      className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden"
    >
      {/* Subtle Daylight Ambient Glow matching the selected car color */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[420px] rounded-full blur-[130px] transition-all duration-700 opacity-50"
        style={{ background: currentColor.accentGlow }}
      />

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-10">
        {/* Section Header & Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-2.5">
              <span>02. Interactive Studio 360</span>
              <span aria-hidden="true">·</span>
              <span>Trải nghiệm Phối màu & Không gian Nội thất</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
              Tùy Biến Diện Mạo {vehicle.name}
            </h2>
          </div>

          {/* Interactive Segmented Switchers: Model + Exterior/Interior */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            {/* Model Switcher */}
            <div className="grid grid-cols-2 sm:flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => onSelectModel('vf5')}
                className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${
                  activeModel === 'vf5'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                VinFast VF 5 Mới
              </button>
              <button
                type="button"
                onClick={() => onSelectModel('vf6')}
                className={`px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap ${
                  activeModel === 'vf6'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                VinFast VF 6 Mới
              </button>
            </div>

            {/* Exterior / Interior Switcher */}
            <div className="grid grid-cols-2 sm:flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => setStudioTab('exterior')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  studioTab === 'exterior'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Màu Ngoại Thất ({vehicle.exteriorColors.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setStudioTab('interior')}
                className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  studioTab === 'interior'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Nội Thất</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Studio Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 8 Columns: Interactive Daylight Visual Stage */}
          <div className="lg:col-span-8 flex flex-col justify-between relative rounded-2xl bg-gradient-to-b from-slate-50 via-white to-blue-50/40 border border-slate-200 p-6 sm:p-8 min-h-[440px] sm:min-h-[520px] overflow-hidden shadow-sm">
            {/* Top Bar inside Stage */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>{vehicle.segment}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {studioTab === 'exterior'
                      ? currentColor.englishName
                      : currentInterior.name}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {studioTab === 'exterior'
                    ? currentColor.name
                    : currentInterior.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {studioTab === 'exterior' && (
                  <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setViewMode('studio')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        viewMode === 'studio'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Góc Studio
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('lifestyle')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        viewMode === 'lifestyle'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Bối Cảnh Thực Tế
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    onOpenLightbox(
                      studioTab === 'exterior'
                        ? displayedExteriorImage
                        : currentInteriorDetail.url,
                      studioTab === 'exterior'
                        ? `${vehicle.name} - ${currentColor.name}`
                        : `${vehicle.name} - ${currentInteriorDetail.caption}`
                    )
                  }
                  className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-sm"
                  title="Phóng to hình ảnh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Vehicle Image Canvas with Smooth Motion Transition (No detached pedestal) */}
            <div className="relative my-auto py-2 flex items-center justify-center min-h-[210px] sm:min-h-[310px]">
              <AnimatePresence mode="wait">
                {studioTab === 'exterior' ? (
                  <motion.div
                    key={`${activeModel}-${currentColor.id}-${viewMode}`}
                    initial={{ opacity: 0, scale: 0.96, x: 18 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.97, x: -18 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex items-center justify-center"
                  >
                    <ResilientImage
                      src={displayedExteriorImage}
                      alt={`${vehicle.name} màu ${currentColor.name}`}
                      className={
                        viewMode === 'studio'
                          ? 'w-full max-h-[260px] sm:max-h-[350px] object-contain drop-shadow-[0_10px_14px_rgba(15,23,42,0.12)] select-none'
                          : 'w-full h-[250px] sm:h-[360px] object-cover rounded-xl border border-slate-200 shadow-lg'
                      }
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${activeModel}-${currentInterior.id}-${selectedInteriorDetailIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <ResilientImage
                      src={currentInteriorDetail.url}
                      alt={currentInteriorDetail.caption}
                      className="w-full h-[300px] sm:h-[370px] object-cover rounded-xl border border-slate-200 shadow-lg"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Caption & Quick Angle Thumbnails inside Stage */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {studioTab === 'exterior'
                  ? currentColor.description
                  : currentInteriorDetail.caption}
              </p>

              {studioTab === 'interior' && (
                <div className="flex items-center gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0">
                  {currentInterior.detailImages.map((img, idx) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setSelectedInteriorDetailIndex(idx)}
                      className={`relative w-14 h-10 rounded-lg overflow-hidden border transition-all shrink-0 ${
                        selectedInteriorDetailIndex === idx
                          ? 'border-blue-600 ring-2 ring-blue-600/25 scale-105'
                          : 'border-slate-300 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <ResilientImage
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right 4 Columns: Interactive Color & Trim Control Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 sm:p-7">
            <div>
              {studioTab === 'exterior' ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-700">
                      Chọn Phối Màu Ngoại Thất
                    </span>
                    <span className="text-xs text-slate-500 font-mono-tabular">
                      {selectedColorIndex + 1} / {vehicle.exteriorColors.length}
                    </span>
                  </div>

                  {/* Color Swatch List */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {vehicle.exteriorColors.map((color, idx) => {
                      const isSelected = idx === selectedColorIndex;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-white border-blue-600 text-slate-900 shadow-sm ring-1 ring-blue-600/20'
                              : 'bg-white/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className="relative w-7 h-7 rounded-full border border-slate-300 shrink-0 overflow-hidden shadow-inner"
                              style={{ backgroundColor: color.hexPrimary }}
                            >
                              {color.hexSecondary && (
                                <span
                                  className="absolute top-0 right-0 w-1/2 h-full"
                                  style={{ backgroundColor: color.hexSecondary }}
                                />
                              )}
                            </span>
                            <div className="truncate">
                              <div className="text-sm font-bold truncate">
                                {color.name}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {color.englishName}
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-700">
                      Tùy Chọn Phối Màu Nội Thất
                    </span>
                    <span className="text-xs text-slate-500 font-mono-tabular">
                      {vehicle.interiorOptions.length} Phiên bản
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {vehicle.interiorOptions.map((opt, idx) => {
                      const isSelected = idx === selectedInteriorIndex;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedInteriorIndex(idx);
                            setSelectedInteriorDetailIndex(0);
                          }}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-white border-blue-600 text-slate-900 shadow-sm ring-1 ring-blue-600/20'
                              : 'bg-white/70 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className="w-7 h-7 rounded-full border border-slate-300 shrink-0"
                              style={{ backgroundColor: opt.swatchHex }}
                            />
                            <div className="min-w-0">
                              <div className="text-sm font-bold truncate">
                                {opt.name}
                              </div>
                              <div className="text-xs text-slate-500 truncate">
                                {opt.subtitle}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Angle Selector List for Interior */}
                  <div className="text-xs font-bold text-slate-700 mb-2.5">
                    Góc Nhìn Chi Tiết Khoang Cabin
                  </div>
                  <div className="space-y-2">
                    {currentInterior.detailImages.map((detail, idx) => (
                      <button
                        key={detail.url}
                        type="button"
                        onClick={() => setSelectedInteriorDetailIndex(idx)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                          selectedInteriorDetailIndex === idx
                            ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                            : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{detail.caption}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Summary & Instant Pioneer Deposit CTA (Balanced for Mobile & Desktop) */}
            <div className="mt-6 pt-5 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-600 whitespace-nowrap">
                  {activeModel === 'vf5' ? 'VF 5 Green từ:' : 'VF 6 Comfort từ:'}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 font-mono-tabular text-right whitespace-nowrap">
                  {formatMillionsVnd(trim1Price)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-600 whitespace-nowrap">
                  {activeModel === 'vf5' ? 'VF 5 Premium từ:' : 'VF 6 Premium từ:'}
                </span>
                <span className="text-sm sm:text-base font-bold text-slate-900 font-mono-tabular text-right whitespace-nowrap">
                  {formatMillionsVnd(trim2Price)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-semibold text-blue-700 whitespace-nowrap">
                  Ưu đãi cọc Tiên phong:
                </span>
                <span className="text-sm sm:text-base font-extrabold text-blue-600 font-mono-tabular text-right whitespace-nowrap">
                  Giảm {formatMillionsVnd(pioneerDiscount)}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  onOpenBookingWithSelection(
                    activeModel,
                    studioTab === 'exterior'
                      ? currentColor.name
                      : currentInterior.name
                  )
                }
                className="mt-3 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <span className="truncate">
                  Đặt Cọc Tiên Phong {vehicle.shortName}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
