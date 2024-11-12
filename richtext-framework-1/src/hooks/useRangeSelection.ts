import { RefObject, useEffect, useRef } from "react";

type RangeSelection = {
  selection: Selection | null;
  range: Range | null;
};

const useRangeSelection = (contentRef: RefObject<HTMLDivElement | null>): RefObject<RangeSelection | null> => {
  const rangeSelectionRef = useRef<RangeSelection>({ selection: null, range: null });

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) {
        rangeSelectionRef.current = { selection: null, range: null };
        return;
      }
      const range = selection.getRangeAt(0);
      if (contentRef.current && contentRef.current.contains(range.commonAncestorContainer)) {
        rangeSelectionRef.current = { selection, range };
      } else {
        rangeSelectionRef.current = { selection: null, range: null };
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [contentRef]);

  return rangeSelectionRef;
};

export default useRangeSelection;