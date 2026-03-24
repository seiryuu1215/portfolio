# 意思決定記録: ポートフォリオ見栄え改善（Visual Polish）

日付: 2026-03-25
担当: pm-agent

## 背景・課題

ダークモード基調（#0a0a0a + #3b82f6青アクセント）のポートフォリオサイト。
デザインの一貫性・レスポンシブ対応・FadeInアニメーションは既に整っているが、
以下5点の改善余地が分析で判明した。

1. **視覚的な深さの不足** -- box-shadowの活用がなく、カードが平面的
2. **Heroセクションのインパクト不足** -- 統計カード3つ+CTAのシンプル構成
3. **色のバリエーション不足** -- 青一色のアクセント、グラデーション未使用
4. **微細なインタラクション不足** -- ホバーがtransition-colorsのみ
5. **セクション間の視覚的分離が弱い** -- py-16のパディングのみ

## 方針

- 大幅なリデザインではなく、既存のデザインシステムを活かした段階的改善
- パフォーマンスに影響しない軽量な変更（JS追加なし、CSS変更中心）
- 高インパクト・低実装コストの順に優先

## 検討した選択肢

### A案: CSSのみの改善（採用）

- globals.cssへのユーティリティ追加 + 各コンポーネントのクラス変更
- 追加JS: なし、追加依存: なし
- リスク: 極めて低い

### B案: Framer Motion導入

- よりリッチなアニメーション（stagger, spring等）
- 追加バンドル: ~30KB
- 却下理由: パフォーマンス影響あり、既存FadeInで十分

### C案: shadcn/ui導入

- コンポーネントライブラリで全体的にリッチ化
- 却下理由: 大幅リデザインになり工数過大、既存コンポーネントとの整合性が課題

## 決定内容: 6タスクに分解して段階実装

---

### タスク1: globals.css -- カスタムプロパティ・ユーティリティ追加（優先度: 最高）

**変更ファイル**: `app/globals.css`

**追加内容**:

1. カードに使うbox-shadow変数の定義（`--shadow-card`, `--shadow-card-hover`）
2. グラデーション用の補助アクセントカラー（`--color-accent-glow: #3b82f620`）
3. セクション区切り用のsubtle divider（before擬似要素用クラス）

**具体的な変更**:

```
@theme inline に追加:
  --color-accent-glow: rgba(59, 130, 246, 0.12);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-card-hover: 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1);
```

新規CSSクラス:

- `.section-divider` -- セクション間にグラデーションの水平線を挿入（before擬似要素）
- `.card-elevated` -- box-shadow + hover時のglow効果をまとめたユーティリティ

---

### タスク2: Heroセクション強化（優先度: 最高）

**変更ファイル**: `components/HeroSection.tsx`

**変更内容**:

1. キャッチコピー「信頼がある。」にグラデーションテキスト効果を追加
   - `text-accent` を `bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent` に変更
2. 統計カードにbox-shadowとホバーエフェクト追加
   - `hover:scale-[1.02] hover:border-accent/30 transition-all` を追加
   - box-shadowを適用
3. CTAボタン「実績を見る」にsubtle glow効果追加
   - `shadow-[0_0_20px_rgba(59,130,246,0.3)]` を追加
4. Heroの背景にradial gradient装飾を追加（パフォーマンス影響なし）
   - 半透明のradial-gradientをbefore擬似要素で配置（青いグロー、画面上部中央）

**判断理由**: Heroは最初に目に入るセクション。最小変更で最大のインパクトが得られる。

---

### タスク3: カード要素のelevation統一（優先度: 高）

**変更ファイル**:

- `components/AboutSection.tsx`
- `components/CareerSection.tsx`
- `components/DevStyleSection.tsx`
- `components/SkillsSection.tsx`
- `components/ServicesSection.tsx`
- `components/WorksSection.tsx`

**変更内容**:
全てのカード要素（`bg-card border border-border` パターン）に対して:

1. `shadow-[var(--shadow-card)]` を追加
2. ホバー対応カードには `hover:shadow-[var(--shadow-card-hover)]` を追加
3. ホバー時に `hover:-translate-y-0.5` を追加（微細な浮き上がり効果）
4. `transition-colors` を `transition-all` に変更（shadowとtransformもアニメーション対象にする）

