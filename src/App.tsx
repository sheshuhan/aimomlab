import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Baby, 
  User, 
  Bot, 
  Gamepad2, 
  Lightbulb, 
  MessageCircleHeart,
  Calendar,
  ChevronRight,
  Smile,
  Trophy,
  Users
} from 'lucide-react';

interface DayContent {
  day: number;
  momQuestion: string;
  childQuestion: string;
  responseDemo: string;
  reminder: string;
  game: string;
}

type AgeGroup = '3-5' | '6-9' | '10-12';

const allPlans: Record<AgeGroup, DayContent[]> = {
  '3-5': [
    {
      day: 1,
      momQuestion: "今天最開心的是什麼？",
      childQuestion: "今天有什麼事情讓你覺得很開心？",
      responseDemo: "聽起來你那時候真的好開心！",
      reminder: "用表情和語氣放大孩子的情緒",
      game: "畫出今天開心或挑戰的場景，媽媽孩子互換看"
    },
    {
      day: 2,
      momQuestion: "今天有沒有不喜歡的事情？",
      childQuestion: "今天有什麼讓媽媽覺得累或需要休息的事？",
      responseDemo: "是不是有一點不舒服？",
      reminder: "先理解，再給支持",
      game: "用黏土捏出今天的不舒服或疲累情緒 (沒有黏土也可以自製無毒黏土，用麵粉加水)"
    },
    {
      day: 3,
      momQuestion: "如果今天是小超人，你想幫誰？",
      childQuestion: "媽媽今天有沒有幫助到別人？怎麼幫的？",
      responseDemo: "你願意幫他，媽媽覺得你好溫暖!",
      reminder: "讚美動機，而不是結果",
      game: "用積木或小玩具創造幫助場景，媽媽孩子互換角色"
    },
    {
      day: 4,
      momQuestion: "今天身體哪裡最有力？",
      childQuestion: "媽媽今天有沒有哪個瞬間覺得自己像超級英雄？",
      responseDemo: "你的腿跑得好快呀！跟賽車一樣快",
      reminder: "讓孩子感覺自己是有能力的",
      game: "模仿動作比賽，或畫出力量的表現"
    },
    {
      day: 5,
      momQuestion: "今天誰讓你笑？",
      childQuestion: "今天有沒有什麼小事情讓媽媽忍不住笑出聲？",
      responseDemo: "原來這個動作這麼好笑",
      reminder: "一起笑，就是連結",
      game: "表演今天最有趣的動作給對方看"
    },
    {
      day: 6,
      momQuestion: "如果今天可以重來，你想再玩一次什麼？",
      childQuestion: "今天有沒有一件事媽媽想再做一次，或者想做得更好？",
      responseDemo: "那一定很好玩對不對？",
      reminder: "不要糾正選擇，只陪著感受",
      game: "重現今天最喜歡的遊戲或動作"
    },
    {
      day: 7,
      momQuestion: "周末我們一起做什麼？",
      childQuestion: "媽媽最期待我們一起做的有趣小事情是什麼？",
      responseDemo: "好呀，我們一起安排吧!",
      reminder: "讓孩子參與決定，安全感會增加",
      game: "畫出周末想做的活動小圖，媽媽孩子互換想法"
    }
  ],
  '6-9': [
    {
      day: 1,
      momQuestion: "今天最有成就感的是什麼？",
      childQuestion: "今天有沒有一件事媽媽覺得很有成就感？",
      responseDemo: "你為自己努力這件事感到驕傲對嗎？",
      reminder: "引導孩子看見自己的努力",
      game: "畫出成就感瞬間或寫下小感想"
    },
    {
      day: 2,
      momQuestion: "今天有沒有一件讓你覺得有點難的事？",
      childQuestion: "今天有沒有一件事媽媽覺得挑戰很大？",
      responseDemo: "那時候是不是有點想放棄？",
      reminder: "先理解掙扎，不急著給方法",
      game: "模擬挑戰情境，討論解決方法"
    },
    {
      day: 3,
      momQuestion: "如果今天重來，你會改變什麼？",
      childQuestion: "今天有沒有一件事媽媽想做得不一樣？",
      responseDemo: "你已經在思考怎麼更好，很棒。",
      reminder: "培養反思，而不是自責",
      game: "畫出改變的方式或步驟"
    },
    {
      day: 4,
      momQuestion: "今天有幫助到誰嗎？",
      childQuestion: "今天有誰讓媽媽感覺被幫助或感動？",
      responseDemo: "你願意幫忙，對方一定很開心。",
      reminder: "強化同理與價值感",
      game: "用角色扮演重現幫助情境"
    },
    {
      day: 5,
      momQuestion: "今天有幫助到誰嗎？",
      childQuestion: "今天有誰讓媽媽感覺被幫助或感動？",
      responseDemo: "你願意幫忙，對方一定很開心。",
      reminder: "強化同理與價值感",
      game: "用角色扮演重現幫助情境"
    },
    {
      day: 6,
      momQuestion: "如果你是老師，你會怎麼教今天的課？",
      childQuestion: "如果今天媽媽是老師，你會怎麼教孩子？",
      responseDemo: "你的方法聽起來很有趣。",
      reminder: "尊重孩子的想法",
      game: "模擬教對方今天學到的東西"
    },
    {
      day: 7,
      momQuestion: "下週你希望媽媽怎麼支持你？",
      childQuestion: "下週媽媽最希望孩子怎麼陪伴你？",
      responseDemo: "謝謝你告訴我，我會試試看。",
      reminder: "願意調整，是關係的關鍵",
      game: "討論下週活動或挑戰，畫出計畫小圖"
    }
  ],
  '10-12': [
    {
      day: 1,
      momQuestion: "今天有沒有一件事讓你覺得被理解？",
      childQuestion: "今天有沒有一件事讓媽媽覺得自己被理解？",
      responseDemo: "被理解的感覺應該很重要吧。",
      reminder: "不要搶話",
      game: "寫下被理解的瞬間，分享感受"
    },
    {
      day: 2,
      momQuestion: "今天有沒有一件事讓你覺得被理解？",
      childQuestion: "今天有沒有一件事讓媽媽覺得自己被理解？",
      responseDemo: "被理解的感覺應該很重要吧。",
      reminder: "不要搶話",
      game: "寫下被理解的瞬間，分享感受"
    },
    {
      day: 3,
      momQuestion: "如果我少做一件事，會讓你更舒服的是什麼？",
      childQuestion: "如果孩子少做一件事，媽媽會更輕鬆或更開心的是什麼？",
      responseDemo: "謝謝你願意告訴我。",
      reminder: "不要防衛，先傾聽",
      game: "畫出理想家庭互動方式"
    },
    {
      day: 4,
      momQuestion: "最近有沒有一件事想跟媽媽說，但還沒說？",
      childQuestion: "媽媽最近有沒有什麼想跟我分享？",
      responseDemo: "我會聽，不會生氣",
      reminder: "語氣比內容重要",
      game: "寫下心裡話，放入「秘密信箱」互換"
    },
    {
      day: 5,
      momQuestion: "今天你最欣賞自己什麼？",
      childQuestion: "今天媽媽最欣賞自己哪一點？",
      responseDemo: "我也很欣賞你那一點。",
      reminder: "強化自我價值感",
      game: "做「優點列表」，媽媽一起補充"
    },
    {
      day: 6,
      momQuestion: "最近有沒有想挑戰的事？",
      childQuestion: "最近媽媽有沒有想挑戰或學習的新事物？",
      responseDemo: "如果你想試，我會支持你。",
      reminder: "支持比保護更重要",
      game: "列出挑戰事項，討論步驟與資源"
    },
    {
      day: 7,
      momQuestion: "我們可以怎麼讓下週更順一點？",
      childQuestion: "下週媽媽希望我們怎麼一起讓生活更順利或更有趣？",
      responseDemo: "我們一起想方法。",
      reminder: "建立合作關係，而不是上下關係",
      game: "畫出下週家庭計畫或小目標圖"
    }
  ]
};

