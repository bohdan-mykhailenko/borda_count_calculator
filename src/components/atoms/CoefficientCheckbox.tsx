import { Checkbox, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface CoefficientCheckboxProps {
  isDisabled: boolean;
  isChecked: boolean;
  onChangeCooefficientsUsage: (isChecked: boolean) => void;
}

export const CoefficientCheckbox: React.FC<CoefficientCheckboxProps> = ({
  isDisabled,
  isChecked,
  onChangeCooefficientsUsage,
}) => {
  const handleCooefficientsUsage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.checked;

    onChangeCooefficientsUsage(value);
  };

  return (
    <Flex gap={2} alignItems="center">
      <Text>With coefficients:</Text>

      <Checkbox
        isDisabled={isDisabled}
        isChecked={isChecked}
        onChange={handleCooefficientsUsage}
        colorScheme="green"
        defaultChecked
      />
    </Flex>
  );
};
