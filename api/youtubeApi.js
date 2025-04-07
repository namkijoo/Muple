//유튜브의 재생목록 가져오기, 최대 50개까지
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

//유튜브에서 검색하기, 뮤직 카테고리, 10개 제한
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

//검색한 음악 추가, 토큰 필요
export const postMusicList = async (videoId) => {
  const token = sessionStorage.getItem("token");
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

//음악 삭제, 토큰 필요
export const deleteMusicList = async (playlistItemId) => {
  try {
    const token = sessionStorage.getItem("token");
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

//인기 음악 가져오기 10개
export const getTopMusic = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=10&videoCategoryId=10&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("네트워크 응답에 문제가 있습니다");
    }

    const data = await response.json();

    return data.items.map((item) => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      imgUrl: item.snippet.thumbnails?.medium?.url,
    }));
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    return [];
  }
};
