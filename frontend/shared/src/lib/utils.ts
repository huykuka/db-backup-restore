//shared/src/lib/utils.ts
// eslint-disable-next-line @nx/enforce-module-boundaries
import { clsx, type ClassValue } from "clsx"
// eslint-disable-next-line @nx/enforce-module-boundaries
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}