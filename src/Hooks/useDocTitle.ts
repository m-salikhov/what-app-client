import { useEffect } from "react";

export function useDocTile(title = "База вопросов") {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
