/** @jsxImportSource @emotion/react */
import React, { createContext, useCallback, useContext, useState } from "react";
import { CallBackProps, STATUS, Step, StoreHelpers } from "react-joyride";
import { FuncItem } from "@/components/styled/Button";
import { useNavigate } from "react-router-dom";

interface JoyrideContextType {
  steps: Step[];
  run: boolean;
  setRun: (_val: boolean) => void;
  handleCallback: (_data: CallBackProps) => void;
  helpers: StoreHelpers | null;
  getHelpers: (_helpers: StoreHelpers) => void;
  currentStepIndex: number;
}

const JoyrideContext = createContext<JoyrideContextType | undefined>(undefined);

export const JoyrideProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [run, setRun] = useState(false);
  const [helpers, setHelpers] = useState<StoreHelpers | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const navigate = useNavigate();

  const steps: Step[] = [
    {
      target: "body",
      placement: "center",
      content: (
        <div className="flex flex-col gap-4 font-bold">
          <h1>Icoins 튜토리얼입니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".input-write-email",
      content: (
        <div className="flex flex-col gap-4">
          <h1>이곳에 이메일을 입력합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".input-write-wallet-icon",
      content: (
        <div className="flex flex-col gap-4">
          <h1>
            이미 가입했지만, 자동으로 입력이 안될경우 <br /> 이 아이콘을
            클릭해서 정보를 가져옵니다.
          </h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".input-write-site",
      content: (
        <div className="flex flex-col gap-4">
          <h1>정상적으로 사이트가 입력되었는지 확인합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".input-write-wallet",
      content: (
        <div className="flex flex-col gap-4">
          <h1>지갑을 입력합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".input-write-next",
      content: (
        <div className="flex flex-col gap-4">
          <h1>다음 버튼을 클릭합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".exchange-check-amount",
      content: (
        <div className="flex flex-col gap-4">
          <h1>원하는 액수를 클릭합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".exchange-check-crypto-amount",
      content: (
        <div className="flex flex-col gap-4">
          <h1>입금해야하는 액수를 확인합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".exchange-check-next",
      content: (
        <div className="flex flex-col gap-4">
          <h1>시세를 확인하고 다음 버튼을 클릭합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-request-crypto-amount",
      content: (
        <div className="flex flex-col gap-4">
          <h1>요청하기 전 마지막으로 최종 입금 금액을 확인합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-request-next",
      content: (
        <div className="flex flex-col gap-4">
          <h1>확인하고 다음을 누릅니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-check-check",
      content: (
        <div className="flex flex-col gap-4">
          <h1>
            이 페이지에 진입하면 <br />
            더이상 입금금액은 확인할 수 없습니다. <br />
            <br />
            이전 화면에서 반드시 입금 금액을 확인해주세요.
          </h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-check-amount",
      content: (
        <div className="flex flex-col gap-4">
          <h1>입금해야할 금액을 다시 확인합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-check-qr",
      content: (
        <div className="flex flex-col gap-4">
          <h1>
            이제 입금을 위해 본인의 거래소에서
            <br />
            QR코드를 촬영해서 입금하세요.
          </h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-check-wallet",
      content: (
        <div className="flex flex-col gap-4">
          <h1>지갑주소를 복사해서 입력할 수도 있습니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-check-next",
      content: (
        <div className="flex flex-col gap-4">
          <h1>입금을 완료하고 확인요청을 클릭합니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-approval-check",
      content: (
        <div className="flex flex-col gap-4">
          <h1>이제 해당 화면에서 입금 완료를 기다립니다.</h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="안내종료"
              className="w-[45%]"
            />
            <FuncItem
              func={() => helpers?.next()}
              isActive={true}
              label="다음"
              className="w-[45%]"
            />
          </div>
        </div>
      ),
    },
    {
      target: ".deposit-approval-send",
      content: (
        <div className="flex flex-col gap-4">
          <h1>
            완료되면 체크 아이콘이 등장함과 동시에, <br />
            이메일로 알림이 수신됩니다.
            <br />
            <br />
            이것으로 icoins 안내는 종료됩니다.
          </h1>
          <div className="flex flex-row justify-around">
            <FuncItem
              func={() => navigate("/")}
              isActive={true}
              label="완료"
              className="w-[100%]"
            />
          </div>
        </div>
      ),
    },
  ];

  const handleCallback = useCallback((data: CallBackProps) => {
    const { status, index } = data;
    const FINISHED_STATUSES = [STATUS.FINISHED, STATUS.SKIPPED] as const;

    setCurrentStepIndex(index);

    if (
      FINISHED_STATUSES.includes(status as (typeof FINISHED_STATUSES)[number])
    ) {
      setRun(false);
    }
  }, []);

  const getHelpers = useCallback((helpers: StoreHelpers) => {
    setHelpers(helpers);
  }, []);

  return (
    <JoyrideContext.Provider
      value={{
        steps,
        run,
        setRun,
        handleCallback,
        helpers,
        getHelpers,
        currentStepIndex,
      }}
    >
      {children}
    </JoyrideContext.Provider>
  );
};

export const useJoyride = () => {
  const context = useContext(JoyrideContext);
  if (!context) {
    throw new Error("useJoyride must be used within a JoyrideProvider");
  }
  return context;
};
