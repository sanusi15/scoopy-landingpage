import React from 'react';
import { CategoryId, BrandId } from '../utils/catalogLogic';

const LOGO_ASSET_PATH =
  '/assets/aistudio/Tangkapan_Layar_2026-10-27_pukul_16.04.19_81d9f986.png';

export const ScoopyArtLogo: React.FC<{
  variant?: 'header' | 'footer';
  className?: string;
}> = ({ variant = 'header', className = '' }) => {
  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <div className="relative h-12 w-auto overflow-hidden rounded bg-white/95 px-2.5 py-1 shadow-sm">
          <img
            src={LOGO_ASSET_PATH}
            alt="Logo Scoopy Art Bekasi Monokrom"
            referrerPolicy="no-referrer"
            className="h-full w-auto object-contain grayscale contrast-150 mix-blend-multiply"
          />
        </div>
        <span className="sr-only">Scoopy Art</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={LOGO_ASSET_PATH}
        alt="Logo Scoopy Art"
        referrerPolicy="no-referrer"
        className="h-11 sm:h-12 w-auto object-contain mix-blend-multiply transition-transform duration-200 hover:scale-[1.02]"
      />
    </div>
  );
};

/**
 * Hero transparent PNG-style studio composition combining:
 * 1) Velg Racing RCB Forged Gold/Titanium
 * 2) Shockbreaker Tabung KTC Kytaco Red/Black
 * 3) Kaliper & Cakram Floating Presisi
 */
