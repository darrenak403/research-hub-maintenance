'use client'

import {useEffect} from 'react'

const MAIN_URL = 'https://rblrepository.site'
const MAINTENANCE_HOST = 'maintenance.rblrepository.site'
const ACCESS_KEY = 'eKf8SwC0+qOOuDlZ0Ngf1uXvyqC/eF7B41MGP1JZHMM='
const INTERVAL_MS = 10_000

/**
 * Bảo vệ 2 lớp:
 * 1. Kiểm tra `?key=` — nếu không khớp, redirect về trang chính ngay.
 *    (chặn người dùng gõ thẳng maintenance.rblrepository.site)
 * 2. Thăm dò server chính mỗi `INTERVAL_MS` ms — khi Cloudflare rule tắt,
 *    `response.url` không còn chứa `MAINTENANCE_HOST` → tự redirect về.
 */
export function useServerCheck() {
  useEffect(() => {
    // Lớp 1: token guard
    const key = new URLSearchParams(window.location.search).get('key')
    if (key !== ACCESS_KEY) {
      window.location.replace(MAIN_URL)
      return
    }

    // Lớp 2: polling
    const check = async () => {
      try {
        const res = await fetch(`${MAIN_URL}/?ts=${Date.now()}`, {
          redirect: 'follow',
          cache: 'no-store',
        })
        if (!res.url.includes(MAINTENANCE_HOST)) {
          window.location.href = MAIN_URL
        }
      } catch {
        // Lỗi mạng / CORS — bỏ qua, thử lại sau
      }
    }

    check()
    const id = setInterval(check, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])
}
