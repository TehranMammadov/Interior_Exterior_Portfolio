function replaceBaseURL(url) {
  if (url && url.includes(process.env.REACT_APP_URL_LOCAL)) return url.replace(
    process.env.REACT_APP_URL_LOCAL,
    process.env.REACT_APP_URL
  ) 
  
  else if (url) return url.replace(
    process.env.REACT_APP_URL_PROD,
    process.env.REACT_APP_URL
  )

  return
}

export default replaceBaseURL;
