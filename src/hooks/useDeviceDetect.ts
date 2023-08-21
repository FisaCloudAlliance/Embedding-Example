import { debounce } from "lodash";
import { useState, useLayoutEffect } from "react";
import { isMobile as mobile } from "react-device-detect";
export function useDeviceDetect() {
  // 初期値は react-device-detect を利用
  const [isMobile, setIsMobile] = useState(mobile);

  // レイアウトの変更では、Screenサイズを見ながら、適宜判定する
  useLayoutEffect(() => {
    const updateSize = (): void => {
      const userAgent =
        typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
      // const mobileSizeDisplay = window.innerWidth < 768;
      const mobileSizeDisplay = window.innerWidth < 900;

      setIsMobile(mobile || mobileSizeDisplay);
      //   console.log("isMobile:", mobile || mobileSizeDisplay);
    };
    window.addEventListener("resize", debounce(updateSize, 250));
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
}
