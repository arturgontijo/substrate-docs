/* eslint-disable @typescript-eslint/no-var-requires */
const { createPageRedirects } = require('./gatsby-node/create-redirects.js')

const { createDocsPages } = require('./gatsby-node/create-pages.js')

exports.createPages = async props => {
  createPageRedirects(props)
  await Promise.all([createDocsPages(props)])
}

const {
  addSlugFieldToMarkdown,
  addPathFieldToMarkdown,
  convertFmImagesToRelative,
} = require('./gatsby-node/on-create-node.js')

exports.onCreateNode = props => {
  const { node } = props
  convertFmImagesToRelative(props)
  if (node.internal.type === `MarkdownRemark`) {
    addSlugFieldToMarkdown(props)
    addPathFieldToMarkdown(props)
  }
}

const { createMdxResolvers } = require('./gatsby-node/create-resolvers.js')

exports.createResolvers = props => {
  createMdxResolvers(props)
}
