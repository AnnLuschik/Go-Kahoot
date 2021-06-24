import React, { useState, useCallback } from "react";
import { Container, ShadowContainer, Box } from "./styles";

import { draftToMarkdownConversion } from './utils';

import htmlToDraft from 'html-to-draftjs';

import EditorWithPlugins, { composeDecorators } from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import { EditorState, CompositeDecorator, ContentState} from 'draft-js';
import createImagePlugin from '@draft-js-plugins/image';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createFocusPlugin from '@draft-js-plugins/focus';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import HeadlinesButton from './components/HeadlinesButton';
import ImageButton from './components/ImageButton';

import * as showdown from "showdown";
import * as showdownHighlight from "showdown-highlight";

import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';

const converter = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  openLinksInNewWindow: true,
  underline: true,
  extensions: [showdownHighlight]
});

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
);

const imagePlugin = createImagePlugin({ decorator });

const imageComponent = (props) => {
  const {
    src,
  } = props.contentState.getEntity(props.entityKey).getData();

  return (
    <img src={src} alt="" />
  );
}

const imageStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    },
    callback
  );
}

const compositeDecorator = new CompositeDecorator([
  {
    strategy: imageStrategy,
    component: imageComponent,
  }
]);

const MarkDown = ({
  text,
  handleChange,
  height,
  commandNumber,
  readOnly = false
}) => {
  const textHTML = converter.makeHtml(text);
  const blocksFromHTML = htmlToDraft(textHTML);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state, compositeDecorator)
  );

  const [{ Toolbar, toolbarPlugin }] = useState(() => {
    const toolbarPlugin = createToolbarPlugin({
      theme: { buttonStyles, toolbarStyles },
    });
    const { Toolbar } = toolbarPlugin;
    return { Toolbar, toolbarPlugin };
  });

  const onEditorStateChange = useCallback((editorState) => {
    setEditorState(editorState);
    handleChange(draftToMarkdownConversion(editorState));
  }, [handleChange]);


  return (
    <Container>
        <Box>
          <EditorWithPlugins
            editorState={editorState}
            onChange={onEditorStateChange}
            plugins={[toolbarPlugin, imagePlugin, resizeablePlugin, focusPlugin]}
          />
          <Toolbar>
            {(externalProps) => (
              commandNumber 
              ? (<div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} /> 
                <UnderlineButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </div>)
              : (<div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <HeadlinesButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <ImageButton editorState={editorState} onChange={onEditorStateChange} modifier={imagePlugin.addImage} />
              </div>)
            )}
          </Toolbar>
        </Box> 
      <ShadowContainer readonly={readOnly} />
    </Container>
  );
};

export default MarkDown;
