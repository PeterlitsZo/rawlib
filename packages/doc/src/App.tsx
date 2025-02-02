import { createSignal, Match, Switch } from "solid-js"
import { PageNo } from "./components/Page"

import Section01 from "./contents/Section01"
import Section02 from "./contents/Section02"
import Section03 from "./contents/Section03"

function App() {
  const [active, setActive] = createSignal<PageNo>(1)

  return (
    <>
      <Switch>
        <Match when={active() === 1}>
          <Section01 setActive={setActive} />
        </Match>
        <Match when={active() === 2}>
          <Section02 setActive={setActive} />
        </Match>
        <Match when={active() === 3}>
          <Section03 setActive={setActive} />
        </Match>
      </Switch>
    </>
  )
}

export default App
