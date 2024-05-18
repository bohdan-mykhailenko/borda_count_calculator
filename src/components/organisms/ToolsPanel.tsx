import { Box } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";

import { JSONFileUploader } from "../atoms";
import { PointsTable } from "../molecules";
import { convertJSONCoefficientsData, convertJSONPointsData } from "../helpers";

interface ToolsPanelProps {}

export const ToolsPanel: React.FC<ToolsPanelProps> = () => {
  const [JSONPointsString, setJSONPointsString] = useState<string | null>(null);
  const [JSONCoefficientsString, setJSONCoefficientsString] = useState<
    string | null
  >(null);

  const { receivedPoints, toCountries, fromCountries } = useMemo(
    () => convertJSONPointsData(JSONPointsString, JSONCoefficientsString),
    [JSONPointsString, JSONCoefficientsString]
  );

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

  return (
    <Box>
      <JSONFileUploader
        label="Points"
        onUploadJSONString={onUploadJSONPointsString}
      />

      <JSONFileUploader
        label="Coefficients"
        onUploadJSONString={onUploadJSONCoefficientsString}
      />

      {JSONPointsString && (
        <PointsTable
          toCountries={toCountries}
          fromCountries={fromCountries}
          receivedPoints={receivedPoints}
        />
      )}
    </Box>
  );
};
