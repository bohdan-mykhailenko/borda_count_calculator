import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";

interface JSONFileUploaderProps {
  onUploadJSONString: (JSONstringFromFile: string) => void;
  label: string;
}

export const JSONFileUploader: React.FC<JSONFileUploaderProps> = ({
  label,
  onUploadJSONString,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = ({ target }) => {
        const result = target?.result as string;

        onUploadJSONString(result);
      };
    }
  };
  return (
    <Flex direction="column" gap={4}>
      <Text>{label}</Text>

      <Input type="file" accept=".json" onChange={handleChange} />
    </Flex>
  );
};
