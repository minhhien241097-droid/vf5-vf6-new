/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Compass,
  X,
  Calendar,
  Lock,
  Eye,
} from 'lucide-react';
import {
  DEFAULT_DEALER_CONFIG,
  VINFAST_LOGO_URL,
  getEffectiveVehiclesData,
  ImageOverridesMap,
  CustomerLead,
} from './data/vehiclesData';
import { ResilientImage } from './components/ResilientImage';
import { ModelDeepDive } from './components/ModelDeepDive';
import { StudioConfigurator } from './components/StudioConfigurator';
import { SpecComparisonSection } from './components/SpecComparisonSection';
import { DepositModal, SiteRouteVariant } from './components/DepositModal';
import { MiniAdminModal } from './components/MiniAdminModal';

const STORAGE_KEYS = {
  IMAGE_OVERRIDES: 'vf_newgen_admin_image_overrides_v2',
  CUSTOMER_LEADS: 'vf_newgen_customer_leads_v1',
};

function detectRouteVariant(): SiteRouteVariant {
  if (typeof window === 'undefined') return 'vf56moi';
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (
    pathname.includes('/vf56new') ||
    hash.includes('vf56new') ||
    search.includes('vf56new')
  ) {
    return 'vf56new';
  }
  return 'vf56moi';
}

