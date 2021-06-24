import React, { useCallback, useEffect } from "react";
import {
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton
} from "@draft-js-plugins/buttons";
  
const HeadlinesPicker = ({ onOverrideContent, ...restProps }) => {
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    const onWindowClick = useCallback(() => {
        onOverrideContent(undefined)
    }, [onOverrideContent]);
  
    useEffect(() => {
      setTimeout(() => window.addEventListener("click", onWindowClick));
  
      return () => window.removeEventListener("click", onWindowClick);
    }, [onWindowClick]);
  
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((
          Button,
          i // eslint-disable-next-line
        ) => (
          <Button key={i} {...restProps} />
        ))}
      </div>
    );
};  
  
  
export default HeadlinesPicker;