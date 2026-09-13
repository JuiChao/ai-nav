import { redirect } from 'next/navigation';

export default function RootPage() {
  // 将根路径重定向到默认语言 (zh)，带斜杠避免二次重定向
  redirect('/zh/');
}
