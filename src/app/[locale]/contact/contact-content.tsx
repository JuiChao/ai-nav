'use client';

import Header, { Footer } from '@/components/Header';
import { useLocale } from '@/i18n/LocaleContext';
import '../about/trust-pages.css';

export default function ContactContent() {
  const { locale } = useLocale();

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="trust-page">
        <div className="trust-page__container">
          {locale === 'en' ? (
            <>
              <h1>Contact Us</h1>
              <p>We value your feedback and are always here to help.</p>
              
              <h2>General Inquiries</h2>
              <p>For any questions, suggestions, or general information, please feel free to email us at:</p>
              <p><strong>Email:</strong> <a href="mailto:admin@958000.xyz">admin@958000.xyz</a></p>
              
              <h2>Submit an AI Tool</h2>
              <p>If you represent an AI product or have found a great tool that belongs in our directory, please contact us with the tool&apos;s name, URL, and a brief description. We manually review all submissions to ensure they meet our quality standards.</p>
              
              <h2>Advertising &amp; Partnerships</h2>
              <p>For business inquiries, partnerships, or advertising opportunities, please reach out to us at the email address above with the subject line &quot;Partnership Inquiry&quot;.</p>
              
              <br />
              <p><em>Note: We aim to respond to all inquiries within 48-72 hours. Thank you for your patience and for supporting AI Nav.</em></p>
            </>
          ) : (
            <>
              <h1>联系我们</h1>
              <p>我们非常重视您的反馈，并随时为您提供帮助。</p>
              
              <h2>一般咨询</h2>
              <p>如有任何问题、建议或需要常规信息，请随时通过电子邮件与我们联系：</p>
              <p><strong>电子邮件：</strong> <a href="mailto:admin@958000.xyz">admin@958000.xyz</a></p>
              
              <h2>提交 AI 工具</h2>
              <p>如果您代表某个 AI 产品，或者发现了一个应该收录到我们目录中的优秀工具，请联系我们，并提供工具的名称、网址和简短描述。我们会人工审核所有提交，以确保它们符合我们的质量标准。</p>
              
              <h2>广告与合作</h2>
              <p>对于商业咨询、合作伙伴关系或广告投放机会，请通过上述电子邮件地址与我们联系，并在邮件主题中注明"合作咨询"。</p>
              
              <br />
              <p><em>注意：我们的目标是在 48-72 小时内回复所有咨询。感谢您的耐心等待以及对 AI 导航的支持。</em></p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
