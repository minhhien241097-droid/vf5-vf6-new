import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Image as ImageIcon,
  Users,
  Check,
  RotateCcw,
  Upload,
  Trash2,
  Lock,
  LogOut,
  KeyRound,
  User,
  Link2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  AVAILABLE_ASSET_LIBRARY,
  VEHICLES_DATA,
  ImageOverridesMap,
  CustomerLead,
} from '../data/vehiclesData';
import { ResilientImage } from './ResilientImage';
import { SiteRouteVariant } from './DepositModal';

interface MiniAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageOverrides: ImageOverridesMap;
  onSaveImageOverrides: (newOverrides: ImageOverridesMap) => void;
  leads: CustomerLead[];
  onClearLeads: () => void;
  routeVariant: SiteRouteVariant;
  onSwitchRouteVariant: (variant: SiteRouteVariant) => void;
}

interface ImageSlotItem {
  key: string;
  label: string;
  defaultUrl: string;
}

const IMAGE_SLOTS: ImageSlotItem[] = [
  {
    key: 'hero.mainBanner',
    label: 'Banner Chính Thức Mở Cọc (Đầu trang)',
    defaultUrl: '/vinfast-mo-coc-banner.jpg',
  },
  {
    key: 'hero.vf5Card',
    label: 'Ảnh đại diện Thẻ VF 5 Mới (Đầu trang)',
    defaultUrl: '/drive-assets/xe-dien-vinfast-vf5-np-phien-ban-premium-desktop.webp',
  },
  {
    key: 'hero.vf6Card',
    label: 'Ảnh đại diện Thẻ VF 6 Mới (Đầu trang)',
    defaultUrl: '/drive-assets/hinh-anh-vinfast-vf6-all-new-ngoai-that-mau-trang-desktop.webp',
  },
  {
    key: 'vf5.heroDesktopImage',
    label: 'Banner Lớn Chi Tiết VF 5 Thế Hệ Mới',
    defaultUrl: VEHICLES_DATA.vf5.heroDesktopImage,
  },
  {
    key: 'vf6.heroDesktopImage',
    label: 'Banner Lớn Chi Tiết VF 6 Thế Hệ Mới',
    defaultUrl: VEHICLES_DATA.vf6.heroDesktopImage,
  },
  ...VEHICLES_DATA.vf5.exteriorColors.map((c) => ({
    key: `vf5.color.${c.id}`,
    label: `VF 5 Mới - Màu ${c.name}`,
    defaultUrl: c.studioImage,
  })),
  ...VEHICLES_DATA.vf6.exteriorColors.map((c) => ({
    key: `vf6.color.${c.id}`,
    label: `VF 6 Mới - Màu ${c.name}`,
    defaultUrl: c.studioImage,
  })),
];

