export interface Certification {
	certification: string;
	meaning: string;
	order: number;
}

export interface Certifications {
	certifications: Record<string, Certification[]>;
}
