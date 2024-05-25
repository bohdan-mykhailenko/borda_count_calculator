import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

interface PointsSummaryProps {
  label: string;
  results: {
    points: number;
    country: string;
  };
  isWinner?: boolean;
}

export const PointsSummary: React.FC<PointsSummaryProps> = ({
  label,
  results,
  isWinner,
}) => {
  return (
    <Flex
      direction="column"
      background={isWinner ? "cyan.500" : "cyan.300"}
      padding={2}
      borderRadius="sm"
    >
      <Heading variant="h2" fontSize="xl" marginBottom={2}>
        {label}
      </Heading>

      <Text>
        Points: <strong>{results.points || "..."}</strong>
      </Text>

      <Text>
        Country: <strong>{results.country || "..."}</strong>
      </Text>
    </Flex>
  );
};
