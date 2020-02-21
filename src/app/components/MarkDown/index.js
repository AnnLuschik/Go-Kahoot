import React, { useState } from "react";
import ReactMde, { commands } from "react-mde";
import * as showdown from "showdown";
import * as showdownHighlight from "showdown-highlight";

import { ShadowContainer, Container } from "./styles";
import "react-mde/lib/styles/css/react-mde-all.css";
import "highlight.js/styles/github.css";

const converter = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  openLinksInNewWindow: true,
  extensions: [showdownHighlight]
});

const listCommands = [
  [
    {
      commands: [
        commands.boldCommand,
        commands.italicCommand,
        commands.strikeThroughCommand,
        commands.headerCommand,
        commands.linkCommand,
        commands.quoteCommand,
        commands.codeCommand,
        commands.imageCommand,
        commands.checkedListCommand
      ]
    }
  ],
  [
    {
      commands: [
        commands.boldCommand,
        commands.italicCommand,
        commands.strikeThroughCommand,
        commands.codeCommand
      ]
    }
  ]
];

const MarkDown = ({
  text,
  handleChange,
  height,
  commandNumber,
  readOnly = false
}) => {
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <Container>
      <ReactMde
        minEditorHeight={height}
        minPreviewHeight={height}
        maxEditorHeight={1000}
        value={text}
        onChange={handleChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        commands={listCommands[commandNumber]}
        readOnly={readOnly}
      />
      <ShadowContainer readonly={readOnly} />
    </Container>
  );
};

export default MarkDown;
