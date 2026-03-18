import { useState } from 'react';

export const useVisible = (initialVisible: boolean = false) => {
  const [visible, setVisible] = useState(initialVisible);
  const onMouseEnter = () => setVisible(true);
  const onMouseLeave = () => setVisible(false);

  const eventHandlers = {
    onMouseEnter,
    onMouseLeave,
  };

  return {
    visible,
    onMouseEnter,
    onMouseLeave,
    eventHandlers,
  };
};
