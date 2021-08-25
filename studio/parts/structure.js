import S from '@sanity/desk-tool/structure-builder'
import emoji from '../lib/emoji'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .icon(emoji('📄'))
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Posts')
        .icon(emoji('🎨'))
        .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Collections')
        .icon(emoji('🗂'))
        .child(S.documentTypeList('collection').title('Collections')),
      S.listItem()
        .title('Settings')
        .icon(emoji('🌎'))
        .child(
          S.editor()
            .title('Settings')
            .schemaType('settings')
            .documentId('settings'),
        ),
    ])
