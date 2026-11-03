export type SubSection = { subtitle?: string; text: string; items?: string[] };
export type LegalSection = { id: string; title: string; description?: string; content: SubSection[] };
