import { BrandLogo, PasswordEntry } from './components/password-entry'

import './App.css'

function App() {
  return (
    <section className="flex flex-col items-center w-[400px] xl:w-[600px] py-10">
      <BrandLogo size="w-44" />
      <PasswordEntry />
    </section>
  )
}

export default App
