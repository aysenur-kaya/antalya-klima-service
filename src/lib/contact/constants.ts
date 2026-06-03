export const CONTACT_SERVICE_TOPICS = [
  "Klima Bakım",
  "Klima Tamir / Arıza",
  "Klima Montaj",
  "Klima Gaz Dolumu",
  "Beyaz Eşya Servisi",
  "Buzdolabı Servisi",
  "Çamaşır Makinesi Servisi",
  "Diğer",
] as const;

export type ContactServiceTopic = (typeof CONTACT_SERVICE_TOPICS)[number];

export const DEFAULT_DISTRICT_LABEL = "Belirtilmedi";
