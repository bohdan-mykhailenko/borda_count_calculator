export interface FromToCountryPointsEntity {
  from_country: string;
  to_country: string;
  points: number;
  jury_or_televoting: "T" | "J";
}
export interface CoefficientsEntity {
  from_country: string;
  to_country: string;
  political_coeff: number;
  border_coeff: number;
  language_coeff: number;
}
