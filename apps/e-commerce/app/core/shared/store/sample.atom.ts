import { atom as jotaiAtom } from "jotai";
import { atom as recoilAtom } from "recoil";

const jotaiCountAtom = jotaiAtom(0);
const recoilCountAtom = recoilAtom({
  key: "countState",
  default: 0
});

const jotaiCountryAtom = jotaiAtom("Japan");
const recoilCountryAtom = recoilAtom({
  key: "countryState",
  default: "Japan"
});

const jotaiCitiesAtom = jotaiAtom(["Tokyo", "Kyoto", "Osaka"]);
const recoilCitiesAtom = recoilAtom({
  key: "citiesState",
  default: ["Tokyo", "Kyoto", "Osaka"]
});

const jotaiAnimeAtom = jotaiAtom([
  {
    title: "Ghost in the Shell",
    year: 1995,
    watched: true
  },
  {
    title: "Serial Experiments Lain",
    year: 1998,
    watched: false
  }
]);
const recoilAnimeAtom = recoilAtom({
  key: "animeState",
  default: [
    {
      title: "Ghost in the Shell",
      year: 1995,
      watched: true
    },
    {
      title: "Serial Experiments Lain",
      year: 1998,
      watched: false
    }
  ]
});

export {
  jotaiAnimeAtom,
  jotaiCitiesAtom,
  jotaiCountAtom,
  jotaiCountryAtom,
  recoilAnimeAtom,
  recoilCitiesAtom,
  recoilCountAtom,
  recoilCountryAtom
};
