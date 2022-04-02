# raycast-hooks

A set of hooks for use with the Raycast Api

## useFavorites

Store a list of favorites in localStorage, strip them out of a list

```tsx
import {useFavorites} from "raycast-hooks";

const [favs, lists, setLists, addFav, remFav, resetFavs] = useFavorites("favourites-keyname", [/* could be a pre populated list */], [/* could be a pre populated list */]);

useEffect(() => {
  // some async thing goes here
  setLists(
    ['list-one-item-one', 'list-one-item-two'],
    ['list-two-item-one', 'list-two-item-two'],
  );
}, []);

return (
  <List>
    <List.Section title='list-one'>
      {favs.map((item, id) => (
        <List.ListItem
          key={id + item} title={item}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ActionPanel.Item
                  icon={{source: Icon.Star, tintColor: Color.Red}}
                  title={"Remove from favorites"}
                  shortcut={{modifiers: ["cmd"], key: "-"}}
                  onAction={() => {
                    remFav(host);
                  }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />

      ))}
    </List.Section>
    <List.Section title='list-one'>
      {list[0].map((item, id) => (
        <List.ListItem
          key={id + item} title={item}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ActionPanel.Item
                  icon={{source: Icon.Star, tintColor: Color.Yellow}}
                  title={"Add to favorites"}
                  shortcut={{modifiers: ["cmd"], key: "="}}
                  onAction={() => {
                    addFav(host);
                  }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />

      ))}
    </List.Section>
    <List.Section title='list-two'>
      {list[1].map((item, id) => (
        <List.ListItem
          key={id + item} title={item}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <ActionPanel.Item
                  icon={{source: Icon.Star, tintColor: Color.Yellow}}
                  title={"Add to favorites"}
                  shortcut={{modifiers: ["cmd"], key: "="}}
                  onAction={() => {
                    addFav(host);
                  }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />

      ))}
    </List.Section>
  </List>
);

```

## usePreferences

Store a list of preferences in localStorage

```tsx
import {usePreferences, TogglePreferenceAction, PreferenceListActions} from "raycast-hooks";

const defaults = {
  showExtra: false,
  app: "AppOne",
};

const apps = ["AppOne", "AppTwo"];

const [{showExtra, app}, updatePref, resetPrefs] = usePreferences(defaults);

return <List actions={
  <ActionPanel>
    <TogglePreferenceAction
      icon={{source: showExtra ? Icon.EyeSlash : Icon.Eye}}
      title={`${showExtra ? "Hide" : "Show"} extra`}
      onAction={() => togglePref('showExtra', !showExtra)}
    />
    <PreferenceListActions
      icon={Icon.Gear}
      options={apps}
      current={app}
      togglePref={togglePref}
    />
  </ActionPanel>
}/>
```

## useClipboard

Get the clipboard contents. As the clipboard will return undefined if it's not a string, you might want to show a different message based on if it's returned and empty or not yet returned. This simple hook exposes the clipboard contents and a ready flag, and helps avoid a flash of error if your content requires a clipboard item. 

```tsx
import {useClipboard} from "raycast-hooks";

const {ready, clipboard} = useClipboard(defaults);

if (!ready || clipboard === undefined || clipboard.length === 0) {
  return <List isLoading={!ready}>
    <List.EmptyView
      icon={'your-icon.png'}
      title="Please copy the thing to your clipboard"
    />
  </List>;
}

// rest of extension goes here
```

Using this format you will show the list as loading screen rather than the `EmptyView` whilst your extension is reading from the clipboard.
