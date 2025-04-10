'use client'

import { ArrowBack } from '@/components/icons/ArrowBack'
import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/Heading'
import style from './error/error.module.css'
import banner from './error/500.png'

import { useEffect } from 'react'

export default function Error({ error }) {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div className={style.container}>
            <Image src={banner} />
            <Heading>Something went wrong</Heading>
            <p className={style.text}>We didn`t get successs return to continut navigating</p>
            <Link href="/">Back to feed <ArrowBack color='#81FE88' /></Link>
        </div>
    )
}