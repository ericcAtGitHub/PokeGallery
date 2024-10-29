import '../Style/OptionRollUI.css'
import { useState, useEffect, useContext, ChangeEvent, MouseEvent } from 'react'

interface IOptionRollConfig {
    //Size: number,
    Desc: string,
    OptionLabels: string[],
    OptionValues: any[],
    InitSelectedInd: number,
    OptionChangeHandler(newValue: any): any,
}

const OptionRollUI = (optionConfig: IOptionRollConfig) => {
    
    const [stateSelectedInd, setStateSelectedInd] = useState(optionConfig.InitSelectedInd)

    // cannot drop the following manual update...
    useEffect(() => {
        let isMounted = true // for async operation like asyncStorage
        if (isMounted) {
            setStateSelectedInd(optionConfig.InitSelectedInd)
        }

        return () => { isMounted = false }

    }, [optionConfig.InitSelectedInd])

    const options: { label: string, value: any }[] = optionConfig.OptionLabels.map((l, ind) =>
        ({ label: l, value: optionConfig.OptionValues[ind] }))

    const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value
        const newInd = options.findIndex(obj => obj.value === newValue)

        onOptionChanged(newValue, newInd)
    }

    const onOptionChanged = (newValue: any, newInd: number) => {
        optionConfig.OptionChangeHandler(newValue)
        setStateSelectedInd(newInd)
    }

    const prevHandler = (e: MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()

        const newInd = (stateSelectedInd - 1 < 0) ?
            stateSelectedInd - 1 + optionConfig.OptionValues.length : stateSelectedInd - 1
        const newValue = optionConfig.OptionValues[newInd]

        onOptionChanged(newValue, newInd)
    }

    const nextHandler = (e: MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()

        const newInd = (stateSelectedInd + 1) % optionConfig.OptionValues.length
        const newValue = optionConfig.OptionValues[newInd]

        onOptionChanged(newValue, newInd)
    }

    return (
        <span >
            {optionConfig.Desc}
            <span className="option-roll-holder">
                <button className="btn btn-link shadow-none option-roll-clicker" onClick={prevHandler}>&#9664;</button>

                <select className="option-roll-select" onChange={selectChangeHandler} value={optionConfig.OptionValues[stateSelectedInd]}>
                    {options.map((o, ind) =>
                        <option value={o.value} key={o.label}>{o.label}</option>
                )}
            </select>

                <button className="btn btn-link shadow-none option-roll-clicker" onClick={nextHandler}>&#9654;</button>
            </span>
        </span>
        )
}

export default OptionRollUI