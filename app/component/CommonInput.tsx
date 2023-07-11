import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { use, useEffect, useState } from "react";

import { Select } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const samplingMethodOptions = [
  {
    name: "Euler a",
    aliases: ["k_euler_a", "k_euler_ancestral"],
    options: {},
  },
  {
    name: "Euler",
    aliases: ["k_euler"],
    options: {},
  },
  {
    name: "LMS",
    aliases: ["k_lms"],
    options: {},
  },
  {
    name: "Heun",
    aliases: ["k_heun"],
    options: {},
  },
  {
    name: "DPM2",
    aliases: ["k_dpm_2"],
    options: {
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM2 a",
    aliases: ["k_dpm_2_a"],
    options: {
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM++ 2S a",
    aliases: ["k_dpmpp_2s_a"],
    options: {},
  },
  {
    name: "DPM++ 2M",
    aliases: ["k_dpmpp_2m"],
    options: {},
  },
  {
    name: "DPM++ SDE",
    aliases: ["k_dpmpp_sde"],
    options: {},
  },
  {
    name: "DPM fast",
    aliases: ["k_dpm_fast"],
    options: {},
  },
  {
    name: "DPM adaptive",
    aliases: ["k_dpm_ad"],
    options: {},
  },
  {
    name: "LMS Karras",
    aliases: ["k_lms_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DPM2 Karras",
    aliases: ["k_dpm_2_ka"],
    options: {
      scheduler: "karras",
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM2 a Karras",
    aliases: ["k_dpm_2_a_ka"],
    options: {
      scheduler: "karras",
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM++ 2S a Karras",
    aliases: ["k_dpmpp_2s_a_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DPM++ 2M Karras",
    aliases: ["k_dpmpp_2m_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DPM++ SDE Karras",
    aliases: ["k_dpmpp_sde_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DDIM",
    aliases: [],
    options: {},
  },
  {
    name: "PLMS",
    aliases: [],
    options: {},
  },
  {
    name: "UniPC",
    aliases: [],
    options: {},
  },
];

export const CommonInput = ({ mode }: { mode: number }) => {
  const settings =
    mode == 0
      ? useSelector((state) => state.txt2img.settings)
      : useSelector((state) => state.img2img.settings);
  const setSettings = mode == 0 ? setTxt2imgSettings : setImg2imgSettings;
  const dispatch = useDispatch();

  const [samplingMethod, setSamplingMethod] = useState<string>("Eular a");
  const [steps, setSteps] = useState<number>(20);
  const [restoreFase, setRestoreFase] = useState<boolean>(false);
  const [tiling, setTiling] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(512);
  const [width, setWidth] = useState<number>(512);
  const [batchCount, setBatchCount] = useState<number>(1);
  const [batchSize, setBatchSize] = useState<number>(1);
  const [cfg, setCfg] = useState<number>(7);
  const [denoising, setDenoising] = useState<number>(0.7);
  const [seeds, setSeeds] = useState<number>(-1);

  useEffect(() => {
    if (settings.height && settings.height != height) {
      setHeight(settings.height);
    }
    if (settings.width && settings.width != width) {
      setWidth(settings.width);
    }
  }, [settings]);

  return (
    <Stack maxW={700}>
      <label htmlFor="samplingMethod">Sampling Method</label>
      <Select
        name="samplingMethod"
        id="samplingMethod"
        value={samplingMethod}
        onChange={(e) => {
          setSamplingMethod(e.target.value);
          dispatch(setSettings({ ...settings, sampler_index: e.target.value }));
        }}
      >
        {samplingMethodOptions.map((option) => (
          <option value={option.name} key={option.name}>
            {option.name}
          </option>
        ))}
      </Select>
      <NumberInput defaultValue={steps}>
        Steps
        <NumberInputField
          name="steps"
          id="steps"
          onChange={(e) => {
            setSteps(parseInt(e.target.value));
            dispatch(
              setSettings({ ...settings, steps: parseInt(e.target.value) })
            );
          }}
        />
      </NumberInput>
      <HStack>
        <Checkbox
          name="restoreFase"
          id="restoreFase"
          checked={restoreFase}
          onChange={(e) => {
            setRestoreFase(e.target.checked);
            dispatch(
              setSettings({ ...settings, restore_faces: e.target.checked })
            );
          }}
        >
          Restore Face
        </Checkbox>
        <Checkbox
          name="tiling"
          id="tiling"
          checked={tiling}
          onChange={(e) => {
            setTiling(e.target.checked);
            dispatch(setSettings({ ...settings, tiling: e.target.checked }));
          }}
        >
          Tiling
        </Checkbox>
      </HStack>
      <HStack>
        <NumberInput defaultValue={height}>
          Height
          <NumberInputField
            name="height"
            id="height"
            onChange={(e) => {
              setHeight(parseInt(e.target.value));
              dispatch(
                setSettings({
                  ...settings,
                  height: parseInt(e.target.value),
                })
              );
            }}
          />
        </NumberInput>
        <NumberInput defaultValue={width}>
          Width
          <NumberInputField
            name="width"
            id="width"
            onChange={(e) => {
              setWidth(parseInt(e.target.value));
              dispatch(
                setSettings({
                  ...settings,
                  width: parseInt(e.target.value),
                })
              );
            }}
          />
        </NumberInput>
      </HStack>
      <NumberInput defaultValue={batchCount}>
        Batch Count
        <NumberInputField
          type="number"
          name="batchCount"
          id="batchCount"
          onChange={(e) => {
            setBatchCount(parseInt(e.target.value));
            dispatch(
              setSettings({
                ...settings,
                n_iter: parseInt(e.target.value),
              })
            );
          }}
        />
      </NumberInput>
      <NumberInput defaultValue={batchSize}>
        Batch Size
        <NumberInputField
          type="number"
          name="batchSize"
          id="batchSize"
          onChange={(e) => {
            setBatchSize(parseInt(e.target.value));
            dispatch(
              setSettings({
                ...settings,
                batch_size: parseInt(e.target.value),
              })
            );
          }}
        />
      </NumberInput>
      <NumberInput defaultValue={cfg}>
        CFG
        <NumberInputField
          name="cfg"
          id="cfg"
          onChange={(e) => {
            setCfg(parseInt(e.target.value));
            dispatch(
              setSettings({
                ...settings,
                cfg_scale: parseInt(e.target.value),
              })
            );
          }}
        />
      </NumberInput>

      {mode == 1 && (
        <div>
          <label htmlFor="denoising">Denoising strength</label>
          <input
            type="number"
            name="denoising"
            id="denoising"
            value={denoising}
            onChange={(e) => {
              setDenoising(parseFloat(e.target.value));
              dispatch(
                setSettings({
                  ...settings,
                  denoising_strength: parseFloat(e.target.value),
                })
              );
            }}
          />
        </div>
      )}

      <NumberInput defaultValue={seeds}>
        Seeds
        <NumberInputField
          name="seeds"
          id="seeds"
          onChange={(e) => {
            setSeeds(parseInt(e.target.value));
            dispatch(
              setSettings({
                ...settings,
                seed: parseInt(e.target.value),
              })
            );
          }}
        />
      </NumberInput>
    </Stack>
  );
};
