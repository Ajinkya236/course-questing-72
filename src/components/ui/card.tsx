
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "outline" | "glass"
    shadow?: "sm" | "default" | "lg" | "none"
    rounded?: "sm" | "md" | "lg" | "xl" | "none"
  }
>(({ className, variant = "default", shadow = "default", rounded = "lg", ...props }, ref) => {
  const variantClasses = {
    default: "bg-neutral-0 dark:bg-neutral-900",
    outline: "bg-neutral-0 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800",
    glass: "bg-neutral-0/80 dark:bg-neutral-900/60 backdrop-blur-lg border border-neutral-300 dark:border-neutral-800"
  }
  
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    default: "shadow",
    lg: "shadow-lg"
  }
  
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        "text-card-foreground",
        variantClasses[variant],
        shadowClasses[shadow],
        roundedClasses[rounded],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-neutral-900 dark:text-neutral-0",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-600 dark:text-neutral-300", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
