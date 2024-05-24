import { Box } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";

import { JSONFileUploader, YearSelectMenu } from "../atoms";
import { PointsTable } from "../molecules";
import { convertJSONCoefficientsData, convertJSONPointsData } from "../helpers";
import { DetailedVotingEntity, ShortVotingEntity } from "../types";

interface ToolsPanelProps {}

export const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  const [JSONPointsString, setJSONPointsString] = useState<string | null>(null);
  const [JSONCoefficientsString, setJSONCoefficientsString] = useState<
    string | null
  >(null);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [votingData, setVotingData] = useState<ShortVotingEntity | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const arrayOfCoeffs = useMemo(
    () => convertJSONCoefficientsData(JSONCoefficientsString),
    [JSONCoefficientsString]
  );

  const onUploadJSONPointsString = (JSONStringFromFile: string) => {
    setJSONPointsString(JSONStringFromFile);
  };

  const onUploadJSONCoefficientsString = (JSONStringFromFile: string) => {
    setJSONCoefficientsString(JSONStringFromFile);
  };

  const selectYear = (year: number) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    if (selectedYear) {
      const { receivedPoints, toCountries, fromCountries } =
        convertJSONPointsData(
          JSONPointsString,
          JSONCoefficientsString,
          selectedYear
        );

      setVotingData({ receivedPoints, toCountries, fromCountries });
    }
  }, [selectedYear]);

  useEffect(() => {
    if (JSONPointsString) {
      const yearsFromFile: number[] = JSON.parse(JSONPointsString).map(
        (entity: DetailedVotingEntity) => entity.year
      );

      const uniqueYears = Array.from(new Set(yearsFromFile)).sort();

      setAvailableYears(uniqueYears);
    }
  }, [JSONPointsString]);

  return (
    <Box>
      <YearSelectMenu
        availableYears={availableYears}
        onSelectYear={selectYear}
      />

      <JSONFileUploader
        label="Points"
        onUploadJSONString={onUploadJSONPointsString}
      />

      <JSONFileUploader
        label="Coefficients"
        onUploadJSONString={onUploadJSONCoefficientsString}
      />

      {votingData && (
        <PointsTable
          toCountries={votingData.toCountries}
          fromCountries={votingData.fromCountries}
          receivedPoints={votingData.receivedPoints}
        />
      )}
    </Box>
  );
};
