import { createContext, useContext, useState } from "react";

type ValueType = {
  name: string;
  nickname: string;
  setter: (param: { name: string; nickname: string }) => void;
};
const ExampleContext = createContext<ValueType | null>(null);

const useExample = () => {
  const value = useContext(ExampleContext);
  if (!value) throw new Error("");
  return value;
};

const useDraft = (nickname: string) => {
  const [draft, setDraft] = useState<string>();

  const value = draft ?? nickname;

  const onChangeValue = (newValue: string) => setDraft(newValue);

  return { value, onChangeValue };
};

const Comp = () => {
  const { name, setter } = useExample();
  const { value, onChangeValue: setValue } = useDraft(name);
  return (
    <div className="">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setter({ name: value, nickname: "" })}>
        상태 커밋하기
      </button>
    </div>
  );
};

// const FunnelExample = () => {
//   const [value, setValue] = useState<Omit<ValueType, "setter">>({
//     name: "",
//     nickname: ""
//   });
//   const [Funnel, { createStep }] = useFunnel(
//     funnelOptions({ funnelId: "1", steps: ["1", "2", "3"] as const })
//   );
//   return (
//     <ExampleContext.Provider value={{ ...value, setter: setValue }}>
//       <Funnel>
//         <Funnel.Step name={"1"}>
//           <Comp />
//         </Funnel.Step>
//       </Funnel>
//     </ExampleContext.Provider>
//   );
// };
