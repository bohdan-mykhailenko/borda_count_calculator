import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
  CoefficientCheckbox,
  JSONFileUploader,
  YearSelectMenu,
} from "../atoms";
import { PointsTable } from "../molecules";
import { convertJSONPointsData } from "../helpers";
import { DetailedVotingEntity, ShortVotingEntity } from "../types";

export const MainPage: React.FC = () => {
  const [JSONPointsString, setJSONPointsString] = useState<string | null>(null);
  const [JSONCoefficientsString, setJSONCoefficientsString] = useState<
    string | null
  >(null);
  const [JSONCoefficientsValuesString, setJSONCoefficientsValuesString] =
    useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [votingData, setVotingData] = useState<ShortVotingEntity | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [isCalculateWithCoefficients, setIsCalculateWithCoefficients] =
    useState<boolean>(false);
  const [isCalculatingData, setIsCalculatingData] = useState<boolean>(false);

  const uploadJSONPointsString = (JSONStringFromFile: string) => {
    setJSONPointsString(JSONStringFromFile);
  };

  const uploadJSONCoefficientsString = (JSONStringFromFile: string) => {
    setJSONCoefficientsString(JSONStringFromFile);
  };

  const uploadJSONCoefficientsValuesString = (JSONStringFromFile: string) => {
    setJSONCoefficientsValuesString(JSONStringFromFile);
  };

  const selectYear = (year: number) => {
    setSelectedYear(year);
  };

  const toggleCalculateWithCoefficients = (isChecked: boolean) => {
    setIsCalculateWithCoefficients(isChecked);
  };

  const handleCalculation = async () => {
    if (selectedYear && JSONPointsString) {
      try {
        setIsCalculatingData(true);

        const { receivedPoints, toCountries, fromCountries } =
          await convertJSONPointsData(
            JSONPointsString,
            isCalculateWithCoefficients ? JSONCoefficientsString : null,
            isCalculateWithCoefficients ? JSONCoefficientsValuesString : null,
            selectedYear
          );

        setVotingData({ receivedPoints, toCountries, fromCountries });
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsCalculatingData(false);
      }
    }
  };

  useEffect(() => {
    if (JSONPointsString) {
      const yearsFromFile: number[] = JSON.parse(JSONPointsString).map(
        (entity: DetailedVotingEntity) => entity.year
      );

      const uniqueYears = Array.from(new Set(yearsFromFile)).sort();

      setAvailableYears(uniqueYears);
    }
  }, [JSONPointsString]);

  useEffect(() => {
    console.log("iSLOADING", isCalculatingData);
  }, [isCalculatingData]);

  return (
    <Flex direction="column" gap={4} padding={2}>
      <Flex
        gap={4}
        borderBottom="3px solid"
        borderColor="teal.800"
        paddingY={2}
      >
        <JSONFileUploader
          label="Scores"
          onUploadJSONString={uploadJSONPointsString}
        />

        <JSONFileUploader
          label="Coefficients Beetwen Countries"
          onUploadJSONString={uploadJSONCoefficientsString}
        />

        <JSONFileUploader
          label="Coefficients voting impact"
          onUploadJSONString={uploadJSONCoefficientsValuesString}
        />
      </Flex>

      <Flex
        gap={4}
        borderBottom="3px solid"
        borderColor="teal.800"
        paddingY={2}
        alignItems="center"
      >
        <Button
          width={20}
          colorScheme="teal"
          size="sm"
          isDisabled={!selectYear || !JSONPointsString}
          onClick={handleCalculation}
        >
          Calculate
        </Button>

        <YearSelectMenu
          availableYears={availableYears}
          onSelectYear={selectYear}
          selectedYear={selectedYear}
        />

        <CoefficientCheckbox
          isDisabled={
            !convertJSONPointsData ||
            !JSONCoefficientsString ||
            !JSONCoefficientsValuesString
          }
          isChecked={isCalculateWithCoefficients}
          onChangeCooefficientsUsage={toggleCalculateWithCoefficients}
        />
      </Flex>

      {votingData && !isCalculatingData && (
        <PointsTable
          toCountries={votingData.toCountries}
          fromCountries={votingData.fromCountries}
          receivedPoints={votingData.receivedPoints}
        />
      )}
    </Flex>
  );
};
