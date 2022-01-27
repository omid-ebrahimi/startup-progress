export async function fetchFact(): Promise<string> {
  const response = await fetch("https://uselessfacts.jsph.pl/random.json")
  const fact = await response.json()
  return fact.text;
}
