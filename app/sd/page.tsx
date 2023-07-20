"use client";

import { json } from "stream/consumers";
import { CommonInput } from "../component/CommonInput";
import { ControlNetInput } from "../component/ControlNetInput";
import { ExtraInput } from "../component/ExtraInput";
import { Img2imgImageInput } from "../component/Img2imgImageInput";
import { PromptContainer } from "../component/PromptContainer";
import { useExtra } from "../hook/useExtra.hook";
import { useImg2img } from "../hook/useImg2img.hook";
import { useOptions } from "../hook/useOptions.hook";
import { useProgress } from "../hook/useProgress.hook";
import { useTxt2img } from "../hook/useTxt2img.hook";
import { useEffect, useState } from "react";
import { GetModels } from "../component/GetModels";
// import styles from './page.module.css'

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Divider } from '@chakra-ui/react'

import Head from "next/head";
import { inherits } from "util";

const sdurl = "http://124.42.12.105:54325";
//const sdurl = "http://119.254.88.177:7860"
const sdfile = "/home/tang/stable-diffusion-webui";

// function getModels(){
//   var resjson;
//   const sdMod = async () =>{
//     console.log("test");
//     const res = await fetch(sdurl+ "/sdapi/v1/sd-models")
//     resjson = await res.json();
//     console.log(resjson[0]);
//     return resjson;
//     const retarray = [resjson[0]];
//     for (var i = 1; i<resjson.length; i++){
//       retarray.push(resjson[i]);
//     }
//     console.log(Array.isArray(retarray) + " retarray");
//     return retarray;
//   }
//   return resjson;
// }

// console.log(models[1]);

// console.log(Array.isArray(sdMod));

// sdMod();

// console.log(models[1]);

const sdModel = [
  {
    title: "v1-5-pruned-emaonly.safetensors [6ce0161689]",
    model_name: "v1-5-pruned-emaonly.safetensors",
    hash: "6ce0161689",
    sha256: "6ce0161689b3853acaa03779ec93eafe75a02f4ced659bee03f50797806fa2fa",
    filename:
      sdfile + "/models/Stable-diffusion/v1-5-pruned-emaonly.safetensors",
    config: null,
  },
  {
    title: "dreamshaper_7-inpainting.safetensors",
    model_name: "dreamshaper_7-inpainting",
    hash: null,
    sha256: null,
    filename:
      "/sys/fs/cgroup/AAA/models/Stable-diffusion/dreamshaper_7-inpainting.safetensors",
    config: null,
  },
  {
    title: "dreamshaper_7.safetensors",
    model_name: "dreamshaper_7",
    hash: null,
    sha256: null,
    filename:
      "/sys/fs/cgroup/AAA/models/Stable-diffusion/dreamshaper_7.safetensors",
    config: null,
  },
];

console.log(Array.isArray(sdModel) + " kljljljljlkjllkjlkjlkjlkjlkjlkjkljl");

export default function Page() {
  const [images, setImages] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loadingImages, setLoadingImages] = useState<string>("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [model, setModel] = useState<string>("v1-5-pruned-emaonly.safetensors");

  // const [data, setData] = useState([{title: "", model_name: "", hash: "", sha256: "", filename: "", config: null}]);

  // useEffect(() => {
  //   const sdMod = async () => {
  //     console.log("test");
  //     console.log(sdurl + "/sdapi/v1/sd-models")
  //     fetch(sdurl + "/sdapi/v1/sd-models")
  //     .then(response => response.json())
  //     .then(data => setData(data));
  //   };
  //   sdMod();
  // }, []);

  const {
    images: generatedImages,
    loading,
    error,
    txt2img,
  } = useTxt2img({
    url: sdurl,
    port: "",
  });

  const {
    images: generatedImages2,
    result: result2,
    loading: loading2,
    error: error2,
    img2img,
  } = useImg2img({
    url: sdurl,
    port: "",
  });

  const {
    images: generatedImages3,
    result: result3,
    loading: loading3,
    error: error3,
    extra,
  } = useExtra({
    url: sdurl,
    port: "",
  });

  const { query, result: result4 } = useProgress({
    url: sdurl,
    port: "",
  });

  const {
    result: result5,
    loading: loading5,
    setOptions,
  } = useOptions({
    url: sdurl,
    port: "",
  });

  const handleTxt2imgClick = () => {
    txt2img();
    const id = setInterval(() => {
      query();
    }, 1000);
    setIntervalId(id);
  };

  const handleImg2imgClick = () => {
    img2img();
    query();
  };

  useEffect(() => {
    if (generatedImages.length > 0) {
      setImages(generatedImages);
      clearInterval(intervalId!);
    }
  }, [generatedImages]);

  useEffect(() => {
    if (generatedImages2.length > 0) {
      setImages(generatedImages2);
    }
  }, [generatedImages2]);

  useEffect(() => {
    if (result4) {
      setResult(result4);
    }
  }, [result4]);

  useEffect(() => {
    if (result && result.current_image) {
      setLoadingImages(result.current_image);
    }
  }, [result]);

  const style = "fish";

  return (
    <>
      <Stack align={"left"} padding={5}>
        <HStack spacing={5} divider={<StackDivider borderColor='gray.200' />}>
          <VStack align={"left"}>
            <Text>Model</Text>
            <HStack>
              <Select
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                maxWidth={400}
              >
                {sdModel.map((model, index) => (
                  <option key={index} value={model.title}>
                    {model.title}
                  </option>
                ))}
              </Select>
              <Button
                maxWidth={100}
                onClick={() => {
                  setOptions({
                    sd_model_checkpoint: model,
                  });
                }}
                disabled={loading5}
              >
                Save
              </Button>
            </HStack>
            {loading5 && <Text>loading...</Text>}
            <PromptContainer mode={0} prompt_default={style} />
            <CommonInput mode={0} />
          </VStack>
          <Box width={500}>
            {error && (
              <Alert status="error">
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}
            {generatedImages.length > 0 &&
              generatedImages.map((image, index) => (
                <Image
                  boxSize={"sm"}
                  objectFit={"contain"}
                  align={"left"}
                  key={index}
                  src={`data:image/png;base64,${image}`}
                  width="256"
                  alt={`image-${index}`}
                />
              ))}
          </Box>
          <ControlNetInput mode={0} />
        </HStack>
      </Stack>
      <Stack padding={5} align={"left"} className="underline">
        <VStack align={"left"}>
          <Button onClick={handleTxt2imgClick}>txt2img</Button>
          {loading && (
            <>
              <Text>loading...</Text>
              {loadingImages && (
                <Image
                  boxSize={"sm"}
                  objectFit={"contain"}
                  src={`data:image/png;base64,${loadingImages}`}
                  width="256"
                />
              )}
            </>
          )}
        </VStack>
      </Stack>
      {/* <div>
        <h1> img2img generation </h1>
        <PromptContainer mode={1} />
        <Img2imgImageInput />
        <ControlNetInput mode={1} />
        <Button onClick={handleImg2imgClick}>img2img</Button>
        {loading2 && <div>loading...</div>}
        {error2 && <div>{error}</div>}
        {generatedImages2.length > 0 &&
          generatedImages2.map((image, index) => (
            <img
              key={index}
              src={`data:image/png;base64,${image}`}
              width="256"
              alt={`image-${index}`}
            />
          ))}
      </div> */}
    </>
  );
}
