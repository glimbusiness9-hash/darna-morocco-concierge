/**
 * darna — single configurable WhatsApp number.
 * Replace with the real number in international format, digits only (e.g. "212600000000").
 * Leaving it empty keeps buttons pointing at wa.me without a number.
 */
export const WHATSAPP_NUMBER = "";

export const MESSAGES = {
  general: "Bonjour darna, je souhaite planifier mon séjour au Maroc.",
  custom: "Bonjour darna, je souhaite organiser un séjour personnalisé au Maroc.",
  accommodation: (city = "[CITY]", from = "[DATE]", to = "[DATE]", people = "[PEOPLE]") =>
    `Bonjour darna, je cherche un logement à ${city} du ${from} au ${to} pour ${people} personnes.`,
  activity: (activity: string) => `Bonjour darna, je suis intéressé(e) par : ${activity}.`,
  transport: (transport: string) => `Bonjour darna, je souhaite organiser : ${transport}.`,
};

export function waLink(message: string = MESSAGES.general) {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const CITIES = [
  "Tangier",
  "Tetouan",
  "Chefchaouen",
  "Martil",
  "Mdiq",
  "Cabo Negro",
  "Marina Smir",
  "Belyounech",
  "Akchour",
];
