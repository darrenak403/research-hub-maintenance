import { NextRequest, NextResponse } from 'next/server'

const MAIN_URL = 'https://rblrepository.site'
const COOKIE_NAME = 'maint_access'
const COOKIE_MAX_AGE = 60 * 60 * 4 // 4 giờ

export function middleware(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const key = searchParams.get('key')
  const expectedKey = process.env.MAINTENANCE_KEY

  // Có key hợp lệ trên URL → validate, set cookie, xóa key khỏi URL
  if (key !== null) {
    if (key === expectedKey) {
      const clean = req.nextUrl.clone()
      clean.searchParams.delete('key')
      const res = NextResponse.redirect(clean)
      res.cookies.set(COOKIE_NAME, '1', {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
      })
      return res
    }
    // Key sai → đá về main
    return NextResponse.redirect(MAIN_URL)
  }

  // Không có key trên URL → kiểm tra cookie
  const cookie = req.cookies.get(COOKIE_NAME)
  if (!cookie) {
    return NextResponse.redirect(MAIN_URL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
