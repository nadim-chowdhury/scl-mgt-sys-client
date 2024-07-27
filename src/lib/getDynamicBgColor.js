import { dynamicBgLightColor } from "@/utils/dynamic-bg-light-color";

export default function getDynamicBgColor(index) {
  const colorIndex = index % dynamicBgLightColor.length;
  return dynamicBgLightColor[colorIndex];
}
