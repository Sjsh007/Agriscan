"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="min-w-60 max-w-96 rounded-md border bg-background p-3 shadow-lg"
          role="status"
        >
          {t.title && <div className="font-medium">{t.title}</div>}
          {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
          <div className="mt-2 flex justify-end">
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
