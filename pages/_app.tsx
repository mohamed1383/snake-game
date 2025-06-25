import '@/styles/globals.css'

import React, { JSX } from 'react'

export default function _app({Component,pageProps} : {Component: JSX.ElementType , pageProps : any}) {
  return (
    <Component {...pageProps}></Component>
  )
}
