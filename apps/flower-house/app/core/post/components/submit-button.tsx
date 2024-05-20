export default function SubmitButtonComponent({
  handleButtonClick
}: {
  handleButtonClick: () => Promise<void>;
}) {
  // TODO: 유효성검사, 버튼색변경
  return (
    <button
      type="button"
      className="rounded-lg h-12 bg-[#C4C4C4] text-[#fff]"
      onClick={handleButtonClick}>
      작성 완료
    </button>
  );
}
