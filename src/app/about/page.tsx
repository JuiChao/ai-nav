'use client';

import Header, { Footer } from '@/components/Header';
import { useLocale } from '@/i18n/LocaleContext';
import './trust-pages.css';

export default function AboutPage() {
  const { locale } = useLocale();

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="trust-page">
        <div className="trust-page__container">
          {locale === 'en' ? (
            <>
              <h1>About AI Nav</h1>
              <p>Welcome to <strong>AI Nav (958000.xyz)</strong>, your premier destination for discovering, comparing, and mastering the best Artificial Intelligence tools available today.</p>
              
              <h2>Our Mission</h2>
              <p>The AI landscape is evolving at an unprecedented pace. With hundreds of new generative AI models, productivity tools, and creative suites launching every month, it can be overwhelming to find the right tool for your specific needs. Our mission is to cut through the noise and provide a curated, high-quality directory of the most useful AI tools for creators, developers, marketers, and businesses.</p>
              
              <h2>What We Do</h2>
              <p>We rigorously test and review AI tools across various categories including:</p>
              <ul>
                <li><strong>AI Chatbots & Assistants:</strong> Tools that help you write, code, and brainstorm.</li>
                <li><strong>Image & Video Generation:</strong> Creative platforms that turn text into stunning visuals and dynamic videos.</li>
                <li><strong>Audio & Speech:</strong> Voice cloning, music generation, and transcription tools.</li>
                <li><strong>Productivity & Workflow:</strong> AI-powered tools that automate repetitive tasks and save you hours of work.</li>
              </ul>
              
              <h2>Why Trust Us?</h2>
              <p>Unlike automated link directories, every tool featured on AI Nav is manually vetted for quality, usability, and actual value. We track global trends, user feedback, and technological advancements to ensure our directory reflects the true state of the art in AI.</p>
              
              <p>Thank you for using AI Nav as your trusted AI companion. If you have any suggestions or would like to submit a tool, please feel free to <a href="/contact">contact us</a>.</p>
            </>
          ) : (
            <>
              <h1>关于 AI 导航</h1>
              <p>欢迎来到 <strong>AI 导航 (958000.xyz)</strong>，这里是您发现、比较和掌握当今最佳人工智能工具的首选平台。</p>
              
              <h2>我们的使命</h2>
              <p>人工智能领域正以史无前例的速度发展。每个月都有数百个新的生成式 AI 模型、生产力工具和创意套件发布，找到最适合您特定需求的工具可能会令人不知所措。我们的使命是拨开迷雾，为创作者、开发者、营销人员和企业提供一个经过精心挑选、高质量的实用 AI 工具目录。</p>
              
              <h2>我们做什么</h2>
              <p>我们严格测试并审查各个类别的 AI 工具，包括：</p>
              <ul>
                <li><strong>AI 聊天机器人与助手：</strong> 帮助您写作、编程和激发灵感的工具。</li>
                <li><strong>图像与视频生成：</strong> 将文本转化为令人惊叹的视觉效果和动态视频的创意平台。</li>
                <li><strong>音频与语音：</strong> 语音克隆、音乐生成和转录工具。</li>
                <li><strong>生产力与工作流：</strong> 自动化重复性任务并为您节省数小时工作时间的 AI 驱动工具。</li>
              </ul>
              
              <h2>为什么信任我们？</h2>
              <p>与自动化的链接目录不同，AI 导航上展示的每一个工具都经过了质量、易用性和实际价值的人工审查。我们追踪全球趋势、用户反馈和技术进步，以确保我们的目录反映了 AI 领域的真实前沿。</p>
              
              <p>感谢您使用 AI 导航作为您值得信赖的 AI 伴侣。如果您有任何建议或想提交工具，请随时<a href="/contact">联系我们</a>。</p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
