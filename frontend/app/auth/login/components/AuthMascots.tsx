"use client";
import Image from "next/image";
import styles from "../LoginPage.module.css";

export default function AuthMascots() {
  return (
    <Image
      src="/social/mascots/auth-mascots.webp"
      alt="지방청년 플랫폼 마스코트 일러스트"
      width={900}      // 실제 이미지의 원본 크기와 맞춰서 지정 (반드시 필요)
      height={300}
      priority         // LCP 최적화: 첫 화면 주요 이미지라면 필수!
      draggable={false}
      className={styles.mascotImg}
      aria-hidden="true"
      // placeholder="blur" // (선택) 블러 프리로드, /public에 blurDataURL 자동 적용
    />
  );
}
