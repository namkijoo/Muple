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

export const getSearchMusicList = async (searchTerm) => {
  const params = new URLSearchParams({
    part: "snippet",
    q: searchTerm,
    type: "video",
    maxResults: "10",
    videoCategoryId: "10",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  });

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    return data.items;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const postMusicList = async (videoId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          snippet: {
            playlistId: process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_KEY,
            resourceId: {
              kind: "youtube#video",
              videoId: videoId,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting to YouTube playlist:", error);
  }
};

export const deleteMusicList = async (playlistItemId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?id=${playlistItemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 204) {
      return { success: true, message: "Item deleted successfully" };
    } else {
      return { success: false, message: "Failed to delete item" };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred" };
  }
};
