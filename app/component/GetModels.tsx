import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { use, useEffect, useState } from "react";


export const GetModels = () => {
    const [samplingMethod, setSamplingMethod] = useState<string>("Eular a");
    
}