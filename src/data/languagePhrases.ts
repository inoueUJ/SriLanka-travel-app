// src/data/languagePhrases.ts
export interface Phrase {
  id: string;
  japanese: string;
  english: string;
  sinhala: string;
  pronunciation: string; // カタカナ発音
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  phrases: Phrase[];
}

export interface LanguageData {
  categories: Category[];
}

const languagePhrases: LanguageData = {
  categories: [
    {
      id: 'greetings',
      name: '挨拶',
      icon: '👋',
      phrases: [
        {
          id: 'hello',
          japanese: 'こんにちは',
          english: 'Hello',
          sinhala: 'Āyubōvan',
          pronunciation: 'アーユボーワン'
        },
        {
          id: 'good-morning',
          japanese: 'おはようございます',
          english: 'Good morning',
          sinhala: 'Subha udesanak',
          pronunciation: 'スバ ウデサナク'
        },
        {
          id: 'good-evening',
          japanese: 'こんばんは',
          english: 'Good evening',
          sinhala: 'Subha ratriyak',
          pronunciation: 'スバ ラーティリヤク'
        },
        {
          id: 'goodbye',
          japanese: 'さようなら',
          english: 'Goodbye',
          sinhala: 'Gihin ennam',
          pronunciation: 'ギヒン エンナム'
        },
        {
          id: 'thank-you',
          japanese: 'ありがとうございます',
          english: 'Thank you',
          sinhala: 'Istuti',
          pronunciation: 'イストゥティ'
        },
        {
          id: 'youre-welcome',
          japanese: 'どういたしまして',
          english: 'You\'re welcome',
          sinhala: 'Pilikannō',
          pronunciation: 'ピリカンノー'
        },
        {
          id: 'excuse-me',
          japanese: 'すみません',
          english: 'Excuse me / Sorry',
          sinhala: 'Samaavenna',
          pronunciation: 'サマーヴェンナ'
        },
        {
          id: 'how-are-you',
          japanese: 'お元気ですか？',
          english: 'How are you?',
          sinhala: 'Kohomada?',
          pronunciation: 'コホマダ？'
        }
      ]
    },
    {
      id: 'basic',
      name: '基本会話',
      icon: '💬',
      phrases: [
        {
          id: 'yes-no',
          japanese: 'はい/いいえ',
          english: 'Yes/No',
          sinhala: 'Ow/Nae',
          pronunciation: 'オゥ/ナエ'
        },
        {
          id: 'i-understand',
          japanese: 'わかりました',
          english: 'I understand',
          sinhala: 'Mata tērenava',
          pronunciation: 'マタ テーレナヴァ'
        },
        {
          id: 'dont-understand',
          japanese: 'わかりません',
          english: 'I don\'t understand',
          sinhala: 'Mata tērenne nae',
          pronunciation: 'マタ テーレンネ ナエ'
        },
        {
          id: 'from-japan',
          japanese: '日本から来ました',
          english: 'I\'m from Japan',
          sinhala: 'Mama Japanyen',
          pronunciation: 'ママ ジャパニェン'
        },
        {
          id: 'say-again',
          japanese: 'もう一度言ってください',
          english: 'Please say it again',
          sinhala: 'Āyet kiyanna',
          pronunciation: 'アーイェット キヤンナ'
        },
        {
          id: 'speak-slowly',
          japanese: 'ゆっくり話してください',
          english: 'Please speak slowly',
          sinhala: 'Hemin kiyanna',
          pronunciation: 'ヘミン キヤンナ'
        }
      ]
    },
    {
      id: 'food',
      name: '食事',
      icon: '🍽️',
      phrases: [
        {
          id: 'menu',
          japanese: 'メニューをください',
          english: 'Menu please',
          sinhala: 'Menu eka denna',
          pronunciation: 'メニュー エカ デンナ'
        },
        {
          id: 'recommend',
          japanese: 'おすすめは何ですか？',
          english: 'What do you recommend?',
          sinhala: 'Monavada hondai?',
          pronunciation: 'モナヴァダ ホンダイ？'
        },
        {
          id: 'whats-this',
          japanese: 'これは何ですか？',
          english: 'What is this?',
          sinhala: 'Mēka mokakda?',
          pronunciation: 'メーカ モカクダ？'
        },
        {
          id: 'non-spicy',
          japanese: '辛くないものはありますか？',
          english: 'Do you have non-spicy food?',
          sinhala: 'Unu nae kǣma thiyenavada?',
          pronunciation: 'ウヌ ナエ カエマ ティイェナヴァダ？'
        },
        {
          id: 'vegetarian',
          japanese: 'ベジタリアン料理はありますか？',
          english: 'Do you have vegetarian food?',
          sinhala: 'Vegetarian kǣma thiyenavada?',
          pronunciation: 'ベジタリアン カエマ ティイェナヴァダ？'
        },
        {
          id: 'water',
          japanese: '水をください',
          english: 'Water please',
          sinhala: 'Vatura denna',
          pronunciation: 'ヴァトゥラ デンナ'
        },
        {
          id: 'bill',
          japanese: 'お会計をお願いします',
          english: 'Bill please',
          sinhala: 'Bill eka denna',
          pronunciation: 'ビル エカ デンナ'
        }
      ]
    },
    {
      id: 'shopping',
      name: '買い物',
      icon: '🛍️',
      phrases: [
        {
          id: 'how-much',
          japanese: 'いくらですか？',
          english: 'How much is it?',
          sinhala: 'Kīyada?',
          pronunciation: 'キーヤダ？'
        },
        {
          id: 'too-expensive',
          japanese: '高すぎます',
          english: 'Too expensive',
          sinhala: 'Vadi mila',
          pronunciation: 'ヴァディ ミラ'
        },
        {
          id: 'discount',
          japanese: 'もう少し安くできますか？',
          english: 'Can you make it cheaper?',
          sinhala: 'Adu karanna puluwanda?',
          pronunciation: 'アドゥ カランナ プルワンダ？'
        },
        {
          id: 'take-this',
          japanese: 'これをください',
          english: 'I\'ll take this',
          sinhala: 'Mēka dennak',
          pronunciation: 'メーカ デンナク'
        },
        {
          id: 'card',
          japanese: 'カードは使えますか？',
          english: 'Can I use a card?',
          sinhala: 'Card ekak ganna puluwanda?',
          pronunciation: 'カード エカク ガンナ プルワンダ？'
        }
      ]
    },
    {
      id: 'transportation',
      name: '交通',
      icon: '🚌',
      phrases: [
        {
          id: 'how-to-get',
          japanese: '〜へはどう行けばいいですか？',
          english: 'How do I get to...?',
          sinhala: '...yanna kohomada?',
          pronunciation: '...ヤンナ コホマダ？'
        },
        {
          id: 'bus-stop',
          japanese: 'バス乗り場はどこですか？',
          english: 'Where is the bus stop?',
          sinhala: 'Bus navaththana kohedā?',
          pronunciation: 'バス ナヴァッタナ コヘダー？'
        },
        {
          id: 'taxi',
          japanese: 'タクシーを呼んでください',
          english: 'Please call a taxi',
          sinhala: 'Taxi ekak genna',
          pronunciation: 'タクシー エカク ゲンナ'
        },
        {
          id: 'stop-here',
          japanese: 'ここで降ろしてください',
          english: 'Please stop here',
          sinhala: 'Methanin nathara karanna',
          pronunciation: 'メタニン ナタラ カランナ'
        },
        {
          id: 'train-station',
          japanese: '駅はどこですか？',
          english: 'Where is the train station?',
          sinhala: 'Dumriya station eka kohedā?',
          pronunciation: 'ドゥムリヤ ステーション エカ コヘダー？'
        },
        {
          id: 'train-ticket',
          japanese: '列車のチケットを買いたいです',
          english: 'I want to buy a train ticket',
          sinhala: 'Mata dumriya ticket ekak ganna ōnē',
          pronunciation: 'マタ ドゥムリヤ ティケット エカク ガンナ オーネー'
        },
        {
          id: 'correct-train',
          japanese: 'この列車は〜行きですか？',
          english: 'Is this the train to...?',
          sinhala: 'Me dumriya ...yanna da?',
          pronunciation: 'メー ドゥムリヤ ...ヤンナ ダ？'
        },
        {
          id: 'next-stop',
          japanese: '次の停車駅はどこですか？',
          english: 'What is the next stop?',
          sinhala: 'Langa navaththana kohedā?',
          pronunciation: 'ランガ ナヴァッタナ コヘダー？'
        },
        {
          id: 'arrival-time',
          japanese: '到着時間はいつですか？',
          english: 'When is the arrival time?',
          sinhala: 'Lagávanne kavadāda?',
          pronunciation: 'ラガーヴァンネ カヴァダーダ？'
        }
      ]
    },
    {
      id: 'accommodation',
      name: '宿泊',
      icon: '🏨',
      phrases: [
        {
          id: 'reservation',
          japanese: '予約をしています',
          english: 'I have a reservation',
          sinhala: 'Mata reservation ekak thiyenava',
          pronunciation: 'マタ リザベーション エカク ティイェナヴァ'
        },
        {
          id: 'checkin-time',
          japanese: 'チェックイン時間は何時ですか？',
          english: 'What time is check-in?',
          sinhala: 'Check-in venna ōné kīyatada?',
          pronunciation: 'チェックイン ヴェンナ オーネー キーヤタダ？'
        },
        {
          id: 'checkout-time',
          japanese: 'チェックアウト時間は何時ですか？',
          english: 'What time is check-out?',
          sinhala: 'Check-out venna ōné kīyatada?',
          pronunciation: 'チェックアウト ヴェンナ オーネー キーヤタダ？'
        },
        {
          id: 'wifi-password',
          japanese: 'Wi-Fiのパスワードは何ですか？',
          english: 'What is the Wi-Fi password?',
          sinhala: 'Wi-Fi password eka mokakda?',
          pronunciation: 'ワイファイ パスワード エカ モカクダ？'
        },
        {
          id: 'room-key',
          japanese: '部屋の鍵をなくしました',
          english: 'I lost my room key',
          sinhala: 'Mama kaamare yathura nathi kala',
          pronunciation: 'ママ カーマレ ヤトゥラ ナティ カラ'
        },
        {
          id: 'ac-broken',
          japanese: 'エアコンが壊れています',
          english: 'The air conditioner is broken',
          sinhala: 'AC eka vaedha karanne nae',
          pronunciation: 'エーシー エカ ヴェダ カランネ ナエ'
        },
        {
          id: 'breakfast-time',
          japanese: '朝食は何時からですか？',
          english: 'What time is breakfast?',
          sinhala: 'Udae aaharaya kīyatada?',
          pronunciation: 'ウダエ アーハラヤ キーヤタダ？'
        },
        {
          id: 'extra-towel',
          japanese: 'タオルをもう一枚ください',
          english: 'Can I have another towel?',
          sinhala: 'Thavath thuvāyak denna puluvanda?',
          pronunciation: 'タヴァト トゥヴァーヤク デンナ プルヴァンダ？'
        },
        {
          id: 'room-cleaning',
          japanese: '部屋を掃除してください',
          english: 'Please clean my room',
          sinhala: 'Kāmaraya pivisidu karanna',
          pronunciation: 'カーマラヤ ピヴィシドゥ カランナ'
        }
      ]
    },
    {
      id: 'emergency',
      name: '緊急時',
      icon: '🆘',
      phrases: [
        {
          id: 'help',
          japanese: '助けてください！',
          english: 'Help!',
          sinhala: 'Uddavva!',
          pronunciation: 'ウッダッヴァ！'
        },
        {
          id: 'hospital',
          japanese: '病院はどこですか？',
          english: 'Where is the hospital?',
          sinhala: 'Rōhala kohedā?',
          pronunciation: 'ローハラ コヘダー？'
        },
        {
          id: 'sick',
          japanese: '具合が悪いです',
          english: 'I don\'t feel well',
          sinhala: 'Mata saneepanae',
          pronunciation: 'マタ サネーパナエ'
        },
        {
          id: 'headache',
          japanese: '頭が痛いです',
          english: 'I have a headache',
          sinhala: 'Oluve radenava',
          pronunciation: 'オルヴェ ラデナヴァ'
        },
        {
          id: 'stomachache',
          japanese: 'お腹が痛いです',
          english: 'I have a stomachache',
          sinhala: 'Bade radenava',
          pronunciation: 'バデ ラデナヴァ'
        },
        {
          id: 'pharmacy',
          japanese: '薬局はどこですか？',
          english: 'Where is the pharmacy?',
          sinhala: 'Beheth shāppuva kohedā?',
          pronunciation: 'ベヘット シャーップヴァ コヘダー？'
        }
      ]
    },
    {
      id: 'tourism',
      name: '観光',
      icon: '🗿',
      phrases: [
        {
          id: 'what-is-this',
          japanese: 'これは何ですか？',
          english: 'What is this?',
          sinhala: 'Mēka mokakda?',
          pronunciation: 'メーカ モカクダ？'
        },
        {
          id: 'take-photo',
          japanese: '写真を撮ってもいいですか？',
          english: 'May I take a photo?',
          sinhala: 'Photo ekak ganna puluwanda?',
          pronunciation: 'フォト エカク ガンナ プルワンダ？'
        },
        {
          id: 'entrance-fee',
          japanese: '入場料はいくらですか？',
          english: 'How much is the entrance fee?',
          sinhala: 'Æthuluveeme gaasthuva kīyada?',
          pronunciation: 'アエトゥルヴィーメ ガーストゥヴァ キーヤダ？'
        },
        {
          id: 'toilet',
          japanese: 'トイレはどこですか？',
          english: 'Where is the toilet?',
          sinhala: 'Vasikiliya kohedā?',
          pronunciation: 'ヴァシキリヤ コヘダー？'
        },
        {
          id: 'recommend-place',
          japanese: 'おすすめの場所はどこですか？',
          english: 'What place do you recommend?',
          sinhala: 'Honda thanaka mokakda?',
          pronunciation: 'ホンダ タナカ モカクダ？'
        }
      ]
    },
    {
      id: 'weather',
      name: '天気',
      icon: '☀️',
      phrases: [
        {
          id: 'today-weather',
          japanese: '今日の天気はどうですか？',
          english: 'How is the weather today?',
          sinhala: 'Ada kālaguna kohomada?',
          pronunciation: 'アダ カーラグナ コホマダ？'
        },
        {
          id: 'tomorrow-weather',
          japanese: '明日の天気はどうですか？',
          english: 'How will the weather be tomorrow?',
          sinhala: 'Heta kālaguna kohomada?',
          pronunciation: 'ヘタ カーラグナ コホマダ？'
        },
        {
          id: 'will-it-rain',
          japanese: '雨が降りますか？',
          english: 'Will it rain?',
          sinhala: 'Vasi vadinnavada?',
          pronunciation: 'ヴァシ ヴァディンナヴァダ？'
        },
        {
          id: 'hot-today',
          japanese: '今日は暑いですね',
          english: 'It\'s hot today',
          sinhala: 'Ada raśnai',
          pronunciation: 'アダ ラシュナイ'
        },
        {
          id: 'cold-today',
          japanese: '今日は寒いですね',
          english: 'It\'s cold today',
          sinhala: 'Ada sītalai',
          pronunciation: 'アダ シータライ'
        },
        {
          id: 'rainy-season',
          japanese: '今は雨季ですか？',
          english: 'Is it the rainy season now?',
          sinhala: 'Dan vasi kālayada?',
          pronunciation: 'ダン ヴァシ カーラヤダ？'
        },
        {
          id: 'umbrella',
          japanese: '傘が必要ですか？',
          english: 'Do I need an umbrella?',
          sinhala: 'Mata kuda ekak ōnēda?',
          pronunciation: 'マタ クダ エカク オーネーダ？'
        },
        {
          id: 'best-season',
          japanese: '観光に最適な季節はいつですか？',
          english: 'What is the best season for tourism?',
          sinhala: 'Sancharaka vīma sandaha hondama kalaya kumakda?',
          pronunciation: 'サンチャラカ ヴィーマ サンダハ ホンダマ カラヤ クマクダ？'
        }
      ]
    },
    {
      id: 'numbers',
      name: '数字と時間',
      icon: '🔢',
      phrases: [
        {
          id: 'one-to-five',
          japanese: '1〜5',
          english: 'One to Five',
          sinhala: 'Eka, Deka, Thuna, Hatara, Paha',
          pronunciation: 'エカ、デカ、トゥナ、ハタラ、パハ'
        },
        {
          id: 'six-to-ten',
          japanese: '6〜10',
          english: 'Six to Ten',
          sinhala: 'Haya, Hatha, Ata, Navaya, Dahaya',
          pronunciation: 'ハヤ、ハタ、アタ、ナヴァヤ、ダハヤ'
        },
        {
          id: 'what-time',
          japanese: '何時ですか？',
          english: 'What time is it?',
          sinhala: 'Vēlāva kīyada?',
          pronunciation: 'ヴェーラーヴァ キーヤダ？'
        },
        {
          id: 'today-tomorrow',
          japanese: '今日/明日/昨日',
          english: 'Today/Tomorrow/Yesterday',
          sinhala: 'Ada/Heta/Iye',
          pronunciation: 'アダ/ヘタ/イエ'
        }
      ]
    }
  ]
};

export default languagePhrases;
