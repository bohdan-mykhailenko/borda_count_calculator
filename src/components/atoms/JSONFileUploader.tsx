import { Input } from "@chakra-ui/react";
import React from "react";

interface JSONFileUploaderProps {
  onUploadJSONString: (JSONstringFromFile: string) => void;
}

export const JSONFileUploader: React.FC<JSONFileUploaderProps> = ({
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
  return <Input type="file" accept=".json" onChange={handleChange} />;
};
