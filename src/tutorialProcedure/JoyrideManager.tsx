import { useJoyride } from "@/context/JoyrideContext";
import Joyride from "react-joyride";

export function JoyrideManager() {
  const { steps, run, handleCallback, getHelpers } = useJoyride();

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleCallback}
      getHelpers={getHelpers}
      showSkipButton
      scrollToFirstStep
      continuous
      // continuous={false} → 수동 진행이므로 필요 없음
      styles={{ options: { zIndex: 10000 } }}
    />
  );
}
