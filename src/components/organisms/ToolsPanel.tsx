import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";

import { JSONFileUploader } from "../atoms";
import PointsTable from "../molecules/PointsTable";

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
      fromCountry: string;
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

    const fromCountryList = parsedJSON
      .slice(0, 10)
      .map((entity) => entity.from_country);
    const toCountryList = parsedJSON
      .slice(0, 10)
      .map((entity) => entity.to_country);

    const uniqueFromCountryList = Array.from(new Set(fromCountryList));
    const uniqueToCountryList = Array.from(new Set(toCountryList));

    const givenPoints = parsedJSON.slice(0, 10).map((entity) => {
      const pointsMapForJury: Map<string, number[]> = new Map();

      if (entity.jury_or_televoting === "J") {
        if (pointsMapForJury.has(entity.from_country)) {
          pointsMapForJury.set(entity.from_country, [
            ...pointsMapForJury.get(entity.from_country)!,
            entity.total_points,
          ]);
        } else {
          pointsMapForJury.set(entity.from_country, [entity.total_points]);
        }
      }

      // const fromCountry = entity.from_country;

      // const pointsFromJury = parsedJSON
      //   .filter(
      //     (entity) =>
      //       entity.from_country === fromCountry &&
      //       entity.jury_or_televoting === "J"
      //   )
      //   .map((entity) => entity.total_points);

      // const pointsFromTelevoters = parsedJSON
      //   .filter(
      //     (entity) =>
      //       entity.from_country === fromCountry &&
      //       entity.jury_or_televoting === "T"
      //   )
      //   .map((entity) => entity.total_points);

      return pointsMapForJury;
    });

    console.log("givenPoints", givenPoints);

    return {
      fromCountries: uniqueFromCountryList,
      toCountries: uniqueToCountryList,
      givenPoints: [],
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
