module.exports = function href({ reference, isHomepage }) {
  return {
    page: isHomepage ? '/' : `/${reference?.slug}/`,
  }[reference._type]
}
