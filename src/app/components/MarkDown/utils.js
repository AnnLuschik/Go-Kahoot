import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { convertToRaw } from 'draft-js';

export const draftToMarkdownConversion = (editorState) => {
  const rawObject = convertToRaw(editorState.getCurrentContent());
  return draftToMarkdown(rawObject, {
    entityItems: {
      IMAGE: {
        open: function() {
          return '';
        },
        close: function (entity) {
          if (!entity) return '';
          return `![](${entity.data.src})`;
        },
      },
    },
    styleItems: {
      UNDERLINE: {
        open: function () {
          return '++';
        },
        close: function () {
          return '++';
        },
      },
    }
  });    
};

export const markdownToDraftConversion = (markdown) => {
  return markdownToDraft(markdown, {
    blockEntities: {
      image: function (item) {
        return {
          type: 'atomic',
          mutability: 'IMMUTABLE',
          data: {
            src: item.src,
          },
        };
      },
    },
    blockStyles: {
      'del_open': 'STRIKETHROUGH',
      'ins_open': 'UNDERLINE',
    },
    remarkableOptions: {
      enable: {
        inline: "ins",
      },
    },
  });
};
