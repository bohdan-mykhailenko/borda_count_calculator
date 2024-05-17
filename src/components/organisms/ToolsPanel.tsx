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
      points: number[];
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

    const fromCountryList = parsedJSON.map((entity) => entity.from_country);
    const toCountryList = parsedJSON.map((entity) => entity.to_country);

    const uniqueFromCountryList = Array.from(new Set(fromCountryList));
    const uniqueToCountryList = Array.from(new Set(toCountryList));

    const pointsMapForJury: Map<string, number[]> = new Map();
    const pointsMapForTelevoters: Map<string, number[]> = new Map();

    const givenPoints = parsedJSON.forEach((entity) => {
      if (entity.jury_or_televoting === "J") {
        if (pointsMapForJury.has(entity.to_country)) {
          pointsMapForJury.set(entity.to_country, [
            ...pointsMapForJury.get(entity.to_country)!,
            entity.total_points,
          ]);
        } else {
          pointsMapForJury.set(entity.to_country, [entity.total_points]);
        }
      }

      if (entity.jury_or_televoting === "T") {
        if (pointsMapForTelevoters.has(entity.to_country)) {
          pointsMapForTelevoters.set(entity.to_country, [
            ...pointsMapForTelevoters.get(entity.to_country)!,
            entity.total_points,
          ]);
        } else {
          pointsMapForTelevoters.set(entity.to_country, [entity.total_points]);
        }
      }
    });

    const arrayOfPoints = Array.from(pointsMapForJury, ([name, value]) => ({
      toCountry: name,
      points: value,
    }));

    return {
      fromCountries: uniqueFromCountryList,
      toCountries: uniqueToCountryList,
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