const IconWrapper = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <div className={`p-2 rounded-full ${color} flex items-center justify-center shadow-sm`}>
    {children}
  </div>
);

const DayCard = ({ content, ageGroup }: { content: DayContent, ageGroup: AgeGroup }) => {
  const accentColor = ageGroup === '3-5' ? 'soft-pink' : ageGroup === '6-9' ? 'soft-blue' : 'soft-green';
  const accentText = ageGroup === '3-5' ? 'text-pink-500' : ageGroup === '6-9' ? 'text-blue-500' : 'text-green-600';
  const accentBg = ageGroup === '3-5' ? 'bg-pink-100' : ageGroup === '6-9' ? 'bg-blue-100' : 'bg-green-100';
  const accentBorder = ageGroup === '3-5' ? 'border-soft-pink/30' : ageGroup === '6-9' ? 'border-soft-blue/50' : 'border-soft-green/50';
  const badgeBg = ageGroup === '3-5' ? 'bg-soft-pink' : ageGroup === '6-9' ? 'bg-soft-blue text-blue-800' : 'bg-soft-green text-green-800';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-[2.5rem] p-6 mb-10 infographic-shadow border ${accentBorder} relative overflow-hidden`}
    >
      {/* Day Badge */}
      <div className={`absolute top-0 right-0 ${badgeBg} px-6 py-2 rounded-bl-[2rem] font-bold flex items-center gap-2`}>
        <Calendar size={18} />
        <span>DAY {content.day}</span>
      </div>

      <div className="mt-4 space-y-6">
        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <IconWrapper color="bg-pink-100 text-pink-500">
              <User size={20} />
            </IconWrapper>
            <div className="flex-1">
              <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">媽媽問孩子</p>
              <p className="text-lg font-medium text-warm-gray leading-relaxed">{content.momQuestion}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <IconWrapper color="bg-blue-100 text-blue-500">
              <Baby size={20} />
            </IconWrapper>
            <div className="flex-1">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">孩子問媽媽</p>
              <p className="text-lg font-medium text-warm-gray leading-relaxed">{content.childQuestion}</p>
            </div>
          </div>
        </div>

        {/* AI Response Section */}
        <div className="bg-cream/50 rounded-3xl p-5 border border-dashed border-warm-gray/20">
          <div className="flex items-center gap-3 mb-3">
            <Bot size={20} className={accentText} />
            <span className={`text-sm font-bold ${accentText} tracking-widest`}>回應示範 & 溫柔提醒</span>
          </div>
          <p className={`text-xl font-bold ${accentText} mb-2 italic`}>“{content.responseDemo}”</p>
          <div className="flex items-center gap-2 text-sm text-warm-gray/80">
            <Lightbulb size={14} className="text-yellow-400 shrink-0" />
            <p>{content.reminder}</p>
          </div>
        </div>

        {/* Game Box */}
        <div className="game-box bg-white rounded-3xl p-5 border-2 border-warm-gray/5 relative">
          <div className="absolute -top-3 left-6 bg-white px-3 flex items-center gap-2">
            <Gamepad2 size={16} className={accentText} />
            <span className={`text-xs font-bold ${accentText}`}>小遊戲建議</span>
          </div>
          <p className="text-warm-gray leading-relaxed pt-1">
            {content.game}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('3-5');

  const bgColors: Record<AgeGroup, string> = {
    '3-5': 'bg-[#FFF9F5]',
    '6-9': 'bg-[#F0F7FF]',
    '10-12': 'bg-[#F2FBF2]'
  };

  const accentColors: Record<AgeGroup, string> = {
    '3-5': 'text-pink-500',
    '6-9': 'text-blue-500',
    '10-12': 'text-green-600'
  };

  const Logo = ({ size = 24, className = "", rounded = true }: { size?: number, className?: string, rounded?: boolean }) => (
    <div className={`flex items-center justify-center bg-white shadow-sm border border-warm-gray/10 overflow-hidden ${rounded ? 'rounded-full' : 'rounded-2xl'} ${className}`} style={{ width: size * 1.5, height: size * 1.5 }}>
      <img 
        src="images/logo.png" 
        alt="AI媽媽研究室 Logo" 
        className="w-full h-full object-contain p-1"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bgColors[selectedAge]} pb-0 selection:bg-soft-pink selection:text-white`}>
      {/* Brand Header */}
      <nav className="pt-6 px-6 flex items-center justify-center gap-2">
        <Logo size={20} />
        <span className="font-bold text-warm-gray tracking-wider text-lg">AI媽媽研究室</span>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-10 pb-0 px-6 text-center overflow-hidden">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-warm-gray mb-2 tracking-tight">
            7天溫柔陪伴計畫
          </h1>
          
          <p className="text-lg text-warm-gray/70 max-w-md mx-auto leading-relaxed">
            每天只需 <span className={`${accentColors[selectedAge]} font-bold`}>10 分鐘</span>讓家慢慢變溫柔
          </p>
        </motion.div>
      </header>

      {/* Manifesto Section */}
      <section className="max-w-xl mx-auto px-6 pt-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-10 md:p-14 text-center border border-white/40 shadow-sm space-y-12"
        >
          {/* Main Message */}
          <div className="space-y-6">
            <p className="text-2xl font-medium text-warm-gray italic leading-snug">
              「不是為了教好孩子，<br />而是為了陪他長大」
            </p>
            <div className="w-12 h-px bg-warm-gray/20 mx-auto" />
          </div>

          {/* Body Text */}
          <div className="space-y-10 text-warm-gray/70 leading-relaxed text-base">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-warm-gray">這不是教養工具，是陪伴的儀式</h2>
              <p>
                很多人教孩子怎麼更好，卻很少人問媽媽今天好不好。<br />
                我們習慣問孩子功課做了沒，卻忘了問自己：<br />
                <span className="text-warm-gray font-medium italic">「今天的我，累不累？」</span>
              </p>
            </div>

            <div className="py-6 border-y border-warm-gray/5">
              <p className="text-warm-gray font-medium italic leading-loose">
                「我們不幫你變成更好的媽媽。<br />
                我們在你已經很努力的時候，喘一口氣，<br />
                擁抱沒被好好抱過的自己。」
              </p>
            </div>

            <p>
              這份對話包，不是要你成為更厲害的父母，<br />
              只是想在一天結束時，留下一個小小的空間，<br />
              讓你們慢慢坐下來，看著彼此說話。
            </p>

            <p className="text-warm-gray font-medium">
              當媽媽被理解，孩子就會慢慢安心；<br />
              當孩子被看見，家庭就會慢慢和諧。
            </p>

            <div className="pt-4">
              <p className="text-xl font-bold text-warm-gray">
                這份對話，不是為了教養成功，<br />
                而是為了，讓愛有機會被說出來 🤍
              </p>
            </div>
          </div>
        </motion.div>

        {/* Plan Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 text-left">
          <div className="bg-white p-6 rounded-[2rem] border border-warm-gray/5 shadow-sm flex items-start gap-5 transition-transform hover:scale-[1.02]">
            <div className="bg-soft-pink/10 p-3 rounded-2xl shrink-0">
              <MessageCircleHeart size={24} className="text-soft-pink" />
            </div>
            <div>
              <h4 className="font-bold text-warm-gray text-base">每天 1 個問題</h4>
              <p className="text-sm text-warm-gray/60 mt-1.5 leading-relaxed">簡單易做，不會增加負擔</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-warm-gray/5 shadow-sm flex items-start gap-5 transition-transform hover:scale-[1.02]">
            <div className="bg-soft-blue/10 p-3 rounded-2xl shrink-0">
              <Lightbulb size={24} className="text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-warm-gray text-base">範例回應 & 溫柔提醒</h4>
              <p className="text-sm text-warm-gray/60 mt-1.5 leading-relaxed">學會怎麼回應孩子、引導情緒</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-warm-gray/5 shadow-sm flex items-start gap-5 transition-transform hover:scale-[1.02]">
            <div className="bg-soft-green/10 p-3 rounded-2xl shrink-0">
              <Gamepad2 size={24} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-warm-gray text-base">小互動遊戲建議</h4>
              <p className="text-sm text-warm-gray/60 mt-1.5 leading-relaxed">增加親子互動的趣味</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-warm-gray/5 shadow-sm flex items-start gap-5 transition-transform hover:scale-[1.02]">
            <div className="bg-warm-gray/5 p-3 rounded-2xl shrink-0">
              <Users size={24} className="text-warm-gray/60" />
            </div>
            <div>
              <h4 className="font-bold text-warm-gray text-base">年齡分組</h4>
              <p className="text-sm text-warm-gray/60 mt-1.5 leading-relaxed">對應孩子不同發展階段</p>
            </div>
          </div>
        </div>

        {/* Age Switcher (Moved here) */}
        <div className="mt-16 space-y-6 text-center">
          <p className="text-sm font-bold text-warm-gray/40 uppercase tracking-widest">請選擇孩子的年齡層開始計畫</p>
          <div className="flex justify-center gap-3 relative z-10">
            {(['3-5', '6-9', '10-12'] as AgeGroup[]).map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm border ${
                  selectedAge === age 
                    ? `${age === '3-5' ? 'bg-soft-pink text-white border-soft-pink' : age === '6-9' ? 'bg-soft-blue text-blue-800 border-soft-blue' : 'bg-soft-green text-green-800 border-soft-green'} scale-105 shadow-md` 
                    : 'bg-white text-warm-gray/60 border-warm-gray/10 hover:border-warm-gray/30'
                }`}
              >
                {age} 歲
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Container */}
      <main className="max-w-xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAge}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Vertical line connector */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-warm-gray/10 -translate-x-1/2 hidden md:block" />
            
            {allPlans[selectedAge].map((day) => (
              <React.Fragment key={day.day}>
                <DayCard content={day} ageGroup={selectedAge} />
              </React.Fragment>
            ))}

            {/* Download Button Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <button 
                className={`w-full py-5 rounded-[2rem] font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border-2 ${
                  selectedAge === '3-5' ? 'bg-soft-pink text-white border-soft-pink' : 
                  selectedAge === '6-9' ? 'bg-soft-blue text-blue-800 border-soft-blue' : 
                  'bg-soft-green text-green-800 border-soft-green'
                }`}
              >
                <Calendar size={24} />
                免費下載 {selectedAge} 歲溫柔陪伴計畫 (PDF)
              </button>
              <p className="mt-4 text-sm text-warm-gray/40">
                點擊下載完整 7 天對話包，隨時隨地開啟溫柔時光
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Footer / Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12 space-y-6"
        >
          <div className="inline-block p-8 bg-white rounded-[3rem] infographic-shadow border border-warm-gray/10 w-full">
            <Heart size={32} className={`${accentColors[selectedAge]} mx-auto mb-4`} fill="currentColor" />
            <h3 className="text-xl font-bold text-warm-gray mb-4">溫柔，是最好的陪伴</h3>
            
            <div className="space-y-4 mb-8">
              <p className="text-warm-gray/80 leading-relaxed">
                想和更多媽媽分享互動心得？<br />
                加入我們的 LINE 社群，一起交流、互相支持 💌
              </p>
              
              <button className="bg-[#06C755] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 mx-auto">
                <MessageCircleHeart size={20} />
                加入 LINE 社群
              </button>
            </div>

            <p className="text-sm text-warm-gray/50 italic border-t border-warm-gray/5 pt-6">
              陪伴不在於時間長短，而在於那份全然的專注。<br />
              願這七天，成為您與孩子心中最柔軟的記憶。
            </p>
          </div>
        </motion.div>
      </main>

      {/* Bottom Brand Bar */}
      <footer className="bg-white/50 backdrop-blur-md border-t border-warm-gray/5 py-8 mt-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <Logo size={24} />
          <p className="font-bold text-warm-gray tracking-[0.2em] text-sm">AI媽媽研究室</p>
          <p className="text-[10px] text-warm-gray/40 tracking-widest uppercase">Empowering Gentle Parenting with AI</p>
        </div>
      </footer>
    </div>
  );
}
