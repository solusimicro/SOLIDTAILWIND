// ButtonCollection.tsx
import type { JSX } from "solid-js";

type ButtonType = "purple" | "purple1" | "blue" | "green" | "red" | "gray";

type ButtonProps = {
  type: ButtonType;
  label?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export default function Button({
  type,
  label = "Button",
  onClick,
}: ButtonProps) {
  const classes: Record<ButtonType, string> = {
    purple:
      "text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
    purple1:
      "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
    blue: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800",
    green:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800",
    red: "text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800",
    gray: "text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500",
  };

  return (
    <button type="button" class={classes[type]} onClick={onClick}>
      {label}
    </button>
  );
}
