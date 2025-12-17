import ChatBubble from "@/components/common/ChatBubble";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import memoji from "../../assets/memoji.jpg";

export default function Info() {
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="Info divide-gray-100 divide-y-10">
      <section className="px-4 py-6 sm:py-8 border-0">
        <PageTitle
          title={
            <>타로버블팁</>
          }
          subtitle={
            <>
              전문 타로 리더의 리딩 경험을 기반으로 한 <br />AI 개인 맞춤형 타로 해석 서비스
            </>}
        />
      </section>
      <section className="px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end items-end gap-3" data-aos="fade-up">
            <ChatBubble
              colorClass="text-violet-200"
              tail="right-bottom"
              className="max-w-4/5 mb-2"
              contentClassName="rounded-3xl px-4 py-3 whitespace-pre-wrap text-start text-white ff_kyobo text-lg"
            >
              <p className="relative z-5 text-neutral-700">
                “AI 리딩? <br />다 똑같은 대답만 하는거 아니야?”
              </p>
            </ChatBubble>
            <div className="img_wrap size-14 border rounded-3xl overflow-hidden">
              <img src={memoji} alt="미모지프로필" className="w-50 object-fit contain object-center" />
            </div>
          </div>
          <div className="" data-aos="fade-up">
            <ChatBubble
              colorClass="text-violet-300"
              tail="left-bottom"
              className="max-w-4/5"
              contentClassName="rounded-3xl px-4 py-3 bg_gradient whitespace-pre-wrap text-start text-white ff_kyobo text-lg"
            >
              <p className="relative z-5 text-violet-900 ">
                그렇게 느껴졌다면, <br />
                아직 ‘해석하는 AI 타로’를 만나지 못한 거예요.
              </p>
            </ChatBubble>
          </div>
        </div>
        <ul className="pt-8 flex flex-col gap-8">
          <li>
            <h2 className="inline-flex gap-1 text-lg font-semibold mb-2">
              <span className="tossface">1️⃣</span>
              <span>
                전문 타로 리더의 리딩 방식
              </span>
            </h2>
            <div className="flex flex-col gap-2 ps-6.5">
              <p>카드를 뽑자마자 의미부터 나열하지 않아요.</p>
              <p>
                먼저 당신이 어떤 질문을 던졌는지, <br />
                지금 어떤 상황에서 이 질문을 하게 되었는지를 살펴봐요.
              </p>
              <p>
                그리고 나서 카드가 놓인 포지션과 카드들 사이의 관계, <br />
                흐름이 이어지는 방향을 천천히 읽어가요.
              </p>
            </div>
          </li>
          <li>
            <h2 className="inline-flex gap-1 text-lg font-semibold mb-2">
              <span className="tossface">2️⃣</span>
              <span>
                사람이 섞는 흐름을 닮은 셔플 알고리즘
              </span>
            </h2>
            <div className="flex flex-col gap-2 ps-6.5">
              <p>
                타로에서 카드를 <b>'어떻게 섞느냐'</b>는 생각보다 중요한 과정이에요.
              </p>
              <p>
                무작위로 숫자를 뽑는 방식이 아니라, <br />
                사람이 카드를 섞을 때 생기는 순서의 변화와 리듬을 <br />
                알고리즘으로 구현했어요.
              </p>
              <p>
                카드가 섞이는 속도, 중간에 흐트러지는 순서와 역방향, <br />
                그리고 컷(cut) 후 다시 이어지는 배열까지.
              </p>
            </div>
          </li>
          <li>
            <h2 className="inline-flex gap-1 text-lg font-semibold mb-2">
              <span className="tossface">3️⃣</span>
              <span>
                같은 카드라도, 해석은 달라져요
              </span>
            </h2>
            <div className="flex flex-col gap-2 ps-6.5">
              <p>
                타로카드 하나의 의미는 항상 하나로 정해져 있지 않아요.
              </p>
              <p>
                같은 카드라도 <br />
                연애를 묻는 질문인지, 커리어를 고민하는 상황인지, <br />
                지금의 마음 상태가 어떤지에 따라 전혀 다른 메시지가 될 수 있어요.
              </p>
              <p>
                카드의 기본 의미에 질문의 맥락을 겹쳐서, <br />
                <b>지금 이 순간의 당신에게 더 필요한 해석</b>을 찾아드려요.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section className="px-4 py-6">
        <h2 className="inline-flex gap-1 text-lg font-semibold mb-2">
          <span className="tossface">👀</span>
          <span>
            더 좋은 타로 질문을 하려면
          </span>
        </h2>
      </section>
      <section className="px-4 py-6">
        <h2 className="inline-flex gap-1 text-lg font-semibold mb-2">
          <span className="tossface"></span>
          <span>
            더 좋은 타로 질문을 하려면
          </span>
        </h2>
      </section>
      <section className="px-4 py-6 text-center">
        <p className="mb-3 text-neutral-700">타로점에 대해 더 알아볼까요?</p>
        <Button>타로점 알아보기</Button>
      </section>
    </div>
  );
}
