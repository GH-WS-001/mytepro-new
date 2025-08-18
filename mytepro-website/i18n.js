import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // 确保 locale 有值，默认使用 'en'
  const validLocale = locale || 'en';
  
  try {
    const messages = (await import(`./src/messages/${validLocale}.json`)).default;
    return {
      locale: validLocale,
      messages
    };
  } catch (error) {
    // 如果找不到对应的语言文件，使用英文作为后备
    const messages = (await import(`./src/messages/en.json`)).default;
    return {
      locale: 'en',
      messages
    };
  }
});