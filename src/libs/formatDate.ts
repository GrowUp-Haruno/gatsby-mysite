/**
 * Date型のデータを入れるとYY.MM.DD [曜日]の文字列を返します。
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = date.getDay();
  const weekList = ['日', '月', '火', '水', '木', '金', '土'];

  return `${year}.${month}.${day} [${weekList[week]}]`;
};
