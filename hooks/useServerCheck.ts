'use client'

import {useEffect} from 'react'

const MAIN_URL = 'https://rblrepository.site'
const INTERVAL_MS = 10_000

// Middleware đã xử lý token guard server-side.
// Hook này chỉ lo polling: khi Cloudflare rule tắt → redirect về main.
export function useServerCheck() {
  useEffect(() => {
    let redirecting = false

    const check = async () => {
      if (redirecting) return
      try {
        const res = await fetch(`${MAIN_URL}/?ts=${Date.now()}`, {
          method: 'HEAD',
          mode: 'no-cors',
          redirect: 'manual',
          cache: 'no-store',
        })
        // Maintenance BẬT → Cloudflare redirect → opaqueredirect
        // Maintenance TẮT → không redirect    → opaque → về main
        if (res.type !== 'opaqueredirect') {
          redirecting = true
          window.location.href = MAIN_URL
        }
      } catch {
        // Lỗi mạng — bỏ qua, thử lại sau
      }
    }

    check()
    const id = setInterval(check, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])
}
