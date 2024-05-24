import {
  CoefficientsEntity,
  CoefficientsValuesEntity,
  DetailedVotingEntity,
  ShortVotingEntity,
} from "./types";

export const convertJSONPointsData = async (
  JSONString: string,
  JSONCoefficientsString: string | null,
  JSONCoefficientsValuesString: string | null,
  selectedYear: number
): Promise<ShortVotingEntity> => {
  const pointsBeetwenCountries: DetailedVotingEntity[] = JSON.parse(JSONString);
  const coefficientsBeetwenCountries: CoefficientsEntity[] =
    JSONCoefficientsString && JSON.parse(JSONCoefficientsString);
  const coefficientsValues: CoefficientsValuesEntity =
    JSONCoefficientsValuesString && JSON.parse(JSONCoefficientsValuesString);

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

  pointsBeetwenCountries
    .filter((entity) => entity.year === selectedYear)
    .forEach((entity) => {
      const coeffEntityForCountry = coefficientsBeetwenCountries
        ? coefficientsBeetwenCountries.find(
            (coefficientEntity) =>
              coefficientEntity.to_country === entity.to_country &&
              coefficientEntity.from_country === entity.from_country
          ) || {
            from_country: "",
            to_country: "",
            political: 0,
            border: 0,
            language: 0,
          }
        : null;

      const coeffSummary =
        coeffEntityForCountry && coefficientsValues
          ? {
              jury:
                coeffEntityForCountry.language *
                  coefficientsValues.language.jury +
                coeffEntityForCountry.border * coefficientsValues.border.jury +
                coeffEntityForCountry.political *
                  coefficientsValues.political.jury,

              televoting:
                coeffEntityForCountry.language *
                  coefficientsValues.language.televoting +
                coeffEntityForCountry.border *
                  coefficientsValues.border.televoting +
                coeffEntityForCountry.political *
                  coefficientsValues.political.televoting,
            }
          : null;

      const adjustedPointsJury = formatNegativeValue(
        Math.round(
          coeffSummary ? entity.points - coeffSummary.jury : entity.points
        )
      );
      const adjustedPointsTelevoters = formatNegativeValue(
        Math.round(
          coeffSummary ? entity.points - coeffSummary.televoting : entity.points
        )
      );

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
              {
                fromCountry: entity.from_country,
                points: adjustedPointsJury,
              },
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

  const arrayFromCountries = Array.from(fromCountriesSet).sort(
    (countryA, countryB) => countryA.localeCompare(countryB)
  );

  const arrayToCountries = Array.from(toCountriesSet).sort(
    (countryA, countryB) => countryA.localeCompare(countryB)
  );

  return {
    fromCountries: arrayFromCountries,
    toCountries: arrayToCountries,
    receivedPoints: arrayOfPoints,
  };
};

export const formatNegativeValue = (value: number) => {
  return value < 0 ? 0 : value;
};
