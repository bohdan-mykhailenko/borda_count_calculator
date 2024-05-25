import {
  Button,
  Flex,
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

import { Order, ShortVotingEntity, VoteResults } from "../types";
import { getColorForPoints } from "../molecules/utils";
import { PointsSummary } from "../atoms";

interface PointsTableProps extends ShortVotingEntity {}

export const PointsTable: React.FC<PointsTableProps> = ({
  fromCountries,
  toCountries,
  receivedPoints,
}) => {
  const [ordering, setOrdering] = useState<Order | null>(null);
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

  const handleSortingResult = (newOrdering: Order) => {
    setOrdering(newOrdering);
  };

  const preparedToCountries = useMemo(() => {
    return toCountries.map((toCountry) => {
      const receivedPointsEntity = receivedPoints.find(
        (entity) => entity.toCountry === toCountry
      );

      if (!receivedPointsEntity) {
        return {
          toCountry: "",
          totalPointsFromJury: 0,
          totalPointsFromTelevoters: 0,
          summaryPoints: 0,
          countryCode: "",
        };
      }

      const totalPointsFromJury = receivedPointsEntity.jury.reduce(
        (sum, value) => (sum += value.points),
        0
      );

      const totalPointsFromTelevoters = receivedPointsEntity.televoters.reduce(
        (sum, value) => (sum += value.points),
        0
      );

      const summaryPoints = totalPointsFromJury + totalPointsFromTelevoters;

      const countryCode =
        find.byCountry(toCountry)?.iso2 || toCountry.slice(0, 2).toUpperCase();

      return {
        toCountry,
        totalPointsFromJury,
        totalPointsFromTelevoters,
        summaryPoints,
        countryCode,
      };
    });
  }, [toCountries]);

  const sortedToCountries = useMemo(() => {
    if (ordering === Order.ASC) {
      return preparedToCountries.sort(
        (resultA, resultB) => resultA.summaryPoints - resultB.summaryPoints
      );
    }

    if (ordering === Order.DESC) {
      return preparedToCountries.sort(
        (resultA, resultB) => resultB.summaryPoints - resultA.summaryPoints
      );
    }

    return preparedToCountries;
  }, [ordering]);

  return (
    <Flex direction="column" gap={2}>
      <Flex
        gap={8}
        borderBottom="3px solid"
        borderColor="teal.800"
        paddingBottom={2}
      >
        <PointsSummary label="Winner" results={winnerVoteResults} isWinner />
        <PointsSummary label="Jury" results={televotersVoteResults} />
        <PointsSummary label="Televoters" results={juryVoteResults} />
      </Flex>

      <Flex width="fit-content" direction="column" gap={1} paddingY={2}>
        <Text>Sorting:</Text>

        <Flex gap={4}>
          <Button
            width={16}
            colorScheme="teal"
            size="xs"
            onClick={() => handleSortingResult(Order.ASC)}
          >
            ASC
          </Button>

          <Button
            width={16}
            colorScheme="teal"
            size="xs"
            onClick={() => handleSortingResult(Order.DESC)}
          >
            DESC
          </Button>
        </Flex>
      </Flex>

      <Table
        colorScheme="facebook"
        variant="main"
        bgcolor="white"
        fontSize="xs"
        size="md"
        color="black"
        fontWeight="semibold"
      >
        <Thead>
          <Tr>
            <Td
              textAlign="center"
              paddingX={0}
              paddingY={2}
              width={5}
              background="purple.500"
              color="black"
            >
              Country
            </Td>

            <Td
              paddingX={0}
              paddingLeft={2}
              paddingY={2}
              width={5}
              background="purple.400"
              color="black"
            >
              Subtotal
            </Td>
            {fromCountries.map((fromCountry) => (
              <Td
                paddingY={0}
                paddingX={1}
                key={fromCountry + uuidv4()}
                fontSize="10px"
                color="black"
                fontWeight={700}
                textTransform="uppercase"
                background="purple.200"
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
          {sortedToCountries.map((toCountryItem, index) => {
            if (winnerVoteResults.points < toCountryItem.summaryPoints) {
              setWinnerVoteResults({
                points: toCountryItem.summaryPoints,
                country: toCountryItem.toCountry,
              });
            }

            if (juryVoteResults.points < toCountryItem.totalPointsFromJury) {
              setJuryVoteResults({
                points: toCountryItem.totalPointsFromJury,
                country: toCountryItem.toCountry,
              });
            }

            if (
              televotersVoteResults.points <
              toCountryItem.totalPointsFromTelevoters
            ) {
              setTelevotersVoteResults({
                points: toCountryItem.totalPointsFromTelevoters,
                country: toCountryItem.toCountry,
              });
            }

            return (
              <Fragment key={toCountryItem.toCountry + uuidv4()}>
                <Tr background="gray.200">
                  <Td
                    textAlign="center"
                    padding={0}
                    fontSize={10}
                    color="black"
                    fontWeight={700}
                    textTransform="uppercase"
                  >
                    <Tooltip label={toCountryItem.toCountry}>
                      {toCountryItem.countryCode}
                    </Tooltip>
                  </Td>

                  <Td
                    paddingY={0}
                    paddingX={2}
                    fontSize="sm"
                    fontWeight={700}
                    textTransform="uppercase"
                    color="black"
                    background={getColorForPoints(
                      toCountryItem.totalPointsFromTelevoters
                    )}
                  >
                    {toCountryItem.totalPointsFromTelevoters}
                  </Td>

                  {fromCountries.map((fromCountry) => {
                    const points =
                      receivedPoints[index].televoters.find(
                        (value) => fromCountry === value.fromCountry
                      )?.points || 0;

                    return (
                      <Td
                        width={6}
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

                <Tr background="white">
                  <Td padding={0} />

                  <Td
                    paddingY={0}
                    paddingX={2}
                    fontSize="sm"
                    fontWeight={700}
                    textTransform="uppercase"
                    color="black"
                    background={getColorForPoints(
                      toCountryItem.totalPointsFromJury
                    )}
                  >
                    {toCountryItem.totalPointsFromJury}
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
    </Flex>
  );
};
