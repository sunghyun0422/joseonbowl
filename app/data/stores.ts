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
    id: "main-store",
    name: "조선한그릇 본점",
    address: "경기도 시흥시 공단1대로 244, 지원상가동 지1층 비132호(정왕동)",
    lat: 37.3351753,
    lng: 126.7271732,
    gmapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.30973347071!2d126.7271732!3d37.3351753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b71128f0983f5%3A0xaa38d286d4b25d09!2z6rK96riw64+EIOyLnO2dreyLnCDqs7Xri6gx64yA66GcIDI0NA!5e0!3m2!1sko!2skr!4v1715394549449!5m2!1sko!2skr",
    gmapLink: "https://maps.app.goo.gl/WQpCrfRisGL9qwhr6",
  },
];