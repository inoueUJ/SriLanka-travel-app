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
// 更新版：一日目の詳細スケジュール
day1: {
  title: "Day 1: 福岡出発 → 上海経由 → コロンボ到着 → ホテル",
  items: [
    // 朝の福岡空港での手続き
    { id: 'd1-1', text: "福岡空港に到着（国際線ターミナル）", completed: false, time: "07:00" },
    { id: 'd1-2', text: "チェックイン手続き（China Eastern Airlines）", completed: false, time: "07:00-07:30" },
    { id: 'd1-3', text: "出国審査・セキュリティチェック", completed: false, time: "07:30-08:00" },
    { id: 'd1-4', text: "免税店でのショッピング/朝食（オプション）", completed: false, time: "08:00-09:00" },
    { id: 'd1-5', text: "搭乗口へ移動・搭乗開始", completed: false, time: "09:00-09:30" },
    
    // 飛行・上海到着
    { id: 'd1-6', text: "福岡発 → 上海浦東国際空港行き（MU532）", completed: false, time: "09:30-10:30" },
    { id: 'd1-7', text: "上海浦東国際空港到着", completed: false, time: "10:30" },
    
    // 上海での乗り継ぎ
    { id: 'd1-8', text: "国際線乗り継ぎカウンターに移動", completed: false, time: "10:30-10:45" },
    { id: 'd1-9', text: "乗り継ぎ手続き・セキュリティチェック", completed: false, time: "10:45-11:30" },
    { id: 'd1-10', text: "次の搭乗ゲート確認・移動", completed: false, time: "11:30-12:00" },
    { id: 'd1-11', text: "昼食・空港内での時間つぶし", completed: false, time: "12:00-13:55" },
    { id: 'd1-12', text: "搭乗口に再集合・搭乗開始", completed: false, time: "13:55-14:25" },
    
    // コロンボへの飛行・到着
    { id: 'd1-13', text: "上海発 → コロンボ行き（MU231）", completed: false, time: "14:25-19:00" },
    { id: 'd1-14', text: "コロンボ国際空港到着", completed: false, time: "19:00" },
    
    // コロンボ到着後の手続き
    { id: 'd1-15', text: "入国審査・荷物受け取り", completed: false, time: "19:00-19:40" },
    { id: 'd1-16', text: "両替（10,000-15,000円→ルピー）", completed: false, time: "19:40-19:55" },
    { id: 'd1-17', text: "SIMカード購入（オプション）", completed: false, time: "19:55-20:10" },
    { id: 'd1-18', text: "空港タクシーカウンターでタクシー予約", completed: false, time: "20:10-20:20" },
    
    // ホテルへの移動と夜の予定
    { id: 'd1-19', text: "C1 コロンボ フォートホテルへ移動（約37分）", completed: false, time: "20:20-21:00" },
    { id: 'd1-20', text: "ホテルチェックイン・荷物整理", completed: false, time: "21:00-21:30" },
    { id: 'd1-21', text: "夕食（ホテル内またはGalle Face Green周辺）", completed: false, time: "21:30-22:30" },
    { id: 'd1-22', text: "明日の予定確認・就寝", completed: false, time: "22:30-23:00" }
  ]
},
day2: {
  title: "Day 2: コロンボ → カンダラマホテル → シギリアロック",
  items: [
    { id: 'd2-1', text: "C1コロンボフォートホテルで朝食", completed: false, time: "7:00-8:00" },
    { id: 'd2-2', text: "チェックアウト・専用車手配", completed: false, time: "8:00-8:30" },
    { id: 'd2-3', text: "コロンボからカンダラマホテルへ出発", completed: false, time: "8:30" },
    { id: 'd2-4', text: "途中休憩（軽食・トイレ休憩）", completed: false, time: "10:30-11:00" },
    { id: 'd2-5', text: "ヘリタンスカンダラマホテル到着", completed: false, time: "12:30" },
    { id: 'd2-6', text: "チェックイン・荷物整理", completed: false, time: "12:30-13:30" },
    { id: 'd2-7', text: "ホテルで軽いランチ", completed: false, time: "13:30-14:15" },
    { id: 'd2-8', text: "シギリアロックへ出発", completed: false, time: "14:30" },
    { id: 'd2-9', text: "シギリアロック観光（壁画、ライオンの足場、頂上）", completed: false, time: "15:00-17:30" },
    { id: 'd2-10', text: "ホテルに戻る", completed: false, time: "18:00" },
    { id: 'd2-11', text: "休憩・シャワー", completed: false, time: "18:00-19:30" },
    { id: 'd2-12', text: "ホテルでディナー", completed: false, time: "19:30-21:00" },
  ]
},
day3: {
  title: "Day 3: ピドゥランガラロック & ダンブッラ石窟寺院",
  items: [
    { id: 'd3-1', text: "早朝出発（日の出鑑賞のため）", completed: false, time: "5:00" },
    { id: 'd3-2', text: "ピドゥランガラロック到着・ハイキング開始", completed: false, time: "5:30" },
    { id: 'd3-3', text: "山頂での日の出鑑賞", completed: false, time: "6:15-6:45" },
    { id: 'd3-4', text: "下山・ホテルに戻る", completed: false, time: "7:30-8:30" },
    { id: 'd3-5', text: "ホテルで朝食・休憩", completed: false, time: "8:30-10:30" },
    { id: 'd3-6', text: "ダンブッラ石窟寺院へ出発", completed: false, time: "11:00" },
    { id: 'd3-7', text: "ダンブッラ石窟寺院見学", completed: false, time: "11:30-13:00" },
    { id: 'd3-8', text: "地元レストランでランチ", completed: false, time: "13:30-14:30" },
    { id: 'd3-9', text: "ミンネリヤ国立公園へ出発（オプション）", completed: false, time: "15:00" },
    { id: 'd3-10', text: "サファリツアー（野生の象の観察）", completed: false, time: "15:30-18:00" },
    { id: 'd3-11', text: "ホテルに戻る", completed: false, time: "18:30" },
    { id: 'd3-12', text: "ホテルでディナー・休息", completed: false, time: "19:30-21:00" },
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
    title: "Day 5: エッラ → ナインアーチブリッジ → コロンボ空港",
    items: [
      { id: 'd5-1', text: "早朝のナインアーチブリッジ観光", completed: false, time: "6:00-7:30" },
      { id: 'd5-2', text: "ホテルに戻り朝食・チェックアウト", completed: false, time: "8:00-9:30" },
      { id: 'd5-3', text: "エッラからコロンボ空港へ出発", completed: false, time: "10:00" },
      { id: 'd5-4', text: "途中休憩・昼食", completed: false, time: "12:30-13:30" },
      { id: 'd5-5', text: "コロンボ空港到着", completed: false, time: "17:00" },
      { id: 'd5-6', text: "チェックイン・荷物預け", completed: false, time: "17:15-18:00" },
      { id: 'd5-7', text: "空港内で軽食・お土産購入", completed: false, time: "18:00-19:30" },
      { id: 'd5-8', text: "搭乗口へ移動", completed: false, time: "19:30-20:00" },
      { id: 'd5-9', text: "コロンボ発 → 上海行き搭乗", completed: false, time: "20:30" },
    ]
  }
};