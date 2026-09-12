"use client";

import { useEffect, useState } from "react";
import { horario } from "@/data/site";

const ORDEN = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const EN_ES: Record<string, string> = {
  Monday: "lunes",
  Tuesday: "martes",
  Wednesday: "miércoles",
  Thursday: "jueves",
  Friday: "viernes",
  Saturday: "sábado",
  Sunday: "domingo",
};

/** Hora local del LOCAL, no de quien mira: día de la semana y minutos del día. */
function ahoraEnElLocal(): { dia: string; minutos: number } {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: horario.zona,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const buscar = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  // A medianoche algunos entornos devuelven "24" en lugar de "00".
  const hora = Number(buscar("hour")) % 24;
  return { dia: buscar("weekday"), minutos: hora * 60 + Number(buscar("minute")) };
}

const enMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const tramoDe = (dia: string) => horario.dias.find((t) => t.dias.includes(dia));

/** Formato de lectura: 08:00 → «8:00», 13:00 → «13:00». */
const leible = (hhmm: string) => hhmm.replace(/^0/, "");

type Estado =
  | { abierto: true; cierra: string }
  | { abierto: false; proximoDia: string; proximaHora: string; hoyMismo: boolean };

function calcularEstado(): Estado {
  const { dia, minutos } = ahoraEnElLocal();

  const hoy = tramoDe(dia);
  if (hoy && minutos >= enMinutos(hoy.abre) && minutos < enMinutos(hoy.cierra)) {
    return { abierto: true, cierra: hoy.cierra };
  }

  // Aún no ha abierto hoy.
  if (hoy && minutos < enMinutos(hoy.abre)) {
    return { abierto: false, proximoDia: EN_ES[dia], proximaHora: hoy.abre, hoyMismo: true };
  }

  // Ya cerró: el siguiente día con tramo, dentro de la semana que viene.
  const desde = ORDEN.indexOf(dia as (typeof ORDEN)[number]);
  for (let i = 1; i <= 7; i++) {
    const siguiente = ORDEN[(desde + i) % 7];
    const tramo = tramoDe(siguiente);
    if (tramo) {
      return {
        abierto: false,
        proximoDia: EN_ES[siguiente],
        proximaHora: tramo.abre,
        hoyMismo: false,
      };
    }
  }
  return { abierto: false, proximoDia: "", proximaHora: "", hoyMismo: false };
}

/**
 * Horario de atención.
 *
 * La tabla se renderiza en el servidor y está siempre en el HTML: es el
 * contenido que importa y no depende de JavaScript.
 *
 * El día de hoy y el «abierto ahora» se añaden tras montar, no en el build.
 * Un sitio estático se compila una vez y se sirve durante semanas: hornear ahí
 * qué día es produce un dato falso a las pocas horas. Calcularlo en el cliente
 * y sólo después de montar evita además el desajuste de hidratación.
 *
 * La hora es la del local (`horario.zona`), no la del visitante: quien consulta
 * desde otro huso sigue viendo si la cafetería está abierta, que es la pregunta.
 */
export function Horario({ compacto = false }: { compacto?: boolean }) {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [diaActual, setDiaActual] = useState<string | null>(null);

  useEffect(() => {
    const actualizar = () => {
      setEstado(calcularEstado());
      setDiaActual(ahoraEnElLocal().dia);
    };
    actualizar();
    // Que el estado no se quede congelado en una pestaña abierta toda la mañana.
    const id = window.setInterval(actualizar, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div>
      {estado && (
        <p
          className={`note mb-4 ${estado.abierto ? "" : "note-amber"}`}
          // El cambio de estado no debe robar el foco ni interrumpir la lectura.
          role="status"
        >
          <span
            aria-hidden="true"
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
              estado.abierto ? "bg-teal-fill" : "bg-terracotta-fill"
            }`}
          />
          {estado.abierto ? (
            <span>
              <strong className="font-bold">Abierto ahora</strong> · cierra a las{" "}
              <span className="tabular">{leible(estado.cierra)}</span>
            </span>
          ) : (
            <span>
              <strong className="font-bold">Cerrado ahora</strong> · abre{" "}
              {estado.hoyMismo ? "hoy" : `el ${estado.proximoDia}`} a las{" "}
              <span className="tabular">{leible(estado.proximaHora)}</span>
            </span>
          )}
        </p>
      )}

      <dl className={compacto ? "text-[0.95rem]" : ""}>
        {horario.dias.map((tramo) => {
          const esHoy = diaActual !== null && tramo.dias.includes(diaActual);
          return (
            <div
              key={tramo.etiqueta}
              className={`flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0 ${
                esHoy ? "font-bold text-espresso" : ""
              }`}
            >
              <dt className="flex items-baseline gap-2">
                {tramo.etiqueta}
                {esHoy && (
                  <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-terracotta-text">
                    hoy
                  </span>
                )}
              </dt>
              <dd className="tabular whitespace-nowrap">
                {leible(tramo.abre)} – {leible(tramo.cierra)}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
