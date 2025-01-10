function replaceBaseURL(url) {
  if (url) return url.replace(
    process.env.REACT_APP_URL_PROD,
    process.env.REACT_APP_URL
  )
  return
}

export default replaceBaseURL;
