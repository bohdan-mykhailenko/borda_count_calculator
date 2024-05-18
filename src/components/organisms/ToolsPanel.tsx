import { Box } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

import { JSONFileUploader } from "../atoms";
import { PointsTable } from "../molecules";

interface ToolsPanelProps {}

interface FromToCountryPointsEntity {
  from_country: string;
  to_country: string;
  points: number;
  jury_or_televoting: "T" | "J";
}

export const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  const [JSONString, setJSONString] = useState<string | null>(null);

  const convertJSONToArrays = (): {
    fromCountries: string[];
    toCountries: string[];
    givenPoints: {
      toCountry: string;
      jury: {
        points: number;
        fromCountry: string;
      }[];
      televoters: {
        points: number;
        fromCountry: string;
      }[];
    }[];
  } => {
    if (!JSONString) {
      return {
        fromCountries: [],
        toCountries: [],
        givenPoints: [],
      };
    }

    const parsedJSON: FromToCountryPointsEntity[] = JSON.parse(JSONString);

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

    parsedJSON.forEach((entity) => {
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
              { fromCountry: entity.from_country, points: entity.points },
            ],
            jury: [...pointsMap.get(entity.to_country)?.jury!],
          });
        }

        if (entity.jury_or_televoting === "J") {
          pointsMap.set(entity.to_country, {
            jury: [
              ...pointsMap.get(entity.to_country)?.jury!,
              { fromCountry: entity.from_country, points: entity.points },
            ],
            televoters: [...pointsMap.get(entity.to_country)?.televoters!],
          });
        }
      } else {
        if (entity.jury_or_televoting === "J") {
          pointsMap.set(entity.to_country, {
            jury: [{ fromCountry: entity.from_country, points: entity.points }],
            televoters: [],
          });
        }

        if (entity.jury_or_televoting === "T") {
          pointsMap.set(entity.to_country, {
            jury: [],
            televoters: [
              { fromCountry: entity.from_country, points: entity.points },
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
      givenPoints: arrayOfPoints,
    };
  };

  const { givenPoints, toCountries, fromCountries } = useMemo(
    () => convertJSONToArrays(),
    [JSONString]
  );

  const onUploadJSONString = (JSONstringFromFile: string) => {
    setJSONString(JSONstringFromFile);
  };

  return (
    <Box>
      <JSONFileUploader onUploadJSONString={onUploadJSONString} />

      <PointsTable
        toCountries={toCountries}
        fromCountries={fromCountries}
        givenPoints={givenPoints}
      />
    </Box>
  );
};
