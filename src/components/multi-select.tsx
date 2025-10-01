"use client";

import { ChevronDown, CirclePlus, Loader, X } from "lucide-react";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder,
      label,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [customCategoryInput, setCustomCategoryInput] = React.useState("");

    const handleToggleOption = (option: string, checked: boolean) => {
      if (disabled) return;
      if (checked && !value.includes(option)) {
        onChange([...value, option]);
      } else if (!checked) {
        onChange(value.filter((item) => item !== option));
      }
    };

    const handleRemoveOption = (optionToRemove: string) => {
      if (disabled) return;
      onChange(value.filter((item) => item !== optionToRemove));
    };

    const handleAddCustomOption = () => {
      if (disabled) return;
      if (customCategoryInput.trim() !== "") {
        const newOption = customCategoryInput.trim();
        if (!value.includes(newOption)) {
          onChange([...value, newOption]);
        }
        setCustomCategoryInput("");
      }
    };

    return (
      <div ref={ref} className={className} {...props}>
        {label && (
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </span>
        )}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {(value || []).map((item) => (
              <div
                className={cn(
                  buttonVariants({ size: "sm", variant: "secondary" }),
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                key={item}
              >
                {item}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="  "
                  onClick={() => handleRemoveOption(item)}
                  disabled={disabled}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
          <Popover open={isOpen && !disabled} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div
                className={cn(
                  "flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <span className="text-muted-foreground">
                  {value.length > 0
                    ? value.length > 3
                      ? `${value.slice(0, 3).join(", ")} + ${value.length - 3} more`
                      : value.join(", ")
                    : placeholder || "Select options"}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-[--radix-popover-trigger-width] p-0"
              align="start"
            >
              <div className="p-2 space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom option"
                    className="text-sm"
                    value={customCategoryInput}
                    onChange={(e) => setCustomCategoryInput(e.target.value)}
                    disabled={disabled}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustomOption();
                        setIsOpen(false);
                      }
                    }}
                  />
                  <Button
                    size={"icon"}
                    type="button"
                    onClick={() => {
                      handleAddCustomOption();
                      setIsOpen(false);
                    }}
                    disabled={disabled}
                  >
                    <CirclePlus />
                  </Button>
                </div>
                <ScrollArea
                  className={`grid gap-1 ${options.length === 0 ? "h-fit" : "h-56"}`}
                >
                  <ScrollBar orientation="vertical" />
                  {options.length === 0 ? (
                    <div className="flex justify-center p-2">
                      <Loader className="animate-spin w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    options.map((option) => {
                      const isSelected = (value || []).includes(option);
                      const optionId = `checkbox-${option}`;
                      return (
                        <div
                          key={option}
                          className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md"
                        >
                          <Checkbox
                            id={optionId}
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleToggleOption(option, checked as boolean)
                            }
                            disabled={disabled}
                          />
                          <label
                            htmlFor={optionId}
                            className={cn(
                              "text-sm font-normal cursor-pointer flex-grow",
                              disabled && "cursor-not-allowed",
                            )}
                          >
                            {option}
                          </label>
                        </div>
                      );
                    })
                  )}
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
);
MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
