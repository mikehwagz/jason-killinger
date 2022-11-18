module.exports = function href({ reference, isHomepage }) {
  return reference
    ? {
        page: isHomepage ? '/' : `/${reference?.slug}/`,
      }[reference?._type]
    : ``
}
