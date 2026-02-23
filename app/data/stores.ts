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
  
];