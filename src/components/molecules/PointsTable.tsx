import {
  Box,
  Button,
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
import React, { Fragment, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import find from "country-code-lookup";

import { ShortVotingEntity, VoteResults } from "../types";

interface PointsTableProps extends ShortVotingEntity {}

const summaryArray: VoteResults[] = [];

export const PointsTable: React.FC<PointsTableProps> = ({
  fromCountries,
  toCountries,
  receivedPoints,
}) => {
  const [isSortedResult, setIsSortedResult] = useState<boolean>(false);
  const [juryVoteResults, setJuryVoteResults] = useState<VoteResults>({
    points: 0,
    country: "",
  });
  const [televotersVoteResults, setTelevotersVoteResults] =
    useState<VoteResults>({
      points: 0,
      country: "",
    });
  const [winnerVoteResults, setWinnerVoteResults] = useState<VoteResults>({
    points: 0,
    country: "",
  });
  const [summaryVoteResults, setSummaryVoteResults] = useState<VoteResults[]>(
    []
  );

  const handleSortingResult = () => {
    setIsSortedResult(!isSortedResult);
  };

  const sortedToCountries: string[] = useMemo(() => {
    if (!isSortedResult) {
      return toCountries;
    }

    console.log("Sorting", summaryArray);

    const sortedCountries = summaryArray
      .sort((resultA, resultB) => resultA.points - resultB.points)
      .map((result) => result.country);
    console.log("sortedCountries", sortedCountries);

    return sortedCountries;
  }, [isSortedResult]);

  //todo
  //sorting
  //здати звіт

  return (
    <>
      <Flex gap={8}>
        <Box>
          <Heading variant="h2">Winner</Heading>
          <Text>Points: {winnerVoteResults.points || "..."}</Text>
          <Text>Country: {winnerVoteResults.country || "..."}</Text>
        </Box>

        <Box>
          <Heading variant="h2">Televoters</Heading>
          <Text>Points: {televotersVoteResults.points}</Text>
          <Text>Country: {televotersVoteResults.country}</Text>
        </Box>

        <Box>
          <Heading variant="h2">Jury</Heading>
          <Text>Points: {juryVoteResults.points}</Text>
          <Text>Country: {juryVoteResults.country}</Text>
        </Box>
      </Flex>

      <Button
        width={20}
        colorScheme="teal"
        size="sm"
        onClick={handleSortingResult}
      >
        Sort
      </Button>

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
                key={fromCountry + uuidv4()}
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
          {sortedToCountries.map((toCountry, index) => {
            const totalPointsFromJury = receivedPoints[index].jury.reduce(
              (sum, value) => (sum += value.points),
              0
            );

            const totalPointsFromTelevoters = receivedPoints[
              index
            ].televoters.reduce((sum, value) => (sum += value.points), 0);

            const summaryPoints =
              totalPointsFromJury + totalPointsFromTelevoters;

            if (winnerVoteResults.points < summaryPoints) {
              setWinnerVoteResults({
                points: summaryPoints,
                country: toCountry,
              });
            }

            summaryArray.push({
              points: summaryPoints,
              country: toCountry,
            });

            // setSummaryVoteResults((prev) => [
            //   ...prev,
            //   {
            //     points: summaryPoints,
            //     country: toCountry,
            //   },
            // ]);

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
              <Fragment key={toCountry + uuidv4()}>
                <Tr background="blue.200">
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
                    const points =
                      receivedPoints[index].televoters.find(
                        (value) => fromCountry === value.fromCountry
                      )?.points || 0;

                    return (
                      <Td
                        paddingY={0}
                        paddingX={1}
                        fontSize="10px"
                        key={points + uuidv4()}
                      >
                        {points}
                      </Td>
                    );
                  })}
                </Tr>

                <Tr background="orange.200">
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
                    const points =
                      receivedPoints[index].jury.find(
                        (value) => fromCountry === value.fromCountry
                      )?.points || 0;
                    return (
                      <Td
                        paddingY={0}
                        paddingX={1}
                        fontSize="10px"
                        key={points + uuidv4()}
                      >
                        {points}
                      </Td>
                    );
                  })}
                </Tr>
              </Fragment>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
