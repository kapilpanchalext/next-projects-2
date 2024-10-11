"use client";
import useRangeSelection from "@/hooks/useRangeSelection";
import { useEffect, useRef } from "react";

export default function RichTextFramework() {
  const contentRef = useRef<HTMLDivElement>(null);
  const rangeSelection = useRangeSelection(contentRef);
  console.log(rangeSelection);

  return (
    <div>
      <div
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning={true}
        style={{
          border: "1px solid black",
          padding: "10px",
          minHeight: "100px",
        }}
      >
        This is an editable content area. Select some text here to see range info.
      </div>
      <p>Non-editable text outside the contentEditable div.</p>
      {rangeSelection.current && rangeSelection.current.range && (
        <div>
          <p>
            Selected text start: {rangeSelection.current.range.startOffset}, end:{" "}
            {rangeSelection.current.range.endOffset}
          </p>
        </div>
      )}
    </div>
  );
}