export default function App() {
  // Route variant ('vf56moi' | 'vf56new')
  const [routeVariant, setRouteVariant] = useState<SiteRouteVariant>(() =>
    detectRouteVariant()
  );

  // Sync routeVariant on browser back/forward or hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      setRouteVariant(detectRouteVariant());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleSwitchRouteVariant = (variant: SiteRouteVariant) => {
    setRouteVariant(variant);
    try {
      const targetPath = variant === 'vf56new' ? '/vf56new' : '/vf56moi';
      window.history.pushState({}, '', targetPath);
    } catch {
      // ignore history errors in restricted iframes
    }
  };

  // General studio model switcher ('vf5' | 'vf6')
  const [studioModel, setStudioModel] = useState<'vf5' | 'vf6'>('vf6');

  // By default on initial load, hide both VF 5 and VF 6 detailed showcase sections
  const [selectedDetailModel, setSelectedDetailModel] = useState<
    'vf5' | 'vf6' | null
  >(null);

  // Simple Popup Modal for Pioneer Deposit
  const [depositModalState, setDepositModalState] = useState<{
    isOpen: boolean;
    model: 'vf5' | 'vf6';
    trimOrColor?: string;
  }>({
    isOpen: false,
    model: 'vf6',
  });

  // Mini Admin Modal at very bottom
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [imageOverrides, setImageOverrides] = useState<ImageOverridesMap>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.IMAGE_OVERRIDES);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [leads, setLeads] = useState<CustomerLead[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMER_LEADS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const dealerConfig = DEFAULT_DEALER_CONFIG;
  const effectiveVehiclesData = getEffectiveVehiclesData(imageOverrides);

  const rawBannerOverride = imageOverrides['hero.mainBanner']?.trim();
  const heroMainBannerUrl =
    rawBannerOverride && !rawBannerOverride.includes('902143083_')
      ? rawBannerOverride
      : '/vinfast-mo-coc-banner.jpg';

  const heroVf5CardUrl =
    imageOverrides['hero.vf5Card']?.trim() ||
    '/drive-assets/xe-dien-vinfast-vf5-np-phien-ban-premium-desktop.webp';
  const heroVf6CardUrl =
    imageOverrides['hero.vf6Card']?.trim() ||
    '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-trang-desktop.webp';

  const [lightboxState, setLightboxState] = useState<{
    url: string;
    caption: string;
  } | null>(null);

  const handleSaveImageOverrides = (newOverrides: ImageOverridesMap) => {
    setImageOverrides(newOverrides);
    try {
      localStorage.setItem(
        STORAGE_KEYS.IMAGE_OVERRIDES,
        JSON.stringify(newOverrides)
      );
    } catch {
      // ignore storage quota errors
    }
  };

  const handleSaveLead = (newLeadData: Omit<CustomerLead, 'id' | 'createdAt'>) => {
    const newLead: CustomerLead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleString('vi-VN'),
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER_LEADS, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearLeads = () => {
    setLeads([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOMER_LEADS);
    } catch {
      // ignore
    }
  };

  // Open simple Deposit Popup Modal
  const handleOpenDepositPopup = (
    model: 'vf5' | 'vf6' = 'vf6',
    trimOrColor?: string
  ) => {
    setDepositModalState({
      isOpen: true,
      model,
      trimOrColor,
    });
  };

  // Toggle VF 5 or VF 6 detailed section (show clicked model, hide the other) and scroll to it
  const handleSelectDetailModel = (model: 'vf5' | 'vf6') => {
    setSelectedDetailModel(model);
    setStudioModel(model);
  };

  useEffect(() => {
    if (selectedDetailModel) {
      const timer = setTimeout(() => {
        document
          .getElementById('model-detail-section')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [selectedDetailModel]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600/15 selection:text-blue-700">
      {/* =====================================================================
          STRICT 3-ZONE TOP NAVIGATION BAR WITH UPLOADED VINFAST LOGO
      ===================================================================== */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 lg:px-10 py-3.5 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs">
        {/* Zone 1: Uploaded VinFast Logo */}
        <a
          href="#top"
          onClick={() => setSelectedDetailModel(null)}
          className="flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0 group"
          aria-label="VinFast Trang chủ"
        >
          <img
            src={VINFAST_LOGO_URL}
            alt="VinFast Logo"
            className="w-8 h-8 object-contain shrink-0"
          />
          <span className="text-xl font-extrabold tracking-[0.16em] text-slate-900 font-display">
            VINFAST
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => handleSelectDetailModel('vf5')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedDetailModel === 'vf5'
                ? 'text-blue-600 font-bold'
                : 'hover:text-blue-600'
            }`}
          >
            VF 5 Mới
          </button>
          <button
            type="button"
            onClick={() => handleSelectDetailModel('vf6')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedDetailModel === 'vf6'
                ? 'text-blue-600 font-bold'
                : 'hover:text-blue-600'
            }`}
          >
            VF 6 Mới
          </button>
          <a
            href="#studio-configurator"
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
          >
            Studio Phối Màu
          </a>
          <a
            href="#spec-comparison"
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
          >
            Thông Số Kỹ Thuật
          </a>
          <button
            type="button"
            onClick={() => handleOpenDepositPopup('vf6')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Đặt Cọc Tiên Phong
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action CTA (Opens Deposit Popup Modal) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => handleOpenDepositPopup('vf6')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-600/20 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Đặt Cọc Tiên Phong
          </button>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION: FULL-WIDTH "CHÍNH THỨC MỞ CỌC" BANNER FIRST, THEN INFO
      ===================================================================== */}
      <main id="top" className="flex-1">
        <section className="bg-gradient-to-b from-[#EAF2FF] via-[#F4F8FF] to-[#F8FAFC] border-b border-slate-200 pb-14 lg:pb-20">
          {/* 1. Static Official "CHÍNH THỨC MỞ CỌC" Key Visual Banner Right at Entry */}
          <div className="max-w-[1440px] mx-auto px-0 sm:px-6 lg:px-10 pt-0 sm:pt-6">
            <div className="sm:rounded-2xl overflow-hidden border-b sm:border border-blue-200/80 shadow-lg bg-white">
              <img
                src={heroMainBannerUrl}
                alt="Chính thức mở cọc VinFast VF 5 Mới (Ưu đãi cọc Tiên phong 10 triệu đồng) & VF 6 Mới (Ưu đãi cọc Tiên phong 15 triệu đồng)"
                className="w-full h-auto block select-none"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('/assets/aistudio/banner-uu-dai-coc.jpg')) {
                    target.src = '/assets/aistudio/banner-uu-dai-coc.jpg';
                  }
                }}
              />
            </div>
          </div>

          {/* 2. Campaign Information & Quick Version Overview Below Banner */}
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 Columns: Headline & Value Proposition */}
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-600 mb-2.5">
                  <span>CHÍNH THỨC NHẬN CỌC TIÊN PHONG: 12/11 – 18/11/2026</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.14] [text-wrap:balance]">
                  Bộ Đôi VinFast VF 5 Thế Hệ Mới & VF 6 Thế Hệ Mới
                </h1>

                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Nâng cấp toàn diện về thiết kế ngoại thất hiện đại, mở rộng không gian cho cả gia đình, trang bị phanh đỗ điện tử Auto Hold, màn hình giải trí lớn, sạc không dây, chìa khóa số Digital Key và gói an toàn thông minh.
                </p>

                <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleOpenDepositPopup('vf6')}
                    className="px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20 whitespace-nowrap cursor-pointer"
                  >
                    <span className="sm:hidden">Đặt Cọc Tiên Phong</span>
                    <span className="hidden sm:inline">Đăng Ký Đặt Cọc Tiên Phong</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  </button>

                  <a
                    href="#studio-configurator"
                    className="px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap"
                  >
                    <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0" />
                    <span className="sm:hidden">Phối Màu 360</span>
                    <span className="hidden sm:inline">Phối Màu 360 & Xem Nội Thất</span>
                  </a>
                </div>
              </div>

              {/* Right 5 Columns: Quick Interactive Selector Cards for VF 5 Mới & VF 6 Mới */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleSelectDetailModel('vf5')}
                  className={`p-5 rounded-2xl bg-white hover:bg-blue-50/40 border text-left transition-all shadow-sm group flex flex-col justify-between cursor-pointer ${
                    selectedDetailModel === 'vf5'
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-blue-500'
                  }`}
                >
                  <div>
                    <div className="h-24 flex items-center justify-center mb-3">
                      <ResilientImage
                        src={heroVf5CardUrl}
                        alt="VinFast VF 5 Thế hệ mới"
                        className="max-h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[11px] font-bold text-blue-600">
                      BẠN ĐỒNG HÀNH THÔNG MINH
                    </div>
                    <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                      VF 5 Thế Hệ Mới
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-slate-600 font-mono-tabular">
                      <div>
                        VF 5 Green: <strong className="text-slate-900">460 Triệu</strong>
                      </div>
                      <div>
                        VF 5 Premium: <strong className="text-slate-900">515 Triệu</strong>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-700 font-mono-tabular">
                      Ưu đãi cọc: -10Tr
                    </span>
                    <span className="text-blue-600 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectDetailModel('vf6')}
                  className={`p-5 rounded-2xl bg-white hover:bg-blue-50/40 border text-left transition-all shadow-sm group flex flex-col justify-between cursor-pointer ${
                    selectedDetailModel === 'vf6'
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-blue-500'
                  }`}
                >
                  <div>
                    <div className="h-24 flex items-center justify-center mb-3">
                      <ResilientImage
                        src={heroVf6CardUrl}
                        alt="VinFast VF 6 Thế hệ mới"
                        className="max-h-20 object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[11px] font-bold text-blue-600">
                      LÝ TƯỞNG CHO GIA ĐÌNH
                    </div>
                    <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                      VF 6 Thế Hệ Mới
                    </div>
                    <div className="mt-2 space-y-1 text-xs text-slate-600 font-mono-tabular">
                      <div>
                        VF 6 Comfort: <strong className="text-slate-900">646 Triệu</strong>
                      </div>
                      <div>
                        VF 6 Premium: <strong className="text-slate-900">715 Triệu</strong>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-emerald-700 font-mono-tabular">
                      Ưu đãi cọc: -15Tr
                    </span>
                    <span className="text-blue-600 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* 3-Column Pioneer Campaign KPI Bar (Expected Delivery Removed) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200/80">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Thời gian nhận cọc Tiên phong</span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 font-mono-tabular mt-1.5">
                  12/11 – 18/11/2026
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Mức cọc: 10tr (VF 5) · 15tr (VF 6)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-semibold text-slate-500">
                  VinFast VF 5 Thế Hệ Mới (Green & Premium)
                </div>
                <div className="text-lg font-extrabold text-blue-600 font-mono-tabular mt-1.5">
                  460 – 515 Triệu đồng
                </div>
                <div className="text-xs text-emerald-700 font-bold font-mono-tabular mt-1">
                  Ưu đãi cọc Tiên phong: Giảm 10 Triệu
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-semibold text-slate-500">
                  VinFast VF 6 Thế Hệ Mới (Comfort & Premium)
                </div>
                <div className="text-lg font-extrabold text-blue-600 font-mono-tabular mt-1.5">
                  646 – 715 Triệu đồng
                </div>
                <div className="text-xs text-emerald-700 font-bold font-mono-tabular mt-1">
                  Ưu đãi cọc Tiên phong: Giảm 15 Triệu
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            DYNAMIC MODEL DETAIL SHOWCASE: HIDDEN BY DEFAULT, SHOWS ONLY VF 5 OR VF 6 WHEN CLICKED
        ===================================================================== */}
        <ModelDeepDive
          selectedDetailModel={selectedDetailModel}
          onChangeDetailModel={(m) => setSelectedDetailModel(m)}
          vehiclesData={effectiveVehiclesData}
          dealerConfig={dealerConfig}
          onSelectForStudio={(model) => setStudioModel(model)}
          onOpenBooking={(model, colorName) =>
            handleOpenDepositPopup(model, colorName)
          }
          onOpenLightbox={(url, caption) => setLightboxState({ url, caption })}
        />

        {/* =====================================================================
            GENERAL SECTION: INTERACTIVE 360 COLOR & INTERIOR STUDIO CONFIGURATOR
        ===================================================================== */}
        <StudioConfigurator
          activeModel={studioModel}
          onSelectModel={setStudioModel}
          vehiclesData={effectiveVehiclesData}
          dealerConfig={dealerConfig}
          onOpenBookingWithSelection={(model, colorName) =>
            handleOpenDepositPopup(model, colorName)
          }
          onOpenLightbox={(url, caption) => setLightboxState({ url, caption })}
        />

        {/* =====================================================================
            GENERAL SECTION: COMPLETE TECHNICAL SPECIFICATION SHEETS & COMPARISON
        ===================================================================== */}
        <SpecComparisonSection
          dealerConfig={dealerConfig}
          onOpenBooking={(model, trimOrColor) =>
            handleOpenDepositPopup(model, trimOrColor)
          }
          onOpenLightbox={(url, caption) => setLightboxState({ url, caption })}
        />
      </main>

      {/* =====================================================================
          CLEAN BRIGHT FOOTER (NO HOTLINE, WITH TINY ADMIN TRIGGER AT BOTTOM)
      ===================================================================== */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5">
                <img
                  src={VINFAST_LOGO_URL}
                  alt="VinFast Logo"
                  className="w-7 h-7 object-contain shrink-0"
                />
                <span className="text-base font-extrabold tracking-[0.16em] text-slate-900 font-display">
                  VINFAST
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                {dealerConfig.address}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Chương trình nhận cọc Tiên phong VinFast VF 5 Thế Hệ Mới & VF 6 Thế Hệ Mới từ{' '}
                {dealerConfig.pioneerStartDate} đến hết {dealerConfig.pioneerEndDate}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => handleSelectDetailModel('vf5')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                VF 5 Thế Hệ Mới
              </button>
              <button
                type="button"
                onClick={() => handleSelectDetailModel('vf6')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                VF 6 Thế Hệ Mới
              </button>
              <a
                href="#studio-configurator"
                className="hover:text-blue-600 transition-colors"
              >
                Studio Phối Màu
              </a>
              <a
                href="#spec-comparison"
                className="hidden md:inline-block hover:text-blue-600 transition-colors"
              >
                Thông Số Kỹ Thuật
              </a>
              <button
                type="button"
                onClick={() => handleOpenDepositPopup('vf6')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Đặt Cọc Tiên Phong
              </button>
            </div>
          </div>

          {/* Tiny Discreet Admin Trigger Bar at the Very Bottom (Hidden on Mobile) */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>© VinFast VF 5 Thế Hệ Mới & VF 6 Thế Hệ Mới</span>
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Mở khóa quản trị (admin)"
            >
              <Lock className="w-3 h-3" />
              <span>Quản trị</span>
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          SIMPLE POPUP MODAL FOR PIONEER DEPOSIT (/vf56moi vs /vf56new)
      ===================================================================== */}
      <DepositModal
        isOpen={depositModalState.isOpen}
        onClose={() =>
          setDepositModalState((prev) => ({ ...prev, isOpen: false }))
        }
        initialModel={depositModalState.model}
        initialTrimOrColor={depositModalState.trimOrColor}
        onSaveLead={handleSaveLead}
        routeVariant={routeVariant}
      />

      {/* =====================================================================
          TINY BOTTOM ADMIN PANEL MODAL (DYNAMIC IMAGE OVERRIDES, LEADS & LINKS)
      ===================================================================== */}
      <MiniAdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        imageOverrides={imageOverrides}
        onSaveImageOverrides={handleSaveImageOverrides}
        leads={leads}
        onClearLeads={handleClearLeads}
        routeVariant={routeVariant}
        onSwitchRouteVariant={handleSwitchRouteVariant}
      />

      {/* =====================================================================
          LIGHTBOX FULLSCREEN IMAGE VIEWER MODAL
      ===================================================================== */}
      <AnimatePresence>
        {lightboxState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxState(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setLightboxState(null)}
                className="absolute -top-12 right-0 p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <ResilientImage
                src={lightboxState.url}
                alt={lightboxState.caption}
                className="max-h-[80vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl bg-white"
              />
              <p className="mt-4 text-sm font-medium text-white text-center">
                {lightboxState.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
