export const addNumber = (val1: number, val2: number) => {
  return val1 + val2
}

export const cutGrade = (score: number) => {
  if (score > 80) return 'A'
  else if (score > 70) return 'B'
  else if (score > 60) return 'C'
  else if (score > 50) return 'D'
  else return 'F'
}
