
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  className = "",
  onFocus
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  return (
    <div className={cn(
      "relative transition-all duration-300",
      isFocused ? "scale-105" : "",
      className
    )}>
      <Search className={cn(
        "absolute left-2.5 top-2.5 h-4 w-4 transition-colors duration-200",
        isFocused ? "text-primary" : "text-muted-foreground"
      )} />
      <Input
        type="search"
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg pl-8 transition-all duration-300",
          isFocused ? "bg-background ring-2 ring-primary/20 shadow-sm" : "bg-background"
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default SearchInput;
