export function generateQuestionLink(slug: string): string {
  return `${window.location.origin}${window.location.pathname}#question-${slug}`;
}