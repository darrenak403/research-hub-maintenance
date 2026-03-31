'use client'

import {useEffect} from 'react'

const MAIN_URL = 'https://rblrepository.site'
const MAINTENANCE_HOST = 'maintenance.rblrepository.site'
const INTERVAL_MS = 10_000

export function useServerCheck() {
  useEffect(() => {
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

    check() // Kiểm tra ngay khi trang load
    const id = setInterval(check, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])
}
