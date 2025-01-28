import { TOKEN } from "./constants";

export default async function Fetchdata(poin: string) {
  const repeat = await fetch(`https://api.themoviedb.org/3${poin}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const repeats = repeat.json();
  return repeats;
}
