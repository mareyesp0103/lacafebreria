import { contacto, whatsappMensajes } from "@/data/site";

type Motivo = keyof typeof whatsappMensajes;

/**
 * Enlace de WhatsApp con el mensaje ya escrito.
 *
 * Un enlace desnudo a wa.me abre una conversación en blanco y obliga a la
 * persona a redactar. Prellenar el motivo baja esa fricción y, del lado del
 * local, llega una consulta que ya dice a qué viene.
 */
export function whatsapp(motivo: Motivo = "general"): string {
  const texto = encodeURIComponent(whatsappMensajes[motivo]);
  return `https://wa.me/${contacto.whatsapp}?text=${texto}`;
}

/** Enlace de llamada telefónica. */
export const telefonoHref = `tel:${contacto.telefonoE164}`;
