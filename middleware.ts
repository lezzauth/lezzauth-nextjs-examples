import { authMiddleware } from '@lezzauth/nextjs/dist/server'

export default authMiddleware({
    publicRoutes: ['/'],
})

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)']
};