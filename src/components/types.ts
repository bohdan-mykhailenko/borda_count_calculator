export interface DetailedVotingEntity {
  from_country: string;
  to_country: string;
  points: number;
  jury_or_televoting: "T" | "J";
  year: number;
}

export interface CoefficientsEntity {
  from_country: string;
  to_country: string;
  political_coeff: number;
  border_coeff: number;
  language_coeff: number;
}

export interface ReceivePoints {
  toCountry: string;
  jury: {
    points: number;
    fromCountry: string;
  }[];
  televoters: {
    points: number;
    fromCountry: string;
  }[];
}

export interface ShortVotingEntity {
  fromCountries: string[];
  toCountries: string[];
  receivedPoints: ReceivePoints[];
}
