export const parseBody = (body?: string | null) => {
  try {
    return JSON.parse(body || '{}');
  } catch {
    return {};
  }
};
