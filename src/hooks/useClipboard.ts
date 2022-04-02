import {useEffect, useState} from "react";
import {Clipboard} from "@raycast/api";

interface clipboardState {
  ready: boolean;
  clipboard?: string;
}

export function useClipboard() {
  const [{ready, clipboard}, setClipboard] = useState<clipboardState>({ready: false});
  useEffect(() => {
    setClipboard({ready: false})
    Clipboard.readText().then((clipboard) => setClipboard({ready: true, clipboard}));
  }, [Clipboard.readText()]);
  return [ready, clipboard]
}
