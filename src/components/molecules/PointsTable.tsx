import { Table, Tbody, Td, Thead, Tooltip, Tr } from "@chakra-ui/react";
import React from "react";

interface PointsTableProps {
  fromCountries: string[];
  toCountries: string[];
  points: number[];
}

const PointsTable: React.FC<PointsTableProps> = ({
  fromCountries,
  toCountries,
}) => {
  return (
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
          {fromCountries.map((fromCountry) => (
            <Tooltip label={fromCountry}>
              <Td
                paddingY={0}
                paddingX={1}
                key={fromCountry}
                fontSize="10px"
                color="muted"
                fontWeight={700}
                textTransform="uppercase"
              >
                {fromCountry.slice(0, 2).toUpperCase()}
              </Td>
            </Tooltip>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {toCountries.map((toCountry) => (
          <Tr key={toCountry}>
            <Tooltip label={toCountry}>
              <Td
                paddingY={0}
                paddingX={1}
                fontSize="10px"
                color="muted"
                fontWeight={700}
                textTransform="uppercase"
              >
                {toCountry.slice(0, 2).toUpperCase()}
              </Td>
            </Tooltip>

            {fromCountries.map(() => (
              <Td paddingY={0} paddingX={1} fontSize="10px">
                {(Math.random() * 100).toFixed(2)}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PointsTable;
