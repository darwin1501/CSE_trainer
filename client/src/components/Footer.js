import React from 'react'
import FooterStyle from './FooterStyle.module.css'

function Footer () {
  return (
    <footer className='flex flex-center align-center gap-sm'>
      <p>Created by:</p>
      <strong style={{ textDecoration: 'underline' }}>
        <a href='https://darwin1501.github.io' target='_blank' rel='noreferrer'>
          Darwin
        </a>
      </strong>
    </footer>
  )
}

export default Footer
