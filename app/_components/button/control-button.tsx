export default function ControlButton(props: {
  text: string;
  onClick: () => void;
  unclickable?: boolean;
}) {
  const click = props.unclickable ? "pointer-events-none" : "";
  const textColor = props.unclickable ? "border-stone-400" : "border-black";
  const borderColor = props.unclickable ? "text-stone-400" : "text-black";

  return (
    <button
      className={`${borderColor} border rounded-full ${textColor} font-medium py-3 px-4 text-xs xxs:text-sm xs:text-base ${click}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
