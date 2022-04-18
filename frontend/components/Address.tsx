import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export type AddressProps = {
  /**
   * The address to display
   */
  value: string;
  /**
   * Whether the address can be copied or not
   */
  copiable?: boolean;
  /**
   * Shorten the address if it does not resolve to an ENS name
   */
  shortened?: boolean;
  /**
   * Set to true for ENS lookup
   */
  ens?: boolean;
} & ButtonProps;

/**
 * A component to display an address
 */
export const Address: React.FC<AddressProps> = ({
  value,
  copiable = false,
  shortened = false,
  ens = false,

  ...rest
}) => {
  const [error, setError] = useState<undefined | string>(undefined);
  const [copied, setCopied] = useState<boolean>(false);
  let feedbackTimeOut: ReturnType<typeof setTimeout>;
  let displayAddress: string = value || "";
  const [ensName, setEnsName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (value) {
      if (value.includes(".eth") || value === "" || value === "Not connected")
        return;
    }
  }, [value]);

  if (shortened && value) {
    if (value.includes(".eth") || value === "" || value === "Not connected") {
      displayAddress = value;
    } else {
      displayAddress = `${value.substring(0, 4)}...${value.substring(
        value.length - 4
      )}`.toLowerCase();
    }
  }

  const handleClick = async (): Promise<void> => {
    if (copiable && value) {
      try {
        await navigator.clipboard.writeText(value);
        setError(undefined);
        setCopied(true);

        feedbackTimeOut = setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (error) {
        setError(error as string);
      }
    }
  };

  useEffect(() => {
    return () => clearTimeout(feedbackTimeOut);
  }, []);

  return (
    <Button onClick={handleClick} {...rest}>
      <FormControl isInvalid={!!error}>
        <Flex
          data-testid="address-container"
          alignItems="center"
          cursor={copiable ? "pointer" : "initial"}
        >
          <Text>{ensName || displayAddress}</Text>
          {copiable && (
            <Box ml="auto">
              {copied ? (
                <CheckIcon ml="3" color="green.500" />
              ) : (
                <CopyIcon ml="3" color="gray.300" />
              )}
            </Box>
          )}
        </Flex>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Button>
  );
};
