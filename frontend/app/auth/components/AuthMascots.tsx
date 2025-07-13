"use client";

import Image from "next/image";
import styles from "../LoginPage.module.css";

export default function AuthMascots() {
  return (
    <div className={styles.mascotWrapper} aria-hidden="true">
      <Image
        src="/social/mascots/auth-mascots.webp"
        alt="지방청년 플랫폼 마스코트 일러스트"
        width={900}
        height={300}
        className=""
        priority
        draggable={false}
      />
    </div>
  );
}
