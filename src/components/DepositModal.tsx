import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { VINFAST_LOGO_URL } from '../data/vehiclesData';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
}) => {
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
          <motion.div
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
