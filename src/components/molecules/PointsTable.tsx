import { Table, Tbody, Td, Thead, Tooltip, Tr } from "@chakra-ui/react";
import React from "react";

interface PointsTableProps {
  fromCountries: string[];
  toCountries: string[];
  givenPoints: {
    fromCountry: string;
    points: {
      jury: number[];
      televoters: number[];
    };
  }[];
}

const PointsTable: React.FC<PointsTableProps> = ({
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
            <Td background="red">*</Td>
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

                {givenPoints[index].points.televoters.map((point) => (
                  <Td paddingY={0} paddingX={1} fontSize="10px">
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

export default PointsTable;
