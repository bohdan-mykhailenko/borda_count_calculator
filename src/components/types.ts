export interface DetailedVotingEntity {
  from_country: string;
  to_country: string;
  points: number;
  jury_or_televoting: "T" | "J";
  year: number;
}

export interface CoefficientsEntity {
  id: number;
  from_country: string;
  to_country: string;
  political: number;
  border: number;
  language: number;
}

export interface CoefficientValue {
  coeff_value: number;
  jury: number;
  televoting: number;
}

export interface CoefficientsValuesEntity {
  language: CoefficientValue;
  border: CoefficientValue;
  political: CoefficientValue;
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

export interface VoteResults {
  points: number;
  country: string;
}
