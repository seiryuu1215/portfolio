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
    question: 'リモート・出社の希望はありますか？',
    answer:
      'フルリモートを基本としていますが、週2日までの出社にも対応可能です。出社の場合は関東圏（最寄駅から1時間以内）で探しています。実務の大半をフルリモートで遂行しており、非同期コミュニケーション・PR駆動開発に慣れています。',
  },
  {
    question: '契約形態はどのようになりますか？',
    answer: '業務委託契約（準委任・月額固定）を基本としています。案件内容に応じてご相談ください。',
  },
  {
    question: 'チーム開発の経験はありますか？',
    answer:
      'はい。500万人会員規模の電子新聞サイトで約2年9ヶ月間、5〜7名のスクラムチームでフロントエンド開発・コードレビュー・新規参画者サポートを担当しました。別案件ではPM含む7名体制でウォーターフォール開発も経験しています。',
  },
  {
    question: 'バックエンドやインフラの対応は可能ですか？',
    answer:
      'はい。Firebase / Supabase / AWS（Lambda / DynamoDB / CloudWatch）の構築経験があり、Stripe決済・LINE Bot・スクレイピングも一人で完結できます。個人開発では認証・DB設計・インフラ・CI/CDまで全て一人で構築・運用しています。',
  },
  {
    question: '要件定義や基本設計など上流工程も対応可能ですか？',
    answer:
      'はい。直近の案件（大手自動車メーカー）では要件定義〜テスト・保守運用まで全工程を一人で担当し、クライアントとの仕様折衝も直接行いました。個人開発でも要件定義書・基本設計書・詳細設計書・ADR 7本・セキュリティレビュー・運用マニュアル等、20+本の設計ドキュメントをAIと協働で整備しており、上流から下流まで一気通貫で対応できます。',
  },
  {
    question: '得意な技術領域は何ですか？',
    answer:
      'React / Next.js / TypeScript のフロントエンドが軸です。MUI / Tailwind CSS によるコンポーネント駆動開発、Recharts によるデータ可視化を得意としています。バックエンド・CI/CD・テスト自動化まで一気通貫で対応できます。',
  },
  {
    question: '個人開発の経験は実務にどう活きますか？',
    answer:
      '90,000行・661テストの個人SaaS開発を通じて、認証・決済・セキュリティ・CI/CD・テスト設計・DB設計を全て自分で判断・実装してきました。「動くだけ」ではなく運用を見据えた設計ができる点、要件の背景を理解して代替案を提案できる点が実務にも直結しています。さらにSubAgentsによる開発プロセスの構造化・自動品質チェックの仕組み化など、AI活用のベストプラクティスも実務に持ち込めます。',
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
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
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