export const HeroFloatingShowcase: React.FC = () => {
  return (
    <div
      className="relative w-full max-w-[560px] mx-auto select-none"
      role="img"
      aria-label="Komposisi transparan sparepart motor Velg Racing RCB, Shockbreaker KTC Kytaco, dan Kaliper Pengereman Presisi"
    >
      {/* Subtle studio ambient glow behind transparent parts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-tr from-[#E03A3E]/8 via-neutral-200/40 to-transparent blur-3xl"
      />

      <svg
        viewBox="0 0 640 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_24px_36px_rgba(33,37,41,0.14)]"
      >
        <defs>
          {/* Gold Anodized RCB Wheel Gradient */}
          <linearGradient id="rcbGold" x1="120" y1="80" x2="420" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5D076" />
            <stop offset="35%" stopColor="#D49B2A" />
            <stop offset="70%" stopColor="#9E6E14" />
            <stop offset="100%" stopColor="#E6BA56" />
          </linearGradient>

          <linearGradient id="rcbGoldBright" x1="150" y1="100" x2="380" y2="360" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF0B8" />
            <stop offset="50%" stopColor="#D9A12E" />
            <stop offset="100%" stopColor="#8F600D" />
          </linearGradient>

          {/* Tire & Dark Matte Metal */}
          <radialGradient id="tireRubber" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="#2B3036" />
            <stop offset="92%" stopColor="#1B1E22" />
            <stop offset="100%" stopColor="#111315" />
          </radialGradient>

          {/* KTC Red Matte & Anodized Crimson */}
          <linearGradient id="ktcRed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F25256" />
            <stop offset="50%" stopColor="#E03A3E" />
            <stop offset="100%" stopColor="#9E1F22" />
          </linearGradient>

          {/* CNC Machined Titanium / Silver */}
          <linearGradient id="cncSilver" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8F9FA" />
            <stop offset="45%" stopColor="#CED4DA" />
            <stop offset="80%" stopColor="#6C757D" />
            <stop offset="100%" stopColor="#ADB5BD" />
          </linearGradient>

          <linearGradient id="cncDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#495057" />
            <stop offset="50%" stopColor="#212529" />
            <stop offset="100%" stopColor="#121417" />
          </linearGradient>

          {/* Floor soft contact shadows */}
          <radialGradient id="floorShadowMain" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#212529" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#212529" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#212529" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground Contact Shadows (Gives Floating Transparent PNG Effect) */}
        <ellipse cx="270" cy="468" rx="175" ry="22" fill="url(#floorShadowMain)" />
        <ellipse cx="475" cy="452" rx="105" ry="16" fill="url(#floorShadowMain)" />
        <ellipse cx="145" cy="445" rx="85" ry="13" fill="url(#floorShadowMain)" />

        {/* ============================================================
            1. VELG RACING RCB SP522 / SP811 FORGED ALLOY (CENTER-LEFT)
           ============================================================ */}
        <g transform="translate(255, 240)">
          {/* Outer Performance Tire */}
          <circle r="172" fill="url(#tireRubber)" />
          <circle r="164" stroke="#343A40" strokeWidth="1.5" strokeDasharray="10 8" />
          <circle r="144" fill="#16191D" />

          {/* CNC Machined Outer Rim Lip */}
          <circle r="140" fill="url(#cncSilver)" />
          <circle r="135" fill="url(#rcbGold)" />
          <circle r="124" fill="#FFFFFF" />

          {/* Inner Rim Barrel Depth */}
          <circle r="124" stroke="#8C6214" strokeWidth="6" fill="none" />

          {/* Floating Stainless Brake Disc Rotor behind Spokes */}
          <circle r="86" fill="none" stroke="url(#cncSilver)" strokeWidth="18" />
          <circle r="86" fill="none" stroke="#495057" strokeWidth="2" strokeDasharray="6 8" />
          <circle r="72" fill="none" stroke="#E03A3E" strokeWidth="4" />

          {/* 5 Split-Y Racing Spokes (RCB Forged Design) */}
          {[0, 72, 144, 216, 288].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <path
                d="M -16 -36 L -28 -124 L -12 -124 L -4 -44 Z"
                fill="url(#rcbGoldBright)"
              />
              <path
                d="M 16 -36 L 28 -124 L 12 -124 L 4 -44 Z"
                fill="url(#rcbGold)"
              />
              {/* Spoke weight-reduction pocket */}
              <path
                d="M -9 -52 L -17 -112 L -12 -112 L -5 -52 Z"
                fill="#7C540B"
                opacity="0.65"
              />
            </g>
          ))}

          {/* Center Hub CNC Machined */}
          <circle r="44" fill="url(#rcbGold)" stroke="#FFF3C4" strokeWidth="1.5" />
          <circle r="31" fill="url(#cncDark)" />
          <circle r="18" fill="url(#cncSilver)" />
          <circle r="9" fill="#212529" />

          {/* 5 Titanium Hub Bolts */}
          {[36, 108, 180, 252, 324].map((angle) => (
            <circle
              key={angle}
              cx={Math.cos((angle * Math.PI) / 180) * 37}
              cy={Math.sin((angle * Math.PI) / 180) * 37}
              r="3.2"
              fill="#F8F9FA"
            />
          ))}

          {/* RCB Rim Sticker Accent */}
          <path
            d="M -95 -96 A 135 135 0 0 1 -35 -130"
            stroke="#E03A3E"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>

        {/* ============================================================
            2. SHOCKBREAKER TABUNG KTC KYTACO EXTREME (RIGHT FLOATING)
           ============================================================ */}
        <g transform="translate(472, 235) rotate(14)">
          {/* Piggyback Nitrogen Gas Reservoir (Tabung Atas/Bawah) */}
          <g transform="translate(46, -95)">
            <rect
              x="-22"
              y="-48"
              width="44"
              height="108"
              rx="14"
              fill="url(#cncDark)"
              stroke="#495057"
              strokeWidth="1.5"
            />
            {/* Gold & Red Anodized Reservoir Cap */}
            <rect x="-20" y="-54" width="40" height="14" rx="5" fill="url(#rcbGold)" />
            <rect x="-14" y="56" width="28" height="10" rx="4" fill="url(#ktcRed)" />
            {/* Carbon texture band */}
            <rect x="-22" y="-18" width="44" height="44" fill="#181A1D" />
            <line x1="-22" y1="-18" x2="22" y2="-18" stroke="#D49B2A" strokeWidth="2" />
            <line x1="-22" y1="26" x2="22" y2="26" stroke="#E03A3E" strokeWidth="2" />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill="#F8F9FA"
              fontSize="11"
              fontWeight="800"
              fontFamily="Outfit, sans-serif"
              letterSpacing="1.5"
            >
              KTC
            </text>
          </g>

          {/* Bridge Hose / CNC Manifold */}
          <path
            d="M 0 -115 L 36 -115"
            stroke="url(#cncSilver)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Top Mounting Eye (CNC Aluminum) */}
          <path
            d="M -18 -135 L 18 -135 L 22 -105 L -22 -105 Z"
            fill="url(#cncDark)"
          />
          <circle cx="0" cy="-152" r="22" fill="url(#cncSilver)" />
          <circle cx="0" cy="-152" r="11" fill="#FFFFFF" stroke="#495057" strokeWidth="2" />

          {/* Preload Adjuster Ring */}
          <rect x="-30" y="-104" width="60" height="14" rx="4" fill="url(#rcbGold)" />

          {/* Main Damper Shaft (Chrome Rod) */}
          <rect x="-11" y="-90" width="22" height="215" fill="url(#cncSilver)" />
          <rect x="-20" y="-90" width="40" height="70" fill="url(#cncDark)" />

          {/* Progressive Red Matte Coil Spring (KTC Signature) */}
          {[-72, -44, -16, 12, 40, 68, 96].map((yPos, idx) => (
            <g key={idx}>
              {/* Back coil turn */}
              <path
                d={`M -34 ${yPos - 10} L 34 ${yPos - 22}`}
                stroke="#8F1D20"
                strokeWidth="15"
                strokeLinecap="round"
              />
              {/* Front coil turn */}
              <path
                d={`M -36 ${yPos - 10} L 36 ${yPos + 4}`}
                stroke="url(#ktcRed)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Specular studio highlight on spring */}
              <path
                d={`M -28 ${yPos - 9} L 24 ${yPos + 1}`}
                stroke="#FF8588"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>
          ))}

          {/* Lower Spring Perch & Rebound Click Adjuster */}
          <rect x="-30" y="114" width="60" height="12" rx="4" fill="url(#cncDark)" />
          <polygon points="-14,126 14,126 18,144 -18,144" fill="url(#ktcRed)" />
          <circle cx="0" cy="135" r="5" fill="url(#rcbGold)" />

          {/* Lower Clevis Mount */}
          <path
            d="M -18 144 L 18 144 L 18 182 L 8 182 L 8 156 L -8 156 L -8 182 L -18 182 Z"
            fill="url(#cncSilver)"
          />
        </g>

        {/* ============================================================
            3. KALIPER REM 4-PISTON CNC & MASTER REM (BOTTOM-LEFT FOREGROUND)
           ============================================================ */}
        <g transform="translate(135, 360) rotate(-10)">
          {/* CNC Monoblock Caliper Body */}
          <rect
            x="-68"
            y="-42"
            width="136"
            height="78"
            rx="22"
            fill="url(#cncDark)"
            stroke="#6C757D"
            strokeWidth="1.5"
          />
          <rect
            x="-52"
            y="-30"
            width="104"
            height="54"
            rx="14"
            fill="#2B3036"
          />
          {/* Dual Machined Piston Caps in Red Anodized */}
          <circle cx="-24" cy="-3" r="18" fill="url(#ktcRed)" />
          <circle cx="-24" cy="-3" r="10" fill="url(#rcbGold)" />
          <circle cx="24" cy="-3" r="18" fill="url(#ktcRed)" />
          <circle cx="24" cy="-3" r="10" fill="url(#rcbGold)" />

          {/* Titanium Banjo & Torx Bolts */}
          <circle cx="-54" cy="-24" r="4.5" fill="url(#cncSilver)" />
          <circle cx="54" cy="-24" r="4.5" fill="url(#cncSilver)" />
          <circle cx="-54" cy="20" r="4.5" fill="url(#cncSilver)" />
          <circle cx="54" cy="20" r="4.5" fill="url(#cncSilver)" />

          {/* RCB Engraving Plate */}
          <rect x="-22" y="-36" width="44" height="12" rx="3" fill="#E03A3E" />
          <text
            x="0"
            y="-27"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8.5"
            fontWeight="800"
            fontFamily="Outfit, sans-serif"
            letterSpacing="1"
          >
            RCB
          </text>
        </g>
      </svg>

      {/* Clean floating specification callouts (unboxed editorial typography, zero pill clutter) */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-500">
        <span className="font-medium text-[#212529]">Velg RCB Forged Alloy</span>
        <span aria-hidden="true">·</span>
        <span className="font-medium text-[#212529]">Shockbreaker KTC Extreme</span>
        <span aria-hidden="true">·</span>
        <span className="font-medium text-[#212529]">Kaliper Radial CNC</span>
      </div>
    </div>
  );
};

