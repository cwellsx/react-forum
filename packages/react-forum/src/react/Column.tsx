import React from 'react';
import "./Column.css"
import { config } from "../config"

/*
  This passes content as ReactElement instances

  It could pass content as FunctionComponent instances instead, see
  https://stackoverflow.com/a/55963664/49942
*/

export interface Content {
  element: React.ReactElement;
  key: string;
}

export type Contents = ReadonlyArray<Content> | React.ReactElement;

interface Column {
  title: string;
  contents: Contents;
}

function setTitle(title: string): void {
  document.title = `${title} - ${config.appname}`;
}

export const renderContentOne = (column: Column): React.ReactElement => {
  setTitle(column.title);
  const content = (Array.isArray(column.contents))
    ?
    column.contents.map((x) =>
      <div className="element" key={x.key}>
        {x.element}
      </div>
    )
    :
    <div className="element">
      {column.contents}
    </div>;
  return (
    <div className="column">
      <div className="header">
        <h1>{column.title}</h1>
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  )
}
