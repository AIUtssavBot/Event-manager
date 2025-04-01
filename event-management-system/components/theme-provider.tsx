'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // This forces the theme provider to render only after client-side hydration
  // which prevents the hydration mismatch
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  // Return the children as-is regardless of mounted state
  // We rely on suppressHydrationWarning on the html element to prevent errors
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