**注意**: 全カードに一律適用ではなく、インタラクティブなカード（クリック可能/ホバー反応あり）のみにhover効果を付与。静的な情報表示カード（Aboutのパーソナリティ等）にはshadowのみ追加。

---

### タスク4: セクション間の視覚的区切り強化（優先度: 中）

**変更ファイル**:

- `app/globals.css`（ユーティリティ定義）
- 各セクションコンポーネント

**変更内容**:

1. 交互セクションの背景差をより明確にする
   - 現在 `bg-card/30` を使っているセクション（Career, Milestones, DevStyle）は維持
   - 背景なしセクションとの境界に、幅80%・高さ1pxのグラデーションdividerを挿入
2. SectionHeadingにアクセントラインを追加
   - ラベル（"About", "Work"等）の左に3px幅のアクセントバーを追加
   - `border-l-[3px] border-accent pl-3` をラベルのpタグに適用

**判断理由**: セクション間の区切りが弱いと長スクロールで現在位置を見失いやすい。視覚的なランドマークとして機能させる。

---

### タスク5: ホバーインタラクションの充実（優先度: 中）

**変更ファイル**:

- `components/Header.tsx`
- `components/ContactSection.tsx`
- `components/DevStyleSection.tsx`

**変更内容**:

1. Headerのナビリンクにアンダーラインアニメーション追加
   - `relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-accent after:transition-all` パターン
2. DevStyleのアイコンホバーで微回転
   - group-hover時にsvgに `group-hover:rotate-6` を追加
3. ContactのCTAボタンに `hover:scale-[1.02]` + shadow追加
4. SNSリンクのアイコンに `hover:scale-110` を追加

**判断理由**: マイクロインタラクションはサイトの「手触り感」を大きく向上させる。CSS transition のみで実現でき、パフォーマンスへの影響はない。

---

### タスク6: 色のバリエーション追加（優先度: 低）

**変更ファイル**: `app/globals.css`, `components/SectionHeading.tsx`

**変更内容**:

1. SectionHeadingのラベルテキストに微細なグラデーション
   - `bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent` を適用
2. タイムライン（Career, Milestones）のラインにグラデーション強化
   - 既にCareerは `bg-gradient-to-b from-accent/60 via-border to-border` を使用 -- これは維持
   - Milestonesにも同様のグラデーションを適用（現在は `bg-border` のみ）

**判断理由**: 青一色でも十分機能しているが、同系色のグラデーションで微妙な深みを加える。新しいアクセント色を追加すると一貫性が崩れるため、青系のグラデーションに限定する。

---

## 実装順序

```
タスク1（globals.css基盤）
  -> タスク2（Hero強化）
  -> タスク3（カードelevation）
  -> タスク4（セクション区切り）
  -> タスク5（ホバーインタラクション）
  -> タスク6（色バリエーション）
```

タスク1は他の全タスクの前提（CSS変数定義）。タスク2-3は独立して並行実装可能だが、
タスク1の完了が必要。タスク4-6は独立。

## 影響範囲

- **変更ファイル数**: globals.css + 約10コンポーネント
- **新規ファイル**: なし
- **新規依存**: なし
- **バンドルサイズ影響**: なし（CSS変更のみ）
- **パフォーマンス影響**: なし（transform, box-shadow はGPUアクセラレーション対象）
- **既存テスト**: 影響なし（スタイル変更のみ、DOM構造変更なし）
- **アクセシビリティ**: prefers-reduced-motion 対応が必要な場合はタスク5のscale/rotateをメディアクエリで無効化

## implement-agent への引き渡し指示

上記6タスクを順番に実装してください。各タスクの完了後にブラウザで目視確認を推奨。

注意点:

- Tailwind CSS v4 を使用しているため、arbitrary values は `shadow-[value]` 形式で記述
- `@theme inline` ブロック内にCSS変数を追加する（Tailwind v4の流儀）
- `transition-colors` を `transition-all` に変更する際、duration-300 が暗黙適用されていることを確認
- カードのhover効果追加時、モバイルでのtouchイベントでhoverが残留しないよう `@media (hover: hover)` の考慮が望ましいが、Tailwind v4では `hover:` がデフォルトでメディアクエリ対応しているため追加対応不要
- prefers-reduced-motion 対応: FadeIn.tsx に既にアニメーションがあるが、新規追加するscale/rotate効果も `motion-safe:` プレフィックスの利用を検討
