/**
* this returns [0, ..., max]
*/
export const getArray0ToMax = (max: number) => {
    return Array.from(Array(max + 1).keys())
}

/**
* this returns [min, ..., max]
*/
export const getArrayMinToMax = (min: number, max: number) => {
    return getArray0ToMax(max - min).map(n => n + min)
}

/**
* this returns a permutation of [0, ..., max]
*/
export const getPerm = (rand: (() => number), max: number) => {

    /*
    let rtn = []
    const oriArray = getArray0ToMax(max)

    while (oriArray.length > 0) {
        const indPick = getRandInt(rand, oriArray.length)
        rtn.push(oriArray[indPick])
        oriArray.splice(indPick, 1)
    }*/

    let rtn = getArray0ToMax(max)

    // Knuth shuffle algorithm
    for (let i = 0; i < rtn.length; i++) {
        let iValue = rtn[i]
        let switchInd = i + getRandInt(rand, max - i + 1)
        rtn[i] = rtn[switchInd]
        rtn[switchInd] = iValue
    }

    return rtn
}

/**
 * "min", "max" inclusive (it is the closed interval [min, max])
 */
export const isInRange = (num: number, min: number, max: number) => {
    return (min <= num && num <= max)
}

/**
 * It applys on a shallow copy of the origin array
 */
export const getShuffle = (rand: (() => number), array: any[]) => {
    let rtn = []
    const cloneArr = [...array]
    const shuffledIndices = getPerm(rand, cloneArr.length - 1)

    for (const ind of shuffledIndices) {
        rtn.push(cloneArr[ind])
    }
    return rtn
}

/** 
*  "getRandInt(rand, 3)" gives 0, 1 or 2
*/
export const getRandInt = (rand: (() => number), max: number) => {
    return Math.floor(rand() * max) % max
}

/**
* "prob": A vector with entries sum to 1.
* eg.1 [0.3, 0.7]
* eg.2 [0.2, 0.35, 0.45]
*/
export const getProbInd = (rand: (() => number), prob: number[]) => {

    let rtn = 0

    const randNum = rand()

    let currentMin = 0
    let runningMax = 0

    for (let i = 0; i < prob.length; i++) {
        currentMin = runningMax
        runningMax = currentMin + prob[i]
        if (isInRange(randNum, currentMin, runningMax)) {
            rtn = i
            break
        }
    }

    return rtn
}