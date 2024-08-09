import { Label, Listbox } from "@headlessui/react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import { SetStateAction, useState } from "react";

type Props = {};

function Lending({}: Props) {
  const [currency, setCurrency] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrency(event.target.value);
  };
  return (
    <div className="ml-56 h-auto px-10 rounded shadow-xl w-full md:w-4/5 overflow-hidden">
      <h1 className=" text-3xl font-bold mb-6">Lending</h1>
      <div className="flex flex-row w-full gap-10 justify-between">
        <div className="flex flex-col w-1/2 gap-10 border bg-slate-500 rounded-xl p-3">
          <div className="w-1/2">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-white"
            >
              Borrow
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>ETH</option>
                  <option>USDC</option>
                  <option>USDT</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            <h2>Duration</h2>
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
              className="text-black"
            />
          </div>

          <div className="w-1/2">
            <Listbox>
              <Label className="block text-sm font-medium leading-6 mb-5 text-white">
                Collateral
              </Label>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  className="text-white font-bold"
                >
                  value
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currency}
                  label="Age"
                  className="border-white bg-white"
                  onChange={handleChange}
                >
                  <MenuItem value={"eth"}>ETH</MenuItem>
                  <MenuItem value={"usdc"}>USDC</MenuItem>
                  <MenuItem value={"usdt"}>USDT</MenuItem>
                </Select>
              </FormControl>
            </Listbox>
          </div>
        </div>

        <div className="flex flex-col gap-10 w-2/3">
          <div className="flex flex-col md:w-auto gap-2 border bg-slate-500  text-[12px] text-white rounded-xl px-4 py-2">
            <h1 className="text-4xl">Rewards</h1>
            <h1 className="text-2xl font-bold">87</h1>
            <h1 className="text-md">23%</h1>
          </div>

          <div className="flex flex-col border bg-slate-500 rounded-xl p-3 gap-10">
            <h2>Summary</h2>
            <div className="flex flex-row gap-10">
              <div className="flex-col w-1/2 border border-white py-2 rounded-lg gap-10">
                <div className="px-3 py-1">
                  <h3>Borrowing</h3>
                  <h1>2.00 ETH</h1>
                </div>
                <div className="border border-x-0 border-b-0 px-3 border-white">
                  <div className="flex flex-row justify-between">
                    <p>Net Interest</p>
                    <h2>2.30%</h2>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>To Repay</p>
                    <h2>2.03 ETH</h2>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>Repay</p>
                    <h2>2.30%</h2>
                  </div>
                </div>
              </div>
              <div className="flex-col w-1/2 border border-white py-2 rounded-lg gap-10">
                <div className="px-3 py-1">
                  <h3>Collateral</h3>
                  <h1>1000 USDC</h1>
                </div>
                <div className="border border-x-0 border-b-0 px-3 border-white">
                  <div className="flex flex-row justify-between">
                    <p>Collateral Ratio</p>
                    <h2>151.02%</h2>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>Liquidation Probability</p>
                    <h2>0.03%</h2>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p>Credit Line</p>
                    <h2>New</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lending;
