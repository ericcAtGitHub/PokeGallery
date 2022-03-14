import { FC, useContext, useState, useRef, useEffect, Suspense, lazy } from 'react'

import { UserInputContext } from "../Context/UserInputContext"

export default function useImgRepo() {

    const {
        appImgRepo,
        appSetImgRepo
    } = useContext(UserInputContext)

    return [appImgRepo, appSetImgRepo]
}