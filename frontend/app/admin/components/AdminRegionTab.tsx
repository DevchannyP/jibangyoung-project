"use client";

import styles from "../AdminPage.module.css";

interface RegionTabsProps {
  regions?: string[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  className?: string;
}

const defaultRegions = [
  "전체",
  "서울",
  "경기도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "강원도",
  "제주도",
];

export function RegionTabs({
  regions = defaultRegions,
  selectedRegion,
  onSelectRegion,
  className = "",
}: RegionTabsProps) {
  return (
    <div className={`${styles.regionTabs} ${className}`}>
      {regions.map((region) => (
        <button
          key={region}
          onClick={() => onSelectRegion(region)}
          className={`${styles.regionButton} ${
            selectedRegion === region ? styles.activeRegion : ""
          }`}
        >
          {region}
        </button>
      ))}
    </div>
  );
}
