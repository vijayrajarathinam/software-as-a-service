import clsx from "clsx";

export default function Image({ src, className = "w-4 h-4", parentClassName = "w-11 h-11" }) {
  return (
    <div className={clsx(parentClassName, "lg:mx-auto border-pink-500 border-2 rounded-full")}>
      <img src={src} alt="" className={clsx(className, "rounded-full")} />
    </div>
  );
}
