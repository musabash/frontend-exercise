import { default as React, useEffect, useState } from "react"

export type CardProps = {
  pair: string
}

function Card(props: CardProps) {
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [tick, setTick] = useState<number>(0)
  const [priceDifference, setPriceDifference] = useState<number>(0)
  const [timestamp, setTimestamp] = useState<number>(0)
  const [integerSlice, setIntegerSlice] = useState<number>(0)
  const [decimalSlice, setDecimalSlice] = useState<number>(0)

  useEffect(() => {
    const pair = props.pair.split("/").join("")
    getCurrentRate(pair)
    setTimeout(() => {
      setTick(tick + 1)
    }, 20000)
  }, [tick])

  const getDifference = (newValue: number) => {
    const newDecimalString = getDecimalPart(newValue)
    const oldDecimalString = getDecimalPart(currentPrice)
    const difference = (newValue - currentPrice).toFixed(2)
    setPriceDifference(parseFloat(difference))
    if (integerSlice < 4) {
        console.log("diff: ", Math.abs(parseFloat(difference)))
        if (newDecimalString[0] !== oldDecimalString[0]){
            console.log(newDecimalString)
            setDecimalSlice(0)
        } else if (newDecimalString[1] !== oldDecimalString[1]) {
            console.log(newDecimalString)
            setDecimalSlice(1)
        } else {
            console.log(newDecimalString)
            setDecimalSlice(2)
        }
    }
  }

  const getDecimalPart = (price: number) => {
    const decimalPart = (price - Math.floor(price)).toFixed(2)
    return decimalPart.slice(2)
  };

  const differencePaint =
    priceDifference > 0 ? "green" : priceDifference < 0 ? "red" : "gray"

  const getCurrentRate = async (pair: string) => {
    try {
      let response = await fetch(
        `https://ebitlabs-frontend-exercise.deno.dev/api/v1/fx/${pair}/ohlc`,
      )
      let data = await response.json()
      let newValue = await data.close
      formatValues(newValue)
      getDifference(newValue)
      setCurrentPrice(newValue)
      setTimestamp(
        data.endTime.seconds * 1000 + data.endTime.microseconds / 1000,
      );
    } catch (error) {
      console.error(error)
    }
  };

  const showRate = !!currentPrice;

  const formatValues = (newValue: number) => {
    const newIntString = Math.floor(newValue).toString()
    const oldIntString = Math.floor(currentPrice).toString()
    setIntegerSlice(oldIntString.length)

    if (newIntString.length !== oldIntString.length) {
      setIntegerSlice(0)
      setDecimalSlice(0)
      return
    }

    for (const [i, elm] of newIntString.split("").entries()) {
      if (elm !== oldIntString[i]) {
        setIntegerSlice(i)
        setDecimalSlice(0)
        break
      }
    }
  }

  return showRate ? (
    <dl className="min-w-fit mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col p-6 text-center border-t border-gray-100">
        <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
          {props.pair}
        </dt>
        <div className="container">
          <dd className="order-1 text-5xl font-extrabold text-gray-500">
            {`$${Math.floor(currentPrice).toString().slice(0, integerSlice)}`}
            <span className={`text-5xl text-${differencePaint}-500`}>
              {Math.floor(currentPrice).toString().slice(integerSlice)}
            </span>
            <span className="text-2xl">.
              {getDecimalPart(currentPrice).slice(0, decimalSlice)}
            <span className={`text-${differencePaint}-500`}>
            {getDecimalPart(currentPrice).slice(decimalSlice)}</span>
            </span>
          </dd>
          <div className="tooltip">
            <div className="tooltip-text">
              {new Date(timestamp).toISOString()}
            </div>
          </div>
        </div>
      </div>
    </dl>
  ) : null;
}

export default Card;
