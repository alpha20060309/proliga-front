import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { cn } from "lib/utils";

const PositionsFilter = ({ column, columnFilterValue, className }) => {
  const { t } = useTranslation();

  const DATA = [
    {
      title: "Pozitsiya",
      key: "ALL", // Changed from empty string to 'ALL'
    },
    {
      title: "Darvozabon",
      key: "GOA",
    },
    {
      title: "Himoyachi",
      key: "DEF",
    },
    {
      title: "Yar Himoyachi",
      key: "MID",
    },
    {
      title: "Hujumchi",
      key: "STR",
    },
  ];

  const handleValueChange = (value) => {
    column.setFilterValue(value === "ALL" ? "" : value);
  };

  return (
    <Select
      defaultValue="ALL"
      value={columnFilterValue === "" ? "ALL" : columnFilterValue}
      onValueChange={handleValueChange}
      className="w-full py-0"
    >
      <SelectTrigger
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:text-foreground border-border w-full rounded-md border border-dashed px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[size=default]:h-8",
          className,
        )}
      >
        <SelectValue placeholder={t("Pozitsiya")} />
      </SelectTrigger>
      <SelectContent>
        {DATA.map((position) => (
          <SelectItem
            key={position.key}
            value={position.key}
            className="capitalize"
          >
            {t(position.title)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PositionsFilter;
