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
    answer:
      '3月〜稼働可能です。即日対応も相談に応じます。案件の開始時期に合わせて柔軟に調整できます。',
  },
  {
    question: 'フルリモートでの参画は可能ですか？',
    answer:
      'はい、フルリモートを基本としています。実務経歴の大半をフルリモートで遂行しており、Slack/Teams での非同期コミュニケーション、PR駆動開発、日次進捗共有に慣れています。必要に応じて週1-2日の出社も対応可能です。',
  },
  {
    question: '契約形態はどのようになりますか？',
    answer:
      '業務委託契約（準委任）を基本としています。月額固定での契約が主ですが、案件内容に応じてご相談ください。',
  },
  {
    question: 'チーム開発の経験はありますか？',
    answer:
      'はい。電子新聞サイトでは約2年9ヶ月間チーム開発に参画し、スクラム（アジャイル）での週次スプリント開発、コードレビュー、新規参画者のサポートを担当しました。',
  },
  {
    question: 'バックエンドやインフラの対応は可能ですか？',
    answer:
      'はい。Firebase / Supabase / AWS（Lambda, DynamoDB）の構築経験があり、Stripe決済基盤やPuppeteerスクレイピングなどサーバーサイドの実装も一人で完結できます。フロントエンド軸のフルスタックとして対応可能です。',
  },
  {
    question: '得意な技術領域は何ですか？',
    answer:
      'React / Next.js / TypeScript を中心としたフロントエンド開発が最も得意です。加えて、Firebase / AWS によるバックエンド構築、CI/CD パイプライン設計、テスト自動化まで一気通貫で対応できます。',
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
