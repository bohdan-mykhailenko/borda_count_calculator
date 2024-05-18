import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import find from "country-code-lookup";

interface VoteResults {
  points: number;
  country: string;
}

interface PointsTableProps {
  fromCountries: string[];
  toCountries: string[];
  givenPoints: {
    toCountry: string;
    jury: {
      points: number;
      fromCountry: string;
    }[];
    televoters: {
      points: number;
      fromCountry: string;
    }[];
  }[];
}

export const PointsTable: React.FC<PointsTableProps> = ({
  fromCountries,
  toCountries,
  givenPoints,
}) => {
  const [juryVoteResults, setJuryVoteResults] = useState<VoteResults>({
    points: 0,
    country: "",
  });
  const [televotersVoteResults, setTelevotersVoteResults] =
    useState<VoteResults>({
      points: 0,
      country: "",
    });
  const [summaryVoteResults, setSummaryVoteResults] = useState<VoteResults>({
    points: 0,
    country: "",
  });

  //todo
  //review length of points - fill with 0
  //how to calculate with koeff

  return (
    <>
      <Flex direction="column" gap={2}>
        <Heading variant="h2">Winner</Heading>
        <Text>Points: {summaryVoteResults.points}</Text>
        <Text>Country: {summaryVoteResults.country}</Text>

        <Heading variant="h2">Televoters</Heading>
        <Text>Points: {televotersVoteResults.points}</Text>
        <Text>Country: {televotersVoteResults.country}</Text>

        <Heading variant="h2">Jury</Heading>
        <Text>Points: {juryVoteResults.points}</Text>
        <Text>Country: {juryVoteResults.country}</Text>
      </Flex>

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
            <Td width={5} background="red.300">
              Countries
            </Td>
            <Td width={5} background="red.300">
              Subtotal
            </Td>
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
                  {find.byCountry(fromCountry)?.iso2 ||
                    fromCountry.slice(0, 2).toUpperCase()}
                </Tooltip>
              </Td>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {toCountries.map((toCountry, index) => {
            const totalPointsFromJury = givenPoints[index].jury.reduce(
              (sum, value) => (sum += value.points),
              0
            );

            console.log("givenPoints[index]", givenPoints[index]);

            const totalPointsFromTelevoters = givenPoints[
              index
            ].televoters.reduce((sum, value) => (sum += value.points), 0);

            const summaryPoints =
              totalPointsFromJury + totalPointsFromTelevoters;

            if (summaryVoteResults.points < summaryPoints) {
              setSummaryVoteResults({
                points: summaryPoints,
                country: toCountry,
              });
            }

            if (juryVoteResults.points < totalPointsFromJury) {
              setJuryVoteResults({
                points: totalPointsFromJury,
                country: toCountry,
              });
            }

            if (televotersVoteResults.points < totalPointsFromTelevoters) {
              setTelevotersVoteResults({
                points: totalPointsFromTelevoters,
                country: toCountry,
              });
            }

            const countryCode =
              find.byCountry(toCountry)?.iso2 ||
              toCountry.slice(0, 2).toUpperCase();

            return (
              <>
                <Tr key={toCountry} background="blue.200">
                  <Td
                    paddingY={0}
                    paddingX={1}
                    fontSize="10px"
                    color="muted"
                    fontWeight={700}
                    textTransform="uppercase"
                  >
                    <Tooltip label={toCountry}>{countryCode}</Tooltip>
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
                    {totalPointsFromTelevoters}(T)
                  </Td>

                  {fromCountries.map((fromCountry) => {
                    const isCountryVoted = givenPoints[index].televoters.find(
                      (value) => fromCountry === value.fromCountry
                    )?.points;

                    return (
                      <Td
                        paddingY={0}
                        paddingX={1}
                        fontSize="10px"
                        key={uuidv4()}
                      >
                        {isCountryVoted || "Z"}
                      </Td>
                    );
                  })}

                  {/* {givenPoints[index].televoters.map((value) => {
                    const isCountryVoted = fromCountries.some(
                      (fromCountry) => fromCountry === value.fromCountry
                    );

                    return (
                      <Td
                        paddingY={0}
                        paddingX={1}
                        fontSize="10px"
                        key={uuidv4()}
                      >
                        {isCountryVoted ? value.points : "ZERO"}
                      </Td>
                    );
                  })} */}
                </Tr>

                <Tr key={toCountry} background="orange.200">
                  <Td
                    paddingY={0}
                    paddingX={1}
                    fontSize="10px"
                    color="muted"
                    fontWeight={700}
                    textTransform="uppercase"
                  />

                  <Td
                    paddingY={0}
                    paddingX={1}
                    fontSize="sm"
                    color="white"
                    fontWeight={700}
                    textTransform="uppercase"
                    background="green"
                  >
                    {totalPointsFromJury}(J)
                  </Td>

                  {fromCountries.map((fromCountry) => {
                    const isCountryVoted = givenPoints[index].jury.find(
                      (value) => fromCountry === value.fromCountry
                    )?.points;

                    return (
                      <Td
                        paddingY={0}
                        paddingX={1}
                        fontSize="10px"
                        key={uuidv4()}
                      >
                        {isCountryVoted || "Z"}
                      </Td>
                    );
                  })}

                  {/* {givenPoints[index].jury.map((value) => (
                    <Td
                      paddingY={0}
                      paddingX={1}
                      fontSize="10px"
                      key={uuidv4()}
                    >
                      {value.points}
                    </Td>
                  ))} */}
                </Tr>
              </>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
