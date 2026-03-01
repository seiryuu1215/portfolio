'use client';

import { useState } from 'react';
import SectionHeading from './SectionHeading';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: '稼働開始はいつから可能ですか？',
    answer: '即日〜相談可能です。案件の開始時期に合わせて柔軟に調整できます。',
  },
  {
    question: 'フルリモートでの参画は可能ですか？',
    answer:
      'はい。実務の大半をフルリモートで遂行しており、非同期コミュニケーション・PR駆動開発に慣れています。週1-2日の出社も対応可能です。',
  },
  {
    question: '契約形態はどのようになりますか？',
    answer: '業務委託契約（準委任・月額固定）を基本としています。案件内容に応じてご相談ください。',
  },
  {
    question: 'チーム開発の経験はありますか？',
    answer:
      'はい。電子新聞サイトで約2年9ヶ月間、スクラム開発・コードレビュー・新規参画者サポートを担当しました。',
  },
  {
    question: 'バックエンドやインフラの対応は可能ですか？',
    answer:
      'はい。Firebase / Supabase / AWS の構築経験があり、Stripe決済やスクレイピングも一人で完結できます。',
  },
  {
    question: '得意な技術領域は何ですか？',
    answer:
      'React / Next.js / TypeScript のフロントエンドが軸です。バックエンド・CI/CD・テスト自動化まで一気通貫で対応できます。',
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors">
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-medium text-sm">{faq.question}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-accent shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading id="faq" label="FAQ" title="よくある質問" />

        <div className="space-y-3">
          {FAQS.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
