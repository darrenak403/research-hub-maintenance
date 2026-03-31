'use client'

import {useEffect} from 'react'

const MAIN_URL = 'https://rblrepository.site'
const PROBE_URL = `${MAIN_URL}/favicon.ico`
const INTERVAL_MS = 5_000

// Middleware đã xử lý token guard server-side.
// Hook này chỉ lo polling: khi Cloudflare rule tắt → redirect về main.
//
// Dùng Image thay vì fetch để tránh CORS block:
//   - Maintenance BẬT  → Cloudflare trả về HTML → ảnh lỗi → onerror → chờ tiếp
//   - Maintenance TẮT  → favicon.ico load OK    → onload  → về main
export function useServerCheck() {
  useEffect(() => {
    let redirecting = false

    const check = () => {
      if (redirecting) return
      const img = new Image()
      img.onload = () => {
        if (redirecting) return
        redirecting = true
        window.location.href = MAIN_URL
      }
      img.onerror = () => {
        /* vẫn đang bảo trì, thử lại sau */
      }
      img.src = `${PROBE_URL}?ts=${Date.now()}`
    }

    check()
    const id = setInterval(check, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])
}
