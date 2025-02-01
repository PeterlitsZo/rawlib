import { createSignal, Match, Switch } from "solid-js"
import Section01 from "./contents/Section01"
import Section02 from "./contents/Section02"

function App() {
  const [active, setActive] = createSignal<1 | 2>(1)

  return (
    <>
      <Switch>
        <Match when={active() === 1}>
          <Section01 setActive={setActive} />
        </Match>
        <Match when={active() === 2}>
          <Section02 setActive={setActive} />
        </Match>
      </Switch>
    </>
  )
}

export default App