/**
 * Pure transparent PNG-style product visual for each of the 5 sparepart categories
 */
export const CategoryProductVisual: React.FC<{
  categoryId: CategoryId;
  className?: string;
}> = ({ categoryId, className = '' }) => {
  switch (categoryId) {
    case 'velg':
      return (
        <svg
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(33,37,41,0.12)] ${className}`}
          role="img"
          aria-label="Gambar PNG Transparan Velg Racing RCB"
        >
          <ellipse cx="130" cy="202" rx="76" ry="9" fill="#212529" opacity="0.14" />
          <g transform="translate(130, 104)">
            <circle r="82" fill="#1E2227" />
            <circle r="72" fill="#D49B2A" />
            <circle r="65" fill="#F4CC70" />
            <circle r="58" fill="#FFFFFF" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path d="M -5 -18 L -8 -60 L 8 -60 L 5 -18 Z" fill="#D49B2A" />
                <path d="M -2 -20 L -4 -58 L 2 -58 L 1 -20 Z" fill="#FFF0B8" opacity="0.7" />
              </g>
            ))}
            <circle r="22" fill="#212529" />
            <circle r="14" fill="#D49B2A" />
            <circle r="6" fill="#F8F9FA" />
            <path d="M -50 -50 A 70 70 0 0 1 -18 -68" stroke="#E03A3E" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'shockbreaker':
      return (
        <svg
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(33,37,41,0.12)] ${className}`}
          role="img"
          aria-label="Gambar PNG Transparan Shockbreaker Tabung KTC"
        >
          <ellipse cx="130" cy="202" rx="64" ry="9" fill="#212529" opacity="0.14" />
          <g transform="translate(122, 104) rotate(16)">
            {/* Piggyback reservoir */}
            <rect x="20" y="-58" width="24" height="58" rx="8" fill="#212529" />
            <rect x="21" y="-62" width="22" height="8" rx="3" fill="#D49B2A" />
            <rect x="6" y="-52" width="18" height="10" rx="3" fill="#ADB5BD" />
            {/* Top Eye */}
            <circle cx="0" cy="-70" r="12" fill="#ADB5BD" />
            <circle cx="0" cy="-70" r="5" fill="#FFFFFF" />
            <rect x="-16" y="-56" width="32" height="8" rx="3" fill="#D49B2A" />
            {/* Inner Chrome Rod */}
            <rect x="-6" y="-48" width="12" height="110" fill="#DEE2E6" />
            {/* Red Coil Spring */}
            {[-38, -20, -2, 16, 34, 52].map((y, i) => (
              <path
                key={i}
                d={`M -20 ${y - 5} L 20 ${y + 3}`}
                stroke="#E03A3E"
                strokeWidth="10"
                strokeLinecap="round"
              />
            ))}
            {/* Bottom Mount */}
            <rect x="-16" y="60" width="32" height="8" rx="3" fill="#212529" />
            <polygon points="-9,68 9,68 12,80 -12,80" fill="#E03A3E" />
            <rect x="-10" y="80" width="20" height="16" rx="3" fill="#ADB5BD" />
          </g>
        </svg>
      );

    case 'pengereman':
      return (
        <svg
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(33,37,41,0.12)] ${className}`}
          role="img"
          aria-label="Gambar PNG Transparan Master Rem & Kaliper"
        >
          <ellipse cx="130" cy="202" rx="76" ry="9" fill="#212529" opacity="0.14" />
          {/* Floating Brake Disc Back */}
          <g transform="translate(112, 102)">
            <circle r="64" fill="none" stroke="#CED4DA" strokeWidth="16" />
            <circle r="64" fill="none" stroke="#495057" strokeWidth="2" strokeDasharray="5 7" />
            <circle r="48" fill="none" stroke="#D49B2A" strokeWidth="6" />
            <circle r="24" fill="#212529" />
            <circle r="12" fill="#FFFFFF" />
          </g>
          {/* Radial Caliper Foreground */}
          <g transform="translate(158, 124) rotate(-12)">
            <rect x="-46" y="-28" width="92" height="56" rx="16" fill="#212529" />
            <circle cx="-16" cy="0" r="13" fill="#E03A3E" />
            <circle cx="-16" cy="0" r="6" fill="#D49B2A" />
            <circle cx="16" cy="0" r="13" fill="#E03A3E" />
            <circle cx="16" cy="0" r="6" fill="#D49B2A" />
            <rect x="-16" y="-24" width="32" height="9" rx="2" fill="#E03A3E" />
          </g>
        </svg>
      );

    case 'cvt':
      return (
        <svg
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(33,37,41,0.12)] ${className}`}
          role="img"
          aria-label="Gambar PNG Transparan Van Belt & Roller CVT"
        >
          <ellipse cx="130" cy="202" rx="82" ry="9" fill="#212529" opacity="0.14" />
          {/* Kevlar V-Belt Loop */}
          <path
            d="M 65 72 A 42 42 0 1 0 65 156 L 185 142 A 28 28 0 1 0 185 86 Z"
            fill="none"
            stroke="#212529"
            strokeWidth="14"
            strokeLinejoin="round"
          />
          <path
            d="M 65 72 A 42 42 0 1 0 65 156 L 185 142 A 28 28 0 1 0 185 86 Z"
            fill="none"
            stroke="#E03A3E"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          {/* CNC Custom Pulley Rumah Roller */}
          <g transform="translate(86, 114)">
            <circle r="44" fill="#CED4DA" stroke="#6C757D" strokeWidth="2" />
            <circle r="34" fill="#F8F9FA" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <rect
                key={deg}
                x="-4"
                y="-30"
                width="8"
                height="14"
                rx="3"
                fill="#E03A3E"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle r="12" fill="#212529" />
            <circle r="5" fill="#FFFFFF" />
          </g>
          {/* Racing Rollers Foreground */}
          <g transform="translate(176, 134)">
            <circle cx="-14" cy="10" r="14" fill="#212529" />
            <circle cx="-14" cy="10" r="8" fill="#D49B2A" />
            <circle cx="-14" cy="10" r="4" fill="#FFFFFF" />

            <circle cx="14" cy="14" r="14" fill="#212529" />
            <circle cx="14" cy="14" r="8" fill="#E03A3E" />
            <circle cx="14" cy="14" r="4" fill="#FFFFFF" />

            <circle cx="4" cy="-12" r="14" fill="#212529" />
            <circle cx="4" cy="-12" r="8" fill="#D49B2A" />
            <circle cx="4" cy="-12" r="4" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'aksesoris':
      return (
        <svg
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full object-contain drop-shadow-[0_14px_20px_rgba(33,37,41,0.12)] ${className}`}
          role="img"
          aria-label="Gambar PNG Transparan Spion CNC & Handgrip"
        >
          <ellipse cx="130" cy="202" rx="78" ry="9" fill="#212529" opacity="0.14" />
          {/* CNC Bar-End Round Mirror */}
          <g transform="translate(96, 86)">
            <circle r="42" fill="#212529" stroke="#ADB5BD" strokeWidth="3" />
            <circle r="35" fill="#DBE4FF" />
            {/* Anti-glare blue reflection */}
            <path d="M -22 -18 L 12 -28 L -14 24 Z" fill="#FFFFFF" opacity="0.65" />
            {/* CNC Stem Arm */}
            <path d="M 26 32 L 58 68 L 46 74 L 16 38 Z" fill="#212529" />
            <circle cx="52" cy="70" r="9" fill="#E03A3E" />
          </g>
          {/* Racing Handgrip + CNC Balancer */}
          <g transform="translate(136, 152) rotate(-14)">
            <rect x="-58" y="-14" width="16" height="28" rx="4" fill="#D49B2A" />
            <rect x="-42" y="-16" width="88" height="32" rx="6" fill="#212529" />
            {/* Grip diamond pattern */}
            {[-28, -12, 4, 20, 36].map((x) => (
              <rect key={x} x={x} y="-12" width="8" height="24" rx="2" fill="#E03A3E" />
            ))}
            {/* CNC Bar End Jalu Stang */}
            <rect x="46" y="-12" width="18" height="24" rx="5" fill="#ADB5BD" />
            <rect x="64" y="-9" width="8" height="18" rx="3" fill="#E03A3E" />
          </g>
        </svg>
      );
  }
};

/**
 * Symmetrical Brand Partner Logo (RCB, KTC, KTM)
 * Soft grayscale by default, transitions to full vibrant brand colors on hover/active
 */
export const BrandPartnerLogo: React.FC<{
  brand: BrandId;
  active?: boolean;
}> = ({ brand, active = false }) => {
  if (brand === 'RCB') {
    return (
      <svg
        viewBox="0 0 220 72"
        className="h-14 w-auto select-none"
        role="img"
        aria-label="Logo Resmi RCB Racing Boy"
      >
        <rect
          x="10"
          y="10"
          width="200"
          height="52"
          rx="8"
          fill={active ? '#E03A3E' : 'currentColor'}
          className="transition-colors duration-300 group-hover:fill-[#E03A3E]"
        />
        <path
          d="M 24 50 L 38 22 L 196 22 L 182 50 Z"
          fill="#181A1D"
          opacity="0.18"
        />
        <text
          x="110"
          y="46"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="30"
          fontWeight="800"
          fontStyle="italic"
          fontFamily="Outfit, sans-serif"
          letterSpacing="3"
        >
          RCB
        </text>
      </svg>
    );
  }

  if (brand === 'KTC') {
    return (
      <svg
        viewBox="0 0 220 72"
        className="h-14 w-auto select-none"
        role="img"
        aria-label="Logo Resmi KTC Kytaco"
      >
        <rect
          x="10"
          y="10"
          width="200"
          height="52"
          rx="8"
          fill="#212529"
        />
        <rect
          x="14"
          y="14"
          width="86"
          height="44"
          rx="5"
          fill={active ? '#D49B2A' : '#6C757D'}
          className="transition-colors duration-300 group-hover:fill-[#D49B2A]"
        />
        <text
          x="57"
          y="45"
          textAnchor="middle"
          fill="#212529"
          fontSize="26"
          fontWeight="800"
          fontFamily="Outfit, sans-serif"
          letterSpacing="1.5"
        >
          KTC
        </text>
        <text
          x="152"
          y="42"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="16"
          fontWeight="700"
          fontFamily="Outfit, sans-serif"
          letterSpacing="2"
        >
          KYTACO
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 72"
      className="h-14 w-auto select-none"
      role="img"
      aria-label="Logo Resmi KTM Racing Parts"
    >
      <rect
        x="10"
        y="10"
        width="200"
        height="52"
        rx="8"
        fill={active ? '#FF6600' : 'currentColor'}
        className="transition-colors duration-300 group-hover:fill-[#FF6600]"
      />
      <text
        x="110"
        y="46"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="30"
        fontWeight="800"
        fontStyle="italic"
        fontFamily="Outfit, sans-serif"
        letterSpacing="3.5"
      >
        KTM
      </text>
    </svg>
  );
};
