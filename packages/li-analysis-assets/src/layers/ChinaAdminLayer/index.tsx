import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 1138 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path
      d="M980.650667 884.280889c-6.257778 0 0-6.257778-6.257778-6.257778h-6.314667v-12.572444l-6.257778-6.314667c0-6.257778 6.257778-6.257778 0-12.572444v-6.257778c0-6.314667 6.257778-12.629333 6.257778-25.201778v-6.257778h6.257778v-6.257778l6.257778-6.314666s6.314667 0 6.314666-6.257778h6.257778s0 6.257778 6.314667 6.257778c6.257778 12.515556 0 31.402667 0 50.289778-6.257778 6.257778 0 18.830222-6.257778 25.144888v12.515556h-12.572444c6.257778 0 6.257778 0 0 0z m-276.593778 119.409778c-6.257778 0-6.257778 0-6.257778-6.257778 0-6.314667 0-6.314667-6.314667-6.314667 0-6.257778-6.257778-6.257778 0-12.572444 0 0 6.257778 0 6.257778-6.257778 6.257778-6.314667 12.572444-6.314667 18.887111-12.572444h25.144889s-6.257778 0-6.257778-6.314667c0 0-6.314667 0-6.314666-6.257778 0-6.314667 0-6.314667-6.257778-12.572444v-6.314667h-12.629333s-6.257778 0-6.257778-6.257778h-12.572445c-6.257778 0 0 6.257778-6.257777 6.257778h-12.629334c-6.257778 0-6.257778-6.257778-12.515555-6.257778h-6.314667c0-6.314667-6.257778-6.314667-6.257778-12.572444v-18.887111h-6.314666c-6.257778 0-12.572444-6.257778-18.887111-6.257778l-6.257778 6.257778-6.257778 6.257777h-18.887111c-6.257778 0-18.887111 0-25.144889-6.257777h-6.257778v6.257777H546.929778c0 6.314667 6.257778 18.887111 0 25.201778h-12.572445s0-6.314667-6.314666-6.314666v-6.257778c-6.257778 0-6.257778 0-6.257778 6.257778h-6.314667s0-6.257778-6.257778-6.257778v-6.314667l-6.314666-6.257778h-6.257778l-6.314667-6.314666-6.257777-6.257778v-18.830222s-6.314667 0-6.314667-6.314667l-6.257778-6.257778v-18.887111h-18.887111c-6.257778-12.572444-6.257778-18.887111-6.257778-25.144889 0-6.257778 6.257778 0 6.257778-6.257778v-6.314666l12.572444-12.572445 6.257778-6.257777v-6.314667s0-6.257778 6.314667-6.257778v-31.459555h-6.257778c0-6.257778-6.314667-12.572444-6.314667-18.887112h-6.257777l-6.314667 6.257778h-12.572444c-6.257778 0-12.572444-6.257778-18.830223-12.515555h-43.975111l-6.314666 6.257777c0 6.257778-12.572444 6.257778-12.572445 6.257778-6.257778 0-6.257778 6.314667-6.257778 6.314667h-6.314666l-6.257778 6.257778h-18.887111l-6.257778 12.629333v-6.257778c0-6.314667-6.314667-6.314667-12.629333-6.314666l-6.257778-6.257778v-6.314667h-6.257778v-6.257778s-6.314667 0-12.629333-6.314666l-6.257778-6.257778h-6.257778l-6.314666 6.257778v6.257777h-12.572445c-6.257778-6.257778 0-12.515556-6.257778-18.830222h-6.314666s0-6.257778-6.257778-6.257778h-18.887111c-6.257778 0-12.572444-6.314667-18.887111-6.314666H169.756444s0-6.257778-6.257777-6.257778c-6.314667 0-6.314667 0-6.314667-6.314667v-12.572444s-6.257778 0-6.257778-6.257778v-6.314667h-6.314666v-6.257777h-6.257778s-6.314667 0-6.314667-6.314667c-12.572444-6.257778-18.887111-18.887111-31.459555-25.144889h-6.257778l-6.257778 6.257778s-6.314667 0-6.314667-6.257778l-12.572444-12.572444s0-6.257778-6.257778-6.257778c0-6.314667-6.314667-12.629333-6.314667-18.887111H50.289778s0-6.257778-6.314667-6.257778v-37.717333s6.257778 0 6.257778-6.314667c6.257778 0 6.257778 6.257778 6.257778 6.257778 0-12.515556 0-18.830222-6.257778-25.144889 12.572444-6.257778 12.572444-12.515556 12.572444-12.515556-6.257778-12.629333-6.257778-18.887111-6.257777-31.459555 0-6.257778-6.257778 0-6.257778-6.257778H44.032c-6.257778 0-12.572444-12.629333-12.572444-12.629333s-6.257778 0-6.257778-6.257778c-6.314667-6.257778 0-18.887111-6.314667-25.144889l-6.257778-6.257778c-6.314667 0-6.314667-6.314667-12.629333-6.314666v-6.257778s6.257778 0 12.572444-6.314667v-6.257778c0-6.314667 0-6.314667 6.257778-6.314666v-12.572445h-12.515555s0-6.257778-6.257778-6.257778V337.351111s6.257778 0 6.257778-6.257778v-12.572444h6.257777c6.257778-6.257778 6.257778-6.257778 12.572445-6.257778h31.459555s6.257778 0 6.257778 6.257778h6.257778c6.314667 0 6.314667-6.257778 6.314667-6.257778v-6.314667h18.887111c12.515556-6.257778 18.830222 0 31.402666 0 6.257778-18.887111 12.572444-18.887111 18.887112-18.887111h6.257777c0-6.257778 6.257778-12.515556 6.257778-18.830222h6.314667l6.257778-6.257778c6.314667-12.629333 6.314667-25.201778 6.314666-44.032 6.257778 0 0-6.257778 0-6.257777s0-6.314667 6.257778-6.314667c6.314667 0 18.887111-6.257778 25.201778 6.257778h12.515555V199.111111h6.314667v-6.314667s0-6.257778 6.257778-6.257777c0 0 0-6.314667 6.314666-6.314667 0 0 0-6.257778 6.257778-6.257778l6.314667-6.314666c-6.257778-6.257778 0 0 6.257778 0l6.314666 6.257777h18.887111s0-6.257778 6.257778-6.257777v-18.887112s6.257778 0 6.257778-6.257777H301.738667s6.257778 0 6.257777-6.257778c0-6.314667 0-6.314667 6.314667-6.314667 6.257778 0 18.887111-6.257778 25.144889 0v25.144889l6.257778 6.257778s6.314667 0 6.314666 6.257778c0 0 6.257778 0 6.257778 6.314666h6.314667l6.257778 6.257778v25.201778c6.314667 0 6.314667 6.257778 6.314666 12.515555 0 6.314667 0 12.629333-6.257777 12.629334v12.515555c6.257778 0 6.257778 6.314667 12.515555 6.314667 6.314667 0 12.629333 0 18.887111 6.257778h6.257778c6.314667 0 6.314667 6.314667 12.629333 6.314666v6.257778c12.515556 12.629333 12.515556 18.887111 18.830223 18.887111h6.257777v12.572445l6.314667 6.257778v6.314666s0 6.257778 6.257778 6.257778v12.629333s6.314667 0 6.314666 6.257778h6.257778c6.314667 0 18.887111 0 25.201778 6.257778h43.975111l6.257778 6.314667h12.572444v6.257777c6.314667 0 6.314667 0 12.572445 6.314667 0 6.257778 6.314667 6.257778 6.314666 6.257778h18.830223l6.314666 6.314666c6.257778 0 12.572444-6.257778 18.830223-6.257777h12.572444c25.144889-18.887111 31.459556-18.887111 44.032-18.887111h37.717333s0-6.257778 6.257778-6.257778c0-6.257778 6.257778-6.257778 6.257778-6.257778h6.314667s0-6.314667 6.257777-6.314667c0 0 6.314667 0 6.314667-6.257777v-6.314667c0-6.257778-6.257778-6.257778-6.257778-12.572445v-12.572444s6.257778 0 6.257778-6.257778c0 0 6.257778 0 6.257778-6.314666 12.629333 0 18.887111 6.257778 31.459555 0h6.257778l6.314667-6.257778 12.572444-12.629334h6.257778c6.314667 0 6.314667 0 6.314667-6.257777-6.257778-6.257778-6.257778-6.257778-6.257778-12.572445l6.257778-6.257778h6.257777c6.314667 0 6.314667-6.314667 12.629334-12.629333h31.402666v-6.257778l-6.257777-6.257777-6.257778-6.314667h-6.314667V199.111111h-6.257778v6.257778c-6.314667 0-6.314667 0-6.314666 6.257778h-25.144889l-6.257778 6.257777h-12.629333l-6.257778-6.257777V192.853333c0-6.257778 6.257778-12.572444 6.257778-18.887111 0-6.257778 6.257778-12.515556 6.257778-18.830222h31.459555c0-6.257778 6.257778-6.257778 12.572445-12.572444v-12.572445c0-6.257778 6.257778-12.572444 6.257777-12.572444 6.314667 0 6.314667-6.257778 6.314667-6.257778l6.257778-6.314667V85.902222h-12.515556l-6.257778-6.257778v-18.887111s0-6.257778 6.257778-6.257777h12.515556v-6.257778h18.887111s6.257778 0 6.257778-6.314667h31.459555c6.257778 0 6.257778 0 12.572445 6.257778h12.572444s6.257778 0 6.257778 6.257778c0 0 0 6.314667 6.314667 6.314666l6.257777 6.257778v6.314667c6.314667 0 0 6.257778 6.314667 6.257778 6.257778 0 6.257778 6.314667 6.257778 6.314666s0 6.257778 6.314666 6.257778h6.257778v6.314667c0 6.257778 0 6.257778 6.314667 12.572444l6.257778 6.257778h25.201777l6.257778 6.314667h6.257778l6.314667 6.257777 6.257777 6.314667v12.572444c12.629333 0 12.629333 6.257778 12.629334 6.257778 6.257778 0 12.515556 0 18.830222-6.257778 0 0 0-6.257778 6.257778-6.257777v-6.257778c0-6.314667 6.314667-6.314667 12.629333-6.314667 0-6.257778 6.257778-6.257778 12.515556-12.572444h18.887111v6.257778s0 6.257778-6.257778 6.257777v18.887111c-6.257778 18.887111 0 37.717333-6.257778 56.604445 0 0 0 6.257778-6.314666 6.257778l-6.257778 6.257777h-18.887111v6.314667s-6.257778 0-6.257778 6.257778v6.314667c0 6.257778 6.257778 6.257778 6.257778 12.572444 6.257778 6.257778 0 12.572444 6.257777 25.144889l-6.257777 6.257778c0 6.314667 0 12.629333-6.257778 12.629333h-6.314667v-6.257778h-6.257778c0 6.257778-6.314667 6.257778-6.314666 12.515556l-12.572445 12.572444v12.572445h-37.717333s0 6.257778-6.257778 6.257777v12.629334c0 6.257778-6.314667 6.257778-6.314666 12.515555v31.459556c-6.257778 0-6.257778 6.257778-6.257778 6.257778-6.314667 6.314667-12.629333 12.629333-25.201778 12.629333 0 0-6.257778 0-6.257778 6.257778v6.257778l-6.257778 6.314666v6.257778l-6.314666 6.314667v6.257777c-6.257778 0-6.257778 0-6.257778 6.314667-6.314667 0-6.314667 6.257778-12.629333 6.257778 0 0 0-6.257778-6.257778-6.257778v-6.257778c6.257778-6.257778 0-18.887111 0-31.459555 0 0 0-6.257778 6.257778-6.257778v-6.257778h-12.515556l-6.314667 6.257778-6.257777 6.257778v6.257778c-6.314667 0-6.314667 6.314667-12.629334 6.314666l-12.515555 12.572445v6.257777l-6.314667 6.314667h-18.830222c-6.314667 0 0 6.257778 0 6.257778 0 6.314667 6.257778 6.314667 6.257778 6.314667h12.515555c6.314667 0 12.629333 6.257778 12.629334 6.257777v6.314667h-6.257778v6.257778h6.257778c6.257778 0 6.257778-6.257778 12.515555-12.515556h6.314667c6.257778-6.257778 12.572444-12.572444 18.887111-12.572444l12.515555 6.257778s6.314667 0 6.314667 6.257777h25.144889v6.314667l-18.830222 18.887111c0 6.257778-6.257778 0-12.572445 6.257778 0 6.257778 0 6.257778-6.257777 12.572444l-6.314667 6.257778c-6.257778 6.314667-12.572444 6.314667-12.572445 12.629333 0 0-6.257778 0-6.257777 6.257778l-6.314667 6.257778c0 6.314667 6.257778 0 6.257778 6.314667h12.572444c0 6.257778 6.257778 0 6.257778 6.257777h6.314667v6.314667l6.257777 6.257778c0 6.314667 6.314667 18.887111 6.314667 25.201778 0 6.257778 6.257778 6.257778 6.257778 6.257777 0 6.257778 6.314667 6.257778 6.314667 12.572445l6.257777 6.257778s6.314667 6.314667 6.314667 12.629333l6.257778 6.257778v6.257778c0 6.314667-6.257778 6.314667-12.515556 6.314666h-12.572444v6.257778h12.515555c0 6.314667 6.314667 6.314667 12.629334 12.629333 0 6.257778 6.257778 12.515556 0 25.144889v25.144889l-6.257778 6.257778s0 6.257778-6.314667 12.572444c0 6.257778-6.257778 12.572444-6.257778 18.887111v18.830223h-6.314666v18.887111c0 6.257778-6.257778 6.257778-6.257778 12.515555v6.314667h-6.314667s0 6.257778-6.257777 12.572444h-12.572445v12.572445c-6.314667 0-6.314667 6.257778-12.629333 12.572444h-6.257778v6.257778h-6.257778c0 6.314667-6.314667 6.314667-6.314666 6.314667 0 6.257778-6.257778 6.257778-6.257778 12.572444-6.314667 6.257778-12.629333 6.257778-18.887111 6.257778l-6.257778 6.314667h-12.629333c-6.257778 0-12.515556 6.257778-18.830223 12.572444h-6.257777v-6.257778h-6.314667v6.257778h-6.257778s-6.314667 0-6.314667 6.257778v6.314667c-6.257778 6.257778-12.572444 0-18.887111 6.257777h-6.257777c-6.257778 0-6.257778 6.314667-6.257778 6.314667h-12.629334c-6.257778 0-6.257778 6.257778-6.257777 6.257778h-6.257778v6.314666l6.257778 6.257778v6.314667s-6.257778 0-6.257778 6.257778c6.257778 6.314667 12.515556 0 18.773333 6.314666v6.257778h-6.257778l-6.257777 6.314667v12.572444h-6.257778v6.257778s-6.314667 6.314667-12.629333 6.314667c0 0-6.257778 0-6.257778 6.257777h-12.572445c-6.257778-6.257778-6.257778-6.257778-12.572444-6.257777z"
      style={{ opacity: 0.6 }}
    />
    <path
      d="M465.180444 331.093333c6.257778 0 6.257778 0 0 0 12.572444 0 18.887111 6.257778 31.459556 6.257778h43.975111l6.257778 6.257778h6.314667l6.257777 6.314667v6.257777c6.314667 0 6.314667 0 12.572445 6.314667 0 6.257778 6.314667 6.257778 6.314666 6.257778h18.830223l6.314666 6.314666c6.257778 0 12.572444-6.257778 18.830223-6.257777h12.572444c25.144889-18.887111 31.459556-18.887111 44.032-18.887111h37.717333s0-6.257778 6.257778-6.257778c0-6.257778 6.257778-6.257778 6.257778-6.257778h6.314667s0-6.314667 6.257777-6.314667c0 0 6.314667 0 6.314667-6.257777v-6.314667c0-6.257778-6.257778-6.257778-6.257778-12.572445v-12.572444s6.257778 0 6.257778-6.257778c0 0 6.257778 0 6.257778-6.314666 12.629333 0 18.887111 6.257778 31.459555 0h12.572445l12.572444-12.572445h6.257778c6.314667 0 6.314667 0 6.314667-6.257778-6.257778-12.629333-6.257778-12.629333-6.257778-18.887111l6.257778-6.257778h6.257777c6.314667 0 6.314667-6.314667 12.629334-12.629333h31.402666v-6.257778l-6.257777-6.257777-6.257778-6.314667h-6.314667V199.111111h-6.257778v6.257778c-6.314667 0-6.314667 0-6.314666 6.257778h-25.144889l-6.257778 6.257777h-12.629333V192.853333c0-6.257778 0-6.257778 6.257778-12.572444 0-6.257778 6.314667-12.572444 6.314666-12.572445h25.144889c0-6.257778 6.257778-6.257778 12.572445-12.572444v-12.572444c0-6.257778 6.257778-12.572444 6.257777-12.572445v-6.257778l6.314667-6.314666V98.417778h-6.257778v-6.257778h-6.257778s0-6.257778 6.257778-6.257778h12.515556V79.644444v18.830223l12.629333-25.144889h12.515556v6.257778s0 6.314667 6.314666 12.629333c6.257778 0 6.257778 6.257778 6.257778 6.257778h6.314667l6.257778-6.257778h6.314666v-6.257778h12.572445l6.257777 6.257778v50.289778l-6.257777 6.257777v18.887112l6.257777-6.257778h-6.257777l-6.257778 6.257778-6.257778 12.515555h-6.314667l-6.257777 6.314667v6.257778l6.257777 6.314666v6.257778h6.257778v25.201778l-6.257778 6.257778h-18.887111l-6.257777 6.257777 6.257777 6.314667h6.257778v18.887111l6.314667 6.257778 6.257778 6.257778h6.314666l18.887111-12.515556 6.257778 6.257778h6.257778v18.887111l6.314667 6.257778h6.257777v6.257778l-6.257777 6.314666h-12.515556l-6.314667 6.257778v6.314667h-6.257777l-6.314667 6.257777h-6.257778l-12.629333 12.629334h-6.257778l-6.257778-6.257778-6.314666-6.314667v25.144889l-6.257778 6.257778h-12.629334v-25.088l-6.257777 6.257778V331.093333h-6.257778v6.257778h-6.314667v18.887111h-12.572444l-25.144889-6.257778v6.257778l-6.257778 6.257778h-6.314667v-12.515556l-6.257777-6.314666-6.314667 6.257778v37.717333l6.257778 6.257778v6.314666l-6.257778 6.257778h-18.887111v6.314667h-6.257778v18.887111l-18.887111-18.887111h-6.257778l-6.257778 6.257778h-6.314666v6.314666h-12.572445v6.257778h-18.887111v6.314667l-6.257778 6.257777v6.314667l-6.257777 12.572445v6.257777h-12.629334l-12.515555-6.257777s0-6.257778-6.314667-6.257778h-6.257778v-12.572445 25.144889h6.257778l6.257778 6.257778v18.887111h-6.257778l-6.257778-6.257778-6.314666 6.257778v31.402667h-6.257778v12.572444l-6.314667-6.257778v-6.257777l-6.257778-6.314667h-6.314666v-6.257778h-6.257778v-18.887111h-12.629333 18.887111V475.591111h6.257778V456.817778l6.314666-12.572445 6.257778-6.257777h6.257778l6.314666 6.257777v6.257778-12.515555s0-6.314667-6.257777-6.314667h-12.572445v37.717333h-44.032v-18.887111l12.572445-6.257778 6.314666-6.257777v-18.887112h-6.257777s-6.314667 0-12.629334 6.257778l-6.257778 6.257778H553.187556v6.314667l6.257777 6.257777h-12.515555v-6.257777h-6.314667v-12.515556l-6.257778-6.314667-6.314666-6.257777h-12.572445l-6.257778-6.314667 6.257778-12.572444v-12.572445h-18.830222s-6.314667 0-6.314667 6.257778v-6.257778h-12.572444v-12.572444h-6.257778l6.257778-6.257778v-6.314667l-6.257778-6.257778V331.093333h-6.314667z m263.964445 465.180445h12.629333v18.830222l-6.257778 12.572444v12.572445l6.257778-6.257778v6.257778h12.515556v25.144889-12.515556l-6.257778 12.515556-6.257778 6.257778v6.314666l-12.572444 6.257778v6.314667h-6.257778v6.257777h-6.314667v12.629334l-6.257777-6.314667-6.314667 12.572445v-6.257778h-6.257778l-6.314667-12.572445v6.257778h-6.257777l-25.201778 12.572445h-6.257778l-6.257778-6.257778-6.314666-6.314667s-6.257778-6.257778 0-12.572444l6.257777-6.257778v-6.257778h-31.402666 6.257778l6.314666-6.314667v-12.572444h-25.144889v-12.572444h-12.572444v-6.257778h18.830222l6.314667 6.257778h12.572444l6.257778-6.257778h6.257778l6.314666-6.314667 6.257778-6.257778v-6.314666h6.314667l6.257778 6.257777h18.887111l6.257778-6.257777h6.314666v-6.257778l6.257778-6.314667h12.629333v-6.257778c0 6.257778 6.257778 6.257778 6.257778 6.257778l6.257778-6.257778h6.314667l-6.257778-6.314666z m62.919111-396.060445h-6.257778v6.257778h12.515556v12.629333h-6.257778v25.144889l6.257778 6.257778v50.289778l6.257778 6.257778v18.887111h-6.257778v6.257778l-18.830222 6.314666h-18.887112l-18.830222 6.257778-6.257778 6.314667h-6.314666v-6.257778l6.257778-25.144889c0-6.257778-6.257778-12.572444-6.257778-18.887111v-12.515556l6.257778-6.314666V469.333333l-6.257778-6.257777V456.817778l6.257778-6.257778v-12.629333l6.257777-6.257778v-6.257778l6.314667-6.314667h6.257778v-12.572444h37.774222v-12.572444 6.257777z m169.699556 226.304h12.572444l-6.257778 6.257778-18.887111 6.314667 18.887111 6.257778 6.257778-6.257778h12.572444s6.257778 0 6.257778 6.257778l-6.257778 6.314666h6.257778c0 6.257778 6.314667 6.257778 6.314667 6.257778h-12.515556v6.314667h6.257778l-6.257778 12.572444v6.257778l-6.314666 6.314667v-6.257778l-6.257778 12.515555-6.314667 6.314667v12.572444l-6.257778-6.257777h-6.314666v6.257777h-6.257778l-6.314667-6.257777v12.515555h-6.257777v-6.257778c0-6.257778 0-12.515556-6.314667-12.515555h-6.257778v-6.314667l-6.314667-12.572444v-6.257778l12.515556-6.314667 6.314667-6.257777v-6.314667h6.257777l6.314667-6.257778-6.257778-6.314667c0-6.257778 6.257778-6.257778 6.257778-6.257777h12.572445c-6.257778-6.314667 0-6.314667 0-12.629334z m-62.862223-43.975111c6.257778 6.257778 12.572444 6.257778 12.572445 6.257778s6.257778 0 12.572444-6.257778v6.257778h-6.257778v6.257778s0 6.314667-6.257777 12.629333v6.257778l6.257777 6.257778s6.257778 0 6.257778 6.314666v6.257778h6.257778l6.314667 6.314667v6.257778l-6.257778 6.314666 6.257778 6.257778h-6.257778l-12.572445-6.257778v6.257778c0 6.314667 6.257778 6.314667 6.257778 6.314667v6.257777l-12.515555 6.314667h-12.629334l-6.257777-12.515555h-6.257778c0 6.257778-6.314667 6.257778-6.314667 6.257777s0-6.257778 6.257778-12.572444v-6.257778l-18.830222 12.515556-12.572445-25.144889 6.257778-6.257778-6.257778-6.257778h-6.257778l-6.314666-6.314666v-6.257778s0-6.314667 6.257778-6.314667h6.257777v-18.887111h-6.257777c0-6.257778-6.257778-6.257778-6.257778-12.515556h6.257778v-12.572444h6.257777v-6.314667h6.314667l6.257778 6.257778s6.314667 0 6.314666-6.257778l6.257778-6.257777c-6.257778-6.314667-6.257778-6.314667-6.257778-12.629334 6.257778 6.257778 6.257778 12.572444 12.572445 12.572445 0 0 6.257778 0 12.572444 6.257777l12.572445 6.314667c-18.830222 0-18.830222 6.257778-12.515556 18.887111z m-138.24-37.717333l12.515556-6.257778s6.257778 0 12.572444-6.314667h6.257778v-18.887111h25.201778v25.144889h6.257778s0 6.257778 6.257777 6.257778h18.887112s6.257778 6.314667 6.257777 12.629333l-6.257777 6.257778-6.257778-6.257778h-6.257778v12.515556h-12.572444v12.629333h-6.314667s0 6.257778 6.257778 6.257778l6.257777 6.257778h6.314667s6.257778 0 6.257778 6.314666v6.257778c-6.257778 0-6.257778 0-6.257778 6.314667h-6.257778l-6.257777 6.257778-6.314667-6.257778h-12.572445v-12.515556h-37.717333c-6.257778 0-6.257778 0-6.257778-6.314666l-6.314666 6.257777-12.572445-12.515555v-12.629333l-6.257778-6.257778c-6.314667 0-6.314667-6.257778-6.314666-18.887111l6.257778-6.257778h25.144888zM659.968 475.591111l12.572444 6.257778h6.257778l12.629334-6.257778V456.817778l6.257777-6.257778v-6.314667l6.257778-6.257777h6.314667v-6.314667h12.572444v-6.257778 6.257778h-6.257778l-6.257777 6.257778v12.572444l-6.314667 6.257778v6.314667l18.830222 12.572444v12.572444l-6.257778 6.257778v12.629334s0 6.257778 6.257778 18.830222l-6.257778 25.144889v6.257777h6.257778c0 12.629333 0 18.887111 6.257778 18.887112l6.314667 6.257777v6.314667h-25.144889v6.257778l6.257778 6.314666h-12.515556l-6.257778 6.257778v18.887111h-50.346666l-6.257778-6.257777h-6.257778v-12.572445h-18.887111 12.572444v-12.572444h18.830223v-37.717334l6.257777-12.572444 6.314667 6.257778h12.572444s6.257778 0 6.257778-6.257778h-6.257778l6.257778-6.257778h18.887111v-31.459555h-12.515555l-6.314667-6.257778h-6.257778l-6.314666-6.314667-6.257778-18.887111z"
      style={{ opacity: 0.8 }}
    />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'ChinaAdminLayer',
    displayName: '中国行政',
    description: '用于可视化中国行政区域，数据支持行政名称或行政编码，且支持文本标注。',
    type: 'Layer',
    icon: ICON,
    color: 'red',
  },
  defaultVisConfig: {
    visible: true,
    showAdminLabel: true,
    adminLabelColor: '#fff',
    adminLabelFontSize: 14,
    adminLabelStroke: '#606060',
    adminLabelStrokeWidth: 0.5,
    fillColor: 'rgb(90, 216, 166)',
    opacity: 0.8,
    strokeColor: '#a9abb1',
    lineWidth: 1,
    lineOpacity: 0.8,
    label: {
      style: {
        fill: '#a9abb1',
        fontSize: 14,
        textAnchor: 'center',
        textOffset: [0, 0],
      },
    },
    showNationalBorders: true,
    nationalBorderColor: '#606067',
    coastBorderColor: '#606067',
    state: {
      active: { strokeColor: 'yellow', fillColor: false },
      select: { fillColor: false, strokeColor: 'red' },
    },
    minZoom: 0,
    maxZoom: 24,
    blend: 'normal',
  },
  component,
  registerForm,
});
