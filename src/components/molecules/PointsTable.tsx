import { Table, Tbody, Td, Thead, Tooltip, Tr } from "@chakra-ui/react";
import React from "react";

interface PointsTableProps {
  fromCountries: string[];
  toCountries: string[];
  givenPoints: {
    toCountry: string;
    points: number[];
  }[];
}

export const PointsTable: React.FC<PointsTableProps> = ({
  fromCountries,
  toCountries,
  givenPoints,
}) => {
  return (
    <>
      <Table
        colorScheme="main"
        variant="main"
        bgcolor="white"
        fontSize="xs"
        size="md"
        color="muted"
        fontWeight="semibold"
      >
        <Thead>
          <Tr>
            <Td background="red.200">*</Td>
            {fromCountries.map((fromCountry) => (
              <Td
                paddingY={0}
                paddingX={1}
                key={fromCountry}
                fontSize="10px"
                color="muted"
                fontWeight={700}
                textTransform="uppercase"
              >
                <Tooltip label={fromCountry}>
                  {fromCountry.slice(0, 2).toUpperCase()}
                </Tooltip>
              </Td>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {toCountries.map((toCountry, index) => {
            const totalPoints = givenPoints[index].points.reduce(
              (sum, point) => (sum += point),
              0
            );

            return (
              <Tr key={toCountry}>
                <Td
                  paddingY={0}
                  paddingX={1}
                  fontSize="10px"
                  color="muted"
                  fontWeight={700}
                  textTransform="uppercase"
                >
                  <Tooltip label={toCountry}>
                    {toCountry.slice(0, 2).toUpperCase()}
                  </Tooltip>
                </Td>

                <Td
                  paddingY={0}
                  paddingX={1}
                  fontSize="sm"
                  color="white"
                  fontWeight={700}
                  textTransform="uppercase"
                  background="green"
                >
                  {totalPoints}
                </Td>

                {givenPoints[index].points.map((point) => (
                  <Td
                    paddingY={0}
                    paddingX={1}
                    fontSize="10px"
                    key={`${toCountry}_${point}_${index}`}
                  >
                    {point}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
