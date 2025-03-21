import React from 'react'

const PasswordEntry = () => {
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Button clicked', e);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account password</h2>

      <div className="mt-10 w-full">
        <form className="space-y-6" onSubmit={handleOnSubmit}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-bold text-gray-900"
            >
              Enter password
            </label>

            <div className="mt-2">
              <input
                type="password"
                placeholder="i.e. F$Lp.*iCpbA2wqN"
                name="password"
                id="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-[#246be8] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#246be8] sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password-confirmation"
              className="block text-sm/6 font-bold text-gray-900"
            >
              Confirm password
            </label>

            <div className="mt-2">
              <input
                type="password-confirmation"
                placeholder="i.e. F$Lp.*iCpbA2wqN"
                name="password-confirmation"
                id="password-confirmation"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-[#246be8] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#246be8] sm:text-sm/6"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#246be8] text-white px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-[#00539b] focus-visible:outline-2 focus-visible:outline-offset-2 mb-10"
          >
            Create password
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordEntry