import { FuncItem } from "@/components/styled/Button/Button";

export function Step(props: { next: () => void; previous: () => void }) {
  const { next, previous } = props;

  const BackButton = () => (
    <FuncItem
      func={previous}
      label="이전"
      isActive={false}
      className="w-[45%]"
    />
  );

  const NextButton = ({ isActive }: { isActive: boolean }) => (
    <FuncItem
      func={next}
      isActive={isActive}
      label="다음"
      className="w-[45%]"
    />
  );

  return (
    <div className="w-full flex flex-row justify-between">
      <BackButton />
      <NextButton isActive={false} />
    </div>
  );
}
