import 'share-api-polyfill'

export const share = async (
  title: string,
  text: string,
  url: string,
) => {
  return await navigator.share({
    title,
    text,
    url,
  })
}