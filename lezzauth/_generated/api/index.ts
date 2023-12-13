interface IAPI {
    auth: typeof import('./auth')
    oauth: typeof import('./oauth')
}

export const api: IAPI = {
    auth: require('./auth'),
    oauth: require('./oauth')
}