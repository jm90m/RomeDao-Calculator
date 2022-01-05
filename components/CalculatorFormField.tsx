import React from "react";
import i18n from "i18n-js";

interface CalculatorFormFieldProps {
  title: string;
  includeCurrentButton?: boolean;
  setField: (field: any) => void;
  inputType?: string;
  value: string | number;
  getCurrent?: () => void;
}

function CalculatorFormField({
  title,
  includeCurrentButton,
  setField,
  inputType = "number",
  value,
  getCurrent,
}: CalculatorFormFieldProps) {
  return (
    <div className="mb-2">
      <label
        htmlFor="base-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {title}
      </label>
      <div className="flex items-center">
        <input
          id="base-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setField(e.target.value);
          }}
          type={inputType}
          value={value}
        />
        {includeCurrentButton && (
          <button
            type="button"
            className="w-48 ml-4 text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
            onClick={getCurrent}
          >
            {i18n.t("getCurrent")}
          </button>
        )}
      </div>
    </div>
  );
}

export default CalculatorFormField;
