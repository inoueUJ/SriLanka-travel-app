// src/data/tourism/touristSpots.ts

export interface TouristSpot {
  id: string;              // スポットID
  name: string;            // 名称
  nameEn: string;          // 英語名
  description: string;     // 概要説明
  history: string;         // 歴史的背景
  location: {              // 位置情報
    province: string;      // 州
    coordinates: {         // 座標
      lat: number;
      lng: number;
    }
  };
  images: string[];        // 画像URL配列（ローカルパス）
  thumbnail: string;       // サムネイル画像（ローカルパス）
  categories: string[];    // カテゴリ配列（自然/寺院/歴史など）
  rating: number;          // 評価（5段階）
  reviewCount: number;     // レビュー数
  details: {
    entranceFee: {         // 入場料
      amount: number;
      currency: string;
    };
    openingHours: string;  // 営業時間
    duration: string;      // 所要時間の目安
    bestTimeToVisit: string; // ベストシーズン
  };
  access: string;          // アクセス情報
  tips: string[];          // 訪問時のヒント
  isWorldHeritage: boolean; // 世界遺産かどうか
}

const touristSpotsData: TouristSpot[] = [
  {
    id: "sigiriya",
    name: "シギリヤ・ロック",
    nameEn: "Sigiriya Rock",
    description: "シギリヤ・ロック（Lion Rock）は、5世紀に建設された古代の岩上要塞宮殿です。高さ200mの巨大な岩山の上に作られており、周囲の絶景と共に世界遺産に登録されています。有名なフレスコ画「シギリヤ・レディース」やライオンの入口へと続く階段も見どころです。",
    history: "5世紀にカッサパ王（477-495年）によって建設されました。父王の殺害後、弟からの報復を恐れて難攻不落の要塞としてこの場所に宮殿を築いたと言われています。王の死後は仏教寺院として使用されていました。",
    location: {
      province: "中央州",
      coordinates: {
        lat: 7.9572,
        lng: 80.7600
      }
    },
    images: [
      "/images/sigiriya.jpg",
    ],
    thumbnail: "/images/sigiriya.jpg",
    categories: ["自然", "歴史", "世界遺産"],
    rating: 4.9,
    reviewCount: 1243,
    details: {
      entranceFee: {
        amount: 30,
        currency: "USD"
      },
      openingHours: "7:00 - 17:30",
      duration: "約2-3時間",
      bestTimeToVisit: "12月〜3月"
    },
    access: "ダンブッラから車で約30分（約25km）、キャンディから約2.5時間（約85km）の距離にあります。コロンボからは車で約4時間かかります。",
    tips: [
      "朝早く訪れると人が少なく快適に見学できます",
      "頂上まで約1200段の階段があるので、歩きやすい靴をおすすめします",
      "水分を十分に持参してください"
    ],
    isWorldHeritage: true
  },
  {
    id: "kandy-temple",
    name: "キャンディの仏歯寺",
    nameEn: "Temple of the Sacred Tooth Relic",
    description: "スリランカで最も重要な仏教寺院の一つで、仏陀の歯が祀られていると言われています。17世紀に建てられた寺院は、キャンディ王朝の王宮跡地に位置し、美しい建築様式と装飾が特徴です。毎年7〜8月に行われるエサラ・ペラヘラ祭りでは、歯の遺物を載せた象のパレードが行われます。",
    history: "3世紀頃にインドからスリランカに持ち込まれたとされる仏陀の歯が、1592年からキャンディに安置されています。歴代のキャンディ王も信仰しており、その所有は王権の象徴とされてきました。1998年にLTTE（タミル・イーラム解放のトラ）の爆撃で一部が損傷しましたが、修復されています。",
    location: {
      province: "中央州",
      coordinates: {
        lat: 7.2936,
        lng: 80.6413
      }
    },
    images: [
      "/images/kyandhino.jpg"
    ],
    thumbnail: "/images/kyandhino.jpg",
    categories: ["寺院", "歴史", "世界遺産"],
    rating: 4.8,
    reviewCount: 987,
    details: {
      entranceFee: {
        amount: 1500,
        currency: "LKR"
      },
      openingHours: "5:30 - 20:00",
      duration: "約1-2時間",
      bestTimeToVisit: "通年（祭りの時期は7〜8月）"
    },
    access: "コロンボから車で約3時間（約115km）。キャンディ市内中心部に位置しています。",
    tips: [
      "寺院内では靴を脱いで入場します",
      "肩と膝を覆う服装が必要です",
      "祈りの時間（プージャ）に参加すると、より深い体験ができます"
    ],
    isWorldHeritage: true
  },
  {
    id: "galle-fort",
    name: "ゴール旧市街",
    nameEn: "Galle Fort",
    description: "16世紀にポルトガル人によって建設され、その後オランダ人によって強化された要塞都市です。ヨーロッパの植民地時代の建築物と南アジアの伝統が融合した独特の雰囲気があり、世界遺産に登録されています。城壁、教会、邸宅など植民地時代の建築物が今でも残り、現在は多くのショップやカフェ、ブティックホテルが軒を連ねています。",
    history: "1505年にポルトガル人が最初の要塞を建設し、1640年にオランダ人が占領して大幅に拡張しました。1796年には英国の支配下に入りましたが、オランダ植民地時代の特徴が色濃く残っています。2004年のインド洋津波でも堅固な要塞の城壁によって守られ、被害を最小限に抑えることができました。",
    location: {
      province: "南部州",
      coordinates: {
        lat: 6.0328,
        lng: 80.2171
      }
    },
    images: [
      "/images/galle04.jpg"
    ],
    thumbnail: "/images/galle04.jpg",
    categories: ["歴史", "町並み", "世界遺産"],
    rating: 4.7,
    reviewCount: 876,
    details: {
      entranceFee: {
        amount: 0,
        currency: "LKR"
      },
      openingHours: "24時間（店舗やアトラクションは個別の営業時間）",
      duration: "約半日〜1日",
      bestTimeToVisit: "12月〜4月"
    },
    access: "コロンボから車で約2時間（約125km）。高速道路も利用可能です。",
    tips: [
      "朝か夕方の涼しい時間帯に城壁沿いを散歩するのがおすすめ",
      "多くのカフェやレストランがあるので、食事も楽しめます",
      "海沿いなので日差しが強い時は日焼け対策を"
    ],
    isWorldHeritage: true
  },
  {
    id: "pinnawala",
    name: "ピンナワラ象の孤児院",
    nameEn: "Pinnawala Elephant Orphanage",
    description: "1975年に設立された、親を失った象や怪我を負った象を保護するための施設です。現在は約100頭の象が保護され、間近で象を観察したり、象の赤ちゃんにミルクを与えたりする体験ができます。毎日決まった時間に行われる象の川遊びは人気の見どころです。",
    history: "もともは5頭の孤児象から始まった施設で、現在はスリランカで最も人気のある観光スポットの一つになっています。保護、繁殖、教育を目的としており、これまでに20頭以上の象の赤ちゃんが生まれています。",
    location: {
      province: "中央州",
      coordinates: {
        lat: 7.3004,
        lng: 80.3848
      }
    },
    images: [
      "/images/Pinnawala_01.jpg"
    ],
    thumbnail: "/images/Pinnawala_01.jpg",
    categories: ["自然", "動物"],
    rating: 4.2,
    reviewCount: 754,
    details: {
      entranceFee: {
        amount: 2500,
        currency: "LKR"
      },
      openingHours: "8:30 - 17:30",
      duration: "約2-3時間",
      bestTimeToVisit: "象の入浴時間（10:00、14:00頃）"
    },
    access: "コロンボから車で約2.5時間（約90km）、キャンディから車で約1時間（約40km）の距離にあります。",
    tips: [
      "象の餌やり体験には追加料金がかかります",
      "象の川遊びの時間帯に合わせて訪問するとよいでしょう",
      "カメラのバッテリーや記憶容量を十分に確保しておくことをおすすめします"
    ],
    isWorldHeritage: false
  },
  {
    id: "dambulla",
    name: "ダンブッラの黄金寺院",
    nameEn: "Dambulla Cave Temple",
    description: "2000年以上の歴史を持つ洞窟寺院で、5つの洞窟に153体の仏像と仏教壁画が保存されています。スリランカ最大の洞窟寺院であり、世界遺産に登録されています。各洞窟には異なる時代に作られた仏像や壁画があり、スリランカの仏教美術の発展を見ることができます。",
    history: "紀元前1世紀、ワラガンバ王が亡命中にこの洞窟に隠れ住んでいたと言われています。王位を回復した後、感謝の意を込めてこの洞窟を寺院に変えました。12世紀以降も歴代の王によって寺院は拡張され、仏像や壁画が追加されてきました。",
    location: {
      province: "中央州",
      coordinates: {
        lat: 7.8675,
        lng: 80.6518
      }
    },
    images: [
      "/images/danbura.jpg"
    ],
    thumbnail: "/images/danbura.jpg",
    categories: ["寺院", "歴史", "世界遺産"],
    rating: 4.6,
    reviewCount: 682,
    details: {
      entranceFee: {
        amount: 1500,
        currency: "LKR"
      },
      openingHours: "7:00 - 19:00",
      duration: "約1-2時間",
      bestTimeToVisit: "12月〜3月"
    },
    access: "キャンディから車で約2.5時間（約72km）、シギリヤから車で約30分（約17km）の距離にあります。",
    tips: [
      "寺院に入る際は靴を脱ぎ、肩と膝を覆う服装が必要です",
      "丘の上にあるため、階段を登る必要があります",
      "洞窟内は写真撮影が許可されていますが、フラッシュは使用できません"
    ],
    isWorldHeritage: true
  },
  {
    id: "yala",
    name: "ヤーラ国立公園",
    nameEn: "Yala National Park",
    description: "スリランカ最大の国立公園の一つで、特にヒョウの生息地として有名です。サファリツアーでは、ヒョウ、象、クマ、鹿、猪、水牛、鰐、さまざまな鳥類など多種多様な野生動物を観察することができます。美しい自然景観も魅力で、湖、森林、草原、海岸線など多様な生態系があります。",
    history: "1900年に野生生物保護区として設立され、1938年に国立公園となりました。2004年のインド洋津波で一部が被害を受けましたが、その後復旧しています。現在は5つのブロックに分かれており、そのうち2つが一般に公開されています。",
    location: {
      province: "南部州",
      coordinates: {
        lat: 6.3593,
        lng: 81.5047
      }
    },
    images: [
      "/images/yala_national_park.jpg"
    ],
    thumbnail: "/images/yala_national_park.jpg",
    categories: ["自然", "野生動物"],
    rating: 4.7,
    reviewCount: 912,
    details: {
      entranceFee: {
        amount: 3500,
        currency: "LKR"
      },
      openingHours: "6:00 - 18:00（サファリは通常6:00と14:00開始）",
      duration: "約半日（3-4時間）",
      bestTimeToVisit: "2月〜7月（乾季）"
    },
    access: "コロンボから車で約5-6時間（約300km）。近隣にはティッサマハラマという町があり、宿泊施設が充実しています。",
    tips: [
      "経験豊富なガイドと4WD車でのサファリツアーが必要です",
      "朝の早い時間帯は動物が活発に活動しています",
      "双眼鏡、望遠レンズ付きカメラ、帽子、日焼け止めを持参することをお勧めします"
    ],
    isWorldHeritage: false
  },
  {
    id: "ella",
    name: "エッラ",
    nameEn: "Ella",
    description: "スリランカの高原地帯にある小さな町で、その周囲の美しい山岳風景や滝、茶畑で有名です。特に「ナインアーチブリッジ」と呼ばれる植民地時代の鉄道橋や、「エッラロック」からの絶景が人気です。トレッキングやハイキングを楽しむ旅行者に人気のスポットです。",
    history: "もともとは小さな山村でしたが、イギリス植民地時代に紅茶プランテーションが開発され、鉄道が敷設されました。近年は観光業が発展し、バックパッカーやトレッカーに人気の場所となっています。",
    location: {
      province: "ウヴァ州",
      coordinates: {
        lat: 6.8667,
        lng: 81.0466
      }
    },
    images: [
      "/images/erra.jpg"
    ],
    thumbnail: "/images/erra.jpg",
    categories: ["自然", "ハイキング", "景観"],
    rating: 4.5,
    reviewCount: 832,
    details: {
      entranceFee: {
        amount: 0,
        currency: "LKR"
      },
      openingHours: "終日（アトラクションにより異なる）",
      duration: "1日〜2日",
      bestTimeToVisit: "1月〜3月"
    },
    access: "キャンディから列車で約6時間（景色の美しい鉄道旅として有名）。コロンボからは車で約6時間（約230km）。",
    tips: [
      "列車でのアクセスが景色が美しくおすすめですが、繁忙期は事前予約が必要です",
      "エッラロックへのハイキングは朝早くがおすすめ（日の出を見られます）",
      "雨季には滑りやすくなるので、しっかりとした靴を履いてください"
    ],
    isWorldHeritage: false
  },
  {
    id: "polonnaruwa",
    name: "ポロンナルワ遺跡",
    nameEn: "Ancient City of Polonnaruwa",
    description: "11〜13世紀にかけて栄えたシンハラ王朝の第二の都で、多くの仏教遺跡や王宮跡が残っています。特に「ガル・ヴィハーラ」の巨大な岩の彫刻群や「ランコット・ヴィハーラ」の巨大仏塔は見事です。よく保存されたスリランカ古代都市の遺跡として世界遺産に登録されています。",
    history: "11世紀にチョーラ朝の支配から解放された後、ヴィジャヤバーフ1世によって王都となりました。特にパラクラマバーフ1世（1153-1186年）の時代に最盛期を迎え、多くの建造物が建設されました。13世紀末の南インドからの侵攻により放棄され、ジャングルに埋もれていましたが、19世紀後半に再発見されました。",
    location: {
      province: "北中部州",
      coordinates: {
        lat: 7.9403,
        lng: 81.0188
      }
    },
    images: [
      "/images/polonnaruwa04.jpg"
    ],
    thumbnail: "/images/polonnaruwa04.jpg",
    categories: ["歴史", "遺跡", "世界遺産"],
    rating: 4.8,
    reviewCount: 745,
    details: {
      entranceFee: {
        amount: 25,
        currency: "USD"
      },
      openingHours: "7:00 - 18:00",
      duration: "約3-4時間",
      bestTimeToVisit: "6月〜9月"
    },
    access: "コロンボから車で約5-6時間（約220km）、キャンディから約3-4時間（約140km）の距離にあります。",
    tips: [
      "遺跡群は広範囲に渡るため、自転車や車でのツアーがおすすめです",
      "事前に考古学博物館を訪れると、遺跡の理解が深まります",
      "暑さが厳しいので、水分と日焼け対策は必須です"
    ],
    isWorldHeritage: true
  }
];

export default touristSpotsData;
