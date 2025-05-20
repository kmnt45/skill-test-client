export const ROUTES = {
    HOME: '/',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESTORE: '/auth/restore-password',
    PROFILE: '/profile/:profileId',
    QUESTIONS: '/questions',
    QUESTIONS_CONTENT: '/questions/:categoryId',
    TESTS: '/tests',
    TESTS_CATEGORY: '/tests/:categoryId',
    TEST: '/tests/:categoryId/:testId',
    TASKS: '/tasks',
    TASKS_CATEGORY: '/tasks/:categoryId',
    TASK: '/tasks/:categoryId/:taskId',
    TOPICS: '/tests/:categoryId/:topicId',
    RATING: '/rating',
} as const;



export const LOADING_STAGE = {
    LOAD: 'LOAD',
    LOADING: 'LOADING',
} as const;


export const PUBLIC_ROUTES = [
    '/',
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.RESTORE,
] as const

export const CATEGORY_LABELS: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    html: 'HTML',
    css: 'CSS',
    react: 'React',
    node: 'Node.js',
};