import {ActionPanel, ImageLike} from "@raycast/api";

interface TogglePreferenceActionProps {
  name: string;
  pref: string;
  options: string[];
  current: string;
  updatePref: (pref: string, currentValue: string | boolean) => Promise<void>;
  icon: ImageLike;
}

export default function PreferenceListActions({
  name,
  pref,
  options,
  current,
  updatePref,
  icon,
}: TogglePreferenceActionProps) {
  return (
    <>
      {options
        .filter((option) => option !== current)
        .map((option) => (
          <ActionPanel.Item
            key={option}
            icon={icon}
            title={`set ${name} to ${option}`}
            onAction={() => updatePref(pref, option)}
          />
        ))}
    </>
  );
}
