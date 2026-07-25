'use client';

import Header, { Footer } from '@/components/Header';
import { useLocale } from '@/i18n/LocaleContext';
import '../about/trust-pages.css';

export default function PrivacyPolicyPage() {
  const { locale } = useLocale();

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="trust-page">
        <div className="trust-page__container">
          {locale === 'en' ? (
            <>
              <h1>Privacy Policy</h1>
              <p>Last updated: July 2026</p>
              <p>Welcome to AI Nav (958000.xyz). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
              
              <h2>1. Important Information and Who We Are</h2>
              <p>AI Nav provides a directory of artificial intelligence tools. We do not require you to create an account to browse our directory.</p>
              
              <h2>2. The Data We Collect About You</h2>
              <p>We may collect, use, store and transfer different kinds of data about you which we have grouped together as follows:</p>
              <ul>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
              <p>We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data).</p>

              <h2>3. How We Collect Your Data</h2>
              <p>We use different methods to collect data from and about you including through automated technologies or interactions. As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.</p>

              <h2>4. Third-Party Links</h2>
              <p>This website includes links to third-party websites, plug-ins and applications (the AI tools listed in our directory). Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.</p>

              <h2>5. Advertising and Cookies</h2>
              <p>We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
              <ul>
                <li>Google, as a third-party vendor, uses cookies to serve ads on our site.</li>
                <li>Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet.</li>
                <li>Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.</li>
              </ul>

              <h2>6. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="/contact">Contact Page</a>.</p>
            </>
          ) : (
            <>
              <h1>隐私政策</h1>
              <p>最近更新：2026年7月</p>
              <p>欢迎来到 AI 导航 (958000.xyz)。我们尊重您的隐私，并致力于保护您的个人数据。本隐私政策旨在告知您当您访问我们网站时，我们将如何保护您的个人数据。</p>
              
              <h2>1. 重要信息和关于我们</h2>
              <p>AI 导航提供人工智能工具库服务。您无需创建账户即可浏览我们的目录。</p>
              
              <h2>2. 我们收集的关于您的数据</h2>
              <p>我们可能会收集、使用、存储和传输关于您的不同类型的数据，我们将其归类如下：</p>
              <ul>
                <li><strong>技术数据：</strong> 包括互联网协议 (IP) 地址、浏览器类型和版本、时区设置和位置、浏览器插件类型和版本、操作系统和平台。</li>
                <li><strong>使用数据：</strong> 包括有关您如何使用我们网站、产品和服务的信息。</li>
              </ul>
              <p>我们不收集有关您的任何特殊类别个人数据（包括您的种族或民族、宗教或哲学信仰、性生活、性取向、政治观点、工会成员身份、有关您健康的信息，以及基因和生物识别数据）。</p>

              <h2>3. 我们如何收集您的数据</h2>
              <p>我们使用不同的方法收集来自您和关于您的数据，包括通过自动化技术或交互。当您与我们的网站互动时，我们会自动收集有关您的设备、浏览动作和模式的技术数据。我们通过使用 Cookie、服务器日志和其他类似技术来收集这些个人数据。</p>

              <h2>4. 第三方链接</h2>
              <p>本网站包含指向第三方网站、插件和应用程序（我们目录中列出的 AI 工具）的链接。点击这些链接或启用这些连接可能会允许第三方收集或共享关于您的数据。我们不控制这些第三方网站，也不对其隐私声明负责。当您离开我们的网站时，我们鼓励您阅读您访问的每个网站的隐私政策。</p>

              <h2>5. 广告与 Cookie</h2>
              <p>当您访问我们的网站时，我们会使用第三方广告公司（如 Google AdSense）来投放广告。这些公司可能会使用有关您访问本网站和其他网站的信息（不包括您的姓名、地址、电子邮件地址或电话号码），以便向您提供您感兴趣的商品和服务的广告。</p>
              <ul>
                <li>作为第三方供应商，Google 使用 Cookie 在我们的网站上投放广告。</li>
                <li>Google 使用 DART Cookie，使其能够根据我们的用户以前对我们网站和互联网上其他网站的访问情况向他们投放广告。</li>
                <li>用户可以通过访问 Google 广告和内容网络隐私政策来选择停用 DART Cookie。</li>
              </ul>

              <h2>6. 联系我们</h2>
              <p>如果您对本隐私政策或我们的隐私惯例有任何疑问，请联系我们：<a href="/contact">联系页面</a>。</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
