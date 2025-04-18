import { Heading } from "@/components/Heading";
import { ArrowBack } from "@/components/icons/ArrowBack";
import Image from "next/image";
import Link from "next/link";

import style from './error/error.module.css'
import banner from './error/404.png'

export default async function NotFound() {
  return (
    <div className={style.container}>
      <Image src={banner}/>
      <Heading>Ops! A error occurred.</Heading>
      <p className={style.text}>We didn't get load the page, you can return to the main e continue browser.</p>
      <Link href="/">
        Back to feed <ArrowBack color='#81FE88'/>
      </Link>
    </div>
  )
}