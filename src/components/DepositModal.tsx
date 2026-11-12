import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  MapPin,
  Car,
  Palette,
} from 'lucide-react';
import {
  VEHICLES_DATA,
  PROVINCE_OPTIONS,
  VINFAST_LOGO_URL,
  CustomerLead,
} from '../data/vehiclesData';

export type SiteRouteVariant = 'vf56moi' | 'vf56new';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialModel?: 'vf5' | 'vf6';
  initialTrimOrColor?: string;
  onSaveLead: (lead: Omit<CustomerLead, 'id' | 'createdAt'>) => void;
  routeVariant?: SiteRouteVariant;
}

const VEHICLE_LINE_OPTIONS = [
  {
    id: 'VF 5 Green',
    label: 'VF 5 Thế Hệ Mới - Bản Green (460 Triệu)',
    modelKey: 'vf5' as const,
  },
  {
    id: 'VF 5 Premium',
    label: 'VF 5 Thế Hệ Mới - Bản Premium (515 Triệu)',
    modelKey: 'vf5' as const,
  },
  {
    id: 'VF 6 Comfort',
    label: 'VF 6 Thế Hệ Mới - Bản Comfort (646 Triệu)',
    modelKey: 'vf6' as const,
  },
  {
    id: 'VF 6 Premium',
    label: 'VF 6 Thế Hệ Mới - Bản Premium (715 Triệu)',
    modelKey: 'vf6' as const,
  },
];

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  initialModel = 'vf6',
  initialTrimOrColor,
  onSaveLead,
  routeVariant = 'vf56moi',
}) => {
  const [vehicleLine, setVehicleLine] = useState<string>('VF 6 Premium');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [province, setProvince] = useState<string>(PROVINCE_OPTIONS[0]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeModelKey: 'vf5' | 'vf6' = vehicleLine.startsWith('VF 5')
    ? 'vf5'
    : 'vf6';
  const currentVehicle = VEHICLES_DATA[activeModelKey];

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setErrorMsg('');

    // Determine initial vehicle line
    let targetLine = initialModel === 'vf5' ? 'VF 5 Premium' : 'VF 6 Premium';
    if (initialTrimOrColor) {
      const matchedTrim = VEHICLE_LINE_OPTIONS.find(
        (opt) => opt.id.toLowerCase() === initialTrimOrColor.toLowerCase()
      );
      if (matchedTrim) {
        targetLine = matchedTrim.id;
      }
    }
    setVehicleLine(targetLine);

    const modelKey = targetLine.startsWith('VF 5') ? 'vf5' : 'vf6';
    const colors = VEHICLES_DATA[modelKey].exteriorColors;
    const matchedColor = initialTrimOrColor
      ? colors.find((c) => c.name === initialTrimOrColor)
      : undefined;

    setSelectedColor(matchedColor ? matchedColor.name : colors[0].name);
  }, [isOpen, initialModel, initialTrimOrColor]);

  // Keep color valid when switching between VF 5 and VF 6
  const handleChangeVehicleLine = (newLine: string) => {
    setVehicleLine(newLine);
    const nextModelKey = newLine.startsWith('VF 5') ? 'vf5' : 'vf6';
    const nextColors = VEHICLES_DATA[nextModelKey].exteriorColors;
    if (!nextColors.some((c) => c.name === selectedColor)) {
      setSelectedColor(nextColors[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = customerName.trim();
    const cleanPhone = phone.replace(/\s+/g, '');

    if (!cleanName) {
      setErrorMsg('Vui lòng nhập họ và tên của anh/chị.');
      return;
    }

    if (!/^(0|\+84)[0-9]{8,10}$/.test(cleanPhone)) {
      setErrorMsg('Vui lòng nhập số điện thoại hợp lệ (10 chữ số).');
      return;
    }

    onSaveLead({
      source: 'deposit-popup',
      customerName: cleanName,
      phone: cleanPhone,
      province,
      vehicleLine,
      vehicleColor: selectedColor,
    });

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          {routeVariant === 'vf56new' ? (
            /* ===============================================================
               VARIANT /vf56new: POPUP WITH LOGO + SHOWROOM MESSAGE ONLY
            =============================================================== */
            <motion.div
              key="vf56new-popup"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-center p-7 sm:p-8"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              {/* VinFast Logo Centerpiece */}
              <div className="flex flex-col items-center justify-center pt-2 pb-5 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-3 shadow-2xs">
                  <img
                    src={VINFAST_LOGO_URL}
                    alt="VinFast Logo"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <span className="text-xl font-extrabold tracking-[0.2em] text-slate-900 font-display">
                  VINFAST
                </span>
              </div>

              {/* Message Below Logo */}
              <div className="py-6 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Đặt Cọc Tiên Phong VF 5 Mới & VF 6 Mới
                </p>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  Liên hệ Showroom VinFast gần nhất để được hỗ trợ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Quý khách vui lòng ghé thăm hoặc liên hệ trực tiếp Showroom / Đại lý phân phối VinFast gần nhất trên toàn quốc để được tư vấn chi tiết và hỗ trợ đặt cọc Tiên phong.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm shadow-blue-600/20"
              >
                Đã Hiểu & Đóng
              </button>
            </motion.div>
          ) : (
            /* ===============================================================
               VARIANT /vf56moi: STANDARD REGISTRATION FORM POPUP
            =============================================================== */
            <motion.div
              key="vf56moi-popup"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="flex items-center gap-2.5">
                  <img
                    src={VINFAST_LOGO_URL}
                    alt="VinFast Logo"
                    className="w-7 h-7 object-contain brightness-125"
                  />
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight">
                      Đăng Ký Đặt Cọc Tiên Phong
                    </h3>
                    <p className="text-[11px] text-blue-100">
                      Ưu đãi giảm 10 Triệu (VF 5 Mới) · Giảm 15 Triệu (VF 6 Mới)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {submitted ? (
                  <div className="py-6 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">
                        Đăng Ký Cọc Tiên Phong Thành Công!
                      </h4>
                      <p className="text-sm text-slate-600 mt-1.5">
                        Cảm ơn anh/chị{' '}
                        <strong className="text-slate-900">{customerName}</strong>.
                        Thông tin đăng ký dòng xe{' '}
                        <strong className="text-blue-600">{vehicleLine}</strong> (
                        {selectedColor}) tại{' '}
                        <strong className="text-slate-900">{province}</strong> đã
                        được ghi nhận. Chuyên viên sẽ liên hệ số{' '}
                        <strong className="text-slate-900">{phone}</strong> ngay để
                        hỗ trợ thủ tục cọc Tiên phong.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Hoàn tất & Đóng
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 1. Dòng xe */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <Car className="w-3.5 h-3.5 text-blue-600" />
                        <span>Dòng xe lựa chọn</span>
                      </label>
                      <select
                        value={vehicleLine}
                        onChange={(e) => handleChangeVehicleLine(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      >
                        {VEHICLE_LINE_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Màu xe */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <Palette className="w-3.5 h-3.5 text-blue-600" />
                        <span>Màu ngoại thất ({currentVehicle.shortName})</span>
                      </label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      >
                        {currentVehicle.exteriorColors.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 3. Tên khách hàng */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>Họ và tên khách hàng</span>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nhập họ và tên của anh/chị"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                        required
                      />
                    </div>

                    {/* 4. Số điện thoại & 5. Tỉnh thành */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                          <span>Số điện thoại</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono-tabular"
                          required
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-blue-600" />
                          <span>Tỉnh / Thành phố</span>
                        </label>
                        <select
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                        >
                          {PROVINCE_OPTIONS.map((prov) => (
                            <option key={prov} value={prov}>
                              {prov}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                        {errorMsg}
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
                      >
                        <span>Xác Nhận Đăng Ký Cọc Tiên Phong</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
