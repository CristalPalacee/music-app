 const API_URL = process.env.API_URL

 export interface Song {
   id: number
   title: string
   artist: string
   album: string
   cover: string
   url: string
 }

   async function fetchSongs<R>(
    endpoint: string,
   ): Promise<R> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Content-Type': "application/json",
        },
    });

    console.log("Status :", response.status)

    if (!response.ok) {
        throw new Error('failed to fetch songs') 

    }


    const data = response.json()
    console.log("DAta :", data)

    return data as R

} 

export const getSongs = () => {
  return fetchSongs<Song[]>("/api/songs");
};  

// ===== DETAIL SONG =====
export async function getSongById(id: number): Promise<Song | null> {
  if (!API_URL) return null;

  const res = await fetch(`${API_URL}/api/songs/${id}`, {
    cache: "no-store",
  });

  console.log("DETAIL STATUS:", res.status);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  console.log("DETAIL DATA:", data);

  return data as Song;
}