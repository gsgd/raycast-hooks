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

## useFavorites

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