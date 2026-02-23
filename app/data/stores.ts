export type Store = {
  id: string;
  name: string;
  address: string;
  note?: string;
  lat?: number;
  lng?: number;

  // ✅ 구글맵 embed 링크 (iframe에 그대로 넣을 것)
  gmapEmbed: string;

  // ✅ 구글맵 열기 링크(새탭)
  gmapLink: string;
};

export const stores: Store[] = [
  {
    id: "cityhall",
    name: "제휴 매장 (샘플) — 서울시청",
    address: "서울특별시 중구 세종대로 110 서울특별시청",
    note: "조선한그릇 메뉴 제공(샘플)",
    lat: 37.5662952,
    lng: 126.9779451,

    // 🔥 키 없이 동작하는 embed (검색 기반)
    gmapEmbed:
      "https://www.google.com/maps?q=서울특별시청&output=embed",
    gmapLink:
      "https://www.google.com/maps/search/?api=1&query=서울특별시청",
  },

    // 🔥 여기 추가
  {
    id: "cityhall-siheung",
    name: "제휴 매장 (샘플) — 시흥시청",
    address: "경기도 시흥시 시청로 20 시흥시청",
    note: "조선한그릇 메뉴 제공(샘플)",
    lat: 37.379969,
    lng: 126.803102,
    gmapEmbed:
      "https://www.google.com/maps?q=시흥시청&output=embed",
    gmapLink:
      "https://www.google.com/maps/search/?api=1&query=시흥시청",
  },
];