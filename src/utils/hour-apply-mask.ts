export function hourApplyMask(value: string) {
    return value.replace(/^(\d{2})(\d{2})/, '$1:$2')
  }