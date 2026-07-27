'use client';

import Link from '@/components/LocalizedLink';
import Header, { Footer } from '@/components/Header';
import { useLocale } from '@/i18n/LocaleContext';
import '../about/trust-pages.css';

export default function TermsContent() {
  const { locale } = useLocale();

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="trust-page">
        <div className="trust-page__container">
          {locale === 'en' ? (
            <>
              <h1>Terms of Service</h1>
              <p>Last updated: July 2026</p>
              
              <h2>1. Agreement to Terms</h2>
              <p>By accessing or using AI Nav (958000.xyz) (the &quot;Site&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Site.</p>
              
              <h2>2. Description of Service</h2>
              <p>AI Nav provides a curated directory and informational portal for artificial intelligence tools and services. We do not host, develop, or own the AI tools listed on our website unless explicitly stated otherwise.</p>
              
              <h2>3. Intellectual Property</h2>
              <p>The Site and its original content, features, and functionality are owned by AI Nav and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. The logos, trademarks, and branding of the individual AI tools listed in our directory belong to their respective owners.</p>
              
              <h2>4. Links to Other Web Sites</h2>
              <p>Our Service contains links to third-party web sites or services that are not owned or controlled by AI Nav. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>
              
              <h2>5. Disclaimer of Warranties</h2>
              <p>The information on this website is provided &quot;as is&quot; without any representations or warranties, express or implied. AI Nav makes no representations or warranties in relation to the completeness, accuracy, reliability, or suitability of the information and materials found on this website.</p>

              <h2>6. Limitation of Liability</h2>
              <p>In no event shall AI Nav, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>

              <h2>7. Changes</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

              <h2>8. Contact Us</h2>
              <p>If you have any questions about these Terms, please <Link href="/contact">contact us</Link>.</p>
            </>
          ) : (
            <>
              <h1>服务条款</h1>
              <p>最近更新：2026年7月</p>
              
              <h2>1. 同意条款</h2>
              <p>通过访问或使用 AI 导航 (958000.xyz)（以下简称"本网站"），您同意受这些服务条款的约束。如果您不同意条款的任何部分，则不得访问本网站。</p>
              
              <h2>2. 服务说明</h2>
              <p>AI 导航提供精选的人工智能工具和服务的目录与信息门户。除非明确说明，否则我们不托管、开发或拥有我们网站上列出的 AI 工具。</p>
              
              <h2>3. 知识产权</h2>
              <p>本网站及其原始内容、功能和特性归 AI 导航所有，并受国际版权、商标、专利、商业机密以及其他知识产权或所有权法律保护。我们目录中列出的各个 AI 工具的徽标、商标和品牌属于其各自的所有者。</p>
              
              <h2>4. 其他网站的链接</h2>
              <p>我们的服务包含指向非 AI 导航所有或控制的第三方网站或服务的链接。我们无法控制任何第三方网站或服务的内容、隐私政策或做法，也不承担任何责任。</p>
              
              <h2>5. 免责声明</h2>
              <p>本网站上的信息"按原样"提供，不提供任何明示或暗示的陈述或保证。AI 导航对本网站上发现的信息和材料的完整性、准确性、可靠性或适用性不做任何陈述或保证。</p>

              <h2>6. 责任限制</h2>
              <p>在任何情况下，AI 导航及其董事、员工、合作伙伴、代理商、供应商或附属公司，均不对任何间接、附带、特殊、后果性或惩罚性损害负责。</p>

              <h2>7. 更改</h2>
              <p>我们保留自行决定随时修改或替换这些条款的权利。在这些修订生效后，如果您继续访问或使用我们的服务，即表示您同意受修订后条款的约束。</p>

              <h2>8. 联系我们</h2>
              <p>如果您对这些条款有任何疑问，请<Link href="/contact">联系我们</Link>。</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
