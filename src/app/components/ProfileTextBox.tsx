interface ProfileTextBoxProps {
  text: string;
  boldText: string;
  contentText: string;
  divPosition?: string;
  data_testid: string;
}

export function ProfileTextBox({
  text,
  boldText,
  data_testid,
  contentText,
  divPosition,
}: ProfileTextBoxProps) {
  return (
    <div className={`w-[296px] ${divPosition}`}>
      <span className="font-normal text-sm leading-3 text-[#262626]">
        {text}{" "}
      </span>
      <strong className="text-sm leading-3 text-[#262626]">{boldText}</strong>
      <div className="w-full h-11 bg-[#F4F4F4] rounded-lg mt-2 p-[16px_16px_16ox_16px] text-xs text-[#262626] flex items-center">
        <span className="pl-[16px]" data-testid={data_testid}>
          {contentText}
        </span>
      </div>
    </div>
  );
}
