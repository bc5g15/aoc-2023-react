import { Template } from "../Template";
import { Trebuchet } from "./1";
import { CubeConundrum } from "./2";
import { GearRatios } from "./3";
import { Scratchcards } from "./4";
import { AlmanacReader } from "./5";

export const puzzleIndex = [
    {
        name: 'Sample Template',
        element: <Template />
    },
    {
        name: 'Day 1: Trebuchet?!',
        element: <Trebuchet />
    },
    {
        name: 'Day 2: Cube Conundrum',
        element: <CubeConundrum />
    },
    {
        name: 'Day 3: Gear Ratios',
        element: <GearRatios />
    },
    {
        name: 'Day 4: Scratchcards',
        element: <Scratchcards />
    },
    {
        name: 'Day 5: If You Give A Seed A Fertilizer',
        element: <AlmanacReader />
    }
];