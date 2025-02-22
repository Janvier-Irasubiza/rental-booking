import { useState } from "react";
import { Listbox } from "@headlessui/react";
import ReactCountryFlag from "react-country-flag";
import { countries } from "../datasets/countries";

interface Country {
  code: string;
  isoCode: string;
  name: string;
}

export default function CountryCodeSelector() {
  const [selected, setSelected] = useState<Country>(
    countries?.[0] || {
      code: "+250",
      isoCode: "RW",
      name: "Rwanda",
    }
  );
  const [query, setQuery] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.code.includes(query)
  );

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="w-32 input p-3 text-left rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div className="flex items-center gap-3">
            <ReactCountryFlag
              countryCode={selected.isoCode}
              svg
              className="h-5 w-5 rounded-sm"
            />
            <span className="block truncate">{selected.code}</span>
          </div>
        </Listbox.Button>

        <Listbox.Options className="absolute z-10 mt-2 w-[200px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search country..."
              className="w-full input p-2 text-sm rounded-md border-gray-200 focus:ring-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <Listbox.Option
                key={country.code}
                value={country}
                className={({ active }) =>
                  `cursor-default select-none p-3 ${
                    active ? "bg-blue-50" : "text-gray-900"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <ReactCountryFlag
                    countryCode={country.isoCode}
                    svg
                    className="h-5 w-5 rounded-sm"
                  />
                  <div className="flex-1">
                    <span className="block font-medium">{country.name}</span>
                    <span className="block text-sm text-gray-500">
                      {country.code}
                    </span>
                  </div>
                </div>
              </Listbox.Option>
            ))}
            {filteredCountries.length === 0 && (
              <div className="p-3 text-gray-500 text-sm">
                No countries found
              </div>
            )}
          </div>
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
