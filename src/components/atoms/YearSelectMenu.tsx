import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

interface YearSelectMenuProps {
  availableYears: number[];
  onSelectYear: (year: number) => void;
}

export const YearSelectMenu: React.FC<YearSelectMenuProps> = ({
  availableYears,
  onSelectYear,
}) => {
  const isEmptyYearList = availableYears.length === 0;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Year
      </MenuButton>

      <MenuList>
        {isEmptyYearList ? (
          <MenuItem>Empty list...</MenuItem>
        ) : (
          <>
            {availableYears.map((year) => (
              <MenuItem key={year} onClick={() => onSelectYear(year)}>
                {year}
              </MenuItem>
            ))}
          </>
        )}
      </MenuList>
    </Menu>
  );
};
