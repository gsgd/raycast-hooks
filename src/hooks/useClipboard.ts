import {useEffect, useState} from "react";
import {Clipboard} from "@raycast/api";

interface clipboardState {
  ready: boolean;
  clipboard?: string;
}

export function useClipboard(): clipboardState {
  const [clipboardState, setClipboard] = useState<clipboardState>({ready: false});
  useEffect(() => {
    setClipboard({ready: false})
    Clipboard.readText().then((clipboard) => setClipboard({ready: true, clipboard}));
  }, []);
  return clipboardState;
}
