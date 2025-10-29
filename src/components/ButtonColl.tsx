// ButtonCollection.tsx
import type { JSX } from "solid-js";

type ButtonType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

type ButtonProps = {
  type: ButtonType;
  label?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export default function Button({ type, label = "Button", onClick }: ButtonProps) {
  const classes: Record<ButtonType, string> = {
    primary:
      "inline-block rounded border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950",
    secondary:
      "inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950",
    success:
      "inline-block rounded border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600 focus:bg-success-50/50 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none dark:hover:bg-green-950 dark:focus:bg-green-950",
    danger:
      "inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 motion-reduce:transition-none dark:hover:bg-rose-950 dark:focus:bg-rose-950",
    warning:
      "inline-block rounded border-2 border-warning px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-warning-50/50 hover:text-warning-600 focus:border-warning-600 focus:bg-warning-50/50 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 motion-reduce:transition-none dark:hover:bg-yellow-950 dark:focus:bg-yellow-950",
    info:
      "inline-block rounded border-2 border-info px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-info transition duration-150 ease-in-out hover:border-info-600 hover:bg-info-50/50 hover:text-info-600 focus:border-info-600 focus:bg-info-50/50 focus:text-info-600 focus:outline-none focus:ring-0 active:border-info-700 active:text-info-700 motion-reduce:transition-none dark:hover:bg-cyan-950 dark:focus:bg-cyan-950",
    light:
      "inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 motion-reduce:transition-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600",
    dark:
      "inline-block rounded border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 focus:border-neutral-800 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 motion-reduce:transition-none dark:text-neutral-600 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900",
  };

  return (
    <button
      type="button"
      class={classes[type]}
      onClick={onClick}
      data-twe-ripple-init
    >
      {label}
    </button>
  );
}
