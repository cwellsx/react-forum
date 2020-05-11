import React from "react";
import { Data } from "client";

// called from getActivityContent (nested in User)
export function getTagCount(tagCount: Data.TagCount) {
  const { key, count } = tagCount;
  const suffix = count && count !== 1 ? ` x ${count}` : undefined;
  return (
    <div className="topic" key={key}>
      <span className="tag">{key}</span>
      {suffix}
    </div>
  );
}