export const getPlaylistItem = async () => {
  try {
    const params = new URLSearchParams({
      part: "snippet",
      playlistId: process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_KEY,
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      maxResults: "50",
    });

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params}`
    );

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data.items;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return null;
  }
};
