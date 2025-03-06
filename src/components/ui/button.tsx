
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#0A3D91] text-white hover:bg-[#0A3D91]/90", // Primary Blue
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-[#2A5CAA] bg-background text-[#0A3D91] hover:bg-[#2A5CAA]/10", // Accent Blue border
        secondary:
          "bg-[#F7F7F7] text-[#0A3D91] hover:bg-[#F7F7F7]/80", // Off-white with Primary Blue text
        ghost: "hover:bg-[#F7F7F7] hover:text-[#0A3D91]", // Hover off-white with Primary Blue text
        link: "text-[#0A3D91] underline-offset-4 hover:underline", // Primary Blue text
        jio: "bg-jio text-jio-foreground hover:bg-jio-dark",
        "jio-outline": "border border-jio text-jio hover:bg-jio hover:text-jio-foreground",
        "jio-ghost": "text-jio hover:bg-jio-muted",
        "jio-gradient": "jio-gradient text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
