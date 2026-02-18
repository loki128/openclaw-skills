"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { regions } from "@/data/regions";

interface TooltipData {
  region: typeof regions[0];
  x: number;
  y: number;
}

export default function WorldMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const handleMouseEnter = (region: typeof regions[0], e: React.MouseEvent) => {
    setHoveredRegion(region.slug);
    setTooltip({
      region,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip) {
      setTooltip({ ...tooltip, x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
    setTooltip(null);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center">
      {/* SVG World Map */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full max-w-6xl h-auto"
        onMouseMove={handleMouseMove}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        {/* Ocean background */}
        <rect width="1000" height="500" fill="#0a0a0a"/>

        {/* Continents */}
        <g className="continents">
          {/* North America */}
          <motion.path
            d="M80,60 Q180,40 280,80 L320,140 Q240,200 140,180 Q80,140 80,60 Z"
            fill="none"
            stroke={hoveredRegion === 'america' ? '#D4AF37' : '#2a2a2a'}
            strokeWidth={hoveredRegion === 'america' ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ filter: hoveredRegion === 'america' ? 'url(#glow)' : 'none' }}
          />

          {/* South America */}
          <motion.path
            d="M220,220 Q280,220 320,280 L290,400 Q240,450 190,400 Q160,320 220,220 Z"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
          />

          {/* Europe */}
          <motion.path
            d="M420,70 Q520,50 580,100 L560,160 Q480,170 430,150 Q390,120 420,70 Z"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
          />

          {/* Africa */}
          <motion.path
            d="M440,180 Q540,170 590,230 L560,380 Q500,430 450,400 Q400,320 440,180 Z"
            fill="none"
            stroke={hoveredRegion === 'egypt' ? '#D4AF37' : '#2a2a2a'}
            strokeWidth={hoveredRegion === 'egypt' ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            style={{ filter: hoveredRegion === 'egypt' ? 'url(#glow)' : 'none' }}
          />

          {/* Asia */}
          <motion.path
            d="M580,50 Q750,30 900,100 L940,220 Q840,320 660,280 Q580,220 560,130 Q540,70 580,50 Z"
            fill="none"
            stroke={hoveredRegion === 'china' || hoveredRegion === 'turkey' || hoveredRegion === 'saudi' ? '#D4AF37' : '#2a2a2a'}
            strokeWidth={hoveredRegion === 'china' || hoveredRegion === 'turkey' || hoveredRegion === 'saudi' ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            style={{ filter: hoveredRegion === 'china' || hoveredRegion === 'turkey' || hoveredRegion === 'saudi' ? 'url(#glow)' : 'none' }}
          />

          {/* Australia */}
          <motion.path
            d="M780,320 Q880,300 940,360 L910,450 Q820,480 780,440 Q740,380 780,320 Z"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
          />
        </g>

        {/* Region markers */}
        {regions.map((region, index) => (
          <g key={region.slug}>
            {/* Pulse ring */}
            <motion.circle
              cx={region.coordinates.x * 10}
              cy={region.coordinates.y * 10}
              r="15"
              fill="none"
              stroke={region.accentColor}
              strokeWidth="1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [1, 2, 2],
                opacity: [0.8, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeOut",
              }}
            />

            {/* Marker dot */}
            <Link href={`/region/${region.slug}`}>
              <motion.circle
                cx={region.coordinates.x * 10}
                cy={region.coordinates.y * 10}
                r="8"
                fill={hoveredRegion === region.slug ? region.accentColor : '#1a1a1a'}
                stroke={region.accentColor}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                onMouseEnter={(e) => handleMouseEnter(region, e)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.5 }}
              />
            </Link>

            {/* Region label */}
            <motion.text
              x={region.coordinates.x * 10}
              y={region.coordinates.y * 10 + 25}
              textAnchor="middle"
              fill={hoveredRegion === region.slug ? region.accentColor : '#737373'}
              fontSize="10"
              fontFamily="Inter, sans-serif"
              letterSpacing="0.1em"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredRegion === region.slug ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: 'none' }}
            >
              {region.name.toUpperCase()}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltip.x + 20,
              top: tooltip.y - 20,
            }}
          >
            <div className="bg-charcoal/95 backdrop-blur-md border border-graphite rounded-lg p-4 min-w-[200px] shadow-2xl">
              <h3 className="font-display text-lg text-gold mb-1">{tooltip.region.name}</h3>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-2">{tooltip.region.nameLocal}</p>
              <p className="text-sm text-text-secondary mb-2">{tooltip.region.storyLine}</p>
              <div className="flex flex-wrap gap-1">
                {tooltip.region.signatureSweets.split(', ').slice(0, 3).map((sweet) => (
                  <span
                    key={sweet}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${tooltip.region.accentColor}20`,
                      color: tooltip.region.accentColor,
                    }}
                  >
                    {sweet}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
