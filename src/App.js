import logo from "./logo.svg"
import "./App.css"
import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [timeLine, settimeLine] = useState([
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21"
  ])

  const [schedules, setschedules] = useState([
    { fromHour: 10, toHour: 12, title: "Work" },
    { fromHour: 11, toHour: 13, title: "Meeting" },
    { fromHour: 14, toHour: 15, title: "Break" },
    { fromHour: 16, toHour: 18, title: "Dinner" },
    { fromHour: 17, toHour: 20, title: "Dinner" }
  ])

  // { fromHour: 10, toHour: 12, title: "Work" },
  // { fromHour: 11, toHour: 13, title: "Meeting" },
  // { fromHour: 14, toHour: 15, title: "Break" }

  return (
    <div className='App'>
      {timeLine.map((val) => {
        return (
          <>
            <div
              style={{
                height: "40px",
                width: "90%",
                border: "1px solid black",
                position: "relative"
              }}
            >
              {schedules.map((stime, index) => {
                let temp
                let lft = "60px"

                if (index > 0) {
                  temp = JSON.parse(localStorage.getItem("from"))
                  console.log(temp - stime.fromHour)

                  if (parseInt(temp) - parseInt(stime.fromHour) >= 0) {
                    lft = "120px"
                  } else {
                    lft = "60px"
                  }
                }

                if (val == stime.fromHour) {
                  let ht = parseInt(stime.toHour - stime.fromHour) + 1
                  ht = 40 * ht
                  ht = `${ht}px`
                  var clr = Math.floor(Math.random() * 16777215).toString(16)
                  clr = `#${clr}`
                  localStorage.setItem("from", stime.toHour)
                  return (
                    <div
                      style={{
                        background: `#00FFFF`,
                        height: ht,
                        width: "80%",
                        position: "absolute",
                        top: "0px",
                        left: lft,
                        cursor: "pointer",
                        border: "2px solid #00cfff"
                      }}
                      onClick={() => {
                        const filteredScheduled = schedules.filter(
                          (currentval) => {
                            return currentval !== stime
                          }
                        )
                        setschedules(filteredScheduled)
                        console.log(filteredScheduled)
                      }}
                    >
                      {stime.title} ( {stime.fromHour}{" "}
                      {stime.fromHour >= 12 ? "pm" : "am"} - {stime.toHour}{" "}
                      {stime.toHour >= 12 ? "pm" : "am"} )
                      {parseInt(temp) - parseInt(stime.fromHour) >= 0 ? (
                        <div
                          style={{
                            background: `red`,
                            height: "80px",
                            width: "100%",
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            cursor: "pointer",
                            border: "2px solid red"
                          }}
                        >
                          {" "}
                          {stime.title} ( {stime.fromHour}{" "}
                          {stime.fromHour >= 12 ? "pm" : "am"} - {stime.toHour}{" "}
                          {stime.toHour >= 12 ? "pm" : "am"} )
                        </div>
                      ) : null}
                    </div>
                  )
                }
              })}
              <p style={{ textAlign: "left" }}>
                {val} {val >= 12 ? "PM" : "AM"}
              </p>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default App
