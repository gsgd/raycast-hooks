import { ActionPanel, ImageLike } from "@raycast/api";

interface TogglePreferenceActionProps {
  name: string;
  pref: string;
  val: boolean;
  updatePref: (pref: string, currentValue: string | boolean) => Promise<void>;
  iconOn: ImageLike;
  iconOff: ImageLike;
}

export default function TogglePreferenceAction({
  name,
  pref,
  val,
  updatePref,
  iconOn,
  iconOff,
}: TogglePreferenceActionProps) {
  return (
    <ActionPanel.Item
      icon={val ? iconOff : iconOn}
      title={`${val ? "Disable" : "Enable"} ${name}`}
      onAction={() => updatePref(pref, !val)}
    />
  );
}
