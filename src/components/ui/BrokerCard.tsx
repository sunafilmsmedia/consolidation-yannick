"use client";

import { useEffect, useState } from "react";
import { calculatorConfig } from "@/lib/config";

// Photo du courtier : dépose le fichier dans public/broker-photo.jpg.
// Tant qu'il n'existe pas, les initiales s'affichent à la place (fallback
// ci-dessous). La photo n'est tentée qu'après le montage client : testée en
// SSR, une <img> 404 avant l'hydratation React ne déclenche jamais onError
// (l'écouteur n'est pas encore attaché) et affiche l'icône d'image cassée du
// navigateur à la place du fallback — bug vu à l'écran, pas dans le JSX.
const PHOTO_SRC = "/broker-photo.jpg";

const initials = calculatorConfig.brokerName
  .split(" ")
  .map((part) => part[0])
  .join("")
  .toUpperCase();

export default function BrokerCard() {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { brokerName, brokerTitle, brokerPhone, calendarLink } = calculatorConfig;
  const phoneTel = brokerPhone ? `+1${brokerPhone.replace(/\D/g, "")}` : "";

  useEffect(() => setMounted(true), []);

  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur">
      <div className="flex items-center gap-4">
        {/* Avatar + pastille en ligne */}
        <div className="relative shrink-0">
          {!mounted || imgError ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon/15 text-lg font-extrabold text-neon">
              {initials}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={PHOTO_SRC}
              alt={brokerName}
              onError={() => setImgError(true)}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-neon/60"
            />
          )}
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-black bg-neon shadow-neon" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-neon/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-neon">
              <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-neon" />
              En ligne
            </span>
          </div>
          <p className="mt-1.5 truncate text-base font-extrabold text-white">{brokerName}</p>
          <p className="truncate text-xs text-white/60">{brokerTitle}</p>
        </div>
      </div>

      {calendarLink && (
        <a
          href={calendarLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-ai text-sm font-extrabold text-black shadow-glow transition hover:brightness-110"
        >
          <span aria-hidden>📅</span> Prendre rendez-vous
        </a>
      )}

      {brokerPhone && (
        <a
          href={`tel:${phoneTel}`}
          className="mt-2.5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
        >
          <span aria-hidden>📞</span> Appeler {brokerPhone}
        </a>
      )}
    </div>
  );
}
