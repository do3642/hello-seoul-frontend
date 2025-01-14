const getLanguageCode = (lang) => {
  const languageMap = {
    ko: 'kor',
    en: 'eng',
    ja: 'jpn',
    zh: 'chs'
  };
  return languageMap[lang] || 'kor'; // 기본값은 'kor'로 설정
};

export default getLanguageCode;