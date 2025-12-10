export const isValidPrompt = (prompt: string): boolean => {
  return prompt.trim().length > 0
}

export const isValidCardId = (id: string): boolean => {
  return id.length > 0
}
