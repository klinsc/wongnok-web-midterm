export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/my-recipe',
    '/my-recipe/:path*',
    '/favorites',
    '/favorites/:path*',
    '/create-recipe',
    '/create-recipe/:path*',
    '/edit-recipe/:path*',
    '/profile',
    '/profile/:path*',
  ],
}
