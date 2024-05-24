import {
  CoefficientsEntity,
  DetailedVotingEntity,
  ShortVotingEntity,
} from "./types";

export const convertJSONPointsData = (
  JSONString: string | null,
  JSONCoefficientsString: string | null,
  selectedYear: number
): ShortVotingEntity => {
  if (!JSONString) {
    return {
      fromCountries: [],
      toCountries: [],
      receivedPoints: [],
    };
  }

  const parsedJSON: DetailedVotingEntity[] = JSON.parse(JSONString);

  const parsedJSONCoefficients: CoefficientsEntity[] =
    JSONCoefficientsString && JSON.parse(JSONCoefficientsString);

  const pointsMap: Map<
    string,
    {
      jury: {
        points: number;
        fromCountry: string;
      }[];
      televoters: {
        points: number;
        fromCountry: string;
      }[];
    }
  > = new Map();

  const fromCountriesSet: Set<string> = new Set();
  const toCountriesSet: Set<string> = new Set();

  parsedJSON
    .filter((entity) => entity.year === selectedYear)
    .forEach((entity) => {
      const coeffEntityForCountry = parsedJSONCoefficients
        ? parsedJSONCoefficients.find(
            (coeffEntity) =>
              coeffEntity.to_country === entity.to_country &&
              coeffEntity.from_country === entity.from_country
          ) || {
            from_country: "",
            to_country: "",
            political_coeff: 0,
            border_coeff: 0,
            language_coeff: 0,
          }
        : null;

      const coeffs = {
        jury: {
          language: 4.230046735863549,
          border: 1.082794838107529,
          politic: 2.0019590472859456,
        },
        televoters: {
          language: 2.0868502409278986,
          border: 3.6704771583794487,
          politic: 1.1788231848120212,
        },
      };

      const coeffSummary = coeffEntityForCountry
        ? {
            jury:
              coeffEntityForCountry.language_coeff * coeffs.jury.language +
              coeffEntityForCountry.border_coeff * coeffs.jury.border +
              coeffEntityForCountry.political_coeff * coeffs.jury.politic,

            televoters:
              coeffEntityForCountry.language_coeff *
                coeffs.televoters.language +
              coeffEntityForCountry.border_coeff * coeffs.televoters.border +
              coeffEntityForCountry.political_coeff * coeffs.televoters.politic,
          }
        : null;

      const adjustedPointsJury = coeffSummary
        ? entity.points - coeffSummary.jury
        : entity.points;
      const adjustedPointsTelevoters = coeffSummary
        ? entity.points - coeffSummary.televoters
        : entity.points;

      //todo
      //coeffs are optional
      if (!fromCountriesSet.has(entity.from_country)) {
        fromCountriesSet.add(entity.from_country);
      }

      if (!toCountriesSet.has(entity.to_country)) {
        toCountriesSet.add(entity.to_country);
      }

      if (pointsMap.has(entity.to_country)) {
        if (entity.jury_or_televoting === "T") {
          pointsMap.set(entity.to_country, {
            televoters: [
              ...pointsMap.get(entity.to_country)?.televoters!,
              {
                fromCountry: entity.from_country,
                points: adjustedPointsTelevoters,
              },
            ],
            jury: [...pointsMap.get(entity.to_country)?.jury!],
          });
        }

        if (entity.jury_or_televoting === "J") {
          pointsMap.set(entity.to_country, {
            jury: [
              ...pointsMap.get(entity.to_country)?.jury!,
              { fromCountry: entity.from_country, points: adjustedPointsJury },
            ],
            televoters: [...pointsMap.get(entity.to_country)?.televoters!],
          });
        }
      } else {
        if (entity.jury_or_televoting === "J") {
          pointsMap.set(entity.to_country, {
            jury: [
              { fromCountry: entity.from_country, points: adjustedPointsJury },
            ],
            televoters: [],
          });
        }

        if (entity.jury_or_televoting === "T") {
          pointsMap.set(entity.to_country, {
            jury: [],
            televoters: [
              {
                fromCountry: entity.from_country,
                points: adjustedPointsTelevoters,
              },
            ],
          });
        }
      }
    });

  const arrayOfPoints = Array.from(pointsMap, ([name, value]) => ({
    toCountry: name,
    jury: value.jury,
    televoters: value.televoters,
  }));

  const arrayFromCountries = Array.from(fromCountriesSet);
  // .sort(
  //   (countryA, countryB) => countryA.localeCompare(countryB)
  // );

  const arrayToCountries = Array.from(toCountriesSet);
  return {
    fromCountries: arrayFromCountries,
    toCountries: arrayToCountries,
    receivedPoints: arrayOfPoints,
  };
};

export const convertJSONCoefficientsData = (JSONString: string | null): any => {
  if (!JSONString) {
    return {
      fromCountries: [],
      toCountries: [],
      receivedPoints: [],
    };
  }

  const parsedJSON: CoefficientsEntity[] = JSON.parse(JSONString);

  return parsedJSON;
};
