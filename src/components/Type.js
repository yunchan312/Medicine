export default function Type({ type }) {
  return (
    <span className="px-2 rounded-full border-b-2 flex justify-between items-center">
      <div className="bg-[#00d26a] w-[8px] h-[8px] rounded-full"></div>
      <span className="text-[13px]">{type}</span>
    </span>
  );
}
