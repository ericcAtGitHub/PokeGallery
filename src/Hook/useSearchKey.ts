import { FC, useContext, useState, useRef, useEffect, Suspense, lazy } from 'react'

import { UserInputContext } from "../Context/UserInputContext"

export default function useSearchKey() {

    const {
        appSearchKey,
        appSetSearchKey
    } = useContext(UserInputContext)

    return [appSearchKey, appSetSearchKey]
}