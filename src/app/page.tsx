import { redirect } from 'next/navigation';

export default function RootPage() {
  // 静态导出下，redirect('/') 通常会生成一个带有 <meta http-equiv="refresh"> 的 HTML
  // 将根路径重定向到默认语言 (zh)
  redirect('/zh');
}
