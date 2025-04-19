export const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

export const API_ENDPOINTS = {
  categories: {
    base: '/categories',
    list: (qs: string) => `/categories${qs}`,
    create: '/categories',
    detail: (slug: string) => `/categories/${slug}`,
    update: (slug: string) => `/categories/${slug}`,
    delete: (slug: string) => `/categories/${slug}`,
  },
  labels: {
    base: '/labels',
    list: (qs: string) => `/labels${qs}`,
    create: '/labels',
    detail: (slug: string) => `/labels/${slug}`,
    update: (slug: string) => `/labels/${slug}`,
    delete: (slug: string) => `/labels/${slug}`,
  },
  lists: {
    base: '/lists',
    list: (qs: string) => `/lists${qs}`,
    create: '/lists',
    detail: (slug: string) => `/lists/${slug}`,
    update: (slug: string) => `/lists/${slug}`,
    delete: (slug: string) => `/lists/${slug}`,
  },
  tasks: {
    base: '/tasks',
    list: (qs: string) => `/tasks${qs}`,
    create: '/tasks',
    detail: (slug: string) => `/tasks/${slug}`,
    update: (slug: string) => `/tasks/${slug}`,
    delete: (slug: string) => `/tasks/${slug}`,
    taskLabel: (taskId: string, labelId: string) => `/tasks/${taskId}/label/${labelId}`
  },
  subtasks: {
    base: '/subtasks',
    list: (qs: string) => `/subtasks${qs}`,
    create: (slug: string) => `/tasks/${slug}/subtasks`,
    detail: (slug: string) => `/subtasks/${slug}`,
    update: (slug: string) => `/subtasks/${slug}`,
    delete: (slug: string) => `/subtasks/${slug}`,
  },
} as const;
