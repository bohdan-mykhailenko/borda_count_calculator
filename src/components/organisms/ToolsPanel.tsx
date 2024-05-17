import { Box } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

import { JSONFileUploader } from "../atoms";
import { PointsTable } from "../molecules";

interface ToolsPanelProps {}

interface FromToCountryPointsEntity {
  from_country: string;
  to_country: string;
  total_points: number;
  jury_or_televoting: "T" | "J";
}

export const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  const [JSONString, setJSONString] = useState<string | null>(null);

  const convertJSONToArrays = (): {
    fromCountries: string[];
    toCountries: string[];
    givenPoints: {
      toCountry: string;
      points: {
        jury: number[];
        televoters: number[];
      };
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

    const pointsMap: Map<string, { jury: number[]; televoters: number[] }> =
      new Map();

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
              entity.total_points,
            ],
            jury: [...pointsMap.get(entity.to_country)?.jury!],
          });
        }

        if (entity.jury_or_televoting === "J") {
          pointsMap.set(entity.to_country, {
            jury: [
              ...pointsMap.get(entity.to_country)?.jury!,
              entity.total_points,
            ],
            televoters: [...pointsMap.get(entity.to_country)?.televoters!],
          });
        }
      } else {
        if (entity.jury_or_televoting === "J") {
          pointsMap.set(entity.to_country, {
            jury: [entity.total_points],
            televoters: [],
          });
        }

        if (entity.jury_or_televoting === "T") {
          pointsMap.set(entity.to_country, {
            jury: [],
            televoters: [entity.total_points],
          });
        }
      }
    });

    const arrayOfPoints = Array.from(pointsMap, ([name, value]) => ({
      toCountry: name,
      points: value,
    }));

    return {
      fromCountries: Array.from(fromCountriesSet),
      toCountries: Array.from(toCountriesSet),
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
