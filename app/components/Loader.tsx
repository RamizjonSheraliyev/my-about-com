 "use client";

import * as ldrs from "ldrs";
import { useEffect } from "react";

export default function LineSpinner() {
  useEffect(() => {
    ldrs.lineSpinner.register();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div dangerouslySetInnerHTML={{ __html: `<l-line-spinner size="40" stroke="3" speed="1" color="black"></l-line-spinner>` }} />
    </div>
  );
}
