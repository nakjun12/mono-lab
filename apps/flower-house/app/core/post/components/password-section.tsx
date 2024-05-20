interface IProps {
  prevPW: string;
  updatePW: (value: any, category: string) => void;
  checkPW: string;
}

export default function PasswordSectionComponent({
  prevPW,
  updatePW,
  checkPW
}: IProps) {
  return (
    <>
      <div className="flex justify-between">
        <span>비밀번호 입력</span>
        <input
          type="password"
          className="border rounded border-slate-300"
          onChange={(e) => updatePW(e.target.value, "prev")}
          value={prevPW}
        />
      </div>
      <div className="flex justify-between">
        <span>비밀번호 확인</span>
        <input
          type="password"
          className="border rounded border-slate-300"
          onChange={(e) => updatePW(e.target.value, "check")}
          value={checkPW}
        />
      </div>
    </>
  );
}