export const MiniAdminModal: React.FC<MiniAdminModalProps> = ({
  isOpen,
  onClose,
  imageOverrides,
  onSaveImageOverrides,
  leads,
  onClearLeads,
  routeVariant,
  onSwitchRouteVariant,
}) => {
  // Authentication state (requires admin / 12345)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'images' | 'leads' | 'links'>('images');
  const [selectedSlotKey, setSelectedSlotKey] = useState<string>(IMAGE_SLOTS[0].key);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [savedNotice, setSavedNotice] = useState<string>('');

  const currentSlot =
    IMAGE_SLOTS.find((s) => s.key === selectedSlotKey) || IMAGE_SLOTS[0];
  const currentSlotEffectiveUrl =
    imageOverrides[currentSlot.key]?.trim() || currentSlot.defaultUrl;

  const showTempNotice = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(''), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password === '12345') {
      setIsAuthenticated(true);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  const handleLockLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setLoginError('');
  };

  const handleApplySlotUrl = (url: string) => {
    const clean = url.trim();
    if (!clean) return;
    const next = { ...imageOverrides, [selectedSlotKey]: clean };
    onSaveImageOverrides(next);
    setCustomUrlInput('');
    showTempNotice(`Đã thay đổi hình ảnh: ${currentSlot.label}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleApplySlotUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetSingleSlot = (key: string) => {
    const next = { ...imageOverrides };
    delete next[key];
    onSaveImageOverrides(next);
    showTempNotice('Đã khôi phục ảnh mặc định cho vị trí này.');
  };

  const handleResetAllImages = () => {
    onSaveImageOverrides({});
    showTempNotice('Đã khôi phục toàn bộ hình ảnh về mặc định.');
  };

  const originUrl =
    typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyLink = (path: string) => {
    const fullUrl = `${originUrl}${path}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    showTempNotice(`Đã sao chép đường dẫn: ${fullUrl}`);
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
          {!isAuthenticated ? (
            /* ===============================================================
               LOCK LOGIN GATE (ADMIN / 12345)
            =============================================================== */
            <motion.div
              key="admin-login-box"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold">Mở Khóa Quản Trị</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Tên đăng nhập</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    autoFocus
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                    <span>Mật khẩu</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    required
                  />
                </div>

                {loginError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Đăng Nhập Quản Trị
                </button>
              </form>
            </motion.div>
          ) : (
            /* ===============================================================
               UNLOCKED ADMIN PANEL
            =============================================================== */
            <motion.div
              key="admin-main-panel"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[88vh] rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold">
                    Quản Trị Website: Thay Đổi Hình Ảnh, Khách Hàng & 2 Link Chia Sẻ
                  </h3>
                  <p className="text-xs text-slate-400">
                    Linh động thay đổi hình ảnh, xem khách hàng đăng ký cọc và chuyển đổi 2 link /vf56moi & /vf56new
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLockLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                    title="Khóa lại bảng quản trị"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Khóa lại</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setActiveTab('images')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'images'
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>1. Thay Đổi Hình Ảnh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('leads')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'leads'
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>2. Khách Hàng Đăng Ký ({leads.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('links')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'links'
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    <span>3. Hai Link (/vf56moi & /vf56new)</span>
                  </button>
                </div>

                {savedNotice && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg mb-2">
                    <Check className="w-3.5 h-3.5" />
                    <span>{savedNotice}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-5">
                {activeTab === 'images' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Select Slot & Preview */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Chọn vị trí ảnh trên Website cần thay đổi:
                        </label>
                        <select
                          value={selectedSlotKey}
                          onChange={(e) => setSelectedSlotKey(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600"
                        >
                          {IMAGE_SLOTS.map((slot) => (
                            <option key={slot.key} value={slot.key}>
                              {slot.label}{' '}
                              {imageOverrides[slot.key] ? '(Đã tùy chỉnh)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-between">
                          <span>Ảnh đang hiển thị ở vị trí này:</span>
                          {imageOverrides[selectedSlotKey] && (
                            <button
                              type="button"
                              onClick={() => handleResetSingleSlot(selectedSlotKey)}
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Khôi phục gốc</span>
                            </button>
                          )}
                        </div>
                        <div className="h-44 rounded-lg overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
                          <ResilientImage
                            src={currentSlotEffectiveUrl}
                            alt={currentSlot.label}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Upload from device or Paste URL */}
                      <div className="space-y-3 pt-2 border-t border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cách 1: Tải ảnh trực tiếp từ máy tính / điện thoại
                          </label>
                          <label className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Chọn File Ảnh Từ Thiết Bị</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cách 2: Dán đường dẫn (URL) hình ảnh bất kỳ
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={customUrlInput}
                              onChange={(e) => setCustomUrlInput(e.target.value)}
                              placeholder="https://... hoặc /drive-assets/..."
                              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                            />
                            <button
                              type="button"
                              onClick={() => handleApplySlotUrl(customUrlInput)}
                              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 cursor-pointer"
                            >
                              Áp dụng
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleResetAllImages}
                          className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Khôi phục tất cả ảnh về mặc định ban đầu</span>
                        </button>
                      </div>
                    </div>

                    {/* Right: Visual Asset Picker from Drive Library */}
                    <div className="lg:col-span-7">
                      <div className="text-xs font-bold text-slate-700 mb-2">
                        Cách 3: Chọn nhanh từ Kho Ảnh VinFast có sẵn (Bấm vào ảnh để thay thế ngay):
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto p-1">
                        {AVAILABLE_ASSET_LIBRARY.map((item) => {
                          const isCurrent = currentSlotEffectiveUrl === item.url;
                          return (
                            <button
                              key={item.url}
                              type="button"
                              onClick={() => handleApplySlotUrl(item.url)}
                              className={`group rounded-xl border p-2 text-left transition-all flex flex-col justify-between cursor-pointer ${
                                isCurrent
                                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                                  : 'border-slate-200 hover:border-blue-400 bg-white'
                              }`}
                            >
                              <div className="h-20 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center mb-1.5">
                                <ResilientImage
                                  src={item.url}
                                  alt={item.label}
                                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="text-[11px] font-semibold text-slate-700 line-clamp-1">
                                {item.label}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'leads' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-600">
                        Danh sách khách hàng đăng ký từ Popup Đặt Cọc Tiên Phong (/vf56moi):
                      </div>
                      {leads.length > 0 && (
                        <button
                          type="button"
                          onClick={onClearLeads}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xoá danh sách</span>
                        </button>
                      )}
                    </div>

                    {leads.length === 0 ? (
                      <div className="py-12 text-center rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                        Chưa có khách hàng nào để lại thông tin trong phiên này.
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                              <th className="py-2.5 px-3">Thời gian</th>
                              <th className="py-2.5 px-3">Khách hàng</th>
                              <th className="py-2.5 px-3">Số điện thoại</th>
                              <th className="py-2.5 px-3">Tỉnh thành</th>
                              <th className="py-2.5 px-3">Dòng xe & Màu</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {leads.map((lead) => (
                              <tr key={lead.id} className="hover:bg-slate-50">
                                <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                                  {lead.createdAt}
                                </td>
                                <td className="py-2.5 px-3 font-bold text-slate-900">
                                  {lead.customerName}
                                </td>
                                <td className="py-2.5 px-3 font-mono-tabular font-bold text-blue-600">
                                  {lead.phone}
                                </td>
                                <td className="py-2.5 px-3 text-slate-700">
                                  {lead.province}
                                </td>
                                <td className="py-2.5 px-3 text-slate-800">
                                  {lead.vehicleLine} · {lead.vehicleColor}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'links' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Link 1: /vf56moi */}
                    <div
                      className={`p-5 rounded-2xl border transition-all ${
                        routeVariant === 'vf56moi'
                          ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                          Link 1 · Có Form Đăng Ký
                        </span>
                        {routeVariant === 'vf56moi' && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            Đang xem
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-slate-900 font-mono-tabular">
                        /vf56moi
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Khi bấm <strong>Đặt Cọc Tiên Phong</strong>, hệ thống mở Popup điền thông tin khách hàng (Dòng xe, Màu xe, Họ tên, SĐT, Tỉnh thành).
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyLink('/vf56moi')}
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép link</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onSwitchRouteVariant('vf56moi');
                            showTempNotice('Đã chuyển sang chế độ /vf56moi');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Mở /vf56moi</span>
                        </button>
                      </div>
                    </div>

                    {/* Link 2: /vf56new */}
                    <div
                      className={`p-5 rounded-2xl border transition-all ${
                        routeVariant === 'vf56new'
                          ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                          Link 2 · Dùng Chung Showroom
                        </span>
                        {routeVariant === 'vf56new' && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            Đang xem
                          </span>
                        )}
                      </div>
                      <div className="text-base font-extrabold text-slate-900 font-mono-tabular">
                        /vf56new
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        Khi bấm <strong>Đặt Cọc Tiên Phong</strong>, hệ thống mở Popup hiển thị Logo VinFast và dòng chữ: <em>“Liên hệ Showroom VinFast gần nhất để được hỗ trợ”</em>.
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopyLink('/vf56new')}
                          className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép link</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onSwitchRouteVariant('vf56new');
                            showTempNotice('Đã chuyển sang chế độ /vf56new');
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Mở /vf56new</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
