import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";

import { JSONFileUploader } from "../atoms";
import PointsTable from "../molecules/PointsTable";

interface ToolsPanelProps {}

interface FromToCountryPointsEntity {
  from_country: string;
  to_country: string;
  points: number;
}

export const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  const [JSONString, setJSONString] = useState<string | null>(null);

  const convertJSONToArrays = () => {
    if (!JSONString) {
      return {
        fromCountries: [],
        toCountries: [],
        points: [],
      };
    }

    const parsedJSON: FromToCountryPointsEntity[] = JSON.parse(JSONString);

    const fromCountryList = parsedJSON.map((entity) => entity.from_country);
    const toCountryList = parsedJSON.map((entity) => entity.to_country);
    const points = parsedJSON.map((entity) => entity.points);

    const uniqueFromCountryList = Array.from(new Set(fromCountryList));
    const uniqueToCountryList = Array.from(new Set(toCountryList));

    return {
      fromCountries: uniqueFromCountryList,
      toCountries: uniqueToCountryList,
      points,
    };
  };

  const { points, toCountries, fromCountries } = useMemo(
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
        points={points}
      />
    </Box>
  );
};
