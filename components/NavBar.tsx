import { BsSearch, BsX } from "react-icons/bs";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Suggestion } from "../types";
import InputSuggestions from "./InputSuggestions";
import useOnClickOutside from "../hooks/useClickOutside";
import { cleanUpSpecialChars } from "../commons";
type Props = {
  setInputCity: Function;
};

const NavBar = ({ setInputCity }: Props) => {
  const [currentCity, setCurrentCity] = useState("");
  const [suggestions, setSuggestions] = useState([] as Suggestion[]);

  const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
    await setCurrentCity(e.currentTarget.value);
  };
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setValue(currentCity);

    setSuggestions(
      data.map((el) => {
        /*      getGeocode({ address: el.description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          console.log("📍 Coordinates: ", { lat, lng });
        }); */
        const item: Suggestion = {
          id: cleanUpSpecialChars(el.structured_formatting.main_text),
          displayName: el.description,
        };
        return item;
      })
    );
  }, [currentCity]);

  const setCity = async (city: string) => {
    await setInputCity(city);
    await setCurrentCity(city);
    setSuggestions([]);
  };
  const clickOutsideHandler = () => {
    setSuggestions([]);
  };

  useOnClickOutside(ref, clickOutsideHandler);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setCity(event.target.value);
    }
  };
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      language: "en",
    },
    debounce: 50,
  });
  return (
    <Flex
      bg="primary.100"
      alignItems="center"
      height={20}
      justifyContent="space-between"
    >
      <Text ml={20} fontSize="3xl" color="primary.900" as="b">
        AccuWeather
      </Text>
      <InputGroup
        bg="white"
        maxWidth="20%"
        mr={10}
        position="relative"
        ref={ref}
      >
        <InputRightElement
          pointerEvents="none"
          children={<BsSearch color="gray" />}
        />
        {currentCity.length > 0 && (
          <InputRightElement
            cursor="pointer"
            onClick={() => setCurrentCity("")}
            mr="5"
            children={<BsX color="gray" />}
          />
        )}
        <Input
          placeholder="Enter City Name"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={currentCity}
        />
        {currentCity.length > 0 && (
          <InputSuggestions items={suggestions} onSelect={setCity} />
        )}
      </InputGroup>
    </Flex>
  );
};

export default NavBar;
