import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState({ values: [] })

  const getData = async () => {
    axios
      .get("https://api.github.com/users?since=1&per_page=100")
      .then((response) => {
        response.data?.map((currentVal) => {
          setData((prev) => ({
            values: [...prev.values, currentVal.login]
          }))
        })
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const [SearchValue, setSearchValue] = useState()

  const showSuggestion = async (e) => {
    setSearchValue()
    if (!e.target.value) {
      await getData()
    }
    const filteredSuggestions = data.values?.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(e.target.value) > -1
    )
    console.log("filtered sugg", filteredSuggestions, e.target.value)
    setData({ values: filteredSuggestions })
    console.log(filteredSuggestions)
  }

  const Suggestions = () => {
    return (
      <ul className='suggestions'>
        {data.values?.map((suggestion, index) => {
          return (
            <li
              // className={index === suggestionIndex ? "active" : ""}
              onClick={() => {
                setSearchValue(suggestion)
                setData({ values: [] })
              }}
              style={{ cursor: "pointer" }}
              key={index}
              // onClick={handleClick}
            >
              {suggestion}
            </li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    console.log(SearchValue)
  }, [SearchValue])
  return (
    <div className='App'>
      <input type='text' value={SearchValue} onChange={showSuggestion} />
      <Suggestions />
    </div>
  )
}

export default App
