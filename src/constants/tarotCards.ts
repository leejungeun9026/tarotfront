import type { ReadingCardWithImg, TarotCardBase } from "@/apis/response/tarotcard"
import { mapCardWithImg } from "@/utils/tarotCardMapper";

export const TAROT_CARDS_CONST: TarotCardBase[] = [
  {
    "id": 1,
    "nameEn": "The Fool",
    "nameKr": "바보",
    "arcanaType": "MAJOR",
    "cardNumber": 0,
    "description": "밝은 태양 아래 나름 화려하게 옷을 입은 바보(광대)가 주변이 온통 설산(또는 파도)인 높은 절벽위에서, 딸랑 봇짐 하나를 오른손 어깨에 매고 다른 손에는 하얀 장미 한 송이를 든 채 하늘을 올려다보며 양팔을 벌리고 있고, 그 뒤에 하얀 개 한 마리가 바보를 향해 뛰어오르듯 뒤따른다.",
    "keyword": "시작, 출발, 낙관적인, 순수함, 새로운 일의 시작, 순수한 마음, 긍정적이고 낙관적인 태도와 생각",
    "reverseKeyword": "미숙함, 어리석음, 무능력, 철이 없음, 눈치 없고 생각이 없음, 어리석게 행동함, 무관심하고 무절제"
  },
  {
    "id": 2,
    "nameEn": "The Magician",
    "nameKr": "마법사",
    "arcanaType": "MAJOR",
    "cardNumber": 1,
    "description": "지팡이(Wand), 검(Sword), 잔(Cup), 코인(Pentacle, Coin) 이 놓여 있는 테이블 앞에 잘생기고 멋진 흰옷에 붉은 망토를 걸친 마법사가 있다. 오른손은 지팡이를 들고 하늘을 향하고, 다른 손은 땅을 향하고 있다. 머리 위에는 무한과 영속을 상징하는 뫼비우스 띠가 보이고, 허리에는 우로보로스(Ouroboros, 자신의 꼬리를 문 뱀)를 차고 있다.",
    "keyword": "다재다능함, 창조적인, 능력이 있는, 상상력이 뛰어남, 재주가 많고 독창적",
    "reverseKeyword": "사기성이 있음, 속임수에 능함, 거짓됨, 무기력하고 행동력이 떨어짐"
  },
  {
    "id": 3,
    "nameEn": "The High Priestess",
    "nameKr": "여사제",
    "arcanaType": "MAJOR",
    "cardNumber": 2,
    "description": "희고 파란 옷을 입은 여사제가 달 모양의 관을 쓰고 TORA라고 쓰인 두루마리 책을 손에 쥔 채 차분히 앉아 있다. 그녀의 양측에는 B(Boaz), J(Jachin)라고 쓰인 흑과 백의 기둥이 있고, 그 사이에 석류 그림의 천이 걸려 있으며, 발아래에는 초승달 모양의 달이 있고 뒤에는 잔잔한 물이 보인다.",
    "keyword": "순결한, 영적인, 신비함, 지적인, 이지적인, 비밀스러움, 판단력과 직관력이 뛰어남",
    "reverseKeyword": "거짓됨, 물질적인, 이기적인, 자신이 없고 확신 없음, 내숭을 떠는, 그릇되고 잘못된 판단"
  },
  {
    "id": 4,
    "nameEn": "The Empress",
    "nameKr": "여황제",
    "arcanaType": "MAJOR",
    "cardNumber": 3,
    "description": "다 익은 석류 모양의 옷을 입고 별 모양의 왕관을 쓰고 오른손에 봉을 들은 채, 매우 편안해 보이는 의자에 기대어 앉아 있는 여황제가 보인다. 주변에는 곡식(밀밭)과 초록의 나무가 있고 뒤로는 물이 충만히 흘러내리고 있다.",
    "keyword": "풍요로움, 성공적인, 임신, 정신적이고 물질적으로 풍족, 편안함",
    "reverseKeyword": "게으르고 나태함, 실패, 무절제, 허영심이 많고 이기적, 배신"
  },
  {
    "id": 5,
    "nameEn": "The Emperor",
    "nameKr": "황제",
    "arcanaType": "MAJOR",
    "cardNumber": 4,
    "description": "붉은 하늘과 돌산을 배경으로 양머리 모양의 돌의자에 갑옷을 입고 붉은 옷을 걸친 황제가 각 양손에 지팡이와 보주를 들고 어딘가를 향해 옆눈질 하는 시선으로 앉아 있다. (전체적인 분위기는 붉고 묵직하며 다소 편하지 않는 딱딱한 느낌임.)",
    "keyword": "권력, 성공, 강한의지, 권위적, 세속적인 힘, 강한 리더십, 성공, 탄탄한 미래, 독재적인, 현실적인",
    "reverseKeyword": "무력함, 무능력, 사기, 허세부리는, 미숙한, 자기고집만 내세우는, 고집불통인"
  },
  {
    "id": 6,
    "nameEn": "The Hierophant",
    "nameKr": "교황",
    "arcanaType": "MAJOR",
    "cardNumber": 5,
    "description": "두 개의 회색 기둥 사이 삼중관을 쓴 교황이 오른손은 하늘을 향해 뻗고 있고, 다른 손에는 삼중 십자가를 들고 앉아 있다. 그리고 교황 앞에는 교황으로부터 무언가 답을 구하는 듯한 두 명의 사제가 있고 그 사이에는 엇갈린 두 개의 황금 열쇠가 보인다.",
    "keyword": "정신적 지주, 중재, 규칙, 조언, 믿음직한 조언가, 중재자, 규칙을 준수하는, 학문에 정진하는",
    "reverseKeyword": "보수적인, 완고한, 답답한, 발전없는, 지나치게 친절함, 사람을 쉽게 믿는, 자신의 길만을 고집하는"
  },
  {
    "id": 7,
    "nameEn": "The Lovers",
    "nameKr": "연인",
    "arcanaType": "MAJOR",
    "cardNumber": 6,
    "description": "벌거벗은 두 남녀 사이 하늘에 천사가 보이고 그 위를 태양이 비추고 있다. 그 아래는 민둥산이 있고 두 남녀 뒤에는 각각 한 그루의 나무가 있다. 선악과는 열매가 탐스럽고 먹기에도 좋게 보인다. 생명과는 열매가 불의 모양을 하고 있어 먹는 것은 물론 다가서기 조차도 어려워 보인다. ",
    "keyword": "사랑, 결혼, 좋은 관계, 행운의 기회, 깊은 사랑, 축복된 사이, 믿음직한 관계",
    "reverseKeyword": "이별, 배신, 우유부단, 쾌락, 멀어지는 관계, 변심, 거짓말과 사기, 선택하지 못함"
  },
  {
    "id": 8,
    "nameEn": "The Chariot",
    "nameKr": "전차",
    "arcanaType": "MAJOR",
    "cardNumber": 7,
    "description": "머리에는 별 장식의 왕관과 월계관을 쓰고, 어깨에는 초승달 모양의 견장이 있는 갑옷을 입고, 지휘봉을 들고 있는 멋진 남성이 흑과 백의 스핑크스가 끄는 전차에 있다.",
    "keyword": "승리, 추진력, 돌진, 자신감, 열정에 넘침, 뛰어난 리더십, 소송과 경쟁에서 이김",
    "reverseKeyword": "패배, 불균형, 머뭇거림, 현실도피, 나아가지 못함, 오만함, 실패하고 거절당함, 추진력이 없음"
  },
  {
    "id": 9,
    "nameEn": "Strength",
    "nameKr": "힘",
    "arcanaType": "MAJOR",
    "cardNumber": 8,
    "description": "흰옷에 머리와 허리에 꽃을 두른 여성이 꼬리를 내리고 여성을 올려보는 사자의 턱과 콧등을 어루만지며, 마치 어린아이를 대하듯 사자를 능숙하게 다루고 있다.",
    "keyword": "내적인 힘, 이해, 포용, 관용, 용기, 숨겨진 힘, 친절하고 다정함",
    "reverseKeyword": "과신, 남용, 역경, 고난, 허영, 힘을 남용하는, 포악한, 거짓말 하는, 허황된 말과 행동"
  },
  {
    "id": 10,
    "nameEn": "The Hermit",
    "nameKr": "은둔자",
    "arcanaType": "MAJOR",
    "cardNumber": 9,
    "description": "설산(또는 구름) 위로 보이는 곳에 지팡이를 짚고 등불을 들고 있는 나이가 많아 보이는 사람이 눈을 감고 다소 고개를 숙인 채 홀로 서 있다. (전체적으로 어둡고 고독하며, 무언가를 구하는 느낌이다.)",
    "keyword": "내적인, 지적인, 신중한, 탐구와 연구, 안내와 조언, 조심스럽고 신중함, 고독을 즐기는",
    "reverseKeyword": "미성숙함, 완고한, 불신하는, 조언을 받아들이지 않는, 괜한 의심을 하는, 무조건 우기는"
  },
  {
    "id": 11,
    "nameEn": "Wheel of Fortune",
    "nameKr": "운명의 수레바퀴",
    "arcanaType": "MAJOR",
    "cardNumber": 10,
    "description": "TORA 라고 쓰인 거대한 수레바퀴가 보이고 그 위에는 칼을 든 스핑크스가 있고, 왼쪽편에는 티폰이, 오른쪽 아래에는 아누비스가, 그리고 각 모퉁이에는 사람, 독수리, 사자, 황소의 테트라모프가 책을 보고 있다.",
    "keyword": "운명, 좋은 변화, 행운, 승진, 이사, 기회의 때, 운명적 만남, 발전의 기회, 좋은 결과가 나옴",
    "reverseKeyword": "악과되는 상황, 제자리 걸음, 불행, 배신 당하는, 앞이 막혀 진행이 어려움, 갑작스러운 방해"
  },
  {
    "id": 12,
    "nameEn": "Justice",
    "nameKr": "정의",
    "arcanaType": "MAJOR",
    "cardNumber": 11,
    "description": "두 개의 회색 기둥 사이에 보라색 천이 양 기둥 사이에 걸려 있다. 그 앞에 붉은 옷과 녹색의 망토를 입고 푸른 보석이 박힌 관을 쓴 사람이 오른손에는 검을 곧게 들고 왼손에는 천칭을 들고 앉아 있다.",
    "keyword": "정의, 균형, 정직, 공정, 법률, 재판, 법과 관련됨",
    "reverseKeyword": "불공정, 불공평함, 고집불통, 편협한, 억울한 분쟁이나 소송, 이기적인, 불리하고 가혹한 판결"
  },
  {
    "id": 13,
    "nameEn": "The Hanged Man",
    "nameKr": "매달린 사람",
    "arcanaType": "MAJOR",
    "cardNumber": 12,
    "description": "잎과 열매가 달린 T자 모양의 나무에 여유롭고 온화한 모습의 얼굴로 한 인물이 거꾸로 매달려 있다. 양손을 뒤로 한 채 오른발은 묶였고 왼쪽 다리는 구부리고 있으며, 머리에는 후광(헤일로, Halo)이 보인다.",
    "keyword": "희생, 인내, 시련, 정체, 시련을 받음, 상황을 지켜보고 있는",
    "reverseKeyword": "고통, 성장의 정체, 헛수고, 인내의 부족, 나아가지 못함, 이기주의, 자기 중심적인"
  },
  {
    "id": 14,
    "nameEn": "Death",
    "nameKr": "죽음",
    "arcanaType": "MAJOR",
    "cardNumber": 13,
    "description": "해골 머리의 기사가 하얀 장미가 그려진 검은 깃발을 들고 백마를 타고 있다. 백마의 발아래에는 (왕관이 벗겨진 채) 왕 또는 영주로 보이는 사람이 죽은 듯 누워 있고, 앞에는 어린아이와 여성이 있으며, 종교인으로 보이는 사람이 기사를 맞이하는 듯하다.",
    "keyword": "죽음, 실패, 이별, 피할 수 없는 큰 변화, 완전한 정지, 새로운 시작, 개혁",
    "reverseKeyword": "정체, 큰 손해, 고통, 완전히 끝남, 침체, 계속되는 손해, 완전히 무너짐"
  },
  {
    "id": 15,
    "nameEn": "Temperance",
    "nameKr": "절제",
    "arcanaType": "MAJOR",
    "cardNumber": 14,
    "description": "천사처럼 보이는 인물이 물속에 한쪽 발을 담그고 다른 발은 물 밖에 내놓은 채, 눈을 감고 양 손에 있는 두 컵의 물을 서로 섞듯이 주고받고 있다. 인물의 뒤에는 길이 하나 있고 그 끝에는 환희 빛나는 왕관 형상이 있다.",
    "keyword": "절제, 조화, 균형, 조절, 적응, 절충하는, 조화로운, 원활함",
    "reverseKeyword": "불화, 지나침, 내분, 싸움, 충동적인, 참을성이 부족한, 어울리지 않음"
  },
  {
    "id": 16,
    "nameEn": "The Devil",
    "nameKr": "악마",
    "arcanaType": "MAJOR",
    "cardNumber": 15,
    "description": "염소 모양의 얼굴을 하고 인간의 몸에 박쥐 날개를 가진 악마가 오른손은 위로 들고 다른 손에는 횃불을 들고 있다. 악마의 발아래에는 쇠사슬을 목에 걸고 있는 머리에 뿔이난 두 남녀가 서 있다.",
    "keyword": "속박, 욕망, 타락, 유혹, 집착, 종속, 복종, 황폐 부정",
    "reverseKeyword": "회복, 풀려남, 실패에서의 회복, 개방, 속박에서 풀려남, 유혹을 물리침"
  },
  {
    "id": 17,
    "nameEn": "The Tower",
    "nameKr": "탑",
    "arcanaType": "MAJOR",
    "cardNumber": 16,
    "description": "높은 절벽 위의 탑 꼭대기에 벼락이 떨어지고, 왕관이 튀어 날아가고, 두 사람이 불이 난 높은 탑에서 (자의인지 타의인지 알 수 없지만) 뛰어내리고 있다.",
    "keyword": "붕괴, 파괴, 파국, 재해, 사고, 개혁, 상황의 악화, 중대한 위기",
    "reverseKeyword": "실패, 불운, 이별, 계속되는 악화, 내분, 궁지에 몰림"
  },
  {
    "id": 18,
    "nameEn": "The Star",
    "nameKr": "별",
    "arcanaType": "MAJOR",
    "cardNumber": 17,
    "description": "하늘에는 거대한 별과 7개의 작은 별이 보이고, 그 아래 나체의 한 여성이 한 발은 물웅덩이에, 또 다른 발은 땅을 디딘 채 양손에 든 항아리의 물을 물웅덩이와 땅에 각각 붓고 있다. 그 뒤로는 새 한 마리가 나무 위에 앉아 있다.",
    "keyword": "희망, 미래의 가능성, 행복, 행운, 소망과 성취, 낙관, 좋은 기회",
    "reverseKeyword": "희망이 없음, 비관, 실망, 외면, 절망, 불운, 고집이 센, 외면하는, 불안한"
  },
  {
    "id": 19,
    "nameEn": "The Moon",
    "nameKr": "달",
    "arcanaType": "MAJOR",
    "cardNumber": 18,
    "description": "거대한 회색 기둥 사이에 하나의 길이 길게 뻗어 있고, 개와 늑대는 하늘의 달을 보며 짖고 있는 듯하다. 물가에는 가재 한 마리가 땅 위로 올라오려 하고 있으며, 하늘의 달은 뭔가를 걱정하듯 근심 어린 표정을 하고 있다.",
    "keyword": "불안, 비밀, 숨겨진, 불확실함, 속임수, 믿지 못함, 두려움, 당황함, 불완전한",
    "reverseKeyword": "상황의 모면, 숨겨진 게 드러남, 오해가 풀림, 속임수를 알아차림, 상황이 나아짐, 힘든시기가 지나감"
  },
  {
    "id": 20,
    "nameEn": "The Sun",
    "nameKr": "태양",
    "arcanaType": "MAJOR",
    "cardNumber": 19,
    "description": "백마를 타고 붉은 깃발을 들고 있는 밝은 표정의 어린아이가 있다. 그 뒤에는 너무 나도 밝은 태양과 돌담 위 활짝 핀 해바라기가 보인다.",
    "keyword": "기쁨, 행복, 환희, 성공, 만족, 사랑, 성취, 활기, 축복, 발전",
    "reverseKeyword": "취소, 중지, 불확실, 실패, 불안, 자꾸 미루어짐, 깨어진 관계, 낙심"
  },
  {
    "id": 21,
    "nameEn": "Judgement",
    "nameKr": "심판",
    "arcanaType": "MAJOR",
    "cardNumber": 20,
    "description": "구름 위에 천사가 나팔을 불고 있고, 물 위의 관에서는 죽음을 맞이했던 사람들이 일어나 천사를 맞이하듯 하늘을 바라보고 있다.",
    "keyword": "심판, 부활, 재생, 성취, 보상, 새로운 시작, 승리, 발전",
    "reverseKeyword": "실패, 부진, 기회가 사라짐, 포기하다, 무모함, 희망의 상실, 불리한 결정, 원하지 않는 결과"
  },
  {
    "id": 22,
    "nameEn": "The World",
    "nameKr": "세계",
    "arcanaType": "MAJOR",
    "cardNumber": 21,
    "description": "숫자 0으로 보이는 커다란 월계수 안에, 보라색 천을 두르고 지팡이를 양손에 들고 다소 웃음과 여유 있어 보이는 인물이 있다. 그리고 네 모퉁이에는 사람, 독수리, 황소, 사자가 있다.",
    "keyword": "완성, 성공, 성취, 완료, 완벽 목표의 달성, 만족",
    "reverseKeyword": "부진함, 미완성, 제자리걸음, 무력함, 미숙함, 불완전함, 슬럼프에 빠짐"
  },
  {
    "id": 23,
    "nameEn": "Ace of Cups",
    "nameKr": "에이스 컵",
    "arcanaType": "MINOR",
    "cardNumber": 1,
    "description": "구름에서 나온 손이 컵을 받쳐 들고 있다. 컵에는 물이 솟구치듯 넘쳐 연꽃이 있는 호수로 흐르고, 비둘기가 십자가 모양의 성체를 물고 컵을 향하고 날아간다.",
    "keyword": "시작, 기쁨, 축복, 새로운 시작, 행복한, 긍정적인 감정",
    "reverseKeyword": "실패, 불안정, 배신, 미완성, 거부당함, 떠나감"
  },
  {
    "id": 24,
    "nameEn": "Two of Cups",
    "nameKr": "투 컵",
    "arcanaType": "MINOR",
    "cardNumber": 2,
    "description": "각각 월계관과 꽃 화환을 쓴 두 남녀가 서로에게 컵을 건네주고 있다. 컵 사이에는 두 뱀이 교차하는 지팡이와 그 위에 날개를 단 사자 형상이 보인다.",
    "keyword": "시작된 사랑, 감정의 결합, 결혼, 공감, 동반자적 관계, 계약의 성사",
    "reverseKeyword": "불신, 엇갈린 요구, 이혼, 별거, 잘못된 사랑, 만족스럽지 않은 관계"
  },
  {
    "id": 25,
    "nameEn": "Three of Cups",
    "nameKr": "쓰리 컵",
    "arcanaType": "MINOR",
    "cardNumber": 3,
    "description": "열매와 과일이 보이는 언덕 위에 흰옷과 붉은 옷과 노란 옷을 입은 세 여인이 축하를 하듯 즐거운 모습으로 컵을 높이 치켜들고 있다.",
    "keyword": "화합, 조화, 만족, 성공, 화해, 타협, 승리, 축하, 목표 달성",
    "reverseKeyword": "사치, 불안, 불만족스러운 상황, 과도한 유흥, 급한 문제가 생김"
  },
  {
    "id": 26,
    "nameEn": "Four of Cups",
    "nameKr": "포 컵",
    "arcanaType": "MINOR",
    "cardNumber": 4,
    "description": "팔장을 낀 한 인물이 나무 아래 앉아 있다. 그 앞에는 3개의 컵이 놓여 있고 구름의 손이 컵 하나를 건네지만 그는 시선을 다른 곳(3개의 컵 쪽으로 보인다)으로 돌린 채 어떠한 반응도 없이 그대로 있다.",
    "keyword": "권태기, 실증, 불만, 지침, 정체기, 나태함",
    "reverseKeyword": "새로운 기회, 회복, 활동의 시작, 새로운 목표, 기운을 차림, 좋은 기회"
  },
  {
    "id": 27,
    "nameEn": "Five of Cups",
    "nameKr": "파이브 컵",
    "arcanaType": "MINOR",
    "cardNumber": 5,
    "description": "검은 망토를 두른 인물이 앞에 있는 엎질러진 3개의 컵과 쏟아진 물이 땅으로 스며드는 것을 바라보고 있고, 뒤로는 쓰러지지 않은 2개의 컵이 있다. 강과 다리가 있고 그 너머 언덕에는 성이 보인다.",
    "keyword": "실망, 손실, 후회, 기대에 미치지 못하는, 부분적 손실, 불안정한 상황",
    "reverseKeyword": "희망적인, 관계 회복의 가능성이 있음, 새로운 미래, 기회가 나타남"
  },
  {
    "id": 28,
    "nameEn": "Six of Cups",
    "nameKr": "식스 컵",
    "arcanaType": "MINOR",
    "cardNumber": 6,
    "description": "시골 집들이 보이는 곳에 흰 백합 꽃이 담긴 컵들이 보이고, 2명의 어린아이가 있다. 한 아이는 흰 백합 꽃이 든 컵을 다른 아이에게 건네주고 있다.",
    "keyword": "과거, 추억, 순수함, 추억에 잠김, 향수, 어린 시절",
    "reverseKeyword": "새로움, 미래, 새로운 변화, 미래를 향해 나아감"
  },
  {
    "id": 29,
    "nameEn": "Seven of Cups",
    "nameKr": "세븐 컵",
    "arcanaType": "MINOR",
    "cardNumber": 7,
    "description": "구름 위에 7개의 컵이 있고 각 컵에는 사람 얼굴, 천을 두른 사람, 뱀, 성, 보석, 월계관, 도마뱀이 있으며, 그 앞에는 마치 어떤 컵을 고를지 고민하는 듯한 검은 인물이 있다.\n",
    "keyword": "공상, 허상, 헛된 희망, 허황된 과장에 넘어감, 망상에 빠져있음, 실체가 없음",
    "reverseKeyword": "욕구, 선택, 강한 욕망, 현식적인 생각, 선택의 기회"
  },
  {
    "id": 30,
    "nameEn": "Eight of Cups",
    "nameKr": "에이트 컵",
    "arcanaType": "MINOR",
    "cardNumber": 8,
    "description": "8개 컵이 보이며 아래는 5개 컵이, 위에는 3개 컵이 놓여 있다. 그 뒤로 인물이 컵을 등지고 어딘가 떠나고 있다.",
    "keyword": "포기, 휴식, 은둔, 정리, 완성, 새로운 시작",
    "reverseKeyword": "행복, 기쁨, 완성, 되돌아 옴"
  },
  {
    "id": 31,
    "nameEn": "Nine of Cups",
    "nameKr": "나인 컵",
    "arcanaType": "MINOR",
    "cardNumber": 9,
    "description": "파란색의 천 위에 컵 9개가 가지런히 놓여 있고, 그 앞에 팔짱을 끼고 만족스럽고 의기양양해 보이는 인물이 미소를 띠고 앉아 있다.",
    "keyword": "행복, 안정, 성공, 완성, 부유함, 평화로움, 물질적 달성",
    "reverseKeyword": "거만함, 열등감, 신용을 잃음, 불완전, 믿음을 잃음, 욕구불만"
  },
  {
    "id": 32,
    "nameEn": "Ten of Cups",
    "nameKr": "텐 컵",
    "arcanaType": "MINOR",
    "cardNumber": 10,
    "description": "부부로 보이는 남녀와 아이들이 보인다. 하늘에는 10개의 컵이 무지개 위에 걸쳐 있고, 부부는 환호하며 아이들은 즐겁게 뛰어놀고 있다.",
    "keyword": "행복, 평화, 즐거움, 만족스러움, 행복한 관계",
    "reverseKeyword": "불화, 분쟁, 낭비, 무관심함, 좋지 않은 상황, 가족간의 싸움"
  },
  {
    "id": 33,
    "nameEn": "Page of Cups",
    "nameKr": "페이즈 컵",
    "arcanaType": "MINOR",
    "cardNumber": 11,
    "description": "연꽃 모양의 다소 개성 강한 옷을 입은 젊은이가 손에 든 컵을 보고 있다. 컵에는 물고기 한 마리가 들어 있다.",
    "keyword": "호기심, 소식, 모험, 적극적, 순진함, 감정이 풍부함",
    "reverseKeyword": "속임수, 책임감이 없는, 미숙함, 좋지 않은 유혹, 교활한, 수동적인"
  },
  {
    "id": 34,
    "nameEn": "Knight of Cups",
    "nameKr": "나이트 컵",
    "arcanaType": "MINOR",
    "cardNumber": 12,
    "description": "날개 달린 투구와 신발을 신은 기사가 백마를 타고 무언가를 전하듯 한 손에 컵을 들고 나아가고 있다. 백마는 한 발 한 발 내딛는 모습이다.",
    "keyword": "제의를 받음, 좋은 관계, 새로운 소식, 승리, 만남의 시작, 변화의 시작",
    "reverseKeyword": "유혹, 감정적인, 멀어지고 있는, 음흉한, 질투심이 강함, 좋지 못한 소식"
  },
  {
    "id": 35,
    "nameEn": "Queen of Cups",
    "nameKr": "퀸 컵",
    "arcanaType": "MINOR",
    "cardNumber": 13,
    "description": "물결 무늬의 망토와 흰색 옷을 입은 여왕이 옥좌에 앉아 자신이 들고 있는 뚜껑을 덮은 컵을 바라보고 있다. 여왕의 오른쪽 옷은 살짝 바닷물에 젖어 있다.\n",
    "keyword": "감수성이 풍부함, 여성스러운, 공감적인, 가정적인 어머니, 행복한 인간관계",
    "reverseKeyword": "변덕스러운, 까다로운, 믿을 수 없는, 신경질적인, 의심이 많은, 감정기복이 심한"
  },
  {
    "id": 36,
    "nameEn": "King of Cups",
    "nameKr": "킹 컵",
    "arcanaType": "MINOR",
    "cardNumber": 14,
    "description": "사방이 출렁이는 물결 주변으로 옥좌 위에 컵과 홀을 들고 있는 왕이 보인다.",
    "keyword": "넓은 이해심, 매력적인, 자애로운, 베풀기 좋아하는, 안정된, 로맨틱한",
    "reverseKeyword": "교활한, 부정적인, 변덕이 심한, 이중인역, 감정 기복이 심한, 자기 멋대로인"
  },
  {
    "id": 37,
    "nameEn": "Ace of Pentacles",
    "nameKr": "에이스 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 1,
    "description": "구름에서 나온 오른손이 오각형의 별이 그려진 동전(펜타클)을 받치고 있다. 그 아래는 백합과 여러 꽃들이 가득하고, 중간에 화환 모양의 문이 보인다.",
    "keyword": "기회, 성취, 번창, 풍요, 행운, 성공",
    "reverseKeyword": "낭비, 욕심, 상실, 사치, 손해, 과도한 욕망"
  },
  {
    "id": 38,
    "nameEn": "Two of Pentacles",
    "nameKr": "투 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 2,
    "description": "붉고 기다란 모자를 쓴 인물이 한 발은 들고 외발로 서서 두 개의 동전으로 저글링(Juggling)을 하고 있다. 저 멀리는 출렁이는 큰 파도로 인해 배들이 흔들리고 있다. ",
    "keyword": "불안정, 두 가지 일, 순조로운 해결, 유동적인, 다방면, 변화가 예상되는",
    "reverseKeyword": "과한 욕심, 의심스러움, 둘 다 놓침, 시간을 끌음"
  },
  {
    "id": 39,
    "nameEn": "Three of Pentacles",
    "nameKr": "쓰리 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 3,
    "description": "속이 빈 3개의 펜타클이 보이는 기둥 주위로, 작업을 하는 인물과 설계사로 보이는 인물 그리고 성직자가 무언가 상의를 하는 것으로 보인다. (세 사람은 기술자/조각가, 설계사와 수도원장 정도로 본다.)",
    "keyword": "협렵, 합의, 동업, 숙련된 기술, 재능과 명성이 있음",
    "reverseKeyword": "의견의 불일치, 불평이 많음, 평범한, 합의가 안됨, 의지가 약함"
  },
  {
    "id": 40,
    "nameEn": "Four of Pentacles",
    "nameKr": "포 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 4,
    "description": "왕관을 쓰고 갈색 옷과 짙은 보라색 망토를 두른 인물이 동전 하나는 머리에 이고, 또 다른 동전은 양손 전체로 감싸듯 품고, 다른 동전 2개는 양발로 밟은 채 딱딱한 돌 위에 앉아 있다. 그 뒤로는 여러 건물들이 보인다.",
    "keyword": "욕심이 많음, 인색함, 집착, 구두쇠, 소유욕이 많음",
    "reverseKeyword": "불안함, 걱정, 주저하는, 좌절감, 이익이 없음, 우유부단함"
  },
  {
    "id": 41,
    "nameEn": "Five of Pentacles",
    "nameKr": "파이브 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 5,
    "description": "눈이 내리는 날에 허름한 차림의 두 남녀가 걸어가고 있다. 남자는 목발을 짚고 걷기에도 불편해 보이며, 여자는 신발도 신지 않은채 땅만 보며 걷고 있다. 그 뒤로 교회로 보이는 건물에는 동전 5개가 그려진 창문이 있다.",
    "keyword": "빈곤, 근심, 걱정, 안타까운 상황, 배고품, 기회를 놓침",
    "reverseKeyword": "혼란, 논쟁, 불화, 무질서, 낭비, 대비책이 없는"
  },
  {
    "id": 42,
    "nameEn": "Six of Pentacles",
    "nameKr": "식스 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 6,
    "description": "부자로 보이는 인물이 한 손에는 저울을 들고, 다른 손으로는 가난하게 보이는 사람들에게 동전을 나눠 주고 있다.",
    "keyword": "나눔, 호의, 기쁨, 관대함, 자선, 만족",
    "reverseKeyword": "욕심, 시기, 탐욕, 계산적인, 질투, 낭비"
  },
  {
    "id": 43,
    "nameEn": "Seven of Pentacles",
    "nameKr": "세븐 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 7,
    "description": "농부로 보이는 인물이 하던 일을 멈추고 잠시 쉬며 고민하는 듯 나무에 달린 풍성한 열매(펜타클)을 바라보고 있다. 6개의 열매는 나무에, 나머지 하나는 발아래 있다.\n",
    "keyword": "수확, 성실함, 성취, 심사숙고, 계획성이 있는",
    "reverseKeyword": "근심, 걱정, 침체, 조바심, 손실, 미완성"
  },
  {
    "id": 44,
    "nameEn": "Eight of Pentacles",
    "nameKr": "에이트 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 8,
    "description": "한 인물이 망치와 정으로 동전(펜타클)을 만들고 있다. 5개 (보기에 따라 6개)의 동전은 이미 완성하여 나무에 걸려 있고, 나머지(보기에 따라 2개 또는 3개)는 마무리 작업을 남겨 두고 있어 보인다.",
    "keyword": "노력하는, 생산적인, 인내하는, 기술이 있는, 성실한, 부지런한",
    "reverseKeyword": "자만하는, 탐욕스러운, 과신하는, 노력이 부족함, 허영이 찬, 미완성"
  },
  {
    "id": 45,
    "nameEn": "Nine of Pentacles",
    "nameKr": "나인 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 9,
    "description": "부유해 보이는 여성이 보인다. 한 손에는 맹금류로 보이는 새가 앉아 있고, 다른 손은 과실처럼 매달린 동전을 어루만지고 있다. 여성의 주변에는 포도와 동전이 주렁주렁 열려 있고 여성의 모습은 풍요롭고 여유 있어 보인다.",
    "keyword": "풍요로움, 성공, 번창, 부유함, 안정적인, 기쁨",
    "reverseKeyword": "사치, 낭비, 부족, 불안정, 위험, 불신"
  },
  {
    "id": 46,
    "nameEn": "Ten of Pentacles",
    "nameKr": "텐 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 10,
    "description": "부유한 가정에 남녀가 보이고 여성은 즐거워하고 그 옆에는 아이와 2마리의 개가 보인다. 그리고 그 앞으로 (다소 쓸쓸해 보이는) 백발 노인이 다소 떨어져 있듯 앉아 있고 주위에는 10개의 동전이 펼쳐 있다.\n",
    "keyword": "안정, 화목, 행복, 풍요, 성공, 번영",
    "reverseKeyword": "부담스러운, 손실이 예상됨, 불행한 일이 생김, 상황이 나빠짐"
  },
  {
    "id": 47,
    "nameEn": "Page of Pentacles",
    "nameKr": "페이즈 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 11,
    "description": "나무와 풀이 보이는 들판 위에 젊은이가 두 손으로 동전 하나를 받쳐 들고 서 있다.",
    "keyword": "호기심이 많은, 현실적인, 신중한, 발전가능성이 있는, 노력하는, 목표가 뚜렷한",
    "reverseKeyword": "생각이 없는, 미숙한, 비현실적인, 과도한 기대, 집착이 있는, 발전이 없음"
  },
  {
    "id": 48,
    "nameEn": "Knight of Pentacles",
    "nameKr": "나이트 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 12,
    "description": "갈색의 옷을 두르고 갑옷을 입은 기사가 갈색 안장의 검은 말에 타고 한 손은 말의 고삐를 잡고 다른 손은 동전을 받쳐 들고 있다. 갈색 안장의 검은 말은 반듯이 서서 좀처럼 움직일 것으로 보이지는 않는다.",
    "keyword": "믿음직한, 계획성이 있는, 차분한, 책임감이 있는, 참을성이 많은, 인내심이 있는",
    "reverseKeyword": "침체된, 불확실한, 독선적인, 의심이 많은, 신뢰할 수 없는, 경솔한"
  },
  {
    "id": 49,
    "nameEn": "Queen of Pentacles",
    "nameKr": "퀸 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 13,
    "description": "장미 넝쿨과 꽃과 풀이 보이는 곳에 붉고 흰 옷과 녹색 천이 달린 왕관 쓴 여왕이 염소 문양의 의자에 앉아 있다. 여왕은 펜타클을 소중히 품안에 안고 바라보고 있다.",
    "keyword": "번영, 풍요로운, 이해심이 많은, 번창하는, 마음이 넓은, 행복한",
    "reverseKeyword": "걱정, 불안, 자신감 없는, 근심, 허영, 과도한 욕망"
  },
  {
    "id": 50,
    "nameEn": "King of Pentacles",
    "nameKr": "킹 펜타클",
    "arcanaType": "MINOR",
    "cardNumber": 14,
    "description": "검은 바탕에 포도송이가 가득한 옷을 입은 왕이 양손에 펜타클과 보주 달린 지팡이를 들고 황소 문양이 있는 의자에 앉아 있다. 그의 갑옷 입은 왼발은 맹수 형상의 머리를 밟고 얼굴은 펜타클을 향해 눈을 감고 있다.",
    "keyword": "성공, 완성, 번영, 달성, 뛰어난 능력",
    "reverseKeyword": "게으름, 타락적인, 중독적인, 소통이 안되는, 고집 센, 속물적인"
  },
  {
    "id": 51,
    "nameEn": "Ace of Swords",
    "nameKr": "에이스 소드",
    "arcanaType": "MINOR",
    "cardNumber": 1,
    "description": "구름에서 나온 손이 검을 곧게 하늘 위로 향하여 잡고 있다. 검의 끝에는 왕관이 있고 그 양옆에는 올리브 열매와 월계수 잎이 걸려 있다.\n",
    "keyword": "승리, 이성적인, 냉정한, 꿋꿋함, 역경을 이겨냄, 주도권을 가짐, 현실적인",
    "reverseKeyword": "실패, 파괴적인, 복잡한, 손실이 생김, 폭력적인, 지나치다"
  },
  {
    "id": 52,
    "nameEn": "Two of Swords",
    "nameKr": "투 소드",
    "arcanaType": "MINOR",
    "cardNumber": 2,
    "description": "초승달이 뜬 밤에 흰옷을 입은 인물이 두 눈을 가리고 두 팔을 엇갈려 2개의 검을 들고 앉아 있다. 그 뒤로는 잔잔해 보이는 바다가 있다.",
    "keyword": "타협, 망설임, 불확실한 선택, 조화, 불완전하나 균형 잡힌, 우유부단함",
    "reverseKeyword": "잘못된, 어려움, 거짓말, 이중적인, 거짓된 생각, 배신, 잘못된 판단, 단절"
  },
  {
    "id": 53,
    "nameEn": "Three of Swords",
    "nameKr": "쓰리 소드",
    "arcanaType": "MINOR",
    "cardNumber": 3,
    "description": "하늘에는 구름이 가득하고 비가 오늘 날, 하트 모양의 형상에 3개의 검이 꽂혀 있다.",
    "keyword": "슬픔, 고통, 깊은 상처, 고민, 상처 괴로움, 깨어진 관계",
    "reverseKeyword": "불화, 잘못, 손실, 소외, 갈등, 실망, 실수"
  },
  {
    "id": 54,
    "nameEn": "Four of Swords",
    "nameKr": "포 소드",
    "arcanaType": "MINOR",
    "cardNumber": 4,
    "description": "성당으로 보이는 건물 안에 금색의 한 인물이 침대 위에 기도를 하는 듯 두 손을 모으고 반듯이 누워 있다. 그 위로는 3개의 회색 검이 보이고, 침대 아래에는 금색의 검 하나가 누워 있듯 보인다.",
    "keyword": "휴식, 회복, 재충전, 요양, 보충, 연기",
    "reverseKeyword": "활동적인, 복구, 피곤에 지친, 바쁨, 쉴 수 없음, 일상으로의 복귀"
  },
  {
    "id": 55,
    "nameEn": "Five of Swords",
    "nameKr": "파이브 소드",
    "arcanaType": "MINOR",
    "cardNumber": 5,
    "description": "구름 낀 하늘에 비열한 느낌의 표정을 한 인물이 5개의 검을 혼자 독차지한 듯 가지고 있고, 그 뒤로는 검을 빼앗긴 듯한 두 인물이 뒤돌아서 있다.\n",
    "keyword": "패배, 불화, 다툼, 빼앗김, 망신, 파괴, 경쟁",
    "reverseKeyword": "실망, 거절, 열등감, 소외, 불안정한 미래, 복잡함"
  },
  {
    "id": 56,
    "nameEn": "Six of Swords",
    "nameKr": "식스 소드",
    "arcanaType": "MINOR",
    "cardNumber": 6,
    "description": "한 인물이 다소 기력이 없어 보이는 여성과 아이를 태우고 노를 젓고 있다. 배 위에는 6개의 검이 있고, 배의 앞은 큰 물결이 일고 있으나 나아가는 저 멀리 물결은 잔잔하다.",
    "keyword": "여행, 문제 해결, 탈출, 이동, 안정이 됨, 긍정적인 변화, 상황이 나아짐",
    "reverseKeyword": "원치 않는 방향으로 풀림, 막다른 상황, 부정적인 변화, 떠나지 못함, 해결이 불가능함"
  },
  {
    "id": 57,
    "nameEn": "Seven of Swords",
    "nameKr": "세븐 소드",
    "arcanaType": "MINOR",
    "cardNumber": 7,
    "description": "적진으로 보이는 곳에 한 인물이 검 5개의 칼날 부분을 쥐고 고양이 발로 살금살금 가고 있다. 그 뒤에는 검 2개가 땅에 꽂혀 있고 인물은 다소 간사한 표정을 하고 있다.",
    "keyword": "불안정, 위험, 부담, 부족함, 자신의 이익만 생각함, 불안정한 성공, 서두르고 있는 상황",
    "reverseKeyword": "언쟁, 대립, 실패, 계획의 실패, 뜻대로 되지 않음, 험담, 비방"
  },
  {
    "id": 58,
    "nameEn": "Eight of Swords",
    "nameKr": "에이트 소드",
    "arcanaType": "MINOR",
    "cardNumber": 8,
    "description": "흐려 보이는 날에 울퉁불퉁하고 물도 고여 있는 땅에 한 인물을 포위하듯 8개의 검이 꽂혀 있고, 그 인물의 눈은 천으로 가려져 있으며 몸도 묶여 있다.",
    "keyword": "속박, 구속, 위기, 사면초가, 두려움, 혼란스러움",
    "reverseKeyword": "불안, 근심, 실패, 힘든 상황, 어려움, 혼란"
  },
  {
    "id": 59,
    "nameEn": "Nine of Swords",
    "nameKr": "나인 소드",
    "arcanaType": "MINOR",
    "cardNumber": 9,
    "description": "침대 위의 한 인물이 괴로운 듯 두 손으로 얼굴을 감싸며 앉아 있다. 검보라 바탕의 벽면에는 검 9개가 놓여 있다.",
    "keyword": "근심, 걱정, 실망, 절망, 이별, 외로움",
    "reverseKeyword": "의심, 두려움, 수상함, 겁이 많음, 떳떳하지 못함"
  },
  {
    "id": 60,
    "nameEn": "Ten of Swords",
    "nameKr": "텐 소드",
    "arcanaType": "MINOR",
    "cardNumber": 10,
    "description": "한 인물이 등에 10개의 칼이 꽂힌 채 엎어져 있다. 그는 죽은 듯 보이며 저 멀리에는 잔잔한 호수 너머 어둔 밤의 하늘 아래 여명의 새벽 빛이 밝아 오고 있다.",
    "keyword": "파멸, 절망, 죽음, 심각한 상황, 처절한 고통과 슬픔",
    "reverseKeyword": "불안, 고통, 갈등, 번뇌, 개선의 여지가 있음, 새로운 시작"
  },
  {
    "id": 61,
    "nameEn": "Page of Swords",
    "nameKr": "페이즈 소드",
    "arcanaType": "MINOR",
    "cardNumber": 11,
    "description": "바람 부는 날 평지가 아닌 굴곡진 땅 위에 젊은이가 무언가를 응시하며 두 손으로 검을 쥔 채 서 있다.",
    "keyword": "모험, 용기, 정의, 경계심, 활동적인, 꿋꿋함",
    "reverseKeyword": "미흡함, 자기중심적인, 비열한, 성급함, 고집이 샘, 잔인함"
  },
  {
    "id": 62,
    "nameEn": "Knight of Swords",
    "nameKr": "나이트 소드",
    "arcanaType": "MINOR",
    "cardNumber": 12,
    "description": "바람 부는 언덕에 백마를 타고 오른손에 검을 들고 무언가를 향해 돌진하듯 거침없이 빠르게 달리는 기사가 보인다. 그는 투구의 마스크도 내리지 않았고, 검을 쥔 오른손은 장갑을 끼지 않았다.",
    "keyword": "용감한, 능력이 넘치는, 활기찬, 용맹한, 대담한, 대립, 논리적인",
    "reverseKeyword": "성급한, 충동적인, 무책임한, 무모한, 준비성이 없는, 폭력적인, 무기력한"
  },
  {
    "id": 63,
    "nameEn": "Queen of Swords",
    "nameKr": "퀸 소드",
    "arcanaType": "MINOR",
    "cardNumber": 13,
    "description": "아기 천사와 나비 문양이 새겨진 옥좌에 구름 모양의 망토를 두른 여왕이 옆으로 돌아 앉아 있다. 그녀의 오른손은 검을 곧게 세워 들었고, 다른 손은 앞을 향하여 내밀고 있다. 저 멀리에는 새 한마리가 날고 있다.",
    "keyword": "결단력 있는, 완벽주의자, 신중한, 의지력이 강한, 독립적인",
    "reverseKeyword": "고집불통, 소통이 어려운, 이기적인, 정직하지 못한, 속이 좁은, 악의가 있는"
  },
  {
    "id": 64,
    "nameEn": "King of Swords",
    "nameKr": "킹 소드",
    "arcanaType": "MINOR",
    "cardNumber": 14,
    "description": "나비 문양이 새겨진 옥좌에 오른손으로 비스듬히 검을 들고 있는 왕이 앉아 있다. 왕은 언제든 그 검을 사용할 수 있는 듯한 자신감과 확고함으로 전면을 응시하고 있다.",
    "keyword": "공정한, 엄격한, 이성적인, 객관적인, 단호한, 카리스마 넘치는",
    "reverseKeyword": "가부장적인, 냉정한, 독재적인, 잔혹한, 충동적인, 수단과 방법을 가리지 않는"
  },
  {
    "id": 65,
    "nameEn": "Ace of Wands",
    "nameKr": "에이스 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 1,
    "description": "구름에서 나온 오른손이 지팡이 하나를 잡고 있다. 지팡이에는 몇 개의 초록 새싹이 자라나 있고, 아래로 산과 나무와 물이 보인다.",
    "keyword": "새로운 시작, 열정, 독창성, 시작, 에너지, 창의성, 기회가 옴, 성공",
    "reverseKeyword": "끝, 초조함, 기회를 놓침, 종료됨, 실현되지 못함, 허무맹랑한 목표"
  },
  {
    "id": 66,
    "nameEn": "Two of Wands",
    "nameKr": "투 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 2,
    "description": "붉은 장미와 흰 백합이 엇갈려 있는 그림이 보이는 성벽 위에 갈색 옷을 입은 한 인물이 왼손에는 지팡이를, 오른손에는 지구본을 들고 성 밖을 향해 바라보고 있다. 그 뒤에는 또 다른 지팡이 하나가 성벽에 고정되어 있다.",
    "keyword": "성공, 목표 달성, 계획, 지배, 성취, 계획을 세움, 장래 목표, 잠시의 휴식",
    "reverseKeyword": "용기 부족, 두려움, 장애물, 고집 센, 선택이나 갈림길, 미숙함, 두려움"
  },
  {
    "id": 67,
    "nameEn": "Three of Wands",
    "nameKr": "쓰리 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 3,
    "description": "붉은 옷을 두른 인물이 안정되게 땅에 박힌 세계의 지팡이 중 하나를 오른손으로 잡고 멀리 바다가 보이는 곳을 응시하고 있다. 인물의 양옆에는 지팡이 두 개가 땅에 고정되어 있고, 멀리 바다에는 세 척의 배가 보인다.",
    "keyword": "성공, 목표 달성, 도전, 협상, 만족, 교류, 성과를 기다림, 욕망이 큼",
    "reverseKeyword": "중단, 어려움, 자만, 실패, 머뭇거림, 실망스러움, 무리한 계획"
  },
  {
    "id": 68,
    "nameEn": "Four of Wands",
    "nameKr": "포 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 4,
    "description": "땅 위에 고정된 4개의 지팡이 보이고 그 위에 풍성한 열매가 달린 넝쿨(또는 화환)이 걸려 있다. 그 뒤에 파티나 연회가 열린 듯 사람들이 모여 있고, 갓 결혼식을 마친 듯한 연인으로 보이는 남녀가 머리에 월계관을 쓰고 꽃다발을 들고 만세를 부르듯 환호하며 기뻐하고 있다.",
    "keyword": "기쁨, 행복, 휴식, 즐거움의 시간, 평화, 수확, 변영, 행복함, 축하함",
    "reverseKeyword": "기쁨, 행복, 휴식, 즐거움의 시간, 평화, 수확, 변영, 행복함, 축하함, 낭만, 해결됨"
  },
  {
    "id": 69,
    "nameEn": "Five of Wands",
    "nameKr": "파이브 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 5,
    "description": "서로 다른 옷을 입은 젊은 5명의 남자가 각자 지팡이를 들고 있다. 그리고 그 모습에는 서로 직접 싸우려 맞서고 있는 것은 아니나 무언가를 쟁취하기 위한 다툼과 격앙된 열정이 보인다.",
    "keyword": "싸움, 경쟁, 다툼, 논쟁, 경쟁을 벌임, 혼란스러움, 장애물이 많음",
    "reverseKeyword": "합의, 해결, 진정, 화해, 합의를 보다, 싸움이 진정됨"
  },
  {
    "id": 70,
    "nameEn": "Six of Wands",
    "nameKr": "식스 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 6,
    "description": "붉은 망토를 입고 월계관을 쓴 인물이 백마를 타고 오른손에 또 다른 월계관이 걸려 있는 지팡이를 들고 있다. 그 뒤로는 5개의 지팡이가 보인다.\n",
    "keyword": "성공, 성취, 정복, 좋은 소식, 목적의 달성, 노력에 대한 결과를 얻음",
    "reverseKeyword": "연기, 자만심, 좌절, 지연, 실패에 대한 두려움, 거만함, 중단"
  },
  {
    "id": 71,
    "nameEn": "Seven of Wands",
    "nameKr": "세븐 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 7,
    "description": "언덕으로 보이는 곳에 한 인물이 지팡이를 들고 자신에게 덤비는 듯한 다른 6개의 지팡이와 대치하고 있다. 그의 모습은 곤란하고 힘겨워 보이지만 물러섬이 없이 지키기 위한 굳은 열정이 보인다.",
    "keyword": "자신감, 극복, 성공, 투쟁, 장애물을 극복함, 승리",
    "reverseKeyword": "근심, 장애, 불안, 압박, 실패, 끝없는 장애, 당황스러운 상황, 혼란함"
  },
  {
    "id": 72,
    "nameEn": "Eight of Wands",
    "nameKr": "에이트 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 8,
    "description": "8개의 지팡이가 하늘 위를 빠르게(신속하게) 날아가고 있다.",
    "keyword": "이동, 변화, 상승운세, 활동할 시기, 여행, 갑작스러운 변화, 빠른 결정",
    "reverseKeyword": "지연됨, 멈춤, 쇠퇴, 늦어짐, 너무 느린 진행, 실패, 불황"
  },
  {
    "id": 73,
    "nameEn": "Nine of Wands",
    "nameKr": "나인 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 9,
    "description": "8개의 지팡이가 땅에 고정되어 있고 그 앞에 머리에 붕대를 감은 인물이 다소 고단한 모습으로 양손으로 지팡이 하나를 쥔 채 주변을 경계하듯 살피고 있다.",
    "keyword": "준비, 방어, 여러가지 문제, 지켜냄, 대비, 용기있게 대항함",
    "reverseKeyword": "장애, 문제, 역경, 패배, 문제의 발생, 준비의 미흡"
  },
  {
    "id": 74,
    "nameEn": "Ten of Wands",
    "nameKr": "텐 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 10,
    "description": "0개의 지팡이를 한 인물이 사력을 다해 부둥켜안고 저 멀리 보이는 집을 향해 나아가고 있다. 힘겹고 지쳐 보이는 인물에게 앞을 가릴 정도로 10개의 지팡이는 큰 부담으로 보이나 그에게는 포기하지 않으려는 의지가 엿보인다.",
    "keyword": "고난, 힘듦, 어려움, 압박감, 노력의 필요, 부담감이 많은",
    "reverseKeyword": "어렵지 않음, 편안함, 목적을 이룸, 짐을 벗어버림, 포기함, 곧 해결됨"
  },
  {
    "id": 75,
    "nameEn": "Page of Wands",
    "nameKr": "페이즈 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 11,
    "description": "아무것도 없는 땅과 산(황무지)을 배경으로 붉은 깃털이 달린 모자를 쓰고 붉은 망토를 두른 젊은이가 지팡이를 세우듯 들고 그 지팡이를 바라보고 있다.",
    "keyword": "호기심, 활동적인, 모험심이 넘치는, 열정적인, 능력이 있는, 순수함, 성장 가능성이 있는",
    "reverseKeyword": "미숙함, 성급함, 망설임, 충독적인, 겁이 많은, 우유부단함"
  },
  {
    "id": 76,
    "nameEn": "Knight of Wands",
    "nameKr": "나이트 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 12,
    "description": "불타는 듯한 붉은 깃털의 투구에 지팡이를 든 기사가 붉은 말을 타고 있다. 그가 탄 말은 앞다리를 들고 뒷다리를 움츠리며 달려 나갈 기세다.",
    "keyword": "도전적인, 추진력이 있는, 이동, 여행, 급격한 결정, 돌진하는, 개척적인",
    "reverseKeyword": "불화, 무능력함, 반항적인, 싸움, 오해, 할 일이 없는, 폭발적인"
  },
  {
    "id": 77,
    "nameEn": "Queen of Wands",
    "nameKr": "퀸 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 13,
    "description": "양측에 사자 형상이 있고 해바라기와 사자 그림이 있는 의자에 한 손에는 지팡이를, 다른 손에는 해바라기를 든여왕이 앉아 있고 그 앞에는 검은 고양이가 보인다.",
    "keyword": "믿을만한, 관대한, 활동적인, 정직한, 신뢰할 수 있는, 정열적인, 마음이 좋은",
    "reverseKeyword": "변덕스러운, 능력이 없는, 독선적인, 믿을 수 없는, 질투가 심한, 부정적인"
  },
  {
    "id": 78,
    "nameEn": "King of Wands",
    "nameKr": "킹 완즈",
    "arcanaType": "MINOR",
    "cardNumber": 14,
    "description": "사자와 꼬리를 문 도마뱀(샐러맨더)이 그려진 왕좌에 사자 모양의 목걸이와 불꽃 모양의 장식이 있는 왕관을 쓰고 지팡이를 든 왕이 정면이 아닌 옆 방향을 향하여 앉아 있다.",
    "keyword": "강한 리더십, 지저인, 생각이 깊은, 지도력, 카리스마, 정직한, 확신이 있는, 창조적인",
    "reverseKeyword": "독단적인, 완고한, 욕심이 많은, 남의 말을 듣지 않는, 타협이 불가능한, 엄격한, 고집스러운"
  }
]