// data/itineraryData.ts

export type ItineraryItem = {
  id: string;
  text: string;
  completed: boolean;
  time?: string;
};

export type DayData = {
  title: string;
  items: ItineraryItem[];
};

export type ItineraryDataType = {
  [key: string]: DayData;
};

export const itineraryData: ItineraryDataType = {
  day1: {
    title: "Day 1: コロンボ到着 → カンダラマホテル",
    items: [
      { id: 'd1-1', text: "コロンボ国際空港到着", completed: false, time: "10:30" },
      { id: 'd1-2', text: "両替（100ドル→スリランカルピー）", completed: false },
      { id: 'd1-3', text: "カンダラマホテルへ移動（約3-4時間）", completed: false },
      { id: 'd1-4', text: "カンダラマホテルチェックイン", completed: false, time: "16:00" },
      { id: 'd1-5', text: "ホテル内施設見学", completed: false },
      { id: 'd1-6', text: "ホテル内でディナー", completed: false, time: "19:00" },
      { id: 'd1-7', text: "明日の予定確認", completed: false }
    ]
  },
  day2: {
    title: "Day 2: シギリアロック",
    items: [
      { id: 'd2-1', text: "ホテルで朝食", completed: false, time: "7:00" },
      { id: 'd2-2', text: "シギリアロックへ出発", completed: false, time: "8:00" },
      { id: 'd2-3', text: "シギリアロック観光", completed: false, time: "9:00-12:00" },
      { id: 'd2-4', text: "シギリヤレディの壁画鑑賞", completed: false },
      { id: 'd2-5', text: "ローカルレストランでランチ", completed: false, time: "12:30" },
      { id: 'd2-6', text: "カンダラマホテルに戻る", completed: false, time: "14:00" },
      { id: 'd2-7', text: "ホテルのプールでリラックス", completed: false },
      { id: 'd2-8', text: "スパでマッサージ", completed: false, time: "17:00" },
      { id: 'd2-9', text: "夕食", completed: false, time: "19:00" }
    ]
  },
  day3: {
    title: "Day 3: キャンディ → ヌワラエリヤ",
    items: [
      { id: 'd3-1', text: "カンダラマホテルでの朝食", completed: false, time: "7:00" },
      { id: 'd3-2', text: "チェックアウト", completed: false, time: "8:30" },
      { id: 'd3-3', text: "キャンディへ移動（約2時間）", completed: false },
      { id: 'd3-4', text: "仏歯寺見学", completed: false, time: "11:30" },
      { id: 'd3-5', text: "キャンディでランチ", completed: false, time: "13:00" },
      { id: 'd3-6', text: "ヌワラエリヤへ移動（約3時間）", completed: false, time: "14:30" },
      { id: 'd3-7', text: "ヌワラエリヤのホテルチェックイン", completed: false, time: "17:30" },
      { id: 'd3-8', text: "紅茶畑の夕景を観賞", completed: false, time: "18:00" },
      { id: 'd3-9', text: "ホテルでディナー", completed: false, time: "19:30" }
    ]
  },
  day4: {
    title: "Day 4: 高原列車 & ナインアーチブリッジ",
    items: [
      { id: 'd4-1', text: "朝食", completed: false, time: "6:30" },
      { id: 'd4-2', text: "茶畑散策", completed: false, time: "7:30" },
      { id: 'd4-3', text: "ナヌオヤ駅へ移動", completed: false, time: "9:00" },
      { id: 'd4-4', text: "高原列車でエッラへ（約3時間）", completed: false, time: "10:00" },
      { id: 'd4-5', text: "エッラでランチ", completed: false, time: "13:30" },
      { id: 'd4-6', text: "ナインアーチブリッジ見学", completed: false, time: "15:00" },
      { id: 'd4-7', text: "エッラの町散策", completed: false, time: "16:30" },
      { id: 'd4-8', text: "ヌワラエリヤに戻る", completed: false, time: "18:00" },
      { id: 'd4-9', text: "ディナー", completed: false, time: "19:30" }
    ]
  },
  day5: {
    title: "Day 5: コロンボへ & 帰国",
    items: [
      { id: 'd5-1', text: "ホテルでの朝食", completed: false, time: "7:00" },
      { id: 'd5-2', text: "紅茶工場見学", completed: false, time: "8:30" },
      { id: 'd5-3', text: "チェックアウト", completed: false, time: "10:00" },
      { id: 'd5-4', text: "コロンボへ移動（約5-6時間）", completed: false },
      { id: 'd5-5', text: "コロンボ市内観光（時間があれば）", completed: false },
      { id: 'd5-6', text: "お土産購入", completed: false },
      { id: 'd5-7', text: "空港へ移動", completed: false, time: "19:00" },
      { id: 'd5-8', text: "チェックイン・出国手続き", completed: false, time: "20:00" },
      { id: 'd5-9', text: "フライト出発", completed: false, time: "23:30" }
    ]
  }
};